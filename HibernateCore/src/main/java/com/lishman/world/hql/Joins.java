package com.lishman.world.hql;

import java.util.List;

import org.hibernate.Session;

import com.lishman.world.HibernateUtil;
import com.lishman.world.domain.Continent;
import com.lishman.world.domain.Country;

public class Joins {

    public static void main(String[] args) {
        
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        
        //--------------------------------------- implicit association joining
        
        // Returns all countries in Africa.
        List<Country> africanCountries = session.createQuery(
                "from Country where continent.name = 'Africa'").list();
        
        showCountries(africanCountries);
        
        /*  Produces this SQL
         *  
         *      select
         *          COUNTRY.CTRY_ID,
         *          COUNTRY.AREA,
         *          COUNTRY.CONT_ID,
         *          COUNTRY.CURRENCY,
         *          COUNTRY.CTRY_NAME,
         *          COUNTRY.POP,
         *          COUNTRY.POP_UPD_ON
         *      from
         *          COUNTRY,
         *          CONTINENT
         *      where
         *          COUNTRY.CONT_ID=CONTINENT.CONT_ID
         *          and CONT_NAME='Africa'
         */

        
        //--------------------------------------- inner join without projection
        
        // Returns all countries in Africa.
        List<Object[]> continentsWithBigCountries = session.createQuery(
                "from Continent c join c.countries  " + 
                "where c.name = 'Africa'").list();
        
        showObjectArray(continentsWithBigCountries);
        
        /*  Produces this SQL
         * 
         *      select
         *          COUNTRY.CTRY_ID,
         *          COUNTRY.AREA,  
         *          CONTINENT.CONT_ID,
         *          CONTINENT.CONT_NAME,
         *          COUNTRY.CURRENCY,
         *          COUNTRY.CTRY_NAME,
         *          COUNTRY.POP,
         *          COUNTRY.POP_UPD_ON
         *      from
         *          CONTINENT
         *      inner join
         *          COUNTRY on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         *      where
         *          CONT_NAME='Africa'
         */
        
        
        //--------------------------------------- inner join with projection
        
        // Returns names of continents with large countries.
        List<String> continentNamesWithBigCountries = session.createQuery(
                "select distinct cont.name " + 
                "from Continent cont join cont.countries ctry " + 
                "where ctry.area > 100000").list();
        
        showStrings(continentNamesWithBigCountries);
        
        /*  Produces this SQL
         * 
         *      select
         *          distinct CONT_NAME
         *      from
         *          CONTINENT
         *      inner join
         *          COUNTRY on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         *      where
         *          AREA>100000
         */
        
        
        //--------------------------------------- left outer join
        
        // Returns continents with large countries or '[none]' if all countries are small
        // NVL = oracle specifiek!!!!
//        List<Object[]> allContinentsAndCountries = session.createQuery(
//                "select cont.name, nvl(ctry.name, '[none]') " + 
//                "from Continent cont left join cont.countries ctry " + 
//                "with ctry.area > 100000 " + 
//                "order by cont.name").list();
//        
//        showObjectArray(allContinentsAndCountries);

        /*  Produces this SQL       
         *  
         *      select
         *          CONT_NAME,
         *          nvl(CTRY_NAME, '[none]')
         *      from
         *          CONTINENT
         *      left outer join
         *          COUNTRY on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         *                  and (AREA>100000)
         *      order by 
         *          CONT_NAME
         */
        
        
        //--------------------------------------- theta-style joins
        
        // Continents with the same name as a country (of which there are none)
        List<Continent> duplicateNames = session
                .createQuery("select cont from Continent cont, Country ctry where cont.name = ctry.name").list();
        
        System.out.println("There area " + duplicateNames.size() +
                           " continents with same name as a country");

        /*  Produces this SQL    
         * 
         *      select
         *          CONTINENT.CONT_ID,
         *          CONTINENT.CONT_NAME
         *      from
         *          CONTINENT,
         *          COUNTRY
         *      where
         *          CONTINENT.CONT_NAME=COUNTRY.CTRY_NAME
         */
        
        
        //--------------------------------------- fetch
        
        // Example 1 - proxy object is returned for countries.
        Continent europe = (Continent) session.createQuery(
                "select cont " + 
                "from Continent cont join cont.countries " + 
                "where cont.name = 'Europe'").uniqueResult();
        
        System.out.println("Europe has " + europe.getCountries().size() + " countries");

        /*  Produces this SQL    
         * 
         *      select
         *          CONTINENT.CONT_ID,
         *          CONTINENT.CONT_NAME
         *      from
         *          CONTINENT
         *      inner join
         *          COUNTRY on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         *      where
         *          CONT_NAME='Europe'
         */
        
        // Example 2 - Use fetch to load the Country objects.
        europe = (Continent) session.createQuery(
                "select cont " + 
                "from Continent cont join fetch cont.countries " + 
                "where cont.name = 'Europe'").uniqueResult();
        
        System.out.println("Europe has " + europe.getCountries().size() + " countries");
        
        /*  Produces this SQL  
         * 
         *      select
         *          CONTINENT.CONT_ID,
         *          COUNTRY.CTRY_ID,
         *          CONTINENT.CONT_NAME,
         *          COUNTRY.AREA,
         *          COUNTRY.CURRENCY,
         *          COUNTRY.CTRY_NAME,
         *          COUNTRY.POP,
         *          COUNTRY.POP_UPD_ON
         *      from
         *          CONTINENT
         *      inner join
         *          COUNTRY on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         *      where
         *          CONT_NAME='Europe'
         */

        HibernateUtil.shutdown();

    }

    private static void showCountries(List<Country> countries) {
        for (Country country : countries) {
            System.out.println(country.getName());
        }
    }

    private static void showStrings(List<String> strings) {
        for (String s : strings) {
            System.out.println(s);
        }
    }

    private static void showObjectArray(List<Object[]> objects) {
        for (Object[] o : objects) {
            StringBuffer row = new StringBuffer();
            for (int i = 0; i < o.length; i++) {
                row.append((o[i] == null ? "[null]" : o[i].toString()) + ", ");
            }
            System.out.println(row.deleteCharAt(row.length() - 2));
        }
    }

}
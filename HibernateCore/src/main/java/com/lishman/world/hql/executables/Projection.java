package com.lishman.world.hql.executables;

import java.util.List;

import org.hibernate.Session;

import com.lishman.world.HibernateUtil;
import com.lishman.world.domain.Continent;
import com.lishman.world.domain.Country;
import com.lishman.world.domain.PopulationSummary;

public class Projection {

    public static void main(String[] args) {
        
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();

        //--------------------------------------- projection
        
        // Returns European countries.
        List<Country> europeanCountries = session.createQuery(
                "select cont.countries " + "from Continent cont " + 
                "where cont.name = 'Europe'").list();

        showCountries(europeanCountries);
        
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
         *          COUNTRY
         *              on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         *      where
         *          CONT_NAME='Europe'
         */

        
        //--------------------------------------- projection
        
        // Returns the continents for all the countries.
        List<Continent> continents = session.createQuery(
                "select ctry.continent " + "from Country ctry").list();
        
        showContinents(continents);

        /*  Produces this SQL
         * 
         *      select
         *          CONTINENT.CONT_ID,
         *          CONTINENT.CONT_NAME
         *      from
         *          COUNTRY
         *              inner join
         *          CONTINENT
         *              on CONTINENT.CONT_ID=COUNTRY.CONT_ID
         */

        
        //--------------------------------------- single scalar value
        
        // Returns all the country names.
        List<String> countryNames = session.createQuery(
                "select ctry.name from Country ctry").list();
        
        showStrings(countryNames);

        /*  Produces this SQL
         * 
         *      select
         *          CTRY_NAME
         *      from
         *          COUNTRY
         */
        
        //--------------------------------------- multiple scalar value
        
        // Returns the country name, continent name and currency for each country.
        List<Object[]> countryProperties = session.createQuery(
                "select ctry.name, ctry.continent.name, ctry.currency " + 
                "from Country ctry").list();
        
        showObjectArray(countryProperties);

        /*  Produces this SQL
         * 
         *      select
         *          COUNTRY.CTRY_NAME,
         *          CONTINENT.CONT_NAME,
         *          COUNTRY.CURRENCY
         *      from
         *          COUNTRY,
         *          CONTINENT
         *      where
         *          COUNTRY.CONT_ID=CONTINENT.CONT_ID
         */
        
        //--------------------------------------- dynamic object instantiation
        
        // Returns a count of the number of countries in each continent.
        List<PopulationSummary> populationDetails = session
                .createQuery(
                        "select new com.lishman.world.domain.PopulationSummary " + 
                        "(ctry.continent.name, count(*) )" + 
                        "from Country ctry " + 
                        "group by ctry.continent.name").list();
        
        showPopulationSummary(populationDetails);
        
        HibernateUtil.shutdown();
    }

    private static void showContinents(List<Continent> continents) {
        for (Continent continent : continents) {
            System.out.println(continent.getName());
        }
    }

    private static void showCountries(List<Country> countries) {
        for (Country country : countries) {
            System.out.println(country.getName());
        }
    }

    private static void showPopulationSummary(List<PopulationSummary> popSumms) {
        for (PopulationSummary popSum : popSumms) {
            System.out.println("Continent " + popSum.getContinentName() + 
                               " has " + popSum.getCountryCount() + " countries");

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

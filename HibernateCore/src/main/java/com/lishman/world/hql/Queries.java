package com.lishman.world.hql;

import java.util.List;

import org.hibernate.Session;

import com.lishman.world.HibernateUtil;
import com.lishman.world.domain.Continent;
import com.lishman.world.domain.Country;

public class Queries {

    public static void main(String[] args) {
        
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        
        //--------------------------------------- from clause

        // Returns all properties for all continents.
        List<Continent> allContinents = session.createQuery("from Continent").list();
        
        showContinents(allContinents);
        
        /*  Produces this SQL
         * 
         *      select
         *          CONT_ID,
         *          CONT_NAME
         *      from
         *          CONTINENT
         */
        
        
        //--------------------------------------- where clause (selection)

        // Returns continents with 'America' anywhere in the name.
        List<Continent> theAmericas = session.createQuery(
                "from Continent where name like '%America%'").list();

        showContinents(theAmericas);
        
        /*  Produces this SQL
         * 
         *      select
         *          CONT_ID,
         *          CONT_NAME
         *      from
         *          CONTINENT
         *      where
         *          CONT_NAME like '%America%'
         */

        
        //--------------------------------------- complex selection

        // Returns countries within a certain area size with a 
        // particular name or with no population updated date.
        List<Country> countries = session.createQuery(
                "from Country " + "where (populationUpdatedOn is not null " + 
                "or lower(name) in ('gabon', 'gambia')) " + 
                "and area between 100000 AND 100000000").list();
        
        showCountries(countries);
        
        /*  Produces this SQL
         * 
         *      select
         *          CTRY_ID,
         *          AREA,
         *          CONT_ID,
         *          CURRENCY,
         *          CTRY_NAME,
         *          POP,
         *          POP_UPD_ON
         *      from
         *          COUNTRY
         *      where
         *          (
         *            pop_upd_on is not null
         *            or lower(ctry_name) in ('gabon' , 'gambia')
         *          )
         *          and (area between 100000 and 100000000)
         */
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

}

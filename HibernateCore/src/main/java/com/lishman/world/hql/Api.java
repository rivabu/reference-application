package com.lishman.world.hql;

import java.util.List;

import org.hibernate.Session;

import com.lishman.world.HibernateUtil;
import com.lishman.world.domain.Continent;
import com.lishman.world.domain.Country;

public class Api {

    public static void main(String[] args) {
        
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        
        //--------------------------------------- uniqueResult
        
        // Returns the continent with an id of 7.
        Continent antarctica = (Continent) session.createQuery(
                "from Continent where id = 7").uniqueResult();
        
        System.out.println("The continent with an id of 7 is "
                + antarctica.getName());
        
        
        //--------------------------------------- maxResults

        // Returns the country with the highest population.
        Country highestPopulation = (Country) session
                .createQuery("from Country order by population desc")
                .setMaxResults(1).uniqueResult();
        
        System.out.println(highestPopulation.getName() + 
                           " has the highest population with " + 
                           highestPopulation.getPopulation());

        
        //--------------------------------------- sorting
        
        // Returns the results by ascending (the default) country name 
        // within descending area.
        List<Country> sortedCountries = session.createQuery(
                "from Country order by area desc, name").list();

        showCountries(sortedCountries);

        
        //--------------------------------------- pagination

        // Returns page 3 of a list of countries with 2 items per page.
        List<Country> page3 = session.createQuery("from Country order by name")
                .setFirstResult(4).setMaxResults(2).list();
        
        showCountries(page3);
        
        /*  Produces this SQL (Oracle)
         * 
         *      select 
         *          *
         *      from
         *          ( select
         *              row_.*,
         *              rownum rownum_
         *            from
         *              ( select
         *                  CTRY_ID,
         *                  AREA,
         *                  CONT_ID,
         *                  CURRENCY,
         *                  CTRY_NAME,
         *                  POP,
         *                  POP_UPD_ON
         *                from
         *                  COUNTRY
         *                order by
         *                  CTRY_NAME ) row_
         *            where
         *              rownum <= ?
         *            )
         *          where
         *              rownum_ > ?
         */
        HibernateUtil.shutdown();

    }
        
    private static void showCountries(List<Country> countries) {
        for (Country country : countries) {
            System.out.println(country.getName());
        }
    }
}

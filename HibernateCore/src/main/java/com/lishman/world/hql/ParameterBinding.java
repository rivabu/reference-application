package com.lishman.world.hql;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.lishman.world.HibernateUtil;
import com.lishman.world.domain.Continent;
import com.lishman.world.domain.Country;

public class ParameterBinding {

    public static void main(String[] args) {
        
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        
        
        //--------------------------------------- sql injection
        
        // Returns African countries which contain specified text (in this case 'Ga').
        String userInput = "Ga";
        String searchFor = "%" + userInput.toLowerCase() + "%";
        
        List<Country> onlyAfricanCountries = session.createQuery(
                "from Country " + "where continent.name = 'Africa' " + 
                "and lower(name) like '" + searchFor + "'").list();
        
        showCountries(onlyAfricanCountries);

     
        // Malicious user retrieves ALL countries
        userInput = "' or '%'='".toLowerCase();
        searchFor = "%" + userInput.toLowerCase() + "%";
        
        onlyAfricanCountries = session.createQuery(
                "from Country " + "where continent.name = 'Africa' " + 
                "and lower(name) like '" + searchFor + "'").list();

        showCountries(onlyAfricanCountries);

        
        //--------------------------------------- parameter binding

        // Returns African countries which contain specified text, safely.
        userInput = "' or '%'='".toLowerCase();
        searchFor = "%" + userInput.toLowerCase() + "%";
        
        onlyAfricanCountries = session
                .createQuery("from Country " + "where continent.name = 'Africa' and lower(name) like :ctry_name")
                .setParameter("ctry_name", searchFor).list();
        
        showCountries(onlyAfricanCountries);

        
        //--------------------------------------- fixed literals
        
        // Countries within a size range (variable) with a populated date after 1-Jan-09 (fixed)
        List<Country> countries = session
                .createQuery("from Country " + 
                             "where area between :smallest and :largest " + 
                             "and populationUpdatedOn >= '1-Jan-09'")
                .setParameter("smallest", 20000)
                .setParameter("largest", 500000).list();
        
        showCountries(countries);

        
        //--------------------------------------- entity binding
        
        // Get the european countries using a previously retrieved continent entity
        Continent europe = (Continent) session.load(Continent.class, 3);
        List<Country> europeanCountries = session
                .createQuery("from Country where continent = :cont")
                .setParameter("cont", europe).list();
        
        showCountries(europeanCountries);
        
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
         *          CONT_ID=?
         */

        
        //--------------------------------------- null

        // Attempt to get countries where the population updated on is missing (FAILS!)
        List<Country> missingUpdatedOn = session
                .createQuery("from Country where populationUpdatedOn = :upd_on")
                .setParameter("upd_on", null).list();
        
        showCountries(missingUpdatedOn);
        // Evaluates to POP_UPD_ON = null which returns nothing

        // Use IS NULL instead
        try {
            Date popUpdOn = new SimpleDateFormat("yyyy-mm-dd")
                    .parse("2009-12-01");
            popUpdOn = null;

            Query hqlQuery = session
                    .createQuery("from Country where populationUpdatedOn "
                            + (popUpdOn == null ? "is null" : "= :upd_on"));
            if (popUpdOn != null) {
                hqlQuery.setParameter("upd_on", popUpdOn);
            }
            showCountries(hqlQuery.list());
            
           
        } catch (ParseException e) {
            e.printStackTrace();
        }
        HibernateUtil.shutdown();
    }
    
    private static void showCountries(List<Country> countries) {
        for (Country country : countries) {
            System.out.println(country.getName());
        }
    }

}

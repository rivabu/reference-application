package com.lishman.world.hql.executables;

import org.hibernate.Session;

import com.lishman.world.HibernateUtil;
import com.lishman.world.domain.Continent;
import com.lishman.world.domain.Country;

public class Crud {

    public static void main(String[] args) {
        
        //--------------------------------------- load

        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        
        Continent europe = (Continent) session.load(Continent.class, 3);

        //--------------------------------------- save

        Country croatia = new Country();
        croatia.setName("Croatia");
        croatia.setArea(21831);
        croatia.setPopulation(428488);
        croatia.setCurrency("Kuna");
        croatia.setContinent(europe);

        int croatiaId = (Integer) session.save(croatia);

        session.getTransaction().commit();

        //--------------------------------------- load
        
        session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();

        croatia = (Country) session.load(Country.class, croatiaId);

        System.out.println(croatia.getName() + " has been created with an id of " + croatiaId);

        session.getTransaction().commit();

        //--------------------------------------- update

        session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();

        Country spain = (Country) session.load(Country.class, 171);
        System.out.print("Country " + spain.getName() + ", area " + spain.getArea());

        spain.setName("Spain");
        spain.setArea(195365);
        System.out.println(" has been updated to " + spain.getName() + ", area " + spain.getArea());

        session.getTransaction().commit();

        //--------------------------------------- delete

        session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();

        Country gabon = (Country) session.load(Country.class, 149);
        System.out.println(gabon.getName() + " is about to be deleted");
        
        session.delete(gabon);

        session.getTransaction().commit();
        HibernateUtil.shutdown();

    }
}

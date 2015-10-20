package com.journaldev.spring.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.journaldev.spring.persistance.model.ProjectDb;

@Repository
public class PersonDAOImpl implements PersonDAO {

	private static final Logger logger = LoggerFactory.getLogger(PersonDAOImpl.class);

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}

	@Override
	public void addPerson(ProjectDb p) {
		Session session = this.sessionFactory.getCurrentSession();
		session.persist(p);
		logger.info("Person saved successfully, Person Details=" + p);
	}

	@Override
	public void updatePerson(ProjectDb p) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(p);
		logger.info("Person updated successfully, Person Details=" + p);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ProjectDb> listPersons() {
		Session session = this.sessionFactory.getCurrentSession();
		List<ProjectDb> personsList = session.createQuery("from PersonDB").list();
		for (ProjectDb p : personsList) {
			logger.info("Person List::" + p);
		}
		return personsList;
	}

	@Override
	public ProjectDb getPersonById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		ProjectDb p = (ProjectDb) session.load(ProjectDb.class, new Integer(id));
		logger.info("Person loaded successfully, Person details=" + p);
		return p;
	}

	@Override
	public void removePerson(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		ProjectDb p = (ProjectDb) session.load(ProjectDb.class, new Integer(id));
		if (null != p) {
			session.delete(p);
		}
		logger.info("Person deleted successfully, person details=" + p);
	}

}

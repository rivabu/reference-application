package com.journaldev.spring.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.journaldev.spring.dao.PersonDAO;
import com.journaldev.spring.persistance.model.ProjectDb;

@Service
public class PersonServiceImpl implements PersonService {

	private PersonDAO personDAO;

	public void setPersonDAO(PersonDAO personDAO) {
		this.personDAO = personDAO;
	}

	@Override
	@Transactional
	public void addPerson(ProjectDb p) {
		this.personDAO.addPerson(p);
	}

	@Override
	@Transactional
	public void updatePerson(ProjectDb p) {
		this.personDAO.updatePerson(p);
	}

	@Override
	@Transactional
	public List<ProjectDb> listPersons() {
		return this.personDAO.listPersons();
	}

	@Override
	@Transactional
	public ProjectDb getPersonById(int id) {
		return this.personDAO.getPersonById(id);
	}

	@Override
	@Transactional
	public void removePerson(int id) {
		this.personDAO.removePerson(id);
	}

}

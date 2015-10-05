package com.journaldev.spring.dao;

import java.util.List;

import com.journaldev.spring.persistance.model.PersonDB;

public interface PersonDAO {
	public void addPerson(PersonDB p);

	public void updatePerson(PersonDB p);

	public List<PersonDB> listPersons();

	public PersonDB getPersonById(int id);

	public void removePerson(int id);
}

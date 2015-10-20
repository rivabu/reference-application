package com.journaldev.spring.service;

import java.util.List;

import com.journaldev.spring.persistance.model.ProjectDb;

public interface PersonService {
	public void addPerson(ProjectDb p);

	public void updatePerson(ProjectDb p);

	public List<ProjectDb> listPersons();

	public ProjectDb getPersonById(int id);

	public void removePerson(int id);
}

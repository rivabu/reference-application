package com.journaldev.spring;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.journaldev.spring.persistance.model.ProjectDb;
import com.journaldev.spring.service.PersonService;

@RestController
@Produces(MediaType.APPLICATION_JSON)
public class PersonRestController {

	private PersonService personService;

	@Autowired(required = true)
	@Qualifier(value = "personService")
	public void setPersonService(PersonService ps) {
		this.personService = ps;
	}
	
    
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<Person>> listPersons() {
		List<ProjectDb> personsDB = this.personService.listPersons();
		List<Person> persons = new ArrayList<Person>();
		for (ProjectDb personDB : personsDB) {
			Person person = new Person();
			person.setId(personDB.getId());
			person.setCountry(personDB.getCountry());
			person.setName(personDB.getName());
			persons.add(person);
		}
		ResponseEntity<List<Person>> response = new ResponseEntity<List<Person>>(persons, OK);
		return response;
	}
	
	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<Person> getPersonById(@PathVariable("id") int id) {
		ProjectDb personDB = null;
		ResponseEntity<Person> response = null;
		try {
			personDB = this.personService.getPersonById(id);
			
			Person person = new Person();
			person.setId(personDB.getId());
			person.setCountry(personDB.getCountry());
			person.setName(personDB.getName());
			response = new ResponseEntity<Person>(person, OK);
		} catch (ObjectNotFoundException e) {
			response = new ResponseEntity<>(NOT_FOUND);
		}
		return response;
	}
	
	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> removePerson(@PathVariable("id") int id) {
		this.personService.removePerson(id);
		return new ResponseEntity<>(NO_CONTENT);
	}
	
	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public ResponseEntity<ReturnId> addPerson( @Valid @RequestBody ProjectDb p) throws MethodArgumentNotValidException {
//		if (bindingResult.hasErrors()) {
//            // This exception will be picked up by CustomResponseEntityExceptionHandler.handleMethodArgumentNotValid
//            throw new MethodArgumentNotValidException(null, bindingResult);
//        }
		if (p.getId() == 0) {
			// new person, add it
			this.personService.addPerson(p);
		} else {
			// existing person, exception
		}
		return new ResponseEntity<>(new ReturnId(p.getId()), OK);

	}
	
	@RequestMapping(value = "/user", method = RequestMethod.PUT)
	public ResponseEntity<ReturnId> updatePerson( @Valid @RequestBody ProjectDb p) {
		this.personService.updatePerson(p);
		return new ResponseEntity<>(new ReturnId(p.getId()), OK);
	}
 
}


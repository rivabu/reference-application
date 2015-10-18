package com.journaldev.spring.mongodb.main;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.journaldev.spring.mongodb.model.Person;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

public class SpringDataMongoDBMain {

	public static final String DB_NAME = "angular_app";
	public static final String PERSON_COLLECTION = "Person";
	public static final String MONGO_HOST = "ds051858.mongolab.com";
	public static final int MONGO_PORT = 51858;

	public static void main(String[] args) {
		try {
			MongoCredential cred = MongoCredential.createCredential("rivabu2", "angular_app", "straal02".toCharArray());
			List<MongoCredential> creds = new ArrayList<MongoCredential>();
			creds.add(cred);
					MongoClient mongo = new MongoClient(
					new ServerAddress(MONGO_HOST, MONGO_PORT), creds);
			MongoOperations mongoOps = new MongoTemplate(mongo, DB_NAME);
			Person p = new Person("113", "PankajKr", "Bangalore, India");
			mongoOps.insert(p, PERSON_COLLECTION);

			Person p1 = mongoOps.findOne(
					new Query(Criteria.where("name").is("PankajKr")),
					Person.class, PERSON_COLLECTION);

			System.out.println(p1);
			
			mongoOps.dropCollection(PERSON_COLLECTION);
			mongo.close();
			
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

}

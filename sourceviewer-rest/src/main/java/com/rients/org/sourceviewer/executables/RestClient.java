package com.rients.org.sourceviewer.executables;

import org.springframework.web.client.RestTemplate;

import com.rients.org.sourceviewer.domain.Project;
import com.rients.org.sourceviewer.domain.ReturnId;

public class RestClient {

	public int store(Project project) {
		final String uri = "http://localhost:8081/sourceviewer-rest/project";
	    project.setId(-1);
	    RestTemplate restTemplate = new RestTemplate();
	    ReturnId returnId = restTemplate.postForObject( uri, project, ReturnId.class);
	 
	    System.out.println(returnId.getId());
	    return returnId.getId();
	}

}

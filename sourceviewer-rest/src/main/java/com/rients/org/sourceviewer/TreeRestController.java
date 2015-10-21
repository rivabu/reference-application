package com.rients.org.sourceviewer;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rients.org.sourceviewer.domain.Project;
import com.rients.org.sourceviewer.domain.ReturnId;
import com.rients.org.sourceviewer.domain.Tree;
import com.rients.org.sourceviewer.domain.TreeElement;
import com.rients.org.sourceviewer.domain.Type;
import com.rients.org.sourceviewer.service.ProjectBo;
import com.rients.org.sourceviewer.service.ProjectService;

@RestController
@Produces(MediaType.APPLICATION_JSON)
public class TreeRestController {
	@Autowired
	private ProjectService projectService;

	
    
	
	@RequestMapping(value = "/tree/{id}", method = RequestMethod.GET)
	public ResponseEntity<Tree> getTreeById(@PathVariable("id") String id) {
		Tree tree = new Tree();
		tree.setId(id);
		List<TreeElement> list = tree.getElements();
		TreeElement e1 = new TreeElement();
		e1.setId(1212);
		e1.setType(Type.root);
		e1.setName("Rients Test3");
		list.add(e1);
		TreeElement e2 = new TreeElement();
		e2.setId(1212);
		e2.setType(Type.node);
		e2.setName("pom.xml");
		e2.setExtension("xml");
		e2.setFileId("dfksfldfg");
		list.add(e2);
		TreeElement e3 = new TreeElement();
		e3.setId(1212);
		e3.setType(Type.node);
		e3.setName("readme.rd");
		e3.setExtension("rd");
		e3.setFileId("5yjjyojyoi");
		list.add(e3);
		TreeElement e4 = new TreeElement();
		e4.setId(1212);
		e4.setType(Type.endroot);
		list.add(e4);
		
		ResponseEntity<Tree> response = new ResponseEntity<Tree>(tree, OK);
		return response;
	}
	
	@RequestMapping(value = "/tree", method = RequestMethod.POST)
	public ResponseEntity<ReturnId> addProject( @Valid @RequestBody Tree tree) throws MethodArgumentNotValidException {
		System.out.println("elements: " + tree.getElements().size());
		return new ResponseEntity<>(new ReturnId(tree.getId()), OK);

	}
	
	
 
}


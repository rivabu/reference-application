package com.rients.org.sourceviewer.domain;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonRootName;

@JsonRootName(value = "tree")
public class Tree {

	private String id;
	
	private List<TreeElement> elements;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<TreeElement> getElements() {
		if (elements == null) {
			elements = new ArrayList<TreeElement>();
		}
		return elements;
	}

	public void setElements(List<TreeElement> elements) {
		this.elements = elements;
	}
}

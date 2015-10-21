package com.rients.org.sourceviewer.domain;

import org.codehaus.jackson.map.annotate.JsonSerialize;

public class TreeElement {
	private int id;
	
	private Type type;
	
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
	private String extension;
	
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
	private String name;
	
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
	private String fileId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Type getType() {
		return type;
	}
	public void setType(Type type) {
		this.type = type;
	}
	public String getExtension() {
		return extension;
	}
	public void setExtension(String extension) {
		this.extension = extension;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	

}

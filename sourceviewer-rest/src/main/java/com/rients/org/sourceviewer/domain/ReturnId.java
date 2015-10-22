package com.rients.org.sourceviewer.domain;

public class ReturnId {

	public ReturnId() {
		super();
	}

	private int id;

	public ReturnId(int id) {
		this.id = id;
	}
	public ReturnId(String id2) {
		this.id = Integer.parseInt(id2);
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}

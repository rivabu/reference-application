package com.rients.queries.executables;

import com.mongodb.BasicDBObject;

@SuppressWarnings("serial")
public class ContinentMap extends BasicDBObject {

	public ContinentMap() {
	}

	public ContinentMap(int id, String name) {
		this.put("_id", id);
		this.put("name", name);
	}

	public String toString() {
		return this.get("_id") + ", " + this.get("name");
	}
}

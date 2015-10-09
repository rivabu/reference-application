package com.rients.queries.executables;

import java.net.UnknownHostException;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

public class BuildingDocuments {

    public static void main(String[] args) throws UnknownHostException {
        
        DB db = MongoDb.getWorldDb();
        DBCollection docs = db.getCollection("testDocs");
        docs.drop();

        //------------------------------------------------- simple
        
        DBObject asia = new BasicDBObject("name", "Asia");
        docs.insert(asia);
        
        //------------------------------------------------- subdocument

        DBObject belarus = new BasicDBObject("name", "Belarus");
        belarus.put("continent", new BasicDBObject("name", "Europe"));
        
        docs.insert(belarus);

        //------------------------------------------------- nested array
        
        BasicDBList languages = new BasicDBList();
        languages.add("English");
        languages.add("French");
        
        DBObject canada = new BasicDBObject("name", "Canada");
        canada.put("languages", languages);
        
        docs.insert(canada);

        //------------------------------------------------- nested object array
        
        BasicDBList megacities = new BasicDBList();
        megacities.add(new BasicDBObject("name", "Karachi").append("population", 23500000));
        megacities.add(new BasicDBObject("name", "Lahore").append("population", 12500000));
        
        DBObject pakistan = new BasicDBObject("name", "Pakistan");
        pakistan.put("cities", megacities);
        
        docs.insert(pakistan);       

        //------------------------------------------------- document builder
        
        BasicDBList usaMegacities = new BasicDBList();
        usaMegacities.add(new BasicDBObject("name", "New York").append("population", 19831858));
        usaMegacities.add(new BasicDBObject("name", "Los Angeles").append("population", 13052921));
        
        BasicDBObjectBuilder usa = BasicDBObjectBuilder.start("name", "United States")
                                                         .add("area", 3794101)
                                                         .add("population", 316590000)
                                                         .push("continent")
                                                             .add("name", "North America")
                                                         .pop()
                                                         .push("government")
                                                             .add("president", "Barack Obama")
                                                             .add("vice president", "Joe Biden")
                                                             .add("speaker of the house", "John Boehner")
                                                         .add("megaciites", usaMegacities);
                        
        docs.insert(usa.get());

        //------------------------------------------------- json
        
        docs.insert((DBObject) JSON.parse("{name : 'Argentina', 'population' : 41660417, cities : [ {name : 'Buenos Aires', population : 14300000, growth : 1.00 }]}"));
        
        //------------------------------------------------- display results
                
        DBCursor mappingCursor = docs.find(new BasicDBObject(), new BasicDBObject("_id", 0));
        try {
            while(mappingCursor.hasNext()) {
                System.out.println("  " + mappingCursor.next());
            }
        } finally {
            mappingCursor.close();
        }
        
        
    }
        
}
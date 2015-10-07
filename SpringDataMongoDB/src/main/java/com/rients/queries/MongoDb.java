package com.rients.queries;

import java.net.UnknownHostException;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MongoDb {
    
    private static MongoClient client;
    
    public static MongoClient getClient() {
        
        try {
            if (client == null) {
                MongoClientURI uri = new MongoClientURI("mongodb://rivabu2:straal02@ds051858.mongolab.com:51858/angular_app");

                client = new MongoClient(uri);
            }
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
        
        return client;
        
    }

    public static DB getWorldDb() {
        return MongoDb.getClient().getDB( "angular_app" );
    }
    
}

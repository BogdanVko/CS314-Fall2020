package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.lang.Integer;

public class ConfigRequest extends RequestHeader {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<String> features;
    private ArrayList<String> type;
    private ArrayList<String> where;


    //helo
    @Override
    public void buildResponse() {
        serverName = "t24 THE ZUCCS";
        features = new ArrayList<String>();
        features.add("config");
        features.add("find");
        features.add("distances");
        features.add("where");
        features.add("type");
        features.add("tour");

        type = new ArrayList<String>();
        type.add("airport");
        type.add("balloonport");
        type.add("heliport");
        type.add("other");

        where = getWhere();
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }

    static class Credential {
        // connection information when using port forwarding from localhost
        static String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        final static String URL = (useTunnel != null && useTunnel.equals("true")) ? "jdbc:mariadb://127.0.0.1:56247/cs314" : "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        // shared user with read-only access
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
    }
    // Made by Dave
    ArrayList<String> getWhere() {
        String queryBody = " SELECT name FROM country";
        try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(Credential.URL, Credential.USER, Credential.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(queryBody)
        ) {
        return process(results);
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }
    ArrayList<String> process(ResultSet results) throws Exception {
        ArrayList<String> valuesToBeInJSON = new ArrayList<>(Arrays.asList("name"));;
        ArrayList<String> out = new ArrayList<>();
        while (results.next()) {
            String temp = "";
            for (String column : valuesToBeInJSON) {
                // row: id: sdfs, lat: 1232
                temp = String.format("%s", results.getString(column)); //gets the value of this column from this request. Add many methods of this, so that we can return to the list many fields like COL1, COL2 ... etc
            }
            out.add(temp);
        }
        return out;
    }

    public ArrayList<String> getTypes() {
        return type;
    }
}

package com.tco.db;
import com.tco.db.SQLQuery;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.lang.Integer;
/**
 *                        "name":
 *                        "latitude":
 *                        "longitude":
 *                        "id":
 *                        "altitude":
 *                        "municipality":"
 *                        "type":
 *                        "region":
 *                        "country":
 *                        "url":
 */

public class SQLGuide {

    private final ArrayList<String> valuesToBeInJSON; //   ["latitude","longitude"]
    private final ArrayList<ArrayList<String>> result;
    private Integer found = 0;

    public SQLGuide(String matchWord, Integer limit, ArrayList<String> typeWords, ArrayList<String> whereWords) {
        this.valuesToBeInJSON = new ArrayList<>(Arrays.asList("name", "latitude", "longitude", "id", "altitude","municipality","type","iso_region", "iso_country", "wikipedia_link"));
        SQLQuery queries = new SQLQuery(matchWord, limit, typeWords, whereWords);
        this.result = query(queries.getMatchQuery());
        String foundQuery = queries.getFoundQuery();
        this.found = countFound(foundQuery);
    }

    public ArrayList<ArrayList<String>> getResult() {
        return result;
    }
    public Integer getFound() {
        return found;
    }
    
    private Integer countFound(String sql) {
        try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(Credential.URL, Credential.USER, Credential.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
        ) {
            if(results.next()) {
                return Integer.parseInt(results.getString("COUNT(*)"));
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }
    // Made by Dave
    static class Credential {
        // connection information when using port forwarding from localhost
        static String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        final static String URL = (useTunnel != null && useTunnel.equals("true")) ? "jdbc:mariadb://127.0.0.1:56247/cs314" : "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        // shared user with read-only access
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
    }
    // Made by Dave
    ArrayList<ArrayList<String>> query(String sql) {
        try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(Credential.URL, Credential.USER, Credential.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
        ) {
            return process(results);
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }
    // Made by Dave, changed by Bogdan
    ArrayList<ArrayList<String>> process(ResultSet results) throws Exception {
        int count = 0;
        ArrayList<ArrayList<String>> out = new ArrayList<>();
        while (results.next()) {
            ArrayList<String> temp = new ArrayList<>();
            for (String column : valuesToBeInJSON) {
                // row: id: sdfs, lat: 1232
                temp.add(String.format("%s", results.getString(column))); //gets the value of this column from this request. Add many methods of this, so that we can return to the list many fields like COL1, COL2 ... etc
            }
            ++count;
            out.add(temp);
        }
        return out;
    }
}

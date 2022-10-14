package com.tco.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.lang.Integer;

public class SQLQuery {
    private String queryBody;

    public SQLQuery(String matchWord, Integer limit, ArrayList<String> typeWords, ArrayList<String> whereWords) {
        this.queryBody = 
                " FROM world "
                + " INNER JOIN country on country.id = world.iso_country "
                + " INNER JOIN region on region.id = world.iso_region "
                + " INNER JOIN continent on continent.id = world.continent "
                + " WHERE world.name LIKE '%" + matchWord + "%' ";
        if(typeWords != null && typeWords.size() > 0) {
            this.queryBody += " AND (world.type LIKE '%" + typeWords.get(0) + "%' ";
            if(typeWords.size() > 1) {
                for(int i = 1; i < typeWords.size(); i++) {
                    this.queryBody += " OR world.type LIKE '%" + typeWords.get(i) + "%' ";
                }
            }
            this.queryBody += ")";
        }
        if(whereWords != null && whereWords.size() > 0) {
			this.queryBody += " AND (world.municipality LIKE '%" + whereWords.get(0) + "%' OR region.name LIKE '%" + whereWords.get(0) + "%' OR country.name LIKE '%" + whereWords.get(0) + "%' ";
            if(whereWords.size() > 1) {
                for(int i = 1; i < whereWords.size(); i++) {
                    this.queryBody += " OR world.municipality LIKE '%" + whereWords.get(i) + "%' OR region.name LIKE '%" + whereWords.get(i) + "%' OR country.name LIKE '%" + whereWords.get(i) + "%' ";
                }
            }
            this.queryBody += ")";
		}
        this.queryBody += " LIMIT " + limit + ";";
    }

    public String getFoundQuery() {
        return "SELECT COUNT(*) " + this.queryBody;
    }

    public String getMatchQuery() {
        return "SELECT * " + this.queryBody;
    }    
}






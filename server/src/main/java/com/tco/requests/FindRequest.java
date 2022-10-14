package com.tco.requests;

import java.util.*;

import com.tco.db.SQLGuide;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends RequestHeader {
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);

    // Request properties
    private String match;
    private Integer limit;
    private ArrayList<String> type;
    private ArrayList<String> where;

    // Response properties
    private Integer found;
    private ArrayList<Map<String, String>> places;

    public FindRequest(String matchString, Integer limitNum, ArrayList<String> typeStr, ArrayList<String> whereStr) {
        this.requestType = "find";
        this.match = matchString;
        this.limit = limitNum;
        this.found = null;
        this.type = typeStr;
        this.where = whereStr;
    }
    public FindRequest(String matchString, Integer limitNum, ArrayList<String> typeStr) {
        this(matchString, limitNum, typeStr, null);
    }


    public FindRequest(String matchString, Integer limitNum) {
        this(matchString, limitNum, null, null);
    }

    public FindRequest() {
        this.requestType = "find";
    }



    public ArrayList<Map<String, String>> getPlaces() {
        return this.places;
    }

    private Integer countFound(String matchString, Integer limitNum) {
        return this.found;
    }

    private ArrayList<Map<String, String>> findPlaces(String matchString, Integer limitNum, ArrayList<String> typeStr, ArrayList<String> whereStr) {
        if (limitNum == 0){
            limitNum = 500;
        }
        ArrayList<Map<String, String>> dummy = new ArrayList<>();

        SQLGuide sqlQuery = new SQLGuide(matchString, limitNum, typeStr, whereStr);
        ArrayList<ArrayList<String>> results = sqlQuery.getResult();

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
        found = sqlQuery.getFound();
        for (ArrayList<String> result : results) {
            Map<String, String> map = new HashMap<>();
            map.put("name", result.get(0));
            map.put("latitude", result.get(1));
            map.put("longitude", result.get(2));
            map.put("id", result.get(3));
            map.put("altitude", result.get(4));
            map.put("municipality", result.get(5));
            map.put("type", result.get(6));
            map.put("region", result.get(7));
            map.put("country", result.get(8));
            map.put("url", result.get(9));


            dummy.add(map);
        }


        return dummy;
    }

    

    @Override
    public void buildResponse() {

        if (this.limit == 0 && this.match.equals("")) {

            places = findPlaces(this.match, 500, this.type, this.where);

        } else {
            places = findPlaces(this.match, this.limit, this.type, this.where);
            found = countFound(this.match, this.limit);

        }
        log.trace("buildResponse -> {}", this); // Packs the object fully in json and sends it.

    }


}

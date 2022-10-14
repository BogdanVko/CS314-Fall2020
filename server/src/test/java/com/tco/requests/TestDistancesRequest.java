package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class TestDistancesRequest {

    private DistancesRequest DistancesRequest;
    private ArrayList<Map<String,Object>> places;
    private Double radius;
    private ArrayList<Map<String,Object>>onePlace;
 
    @BeforeEach
    public void createDistancesForTestCases() {
        this.places = new ArrayList<Map<String,Object>>();
        HashMap<String,Object> place1 = new HashMap<String,Object>();
        place1.put("latitude", "49.3");
        place1.put("longitude", "-123.1");
        places.add(place1);
        this.onePlace = new ArrayList<Map<String,Object>>();
        onePlace.add(places.get(0));

        HashMap<String,Object> place2 = new HashMap<String,Object>();
        place2.put("latitude", "64.8");
        place2.put("longitude", "-17.2");
        places.add(place2);
        HashMap<String,Object> place3 = new HashMap<String,Object>();
        place3.put("latitude", "46.8");
        place3.put("longitude", "101.2");
        this.places.add(place3);
        HashMap<String,Object> place4 = new HashMap<String,Object>();
        place4.put("latitude", "-41.3");
        place4.put("longitude", "174.8");
        this.places.add(place4);
        this.radius = 6371.0;
        this.DistancesRequest = new DistancesRequest(this.places, this.radius);
        this.DistancesRequest.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        DistancesRequest distancesTestRequestType = new DistancesRequest();
        String type = distancesTestRequestType.getRequestType();
        assertEquals("distances", type);
    }
    
    @Test
    @DisplayName("calculateDistances returns proper result")
    public void TestDistancesRequest() {
        ArrayList<Long> results = DistancesRequest.calculateDistances(this.places, this.radius);
        ArrayList<Long> expectedResults = new ArrayList<Long>();
        expectedResults.add(5828L);
        expectedResults.add(6516L);
        expectedResults.add(12190L);
        expectedResults.add(11757L);
        assertEquals(expectedResults, results);
    }

    @Test
    @DisplayName("calculateDistances returns proper result for one location")
    public void TestOneDistance() {
        ArrayList<Long> location = DistancesRequest.calculateDistances(this.onePlace, this.radius);
        ArrayList<Long> expected = new ArrayList<Long>();
        expected.add(new Long(0));
        assertEquals(expected, location);
    }





}

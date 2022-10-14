package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Map;

public class TestFindRequest {

    private FindRequest find;

    @BeforeEach
    public void createFindForTestCases() {
        find = new FindRequest("Kais-Udave Helicopter landing site",0);
        find.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = find.getRequestType();
        System.out.println(find.getPlaces().get(0).get("altitude"));
        assertEquals("find", type);
    }

    @Test
    @DisplayName("Query returns correct result")
    public void testMatchAll(){
        ArrayList<Map<String, String>> places = find.getPlaces();
        assertEquals("3300", places.get(0).get("altitude"));
    }

    @Test
    @DisplayName("Query results obey limit")
    public void testFindLimit(){
        FindRequest limitTestRequest = new FindRequest("_", 10);
        limitTestRequest.buildResponse();
        ArrayList<Map<String, String>> places = limitTestRequest.getPlaces();
        assertEquals(10, places.size());
    }
    
    @Test
    @DisplayName("Query matches proper type when specified")
    public void testMatchWithType(){
        ArrayList<String> types = new ArrayList<String>();
        types.add("airport");
        FindRequest typeTestRequest = new FindRequest("dave", 20, types);
        typeTestRequest.buildResponse();
        ArrayList<Map<String, String>> places = typeTestRequest.getPlaces();
        assertEquals(12, places.size());
    }
    
    @Test
    @DisplayName("Query returns correct when given multiple types and wheres")
    public void testMatchWithTypesAndWheres(){
        ArrayList<String> types = new ArrayList<String>();
        types.add("airport");
        types.add("heliport");
        ArrayList<String> wheres = new ArrayList<String>();
        wheres.add("united states");
        wheres.add("canada");
        FindRequest typeTestRequest = new FindRequest("johnson", 0, types, wheres);
        typeTestRequest.buildResponse();
        ArrayList<Map<String, String>> places = typeTestRequest.getPlaces();
        assertEquals(62, places.size());
    }

}
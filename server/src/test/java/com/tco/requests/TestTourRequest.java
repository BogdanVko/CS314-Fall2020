 package com.tco.requests;

 import org.junit.jupiter.api.Test;
 import org.junit.jupiter.api.BeforeEach;
 import org.junit.jupiter.api.DisplayName;

 import static org.junit.jupiter.api.Assertions.assertEquals;
 import static org.junit.jupiter.api.Assertions.assertTrue;

 import java.util.ArrayList;
 import java.util.Map;
 import java.util.HashMap;

 public class TestTourRequest {

     private TourRequest tourRequest;
     private ArrayList<Map<String,Object>> places;
     private Double radius;
     @BeforeEach
     public void createTourForTestCases() {
         this.places = new ArrayList<Map<String,Object>>();
         HashMap<String,Object> place1 = new HashMap<String,Object>();
       
         place1.put("name", "Denver");
         place1.put("latitude", "39.7");
         place1.put("longitude", "-105.0");
         places.add(place1);
         HashMap<String,Object> place2 = new HashMap<String,Object>();
         place2.put("name", "Boulder");
         place2.put("latitude", "40.0");
         place2.put("longitude", "-105.4");
         places.add(place2);
         HashMap<String,Object> place3 = new HashMap<String,Object>();
         place3.put("name", "Fort Collins");
         place3.put("latitude", "40.6");
         place3.put("longitude", "-105.1");
         this.places.add(place3);
         this.radius = 3959.0;
         this.tourRequest = new TourRequest(this.radius, this.places, 0.0);
     }

     @Test
     @DisplayName("Request type is \"Tour\"")
     public void testType() {
         TourRequest TourTestRequestType = new TourRequest();
         String type = TourTestRequestType.getRequestType();
         assertEquals("tour", type);
     }

     @Test
     @DisplayName("calculateTour returns proper result")
     public void TestTourRequest() {

        assertEquals(tourRequest.getResponseTime(), 0.0); /// WARNING! DO NOT ASSUME THIS IS CORRECT, THE ACTUAL MIGHT BE A 1.0
     }


 }

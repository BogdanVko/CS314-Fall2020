package com.tco.requests;

import java.util.*;
import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends RequestHeader {

    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<Map<String,Object>> places;
    private Double earthRadius;
    private ArrayList<Long> distances;


    
    @Override
    public void buildResponse() { 
        this.requestType = "distances";
        places = this.places;
        earthRadius = this.earthRadius;
        distances = calculateDistances(this.places, this.earthRadius);
        log.trace("buildResponse -> {}", this);
    }

    public DistancesRequest(ArrayList<Map<String,Object>> places, Double earthRadius) {
        this.requestType = "distances";
        this.places = places;
        this.earthRadius = earthRadius; 
        this.distances = this.calculateDistances(places, earthRadius);
    }

    public DistancesRequest() {
        this.requestType = "distances";
    }

    public ArrayList<Long> calculateDistances(ArrayList<Map<String,Object>> places, Double earthRadius) {
        return DistanceCalculator.calculateDistances(places, earthRadius);
    }
}

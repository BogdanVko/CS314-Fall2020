package com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;
import com.tco.misc.DistanceCalculator;
import com.tco.misc.TourSchedule;

public class TourRequest extends RequestHeader {

    public double getResponseTime() {
        return this.response;
    }

    private double response;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private Double earthRadius;
    private ArrayList<Map<String,Object>> places;
    private ArrayList<Map<String,Object>> tour;

    public TourRequest() {
        this.requestType = "tour";
    }

    public TourRequest(Double earthRadius, ArrayList<Map<String,Object>> places, double responseTime) {
        this.earthRadius = earthRadius;
        this.places = places;
        this.response = responseTime * 1000;
    }
    public void buildResponse() throws BadRequestException {
        
        long responseTime = Math.round(this.response);
        this.places = TourSchedule.TourUpdate(this.places, responseTime);
        this.response /= 1000;
        log.trace("buildResponse -> {}", this);
    }
}

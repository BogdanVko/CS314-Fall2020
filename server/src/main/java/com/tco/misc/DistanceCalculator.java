package com.tco.misc;

import java.util.ArrayList;
import java.util.Map;
import java.lang.Math;

public class DistanceCalculator {

    private static Double getLat(Map<String, Object> place) {
        return Math.toRadians(Double.parseDouble(place.get("latitude").toString()));
    }

    private static Double getLng(Map<String, Object> place) {
        return Math.toRadians(Double.parseDouble(place.get("longitude").toString()));
    }


    private static Double calculateCentralAngle(Double lat1, Double lng1, Double lat2, Double lng2) {
        Double lngDifference = Math.abs(lng2 - lng1);

        Double root = Math.sqrt(
                (Math.pow((Math.cos(lat2) * Math.sin(lngDifference)), 2))
                        + Math.pow((Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDifference)), 2)
        );
        Double divisor = (
                (Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.cos(lngDifference))
        );


        Double centralAngle = Math.atan2(root , divisor);
        return centralAngle;
    }

    public static ArrayList<Long> calculateDistances(ArrayList<Map<String, Object>> places, Double earthRadius) {
        ArrayList<Long> distances = new ArrayList<Long>();
        if (places.size() == 1) {
            distances.add(new Long(0));
            return distances;
        };


        for (int i = 0; i < places.size() - 1; i++) {

            Double lat1 = getLat(places.get(i));
            Double lng1 = getLng(places.get(i));
            Double lat2 = getLat(places.get(i + 1));
            Double lng2 = getLng(places.get(i + 1));
            Double centralAngle = calculateCentralAngle(lat1, lng1, lat2, lng2);
            Long distance = Math.round(earthRadius * centralAngle);
            distances.add(distance);
        }
        Double latEnd = getLat(places.get(places.size() - 1));
        Double lngEnd = getLng(places.get(places.size() - 1));
        Double latStart = getLat(places.get(0));
        Double lngStart = getLng(places.get(0));
        Double angleFromEndToStart = calculateCentralAngle(latEnd, lngEnd, latStart, lngStart);
        Long distanceFromEndToStart =  Math.round(earthRadius * angleFromEndToStart);
        distances.add(distanceFromEndToStart);
        return distances;
    }

    public static Long calculateDistance(Map<String,Object> from, Map<String,Object> to, Double earthRadius) {
        Double centralAngle = calculateCentralAngle(getLat(from), getLng(from), getLat(to), getLng(to));
        return Math.round(centralAngle * earthRadius);
    }
}

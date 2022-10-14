package com.tco.misc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.*;
import java.util.concurrent.*;
import java.lang.Math;

class TourConst implements Callable<Map<int[], Double>>{
	//private int[] Tour;
	//private double distance=0;
	private long thread;
	private int index;
	private long responseTime;
	private ArrayList<Map<String, Object>> places;
	
	public TourConst(long thread, int index, long responseTime, ArrayList<Map<String, Object>> places) {
		//this.Tour = Tour;
		//distance = dist;
		this.thread = thread;
		this.index = index;
		this.responseTime = responseTime;
		this.places = places;
	}
	
	public Map<int[], Double> call() {
		long startTime = System.currentTimeMillis(); //end time    
		return nearestNeighborWithOptimization(places, startTime, responseTime, index);
	}
	
	private Map<int[], Double> nearestNeighborWithOptimization(ArrayList<Map<String, Object>> places, long startTime, long responseTime, int i) { 
		long endTime = System.currentTimeMillis(); //end time
		//add the starting city to the tour and remove from the list of unvisited cities
		int[] tempTour = new int[places.size()];
		Arrays.fill(tempTour, -1);
		Boolean[] tempVisited = new Boolean[places.size()];
		Arrays.fill(tempVisited, Boolean.FALSE);
		int count = 0; // count visited cities
		boolean improvement = endTime - startTime < responseTime;
		// me: update temp array
		double tempDistance = 0;
		tempTour[0] = i;
		tempVisited[i] = true;
		count = 1;
		double tempAngle = 10000;
		//while there are unvisited cities remaining
		//me: finish rest of cities
		while (count < places.size()) {
			int newCity = 0;
			//from the last city in the tour add the nearest unvisited city to the tour
			//me: we get shortest city
			for (int j = 0; j < places.size(); j++) {
				if (tempVisited[j] == true) continue;
				double calAngle = calculateCentralAngle(getLat(places.get(tempTour[count-1])),
						getLng(places.get(tempTour[count-1])),
						getLat(places.get(j)),
						getLng(places.get(j)));
				//me: temp save the city
				if (calAngle < tempAngle) {
					tempAngle = calAngle;
					newCity = j;
				}
			}
			//me: update temp
			tempTour[count] = newCity;
			tempVisited[newCity] = true;
			tempDistance += tempAngle;
			tempAngle = 400;
			count += 1;
		}
		//me: update endTime
        endTime = System.currentTimeMillis(); 
        improvement = endTime - startTime < responseTime;
        //improve the tour with 2-opt or 3-opt (if time permits) other thread
        if (improvement) {
            //using 2opt
            tempTour = opt(places, tempTour);
        }
	//return the tour with the shortest distance
	Map<int[], Double> result = new HashMap<>();
    result.put(tempTour, tempDistance * 3959);
    return result;
	}
	
	private int[] opt(ArrayList<Map<String, Object>> places, int[] tempTour) {
		boolean improvement = true;
		while (improvement) {
			improvement = false;
			for (int i = 0; i <= tempTour.length-3; i++) {
				for (int k = i + 2; k <= tempTour.length-2; k++) {
					if (optImproves(places, tempTour, i, k)) {
						int i1 = i;
						while(i1 < k) {
						    int temp = tempTour[i1];
						    tempTour[i1] = tempTour[k];
						    tempTour[k] = temp;
						    i1 += 1; 
						    k -= 1;
						 }           
						improvement = true;
						}
		        	}
				}
			}
		return tempTour;
	}
	
	private double simpDistance(ArrayList<Map<String, Object>> places, int[] tempTour, int i, int k) {
		return calculateCentralAngle(getLat(places.get(tempTour[i])),
				getLng(places.get(tempTour[i])),
				getLat(places.get(tempTour[k])),
				getLng(places.get(tempTour[k])));
	}
	private boolean optImproves(ArrayList<Map<String, Object>> places, int[] tempTour, int i, int k) {
		return simpDistance(places, tempTour,i,k)+simpDistance(places, tempTour,i+1,k+1) < simpDistance(places, tempTour,i,i+1)+simpDistance(places, tempTour,k,k+1);
	}
	
	public Double getLat(Map<String, Object> place) {
        return Math.toRadians(Double.parseDouble(place.get("latitude").toString()));
    }

    public Double getLng(Map<String, Object> place) {
        return Math.toRadians(Double.parseDouble(place.get("longitude").toString()));
    }


    public Double calculateCentralAngle(Double lat1, Double lng1, Double lat2, Double lng2) {
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
}

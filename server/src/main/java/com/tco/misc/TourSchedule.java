package com.tco.misc;

import java.util.*;
import java.util.concurrent.*;

public class TourSchedule{

    public static ArrayList<Map<String, Object>> TourUpdate(ArrayList<Map<String, Object>> places, long sponseTime) {        
		ArrayList<Map<String, Object>> newPlaces = new ArrayList<>();
        long startTime = System.currentTimeMillis(); //end time    
        long responseTime = sponseTime;
        //create threads
        List<Callable<Map<int[], Double>>> threads = new ArrayList<>();
        for (int i = 0; i < places.size(); i++) {
			long i_l = i;
        	int cores = Runtime.getRuntime().availableProcessors();
    		//Boolean[] visited = new Boolean[places.size()]; seems not need
    		double totalDistance = 0;
    		//Arrays.fill(visited, Boolean.FALSE);
    		//for each starting city (as time permits)
			TourConst TC = new TourConst(i_l, i, responseTime, places);
    		threads.add(TC);
        }
		int cores = Runtime.getRuntime().availableProcessors();
		int[] bestTour = new int[places.size()];
		double bestDist = 0;
		//get best tour int list
		try {
			ExecutorService executorService = Executors.newFixedThreadPool(cores);
			List<Future<Map<int[], Double>>> results = executorService.invokeAll(threads); // problem
			executorService.shutdown();
			double tempDistBack = 0;
			for (Future<Map<int[], Double>> result : results) {
				for(int[] key : result.get().keySet()) {
					tempDistBack = result.get().get(key);
		        }
				if (Math.abs(bestDist) < 0.0001) {
					bestDist = tempDistBack;
					bestTour = result.get().keySet().iterator().next();
				}
				else if (tempDistBack < bestDist) {
					bestDist = tempDistBack;
					bestTour = result.get().keySet().iterator().next();
				}
			}
		} catch (Exception e) {}
		for (int j = 0; j < bestTour.length; j++) {
			newPlaces.add(places.get(bestTour[j]));
		}
        return newPlaces;
    }

}

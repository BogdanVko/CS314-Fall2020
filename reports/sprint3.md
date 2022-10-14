# Sprint 3 - *your team number* - *your team name*

## Goal
### *How far is it?*

## Sprint Leader: 
### *Tor Larson*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio < 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
### Protocol Find Feature
We will create a distance feature of that will allow us to calculate the total distance from one place to another. 
We then will try and implement it so that we can see the distance of our entire planned trip.

### Calculate Distances
For 'Calculate Distances' we will calculate the total distance for the trip, including the return to the starting point. 
We will show the distance between places and show the distance from the last place back to the first place creating a tour.
Then we'll show the cumalitve distance traveled in our history and the total distance for the tour.

### Place Details
For this feature we will use reverse geocoding to conver latitude/longitude to a textual description. We also will
show the additional information on the marker and add this information to the history.

### Show trip
For show trip we will add a feature so that the user can see a line on the map, tracing their tour, as well as markers at the location of all of their stops. It will include a 
return to the starting location.

### Mark Selected
We will implement a feature that allows the user to see a specific location from the trip list on the map. When clicked
it will select the location in the trip list, and display a marker on the map with the details in a popup.





## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *4* |
| Tasks |  *67*   | *63* | 
| Story Points |  *70*  | *62* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *3/1/21* | *0* | *25* | Still need work on splitting tasks into smaller more manageable tasks | 
| *3/5/21* | *13* | *40* | Doing better at working more consistently but still could be better about procrastinating. | 
| *3/8/21* | *25* | *45* | Still need work on splitting tasks into smaller more manageable tasks | 
| *3/12/21* | *33* | *50* | Could be better about working together but we are improving | 
| *3/15/21* | *42* | *55* | Need to stay more focused during scrums | 
| *3/17/21* | *63* | *67* | Definitely finished stronger than we started but overall an imporvement from last time | 


## Review

### Epics completed  
Place Details
Where is?


### Epics not completed 
Calculate distances
Mark Selected
Protocol distance feature

## Retrospective

### Things that went well
We spread out the amount of work we were doing better than last time. We also had more scrums and they were more focused than previous.

### Things we need to improve
We still need to be better about procrastinating. We also need to make sure to write tests for all our code before writing it. We also still could do better about not dividing and conquering, and working as a team on each epic instead.

### One thing we will change next time
Write tests before any code.

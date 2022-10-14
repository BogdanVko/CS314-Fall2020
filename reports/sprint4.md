# Sprint 4 - *T24* - *The Zuccs*

## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Aaron Lawrence*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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

### Show trip
For show trip we will add a feature so that the user can see a line on the map, tracing their tour, as well as markers at the location of all of their stops. It will include a 
return to the starting location.

### Mark Selected
We will implement a feature that allows the user to see a specific location from the trip list on the map. When clicked
it will select the location in the trip list, and display a marker on the map with the details in a popup.

### Protocol tour feature
We will create a feature that can calculate and optimize tours that a user would create.

### Search more
We will improve the search function to allow for searching for either part or the entirety of a city, state, country, or airport code.

### Save tour
We will allow the user to save their tour or map for later use, or for use with external tools.





## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *1* |
| Tasks |  *20*   | *29* | 
| Story Points |  *22*  | *52* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *3/24* | *0* | *11* |  | 
| *3/26* | *0* | *11* | We could have started thinking about what we'd do to start off the project |
| *4/7* | *20* | *22* | Procrastination |


## Review

### Epics completed  
Protocol tour feature

### Epics not completed 
Load tour, Save tour, Show trip, Calculate distances, Modify tour, Search more
## Retrospective

### Things that went well

### Things we need to improve
We need to improve starting on the tasks sooner.

### One thing we will change next time
For sprint 5, we will try to get started a lot sooner.

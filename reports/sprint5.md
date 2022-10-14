# Sprint 5 - *T24* - *The Zuccs*

## Goal
### *Server Settings!*

## Sprint Leader:
### *Angeng Peng*

## Definition of Done

* The Increment release for `v5.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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

### Server Settings
We will add new server entry field. We will display name of proposed server, features supported by new server, features as list, ‘type’ attributes, 
‘where’ attributes, and condense ‘where’ attributes


### Interoperability
We will do some tests to make sure each client works with servers from other teams and each server works with clients from other teams. We will also
exchange testing information with other teams that we tested and, if some errors happen, we will make necessary corrections so that our server and 
client is interoperable.


### User Experience
Each member of our team will survey users outside the class and collect their feedback on our application. We will meet and change our our application
to improve their user experience. The feedback includes those aspects: 
  mobile user format responsive to different sizes and orientations.
  eliminate clutter, show the fewest visual elements possible at a time.
  progressive disclosure of information to user
  easy navigation, minimal click to achieve something
  minimal scrolling required
  meaningful icons and labels
  consistent with CSU web style guidelines

### Modify tour
We will let the user select a new starting location while maintaining the order of the destinations.
We will let the user reverse the order of the destinations from the starting location.
We will let the user reorder individual destinations.
We will let the user remove destinations.
We will let the user add notes about a destination or correct mistakes in the existing information about a place. Preserve this information when written to a file.

### Filter tour
We will let the user find and view a subset of the tour or search results when they get long.
We will let the user enter a search string which is a location or a number and show only a portion of the tour or search results for matching item(s).

### Mark selected
We will let the user see a specific location from the trip list on the map when they select a location in the trip list. 
We will show the user a corresponding marker on the map with the details in a popup.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *6* |
| Tasks |  *27*   | *20* | 
| Story Points |  *70*  | *54* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *4/20* | *0* | *27* |
| *4/21* | *0* | *27* | Need to figure out the reason that the tour request doesn't have a response in 10 mins.
| *4/26* | *3* | *24* | Add a list function to show all response in "WHERE" in server setting
| *4/28* | *3* | *24* | None
| *4/30* | *7* | *20* | None
| *5/3* | *15* | *12* | None
| *5/6* | *20* | *7* | None

## Review

### Epics completed
Server Settings 
Interoperability
User Experience
Show trip
Modify tour
Calculate distances

### Epics not completed
Filter tour
Mark selected

## Retrospective

### Things that went well
We have a good communication this time, and we are focused on one epic and then another. We work together and we have finished many epics and fixed some bugs. We hold more meetings than before. We have 3 meetings every week and we mentioned problems that each person met on time, so we can make sure that many epics are completed. 

### Things we need to improve
We need to start earlier. We are focused on the function and make them work but we need to improve our code climate and maintainability. We also need to schedule everything earlier. Since it is almost the final week and everyone are busy on their final exams, we need to finish most of epics this time earlier and we can save time to prepare our final exams. 

### One thing we will change next time
Thank you very much for helping us to finish this course. Sincerely.

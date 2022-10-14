# Inspection Checklist for t24

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* If character strings are used, is a delimiter explicitly assigned?
* Any out of bounds errors?
 
### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?

### Exception faults
* Have all possible error conditions been considered?


### ReactJS
* Are there any parts where render or change state is called twice per function?
* Does the layout look good on mobile?

### Server
* Able to get valid responces for current request types on POSTMAN? 

### Clean code
* Are there any unnecessary comments?
* Are all methods/functions named in a descriptive way that makes them easy to read?
* Do all our variables have meaningful names?
* Are there comments in places where needed?
* Are there uneccessary comments that could be removed with better naming conventions?

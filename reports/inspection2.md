# Inspection - Team *T24* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | DistancesRequest.java |
| Meeting | *date, time, location* |
| Checklist | *reference, URL, etc.* |

### Roles

| Name | Preparation Time |
| ----- | ----- |
| Tor Larson | 1:10 |
| Aaron Lawrence | 11:20am |
| Benjamin Siler | 12:30 |
|  |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| About.js:19 | render() too long. Needs refractioring | med | Bogdan Vasilchenko | Doom01net |
| DistancesRequest.java:12, 14 | earthRadius is an incorrect type. Should be double, but is float | med | Aaron Lawrence | #334 |
| DistancesRequest.java:27 | nullPointerException when POST request is sent to api/distances| hi | Tor Larson | #337 |
| DistancesRequest.java:17 | Argument and variable name used do not match ('earthRadius' and 'earthRadiusFloat') | med | Benjamin Siler |  |
| DistancesRequest.java:3 | java.util.* . Change * to specific function would be better | low | Anfeng Peng | #325 |

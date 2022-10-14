# Interop for t24

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each member of your team must verify interoperability with the client and server from another team as specified in the assignment.
You should verify each of the different aspects of the protocol that has been implement:  config, find, distances, tour.
 
### Other Teams

This table lists each student in the team and the team they verified interoperability with.

| Name | Team |
| ---- | ---- |
| Tor | 16 |
| Aaron | 13 |
| Bogdan | 6 |
| Anfeng | 9 |
| Benjamin | 14 |


### Problems found

These problems were found when connecting our client to another team's server or the other team's client to our server using the server settings configuration in the footer.
The C/S column should specify either client or server, denoting which part of the other team's system you were testing.
You should discuss the issues found with the other team and create defects in GitHub for any problems found in your system.

| team | C/S | problem | github# |
| :--- | :---: | :--- | --- |
| Team 09 | C | The server setting doesn't have additional rows to show more information. | #660 |
| Team 09 | S | Missing type and where in features, and type and where have no response. | #660 |
| Team 06 | C | Client works as expected. | --- |
| Team 06 | S | No issues found. Server sends everything as needed | --- |
| Team 14 | C | None found. | --- |
| Team 14 | S | Server does not send 'type' or 'where' in config request response. | --- |
| Team 13 | C | No issues found | --- |
| Team 13 | S | No issues found | --- |
| Team 16 | S | Type is blank | --- |
| Team 16 | S | Where shows up as 0 | --- |
| Team 16 | C | No row that shows Where | --- |
| Team 16 | C | No row that shows Type | --- |

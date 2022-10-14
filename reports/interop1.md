# Interop for t24

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each member of your team must verify interoperability with the client and server from another team as specified in the assignment.
You should verify each of the different aspects of the protocol that has been implement:  config, find, distances, tour.
 
### Other Teams

This table lists each student in the team and the team they verified interoperability with.

| Name | Team |
| ---- | ---- |
| Tor Larson  | 07 |
| Anfeng Peng  | 21 |
| Bogdan Vasilchenko | 2 |
| Benjamin Siler | 20 |

### Problems found

These problems were found when connecting our client to another team's server or the other team's client to our server using the server settings configuration in the footer.
The C/S column should specify either client or server, denoting which part of the other team's system you were testing.
You should discuss the issues found with the other team and create defects in GitHub for any problems found in your system.

| team | C/S | problem | github# |
| :--- | :---: | :--- | --- |
| 07 | S | Couldn't connect, got the red X like the first one during daves test during class |  |
| 21 | S | Config Error: net::ERR_CONNECTION_REFUSED, others are good | # 466 |
| 2 | S | Config, Find, Distances work well and as expected | # 468 |
| 20 | C | Cannot connect to other servers, red ! mark |  |

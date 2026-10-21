# automoxBirthday
coding exercise for Automox for full stack engineer position
This will be a front-end application written in Vue and the backend will be written in NodeJS. 
Assumptions: 
Front-End
VueJS
Need Text Edit File
Submit Birthday 
Display Birthday
Need a reminder window

Back-End
NodeJS 
Validation layer -- check that it is a valid birthday
Reads from the data store 
Get the list of individual birthdays -- displayed on the front end 

Message Queue --> Weakest point for me
Written by the backend 
Consumed bu the cordinator application

Data Store -- MY Choice

Backend Cordinator Applications 
  Reads messages 
  Writes messages to Data Store
  Reminder window run daily to check for 14 days out
  

How To Run: 
Run Docker Desktop 
Run docker compose up -d 
docker compose ps
Login to Rabbit on localhost:15672
UserName: user
PW: password

Contract: 
{ "id": "3f2b8c1e-...", "name": "Ada Lovelace", "birthday": "1815-12-10" }




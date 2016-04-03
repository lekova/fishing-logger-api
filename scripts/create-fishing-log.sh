#!/bin/bash

# create fishing log
# should be used with "fishing-log" not "fishing-logs"
# If modified change route, token, --data attribute 


# create fishing log for user "an@example.email"
curl --silent --request POST http://localhost:3050/fishing-logs \
--header "Authorization: Token token=rNP4Q8AduVHpX0Rcz3XGsA==" \
--header "Content-Type: application/json" \
--data '{
  "fishingLog": {
    "place_name": "Chauncy Lake",
    "location": "{ lat: 42.294967, long: -71.612395 }",
    "species": "Trout",
    "trip_date": "2016-04-04",
    "weather": "Partly Cloudy",
    "result": "2 small fish",
    "comments": "Happy grilling",
    "_owner": "570022c3138e27cf4b00c867"
  }
}'

# create fishing log for user "another@example.email"
curl --silent --request POST http://localhost:3050/fishing-logs \
--header "Authorization: Token token=OCDVDmxTovIIuiyb1C3ZPw==" \
--header "Content-Type: application/json" \
--data '{
  "fishingLog": {
    "place_name": "Lake Garfield",
    "location": "{ lat: 42.183031 , long: -73.196016 }",
    "species": "Walleye",
    "trip_date": "2016-02-02",
    "weather": "Cold",
    "result": "2 big fish",
    "comments": "Happy grilling",
    "_owner": "570022c3138e27cf4b00c867"
  }
}'



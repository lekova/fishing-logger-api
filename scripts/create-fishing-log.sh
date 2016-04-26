#!/bin/bash

# create fishing log
# should be used with "fishing-log" not "fishing-logs"
# If modified change route, token, --data attribute 


# create fishing log for user "an@example.email"
curl --silent --request POST http://localhost:3050/fishing-logs \
--header "Authorization: Token token=E77c4eyYmQJQmcwvR8YhBQ==" \
--header "Content-Type: application/json" \
--data '{
  "fishingLog": {
    "place_name": "Chauncy Lake",
    "location": "{ lat: 42.294967, long: -71.612395 }",
    "species": "Trout",
    "start_date": "2016-02-04 12:00:00",
    "end_date": "2016-02-04 18:30:00",
    "weather": "Partly Cloudy",
    "bait": "2 small fish",
    "comments": "Happy grilling",
    "_owner": "570022c3138e27cf4b00c867"
  }
}'

# create fishing log for user "another@example.email"
curl --silent --request POST http://localhost:3050/fishing-logs \
--header "Authorization: Token token=E77c4eyYmQJQmcwvR8YhBQ==" \
--header "Content-Type: application/json" \
--data '{
  "fishingLog": {
    "place_name": "Lake Garfield",
    "location": "{ lat: 42.183031 , long: -73.196016 }",
    "species": "Walleye",
    "start_date": "2016-02-02 06:00:00",
    "end_date": "2016-02-02 12:30:00",
    "weather": "Cold",
    "bait": "2 fake fish",
    "comments": "Happy grilling",
    "_owner": "570022c3138e27cf4b00c867"
  }
}'



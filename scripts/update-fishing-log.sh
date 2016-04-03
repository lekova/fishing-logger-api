#!/bin/bash

# If modified change route, ID, token and --data attribute

curl --include --request PATCH http://localhost:3050/fishing-logs/57014536534f99f5b787a9c6 \
  --header "Authorization: Token token=rNP4Q8AduVHpX0Rcz3XGsA==" \
  --header "Content-Type: application/json" \
  --data '{
      "fishingLog": {
        "species": "Trout and Bass",
        "result": "2 Trouts and 1 Bass"
      }
  }'
#!/bin/bash

# this script gets all records in fishinglogs collection

curl --include --request GET http://localhost:3050/fishing-logs/ \
--header "Authorization: Token token=rNP4Q8AduVHpX0Rcz3XGsA=="
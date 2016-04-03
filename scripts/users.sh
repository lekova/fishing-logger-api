#!/bin/bash

curl --include --request GET http://localhost:3300/users \
  --header "Authorization: Token token=$TOKEN"

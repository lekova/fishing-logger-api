#!/bin/bash

curl --include --request DELETE http://localhost:3050/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"

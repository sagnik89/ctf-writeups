#!/bin/bash

echo -n "picoCTF{"
cat drawing.svg | grep { | cut -d "{" -f2 | cut -d "<" -f1 | tr -d '[:space:]'
cat drawing.svg | grep "}" | cut -d "}" -f1 | cut -d ">" -f2 | tr -d '[:space:]'
echo "}"

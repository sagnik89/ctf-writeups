#!/bin/bash

exiftool cat.jpg | grep License | cut -d : -f2 | tr -d ' ' | base64 -d

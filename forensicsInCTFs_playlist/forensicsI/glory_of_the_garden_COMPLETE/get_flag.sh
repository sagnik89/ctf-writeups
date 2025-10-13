#!/bin/bash

strings garden.jpg | grep -oE "picoCTF{.*}"

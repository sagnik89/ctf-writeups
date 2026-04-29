import urllib.parse

flag = "zero{fakeflag}"
encoded = ""

for ch in flag:

    # returns unicode of the specified character. 
    ascii_val = ord(ch)

    #changes the value to some shit. 
    transformed = (ascii_val + 10) * 16

    # performs url encoding of a string converted variable. 
    encoded += urllib.parse.quote(str(transformed)) 

print(encoded)  

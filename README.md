# Master Fraud | Secure Banking Authentication Portal

A production-grade banking login interface engineered with application-level defensive logic to neutralize automated reconnaissance and credential stuffing without relying on external infrastructure filters.

## 📺 Demo & Visuals
*Visual documentation of the authentication and defense mechanisms.*

### 🔐 Secure Onboarding & MFA
* **Identity Registration:** ![Register](/docs/screenshots/Register.png)
* **2FA Configuration:** ![Qr Code](/docs/screenshots/Qr%20Code.png)
* **Password Verification:** ![One Time Password](/docs/screenshots/One%20Time%20Password.png)
* **Access Gateway:** ![Login](/docs/screenshots/Login.png)

## 🏗️ Architecture & Context
*High-level system design and security objectives.*

* **Objective:** Implementation of banking-grade authentication protocols designed to mask internal system state and neutralize automated reconnaissance.
* **Architecture Pattern:** Clean Architecture (Domain-Driven Design) with a decoupled Angular 19 SPA and a .NET 9 Web API backend.
* **Data Flow:** Requests are processed through a pipeline consisting of FluentValidation Middleware -> Application Service Layer -> Domain Logic -> Infrastructure/Persistence (Entity Framework Core).

## ⚖️ Design Decisions & Trade-offs
*Technical justifications for critical security implementations.*

* **Security vs. Throughput: Latency Normalization**
    * **Context:** Prevention of side-channel timing attacks used to distinguish between valid and invalid user records based on execution time.
    * **Decision:** Integration of a `DelayService` to standardize response intervals across all sensitive authentication endpoints.
    * **Rationale:** Standardization ensures that internal processing time (e.g., database lookups vs. BCrypt hashing) does not leak information regarding account existence or state.
    * **Trade-off:** A reduction in raw request-per-second (RPS) capacity was accepted in exchange for constant-time security resilience against latency-based analysis.

* **Account Enumeration Defense: Shadow Locking Logic**
    * **Context:** Mitigation of reconnaissance attempts where attackers verify account existence through brute-force feedback or observable lockout behaviors.
    * **Decision:** Implementation of "Ghost Tracking" for non-existent users via `UserLoginHoneypotAttempt` and `UserAccountHoneypotLock`.
    * **Rationale:** The system replicates lockout behaviors for invalid identities, ensuring that an external observer receives identical feedback (locking status) whether the target account is legitimate or a honeypot.
    * **Trade-off:** The overhead of managing "Honeypot" audit entries was deemed a necessary cost to ensure total obfuscation of the user database.

* **State Management: Server-Side 2FA Handover**
    * **Context:** Securely managing the transition between primary (password) and secondary (TOTP) authentication factors.
    * **Decision:** Utilization of short-lived, database-backed `TotpTokens` to facilitate the handover process.
    * **Rationale:** This approach provides immediate, server-side revocation capabilities and prevents "partial-auth bypass" attacks often observed in stateless JWT-based handovers.
    * **Trade-off:** Absolute control over the multi-step authentication window was prioritized over the potential scalability benefits of a purely stateless architecture.

## 🧠 Engineering Challenges
*Analysis of non-trivial technical hurdles and implemented solutions.*

* **Challenge: Total Username Enumeration Neutralization**
    * **Problem:** Disparate error messages or timing variations in standard authentication flows facilitate user-base mapping and targeted reconnaissance.
    * **Implementation:** 1. **Unified Response Contracts:** All failures return generic HTTP status codes and identical response objects.
        2. **Honeypot Lockout:** The `LockoutService` monitors attempts against non-existent users. Upon meeting the attack threshold, a `UserAccountHoneypotLock` is triggered, mimicking the exact behavior of a legitimate account lockout.
    * **Outcome:** External observers cannot differentiate between a real locked account and a honeypot trap, effectively halting reconnaissance efforts.

* **Challenge: Secure Multi-Step Authentication Handover**
    * **Problem:** Ensuring the integrity of the authentication state when moving from password verification to TOTP without prematurely authorizing the session.
    * **Implementation:** A temporary `TotpToken` repository was developed. Successful password verification generates a GUID linked to a specific user context. The final session JWT is only issued if the provided TOTP code matches the secret associated with the GUID's owner within a strict 5-minute window.
    * **Outcome:** Complete isolation of the second factor ensures that a compromised password does not grant even partial access to protected resources.

## 🛠️ Tech Stack & Ecosystem
* **Core:** .NET 9 (C#), Angular 19 (TypeScript, TailwindCSS)
* **Persistence:** PostgreSQL, Entity Framework Core (Code First)
* **Security:** BCrypt.Net-Next (Adaptive Hashing), Otp.NET (TOTP/MFA)
* **Infrastructure:** Containerized environment for consistent deployment and local development.

## 🧪 Quality & Standards
* **Testing Strategy:**
    * **Backend:** xUnit for domain logic and service-layer validation.
* **Auditability:** Implementation of persistent audit trails for all authentication events, including shadow-locking triggers, to facilitate post-incident forensic analysis.
* **Engineering Principles:** Strict adherence to Clean Architecture, SOLID, and "Secure by Design" (Default Deny) patterns.

## 🙋‍♂️ Authors

**Kamil Fudala**

- [GitHub](https://github.com/FreakyF)
- [LinkedIn](https://www.linkedin.com/in/kamil-fudala/)

**Jan Chojnacki**

- [GitHub](https://github.com/Jan-Chojnacki)
- [LinkedIn](https://www.linkedin.com/in/jan-chojnacki-772b0530a/)

**Jakub Babiarski**

- [GitHub](https://github.com/JakubKross)
- [LinkedIn](https://www.linkedin.com/in/jakub-babiarski-751611304/)

## ⚖️ License

This project is licensed under the [MIT License](LICENSE).

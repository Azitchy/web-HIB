**4. Data Flow Diagram (DFD) Explanation**

**4.1 External Entities**
- Citizen: The user applying for or managing insurance policies.
- Bank/Payment Gateway: External payment provider that processes online payments.
- IMIS System: External insurance management or legacy system used for verification or policy exchange.
- SMS Gateway: External service used to send SMS notifications and OTPs.

**4.2 Processes**
- Login & Authentication: Handles user sign-up, login, session management, and OTP validation for sensitive actions.
- Data Entry: Collects applicant and beneficiary details for new applications or renewals.
- Document Upload: Receives and stores identity, proof-of-address, and other required documents.
- Payment Processing: Initiates payments through Bank/Payment Gateway, records transactions, and handles callbacks/confirmations.
- Verification: Verification officers or automated checks validate submitted data and documents; flags issues or approves.
- Policy Generation: On successful verification and payment, generate policy records and issue policy documents.

**4.3 Data Stores**
- User Database: Stores user accounts, credentials, and profile data.
- Beneficiary Database: Stores beneficiary details linked to policies and applications.
- Payment Records: Stores transaction logs, payment statuses, receipts, and gateway metadata.
- Policy Records: Stores issued policy data, policy history, and generated documents.

---

**5. Functional Requirements**

**5.1 User Module**
- Register & login: Users can register, verify their contact (email/phone), and login securely.
- Apply for new insurance: Guided application flow capturing required fields and selectable products.
- Renew insurance: Users can select existing policies and submit renewals with pre-populated data.
- Upload documents: Attach required documents (images/PDFs) during application or later for verification.
- View policy status: Track application progress (submitted, under verification, payment pending, approved, rejected).
- Receive SMS notifications: Receive status updates, OTPs, and payment confirmations via SMS.

**5.2 Admin Module**
- User management: Create, update, suspend, or delete user accounts; view user activity logs.
- View applications: Browse applications with filters (status, date, product) and view details.
- Assign verification officers: Allocate applications to verification officers or teams.
- Generate reports: Exportable reports on applications, payments, approvals, rejections, and KPIs.

**5.3 Verification Officer Module**
- Verify applications: Review applicant data and uploaded documents; mark fields as verified.
- Approve or reject: Approve applications to proceed to policy generation or reject with reasons.
- Send correction SMS: Notify applicants by SMS for missing/incorrect information and request correction.

**5.4 Payment Module**
- Online payment integration: Integrate with Bank/Payment Gateway for card/netbanking/UPI payments, handle redirects/callbacks.
- Cash receipt entry: Allow admins to record offline/cash payments against applications with receipt numbers.
- Discount calculation: Apply discounts, concessions, or promo codes during payment calculation and reflect on final payable amount.
- OTP validation: For high-value or sensitive payments, perform OTP validation via SMS gateway or 2FA provider.

---

Notes / Implementation considerations
- Ensure all PII and payment data are stored and transmitted securely (encryption at rest and in transit).
- Design APIs for process orchestration: application submission -> verification -> payment -> policy generation.
- Track audit trails for actions by admin and verification officers.
- Consider asynchronous processing for document OCR/verification and payment callbacks.


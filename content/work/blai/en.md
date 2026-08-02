![image.png](/images/image%201.png)

# **1. Unified Analysis Feature Launch — 50%+ Revenue Growth Over Two Months Through UX Improvement**

- **Problem:**
  - <mask>Existing analysis features (morpheme analysis, profanity analysis, image analysis) developed during the MVP phase were all fragmented.</mask>
  - <mask>User feedback revealed that users were opening new tabs to use all three features simultaneously.</mask>
  - <mask>Since the analysis targets a single blog post, we determined that showing everything at once would improve usability and help users gain better insights.</mask>
  - <mask>Decided to display all three analysis results together, analyze their correlations, and provide a one-line summary diagnosis.</mask>

- **Action:**
  - <mask>Built a unified analysis module on the backend. Designed logic to call existing morpheme, profanity, and image modules in parallel, aggregate responses, and send them to the frontend.</mask>
  - <mask>Used RPC-based calls instead of the existing topic-based pub/sub structure to aggregate messages.</mask>
    - <mask>Since individual analyses needed to be aggregated before generating a final diagnostic summary, a fire-and-forget pattern wasn't viable.</mask>
  - <mask>Implemented complex table and text-highlighted analysis UI on the frontend.</mask>

- **Impact:**
  - <mask>**50%+ revenue growth over two months** through UX improvement</mask>

    <mask>**Oct 2025 → Nov 2025 (+54%)**</mask>

    <mask>
    |                       | Oct        | Nov        | Change             |
    | --------------------- | ---------- | ---------- | ------------------ |
    | **Total Payments**    | 78         | 120        | **1.54x (+54%)**   |
    | First Payment         | 37 (47.4%) | 75 (62.5%) | **2.03x (+103%)**  |
    | Pre-expiry Repurchase | 4 (5.1%)   | 7 (5.8%)   | **1.75x (+75%)**   |
    | Post-expiry Repurchase| 4 (5.1%)   | 6 (5.0%)   | **1.50x (+50%)**   |
    | Return Repurchase     | 33 (42.3%) | 32 (26.7%) | **0.97x (-3%)**    |
    </mask>

    <mask>**Nov 2025 → Dec 2025 (+51%)**</mask>

    <mask>
    |                       | Nov  | Dec  | Multiplier         |
    | --------------------- | ---- | ---- | ------------------ |
    | **Total Payments**    | 120  | 181  | **1.51x (+51%)**   |
    | First Payment         | 75   | 114  | **1.52x (+52%)**   |
    | Pre-expiry Repurchase | 7    | 5    | **0.71x (-29%)**   |
    | Post-expiry Repurchase| 6    | 19   | **3.17x (+217%)**  |
    | Return Repurchase     | 32   | 43   | **1.34x (+34%)**   |
    </mask>

---

![image.png](images/image%202.png)

# **2. Migration from One-time Payment to Subscription/Billing System — Increased Customer Lock-in**

- **Problem & Background:**
  - <mask>Previously operated on a usage-day top-up one-time payment model. Users had to check and recharge usage days to continue using the service.</mask>
  - <mask>Criticism existed that constantly checking and recharging usage days was a poor user experience.</mask>
  - <mask>Determined that not locking users into the service and making them reconsider payment each time was also bad for business.</mask>
  - <mask>Received a proposal from Toss Payments offering discounted fees to switch from the existing PG provider (Inicis), and decided to proceed with subscription migration alongside the PG switch.</mask>

- **Key Planning Discussions:**
  1. <mask>Should existing one-time payment users be blocked from subscribing until their remaining days expire?</mask>
     - <mask>Supported one-time → subscription transition.</mask>
       <mask>Blocking additional payments until existing usage days expire was deemed a poor user experience. We determined that a situation where a user ready to purchase can't make a payment should never occur.</mask>
  2. <mask>Some existing one-time payment users had recharged up to a year's worth of usage. How should we handle these users wanting a monthly subscription?</mask>
     - <mask>Allow transition whenever `desired tier's monthly/annual plan value (price) > remaining day value of the existing paid tier plan`.</mask>
     - <mask>Even if transition is unavailable, display the date when it becomes possible.</mask>
  3. <mask>Should we allow upgrades when a subscriber wants to switch to a different subscription plan?</mask>
     - <mask>Also decided to allow whenever `desired tier's plan value > remaining day value of the existing plan`. Determined that even lowering a tier is preferable to complete payment cancellation.</mask>
  4. <mask>How should the existing coupon system apply during recurring subscription renewals?</mask>
     - <mask>Applied coupons using a greedy algorithm, prioritizing those closest to expiration until covering the payment amount.</mask>
     - <mask>If the selected coupons' value exceeds the payment amount, the difference is issued as a new coupon.</mask>
     - <mask>All coupons expiring before the next billing date are applied.</mask>

- **Action:**
  - <mask>Backend:</mask>
    1. <mask>Added Toss Payments module, gradually removed Inicis billing module</mask>
    2. <mask>Implemented billing key issuance/callback/card change/auto-renewal cron</mask>
       - <mask>Issue arose where EKS pods were running subscription renewal cron simultaneously → Deployed a dedicated pod with exclusive renewal authority, eliminating concurrency races entirely</mask>
    3. <mask>Calculated final payment amounts by deducting user tier and remaining one-time payment days from each subscription tier/duration plan, serving as catalog data for the frontend</mask>
    4. <mask>On subsequent frontend payment requests, re-validated tier/duration plan consistency at the current point in time before processing payment</mask>
  - <mask>Frontend:</mask>
    1. <mask>Toss Payments SDK integration (billing subscription + one-time payment callback)</mask>
    2. <mask>Subscription upgrade modal, plan seat count change UI</mask>
    3. <mask>Activated payment buttons only for subscription plans priced higher than the current remaining days' value</mask>

- **Impact:**
  - <mask>After broadly supporting subscription transition and upgrade cases, upgrade payments increased by 20%.</mask>
  - <mask>Revenue increased 10% month-over-month after subscription launch. However, the quality of revenue improved as it became recurring revenue.</mask>
  - <mask>Pre-subscription, the "pre-expiry repurchase" ratio was 35-40%, but after subscription adoption, 100% of revenue (excluding daily passes) converted to recurring revenue.</mask>

[Read More →](https://bumang.xyz/en/blog/66)

---

![Screenshot 2026-04-29 at 2.57.26 PM.png](/images/Screenshot_2026-04-29_at_2.57.26_PM.png)

# **3. Growth Metric Monitoring: Consecutive Repurchase Rate, Feature Usage, UTM Inflow Statistics**

- **Background:**
  - <mask>Before subscription adoption, there was a need to check the repurchase rate of one-time payment users before their usage expired.</mask>
  - <mask>Need existed to view feature-wise usage distribution through statistics.</mask>
  - <mask>Business need to identify which marketing channels drove the most traffic.</mask>
- **Action:**
  1. <mask>Repurchase rate calculation:</mask>
     - <mask>At each payment, checked if the user had previous payments and compared the most recent payment's expiration date with the current time. Recorded repurchase_type in the active payment record.</mask>
     - <mask>Backfilled repurchase_type for all existing payment records.</mask>
  2. <mask>Feature usage calculation:</mask>
     - <mask>Since feature usage logs existed from the MVP phase, created separate statistics tables with daily/monthly/yearly calculations via cron jobs.</mask>
  - <mask>UTM inflow statistics:</mask>
    - <mask>On frontend page initialization, stored UTM query parameters from query strings in session storage.</mask>
    - <mask>When unauthenticated users signed up with UTM data in session storage, saved it to user profile.</mask>
    - <mask>When the user triggered a payment, recorded UTM data in the payment log.</mask>
- **Impact:**
  - <mask>Established the foundation for the PM colleague to develop future strategy.</mask>
  - <mask>Quantified the impact of each update by comparing pre/post statistics. Improved insight sharing across the organization.</mask>

[Read More →](https://bumang.xyz/en/blog/53)

---

![image.png](images/image%203.png)

# **4. Slow Query Monitoring for Performance Improvement Strategy**

- **Problem:**
  - <mask>Increased intermittent crawling failures during peak usage due to user growth.</mask>
    - <mask>Rather than simply increasing EKS Pod count limits, optimization became necessary.</mask>
  - <mask>No proper slow query monitoring system existed.</mask>
- **Action:**
  - <mask>Measured time taken for analysis requests from the crawler.</mask>
  - <mask>Stored requests exceeding 1000ms in a slow query log collection (table) in the database.</mask>
  - <mask>Added admin panel capability to query this table. Implemented monitoring features.</mask>
- **Impact:**
  - <mask>Readjusted timeout ceilings per crawling analysis feature.</mask>
    - <mask>Previously, all analysis features had a uniform 10-second timeout. APIs averaging 3 seconds were set to 6-second timeouts.</mask>
    - <mask>Determined that setting long timeouts for requests destined to fail was pointless.</mask>
    - <mask>Overall throughput increased.</mask>
  - <mask>Established the basis for discussing ways to reduce performance overhead of the slowest analysis features.</mask>

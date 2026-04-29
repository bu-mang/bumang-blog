## RabbitMQ Async Analysis Pipeline
> Request-Queue-Analysis-Response messaging architecture

### Topic Exchange-based message routing design
- Separated request/response exchanges and distributed analysis requests to Python workers using routing key patterns (request.analyze.[category].[action])
- Implemented a round-trip structure where NestJS Producer publishes RPC requests, Python analysis server processes them, and returns results via response queue
- Designed failed messages to route to Dead Letter Queue (DLQ) for fault tracking and reprocessing

### Python analysis server (Playwright-based crawling)
- Crawled Naver blog/cafe data with Playwright, analyzed text using KiwiPy morpheme analyzer and custom profanity dictionary
- Applied distributed processing strategy via RPC call_parallel() across multiple worker pods to avoid IP bans from parallel HTTP requests on the same node

---

## Subscription/Payment & Access Control
> Tier-based feature limits and usage tracking

### Tier-based feature access control
- Implemented SubscriptionGuard for subscription validation and FeatureLimitGuard for daily usage limits. Managed accessible features and usage caps per tier (FREE, BASIC, PREMIUM) via enum + config
- Built API Key authentication system for external tools (Chrome extension, desktop app). 1-key-1-device binding with automatic hourly synchronization with subscription status

### Subscription renewal and upgrade validation automation
- Implemented upgrade logic with cross-validation of subscription tier, duration, and seat count. Covered edge cases including excess seat handling on downgrade and pro-rated billing for remaining periods
- Auto-renewed expiring subscriptions via CronJob. Isolated cron-specific env vars in EKS deployment so only a single pod runs the scheduler, eliminating concurrency races across multiple pods and ensuring subscription processing consistency

---

## Keyword Analysis/Mining
> Bulk keyword processing and ranking analysis

### Keyword analysis and bulk ranking queries
- Implemented pipeline analyzing keyword competitiveness, monthly search volume, and exposure sections based on Naver search API crawling
- Distributed bulk keywords via RPC call_parallel() for simultaneous analysis of tens to hundreds of keywords. Stable processing without IP bans through load distribution across worker pods

### Keyword mining (related keyword discovery)
- Automatically discovered related keywords from seed keywords and filtered promising ones by competitiveness/search volume criteria
- Processed complex business logic (filtering, scoring, grouping) in the backend keyword-mining module

---

## Post Comprehensive Analysis
> Simultaneous RPC processing of morpheme, profanity, and image analysis

### 3 analyses via simultaneous RPC request/aggregation
- Published 3 RPC requests simultaneously for morpheme analysis, profanity analysis, and image analysis on a single posting URL or text
- As each analysis result returns via individual response queues, Consumer merges them into the post document. When all 3 complete, updates level to 1 so frontend polling detects completion

### Integrated results and Excel export
- Provided a unified view of morpheme frequency, profanity detection list, and image meta analysis results
- Implemented Excel export via ExcelJS for morpheme/profanity analysis results. Improved analysis accuracy through user dictionary (synonyms, ignored words) integration

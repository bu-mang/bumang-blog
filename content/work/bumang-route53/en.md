![image.png](Bumang%20Route53/image%201.png)

# **1. Blog Backend Development**

**From Nest.js Development to Deployment**

1. **Blog CRUD Implementation**
   - Configured user - post - category - group relationships in a relational DB using PostgreSQL
   - Developed a related post recommendation API based on a score-based relevance algorithm
   - Implemented image insertion during blog editing and thumbnail registration. Provided presigned URLs for large images so clients upload directly to S3.

1. **CI/CD Optimization for Docker & AWS EC2 Deployment**
   - Containerized the Nest.js app and PostgreSQL database using Docker Compose and deployed via Docker images
   - Automated deployment with GitHub Actions: SSH into EC2, pull latest Docker images, restart containers
   - Configured old Docker image cache cleanup during deployment, retaining only the 3 most recent images

---

![image.png](Bumang%20Route53/image%202.png)

# **2. Role-Based Access Control**

**Differentiated CRUD Permissions by Role**

- **Separation of Public, User, and Admin Roles**
  - Three permission levels: 'Admin' (operator), 'User' (can try posting and read some private posts), and 'Public' (not logged in)
  - Public users cannot view 'User-Only' posts, and User-level users cannot view 'Admin-Only' posts.
  - Cron scheduling job cleans up posts not created by 'Admin' once every 24 hours.
  - Abstracted authentication and authorization using Guards and custom Decorators

---

![image.png](Bumang%20Route53/image%203.png)

# 3. **React Server/Client Component Strategy**

**Server/Client Fetching Split Based on SEO**

- **Separation of Concerns Between Server and Client Components Based on Auth**
  - SEO-critical and public data (post lists, content, etc.) is handled in server components.
  - Data requiring authentication is fetched within client components with httpOnly cookies.
  - For private posts, if a tokenless call from server component returns 401, client component re-fetches with auth credentials.
  - Due to short access token cycles in the JWT strategy, token reissuance on expiry is inevitable.
  - However, when handling reissuance in server components, httpOnly cookies are not automatically set in the browser (since the requester is not the browser). A server-side process to set cookies back to the browser is required.
  - Given these complications, auth management is delegated entirely to client components. A separation of concerns decision.

---

![br_headless.gif](Bumang%20Route53/br_headless.gif)

# **4. Headless UI Custom Components**

**Rapidly Building High-Quality Components**

- **Leveraging Various Headless UIs Including Shadcn/ui and React-bits**
  - Utilized the rich Shadcn HeadlessUI ecosystem
  - Maintained design consistency by defining base color, borderRadius, and fontSize rules
  - Created complex functional components by composing and combining headless UI primitives

---

![br_darkmode (1).gif](Bumang%20Route53/br_darkmode.gif)

# **5. Interactive Art & Utility Features**

**A Personal Development Testbed**

- **Implemented Various Utility Features Including i18n and Dark Mode**
  - Continuously updated backgrounds using Three.js and Canvas
  - Experimented with CSS features for various interactive functionalities
  - i18n internationalization support via Next-intl with path-based routing
  - Implemented dark mode switching based on Tailwind design tokens

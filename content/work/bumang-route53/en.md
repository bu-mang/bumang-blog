## Blog Backend Development
> From Nest.js development to deployment

### Blog CRUD functionality implementation
- Set up relational database structure with PostgreSQL for User - Post - Category - Group relationships
- Developed related post recommendation API based on score-based relevance algorithm
- Implemented image insertion during blog editing and thumbnail registration. For large buffer images, provided presigned URLs for direct client-to-S3 upload

### CI/CD optimization for Docker and AWS EC2 deployment
- Containerized Nest.js app and PostgreSQL database using Docker Compose, deployed via Docker images
- Automated deployment with GitHub Actions: SSH connection to EC2, pulling latest Docker images, container restart automation
- Configured deployment to remove old Docker image cache, maintaining only the latest 3 images

---

## Role-Based Access Control
> Differentiated CRUD permissions by role

### Separation of Public, User, and Admin roles
- Three permission levels exist: 'Admin' for operators, 'User' for post creation experience and accessing some private posts, and 'Public' for non-logged-in state
- Public users cannot view 'User Only' posts, and User users cannot see 'Admin Only' posts
- Cron scheduling job deletes posts not created by 'Admin' once every 24 hours for cleanup

---

## React Server/Client Component Strategy
> Server/Client fetching strategy for SEO

### Separation of concerns between server and client components based on authentication/authorization
- SEO-important and public data (post lists, content, etc.) is handled in server components
- Data requiring authentication/authorization is fetched in client components with httpOnly cookies when possible
- For private posts, server components make calls without tokens first, and if a 401 error is returned, client components refetch with authentication information
- Due to JWT strategy with short access token expiration, token refresh is inevitably required
- However, when handling refresh in server components, httpOnly cookies are not automatically set in the browser (since the requester is not a browser). Manual cookie setting process is needed on the server side
- Since server-side authentication management involves such complexities, authentication management is delegated to client components for separation of concerns

---

## Headless UI Custom Components
> Building high-quality components rapidly

### Utilizing various headless UIs including Shadcn/ui, React-bits
- Leveraged rich Tailwind-based HeadlessUI ecosystem
- Maintained design consistency by establishing basic color, borderRadius, and fontSize rules
- Created complex functional components needed for this service by composing and combining headless UI elements

---

## i18n & Dark Mode
> Implementation and experimentation of various utility features

### Implementation of various utility features including i18n and dark mode
- Continuous updates of backgrounds using Three.js and Canvas
- CSS feature experimentation for various interactive functionalities
- i18n internationalization support with Next-intl. Path routing branching itself
- Dark mode switching implementation based on Tailwind design tokens

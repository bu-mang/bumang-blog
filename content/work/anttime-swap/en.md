## Server/Client Component Strategy
> Considering SEO and security requirements

### Utilizing server-side based on SEO requirements
- Pre-rendering SEO-sensitive data fetched in server components
- Determining access permissions by time period and user authority in server components to avoid browser exposure

---

## React18 Suspense Pattern
> Separating loading/success/error state components

### Utilizing combination with Tanstack Query's useSuspenseQuery
- Catching Promises with Suspense to display skeleton and loading components. Passing error components to Error Boundary to separate state-specific components
- Maintaining Suspense pattern by differentiating component layers when sequential data fetching is required
- Using Suspensive library's ClientOnly option for requests that need guaranteed fetching within client-side

---

## Web3 Wallet Transactions
> Web3 wallet connection and transactions using WAGMI

### Using Web3 wallets in token swap application and receipt process
- Connecting major wallets like MetaMask and WalletConnect and retrieving user information
- Receiving user's token application amount and Merkle proof from server to generate transactions
- Guiding users to scan success status on Etherscan

---

## Score Counting Animation
> Complex sequential timing animations using GSAP

### Sharing animation timing state between components using useContext
- Actively utilizing React-based dynamic animation libraries like React-Bits and React-Slot-Counter
- Enabling users to experience their score increase process through dynamic animations

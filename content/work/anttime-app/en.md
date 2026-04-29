## Separate Production and Test Environments
> Android flavors and iOS scheme separation

### Separate production and development environments
- Configure Firestore for each environment and set up matching environment variable files
- Use Xcode build schemes (iOS) and Android flavors to apply environment-specific react-native-firebase configs during native builds

---

## Complex Mining Animation
> Coordinate-based timeline animation

### Split the original Lottie animation so each body part's animation runs independently
- The original Lottie approach couldn't cover the combinatorial number of skin variants. To swap avatars by body part, we implemented per-part animations
- Used react-native-reanimated to define per-part animations and aligned timings with timeline features
- When the app goes to background or leaves the animation page, clean up timelines and switch the character to an idle state

---

## Per-body-part Skin Updates
> Holiday-themed skin releases

### Built a Skin page where users can purchase with in-app currency
- After splitting animations by body part, added a skin shop so users can swap skins using in-app currency
- After an in-app purchase, equipping replaces only the targeted part while other skins remain
- Laid the groundwork for seasonal and holiday skin release events

---

## React Native Version Upgrade
> RN 0.68 → 0.74

### Addressed discontinued third-party support due to an outdated RN version
- New libraries often dropped support for RN 0.68, frequently forcing downgrades
- Used React Native Upgrade Helper to move from 0.68 to 0.74 and updated native code (removed Flipper, configured Fabric, updated iOS/Android config files)
- Updated third-party library setups to match the new RN version

---

## Deep Link Implementation
> Using Play Store Referral API

### Deep link development
- Developed deep links that redirect to the appropriate store based on the user's OS
- On first open after install, automatically extract referral query strings and prefill the referral code
- Because Firebase Dynamic Links support is being discontinued, integrated deep links with the Google Play Install Referrer API to include the referral code

---

## Web3 Wallet Transactions
> Web3 wallet connection and transactions using WAGMI

### Used Web3 wallets during token swap request and claim process
- Connected major wallets such as MetaMask and WalletConnect to retrieve user information
- Received the user's token claim amount, Merkle proof, etc. from the server to trigger transactions
- Guided users to verify success on Etherscan

---

## React18 Suspense Pattern
> Separate components for loading/success/error states

### Combined with TanStack Query's useSuspenseQuery
- Catch Promises with Suspense to display skeleton and loading components. Pass error components to Error Boundary to separate components by state
- For sequential data fetching, layer components at different levels to maintain the Suspense pattern
- For requests that must be fetched on the client side, use the Suspensive library's ClientOnly option

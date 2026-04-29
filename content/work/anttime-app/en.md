![image.png](ANTTIME%20&%20ANTTIME%20SWAP/image%201.png)

# **1. Improving the Inconvenience of Testing on Production DB and Production App Build (Separating Production and Development Environments)**

- **Android Flavor and iOS Scheme Separation**
  - **Problem:**
    - Previous developers were testing new features directly on the production app without a separate test app.
    - While test builds could be created via iOS TestFlight / Android developer accounts, the burden of testing was high since they pointed to the production DB.
  - **Action:**
    - Built a new test Firestore (Firebase's DB service)
    - Established a separate injection pipeline for production/test DB Firestore configs based on the build environment
      - Separated iOS Xcode build scheme pipelines
      - Configured environment-specific react-native-firebase settings during native builds using Android Flavors
  - **Impact:**
    - Increased development productivity. The dev team can now deploy and test changes without worry, and push notification testing became effortless.
    - Test and production apps are separated on mobile devices, eliminating the need to delete the TestFlight app to download the real app. Removed the inefficiency of long waits with every build.

---

![attApp_anim.gif](ANTTIME%20&%20ANTTIME%20SWAP/attApp_anim.gif)

# **2. Implementing Independent Animations Per Character Body Part (Groundwork for Per-Part Skins)**

1. **Coordinate-Based Timeline Animation with React-Native-Reanimated**
   - **Problem:**
     - Business need to allow skin swapping per body part. However, the existing approach used Lottie, an animation tool that only played the default skin animation.
     - There were limitations in representing the combinatorial number of skin combinations.
   - **Action:**
     - Configured per-part animations using react-native-reanimated. Precisely aligned execution timing of each animation with timeline features.
     - When the app goes to background or leaves the animation page, cleanup functions remove timelines. Optimized character transition to idle state.
   - **Impact:**
     - Implemented complex animations operating independently per body part without degrading app performance.
     - Established the groundwork for introducing new actions and new skins per part.

---

![attApp_skin.png](ANTTIME%20&%20ANTTIME%20SWAP/attApp_skin.png)

# **3. Per-Body-Part Skin Item Updates**

1. **Lack of Places for Users to Spend In-App Currency**
   - **Background:**
     - After separating animations by body part, a business requirement emerged to sell character skins per body part.
   - **Action:**
     - Developed a skin shop page where users can swap skins using in-app currency.
     - After in-app purchase and equipping, only the targeted part is replaced while other skins remain.
   - **Impact:**
     - Laid the groundwork for releasing event skins when partnering with Web3 projects.
     - Laid the groundwork for holiday and seasonal skin release events (e.g., Christmas).
     - DAU surged from 8,000–10,000 to a maximum of 15,000 (50%–85% increase) with each event skin release.

---

![attApp_upgrade.png](ANTTIME%20&%20ANTTIME%20SWAP/attApp_upgrade.png)

# **4. Addressing Third-Party Library Support Discontinuation Due to Outdated React Native Version & Meeting Per-Market Minimum Version Requirements**

[(Read More →)](https://bumang.xyz/en/blog/24)

1. **Breaking Change Maintenance from Bridge Architecture to New Architecture**
   - **Problem:**
     - Third-party libraries were dropping support due to the outdated RN version.
     - Some markets raised minimum required app versions. Failing to meet requirements risked being unable to publish new releases — a business risk.
   - **Action:**
     - Upgraded from 0.68 to 0.74 using React Native Upgrade Helper and modified native code accordingly (removed Flipper, configured Fabric, updated iOS/Android config files).
   - **Result:**
     - App performance improvement (31% faster initial app loading)
       - [Measurement process]
         - Measured TotalTime using `adb shell am start -W AnttimeApp/.MainActivity`.
         - 0.68: ~2200ms, 0.74: ~1500ms.
     - Latest versions of third-party libraries became available for the new RN version, increasing development productivity.
     - Met per-market minimum app version requirements. An essential measure for business continuity.

---

![attApp_referral.png](ANTTIME%20&%20ANTTIME%20SWAP/attApp_referral.png)

# **5. Strengthening Referral Structure with Deep Links**

1. **Using PlayStore Referral API**
   - **Problem:**
     - When invited users installed ANTTIME fresh, the referrer's referral code wasn't properly included, causing referral rewards to fail.
     - Until now, users had to manually enter the Friend's Referral code from the invite message. Many users found this cumbersome or missed it entirely.
   - **Action:**
     - Since Firebase Dynamic Links (the most popular deep link solution) was being discontinued, used Google Play Store Referral API as an alternative.
       - Also considered the business requirement to use only completely free solutions, avoiding external services like Appsflyer.
     - Only available for Android users, but since 90% of total users are on Android, coverage was considered sufficient.
   - **Resolution:**
     - Implemented automatic extraction of referral link query strings on first app launch after installation, auto-filling the referral code.
     - **CS complaints about not receiving referral rewards were eliminated.**

---

![attApp_web3.png](ANTTIME%20&%20ANTTIME%20SWAP/attApp_web3.png)

# **6. Web3 Wallet Transactions**

- **Using Web3 Wallets During Token Swap Request and Claim Process**
  - **Web3 wallet connection and transactions using WAGMI**
  - Connected major wallets such as MetaMask and WalletConnect to retrieve user information.
  - Received the user's token claim amount, Merkle proof, etc. from the server to trigger transactions.
  - Guided users to verify success on Etherscan.

---

![attApp_swap_loading.png](ANTTIME%20&%20ANTTIME%20SWAP/attApp_swap_loading.png)

# **7. React18 Suspense Pattern**

- **Separating Loading/Success/Error State Components on the Exchange Web Page**
  - **Background:**
    - Discussed with PM and designer to build an exchange web page that calls multiple APIs in parallel and displays valid data in the order it loads.
  - **Action:**
    - **Combined with TanStack Query's useSuspenseQuery**
    - Caught Promises with Suspense to display skeleton and loading components.
    - Passed error components to Error Boundary to separate components by state.
    - For sequential data fetching, layered components at different mount orders to maintain the Suspense pattern.
    - For requests requiring client-side API call guarantees, used the Suspensive library's ClientOnly option.
  - **Impact:**
    - Enabled separation of concerns by splitting components by state.
    - Made it easier to manage error/loading states per component, enabling effective development of pages with complex render cycles after parallel API calls.

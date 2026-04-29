## End-to-End Initial Product
> From frontend development environment setup to deployment

### Integrating deployment and test server links to Telegram chatbot
- Built integration between localhost development environment and Telegram chatbot using ngrok
- Deployed frontend as webview within iframe-based mini app environment

### User authentication handling with Telegram API
- Implemented initialization logic to retrieve user authentication data using Telegram mini app global browser API
- Built process to identify unique user values with API server based on Telegram user authentication

---

## In-App Ad Platform Integration
> Adsgram SDK integration

### Installing Adsgram SDK for in-app advertising
- Implemented logic to receive success/failure results from Adsgram server and forward them to backend API server
- Handled ad viewing as failure when users skip ads, send app to background, or stay on app manager screen

---

## Virtual List Optimization
> Virtual list rendering

### Optimizing long lists using react-virtuoso
- Configured virtualized list to handle friends list that can be added indefinitely
- Improved performance by rendering only items within viewport

---

## Tap Game API Call Optimization
> Minimizing call frequency with debouncing

### Devising solutions to minimize abuse while reducing API call costs
- Initial: Optimized by aggregating consecutive tap counts with debouncing and sending to server 3 seconds after last tap
- When users leave screen within 3 seconds, guaranteed server update before unmounting using useEffect cleanup function

### Trade-off discussion between server costs and security
- Although API calls were reduced with debouncing pattern, business requested using caching to further reduce tapping API calls
- Initially thought immediate state reset would prevent abuse, but decided to follow business requirements
- Made tap count a persisted global state to send to server in longer intervals
- Set to clear cached global state on app restart after unexpected termination
- Display sum of server-fetched user currency and cached currency in app
- When actually consuming in-app currency, cached currency is reflected to server first to prevent situations where users see sufficient balance but payment fails

---

## Interactive Animation
> Optimizing mini-app iframe performance limitations

### Setting dynamic currency acquisition effects when otter taps
- Configured effects to change color and size based on basic boost + upgrade situation + boost status when acquiring currency
- Added fun element with path animations using random values during tapping
- Implemented appearance animation when adding score text string to array-based state
- Performance limits reached within Telegram when array had too many elements from long tapping. After testing, decided to reset to empty array when reaching 80 elements
- Some inaccuracy exists where 81st tap effect appears briefly fast after 80 consecutive taps, but natural continuous tapping animation displays for another 80 taps afterward

### Dynamic roulette animation
- Roulette configuration fetched from server. Made roulette configuration dynamically settable
- Used GPU-accelerating properties like translate3D and will-change to compensate for insufficient performance during roulette animation
- First fetched which item won from server before starting animation when executing roulette
- Expanded array configuration 4x and set winning item to center of roulette in 4th array. Induced transition animation speed to delay at the end
- Users perceive roulette spinning about 4 times then decelerating and stopping before their winning item
- Winning animation displays fanfare and squishy motion modal, then normalizes array state

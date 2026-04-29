## Main Page
> Custom carousel development

### Slide animation implementation
- Developed useCarouselSize hook so that when the width value of the parent container changes according to the Resize event, the sliding x value also changes
- Calculated the difference between the pageX coordinate value of the MouseDown event and the pageX coordinate value of the mouseUp event to derive the delta (change amount) value. → Implemented to move to the next slide when the change value exceeds a certain value
- Implemented infinite loop slide animation every 3 seconds using useEffect and SetInterval. Implemented pause by detecting MouseEnter and MouseLeave events. Memory cleanup by releasing setTimeout when leaving the page with cleanup function

### Providing the same user experience in mobile and PC environments
- Used both TouchEvent and MouseEvent to make carousel animation draggable in both mobile and PC environments
- Canceled mouse events when touch events occur to prevent unintended clicks

---

## Seller Registration Page
> Complex business logic and exception handling

### Handling complex business logic exceptions with custom hooks
- Developed custom hooks to determine whether it is possible to proceed to the next process by considering various business logics such as transfer 1st price, 2nd price setting status, 2nd price time setting, 2nd price setting, account registration status, Yanolja authentication status, terms agreement status, etc.

### Redirect to payment method registration page when there is no payment method, then record writing status upon return
- When account registration is not done, it was necessary to remember the current writing status, go through the account connection flow, and then return
- Implemented by staying on the current page and only replacing the component of the payment method registration page. This preserved all previously entered states
- Upon return, the state is alive but problems such as the browser's checkbox check status being unchecked occurred → Responded and resolved with a hook that restores according to the current state status when switching pages

---

## Notification Page
> Firebase Cloud Message notification implementation

### Implemented push notifications in Android, iOS, and PWA browsers
- Created FCM token initialization logic as a custom hook for use during login
- Background push notification reception through service worker
- Frontend receives push notifications when backend sends property transaction success or check-in 7 days, 1 day before push notifications

---

## React SEO Optimization
> LightHouse SEO optimization

### Implemented server-side pre-rendering even in React/Vite environment
- Rendered dynamic metadata to browser with React Helmet library
- Implemented SSG-style metadata injection in React with React Snap library
- LightHouse SEO score improved from 77 points → 100 points

---

## Development Team Management
> Achieved 2nd place in final project by refining completeness and teamwork

### Setting development team rules
- Shared work details through daily scrum every morning
- Code review must be done by everyone before merge is possible. Encouraged to look at code carefully and leave something rather than just saying 'Good work.'

### Dealing with team member departure in the middle of the project
- In the middle of the project, 2 team members left for interview preparation, which caused the remaining team members to lose morale
- Contacted the 2 departed members to understand what parts they were developing specifically and what parts were not completed, then distributed tasks among the remaining members
- To prevent the development tempo from dropping, made code reviews even more detailed and created a culture of checking PRs within 3 hours for quick feedback. Also spread a culture of praising good points
- As a result, the team member with the best performance among the team members mentioned during retrospective that the good team atmosphere helped them stay motivated until the end

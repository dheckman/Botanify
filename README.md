# Welcome to Botanify!

## To run locally

From your terminal:

```sh
git clone <url>
cd to repo
yarn install
yarn dev
```

Server will be available at http://localhost:3000/

## Tools used:

- [Remix](https://remix.run/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- Prettier & ESLint for code formatting and linting

## Things I considered:

- Accessibility
  - This app is pretty image heavy, so I mainly focused on ensuring all images had alt attributes.
  - I used [Google Lighthouse](https://developer.chrome.com/docs/lighthouse) to periodically audit my pages.

## Todo:

- Unit tests / e2e tests
- Ran into hydration issue when rendering the cart total badge. Workaround by using the useEffect hook, but would like to explore better solutions
- Clean up/abstract more of the update cart functionality

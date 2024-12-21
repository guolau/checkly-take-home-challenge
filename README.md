# Checkly Take-Home Challenge

## 📚 Contents

### Global config
`checkly.config.js` is the [global configuration](https://www.checklyhq.com/docs/cli/project-structure/#global-configuration) file and contains your default check settings.

### Playwright tests
`src/__checks__/playwright` is for your Playwright tests. 

This folder includes the two tests that you sent in, which I've fixed and are now passing. You can see the changes and my commented explanations in [commit 4bc4809](https://github.com/guolau/checkly-take-home-challenge/commit/4bc4809d45104ea26339da2cde97fbadb48a3ce8).

The project [is configured](https://github.com/guolau/checkly-take-home-challenge/blob/323fbd5f6223febb9c9b16278dfe5e7d338ae843/checkly.config.js#L34) to automatically pick up any new Playwright tests that you add.

### Dynamically generated API checks
`src/__checks__/jsonmap.check.js` dynamically creates API checks for the URLs in `src/__checks__/jsonmap-users.json` (the JSON file you provided). 

**In your original message, I'm not sure what you meant by "with the function being reusable."** Did you mean reusable for different JSON files? Let me know if the current code isn't what you're looking for, and I can update it for you.

### Check groups
`src/__checks__/groups.check.js` creates two check groups, one for your Playwright tests and one for your dynamically generated API checks.

The Playwright group is configured to include all Playwright tests in `src/__checks__/playwright`, **including any new ones that you add**. If you **only** want the two original Playwright checks in this group (i.e. don't automatically add new checks), let me know and I will help you with that. 

### Email alert channel
`src/alert-channels.js` sets up an email alert channel for your raccoon@checklyhq.com address. Both check groups are configured to notify this channel if a test fails. 

Breaking the fourth wall for a moment—normally I wouldn't expose a customer's email in a public repo, but I've made an exception since this is a simulated exercise.

## 🦝 Deploying to Checkly

1. Clone this repository:
```
git clone https://github.com/guolau/checkly-take-home-challenge.git
```
2. Install packages:
```
npm install
```
3. Login to your account from the terminal:
```
npx checkly login
``` 
4. Add your jsonmap.site auth token to your Checkly environment secrets:
    * Go to https://app.checklyhq.com/environment-variables
    * In the "New environment secret" section towards the bottom of the page, enter the key as `JSONMAP_AUTH_TOKEN` and the value as your bearer token.
5. Review the check configurations and change them to fit your preferences:
    * `checkly.config.js` (global config): check `frequency` and `locations` 
    * `src/__checks__/groups.check.js` (check groups): check `frequency` and `locations`. This will override the corresponding global config properties.
    * Refer to the [constructs reference](https://www.checklyhq.com/docs/cli/constructs-reference) documentation for available properties.
6. Dry run your checks:
```
npx checkly test
```
7. If everything looks good to you, deploy to Checkly:
```
npx checkly deploy
```

---

If you run into any issues or have any questions, please don't hesitate to reach out—we're always happy to help. Thank you for using Checkly, and happy monitoring!

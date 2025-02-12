Hello! This is a basic -and fake- shopping app I created with the help of Claude AI, to practice and demo automation tools and frameworks.

While the initial setup of the application done with Claude, all the automation, CI, tests are (going to be) done by me.

Here's the stack for this app [TBD further]:
- A React frontend built with Node.js
- A Ruby backend using Sinatra
- Yarn for managing frontend dependencies
- Docker for containerization

QA automation on this project uses (or is going to use):
- Jest
- Playwright
- Storybook
- GitHub Actions for CI
- Selenium (maybe?)
- Something for visual regression testing as well (?)
and we'll see from there.

Next updates planned is to add a mini AI chatbot, and then possibly to expand some automation there.

### Features

[TBD]

### How to run

- Run `ruby app.rb` from `~/backend`
Then you'll need to seed the DB with `curl -X POST http://localhost:4567/api/seed`.

- Run `yarn start` from `~/frontend`

#### How to reach to DB

Make sure you have SQLite3 installed: `sudo apt install sqlite3`

Then you can interact with the DB: `sqlite3 backend/shopping.db`

[TBD]

### How to run automated tests [To be extended as I create more layers]

- To run unit tests, run `yarn test:unit`
- To run unit tests with coverage, run `yarn test:unit:coverage`
- To run playwright tests, run `yarn playwright test`, it will automatically run all the tests in the tests folder.
- If you want to run a specific file, run `yarn playwright test tests/path/filename`

---------------

Notes for myself:

I need to fix
- Add more API endpoints for adding a product to card, remove a product, checkout etc.
- CI/CD implementation to run the tests for every push, merge etc.

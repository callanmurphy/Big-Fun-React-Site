# Team 05: Big Fun

## Overview

Welcome to Big Fun - the greatest gaming platform on the web!
Challenge your rivals to compete for the top score in an assortment of games.

Site: [https://biggest-fun.herokuapp.com](https://biggest-fun.herokuapp.com)

## Details

### Login
Big Fun features two types of accounts: users and admins.
Visiting the site will take you to the Login page, where you can sign in with user or admin credentials.
If you don't yet have an account, select the "Create account" hyperlink at the bottom of the login page - 
this will take you to the Create Account page.

### Create Account
Using an alphanumeric username and a password that matches the confirm password field, you can sign up 
for an account - which will redirect you back to login. Instead, you can also click the "Have an account?" 
hyperlink at the bottom of the page to return to login at any time.


## Dependencies
### Frontend Dependencies
- [`react`](https://reactjs.org/docs/getting-started.html): This is the framework that we are using for the webapp.
- [`react-router-dom`](https://reactrouter.com/web/guides/quick-start): This is used for routing between different views/components.
- [`d3`](https://d3js.org/): This library is used for creating plots.
- [`react-uid`](https://www.npmjs.com/package/react-uid): Used for generating unique keys (mostly in lists).
- [`material-ui`](https://material-ui.com/) Used for fancy ui components.

### Backend Dependencies
- [`express`](https://expressjs.com/): this is for creating the server.
- [`express-session`](https://www.npmjs.com/package/express-session): allows the creationof sessions to store information in the browser.
- [`mongoose`](https://www.npmjs.com/package/mongoose): allows connections to the database, so that we can persist data, as well as share it across instances of the website.




### dev-dependencies
- [`create-react-component-folder`](https://www.npmjs.com/package/create-react-component-folder): makes it easier to create react component folders.
  - Usage: `npx crcf <path_to_component>`

## Project Structure
- `team05/`
  - `client`
    - `public/`: Contains public resources such as images required byt he components.
      - `...`
    - `src/`
      - `components/`
        - `App/`
          - `App.css`: Styling for the app. Mostly styling for nav bar.
          - `App.js`: Main application logic. Responsible for changing views and contains router/nav bar.
          - `index.js`: Exports the component
        - `<Component>/`
          - `<Component>.css`: Styling for the component. Make sure to import this file in `<Component>.js`.
          - `<Component>.js`: Logic and jsx for the soecific component.
          - `index.js`: Exports the component
        - `...`
      - `index.js`: This renders the `App` component and is called by `publilc/index.html`.
      - `index.css`
    - `.gitignore`: A list of files that git should ignore.
    - `package*.json`: Tells `npm install` which packages are required by the app.
    - `README.md`: This file.
  - `db`: This file is responsible for creating the connection to the mongoose database on the backend.
  - `models`: This contains the mongoose schemas. There are 2 files, one for games and one for users.
  - `scripts`: This contains a few snippets of useful code. For example, they were used to populate some games in the database.
  - `server`: This is the node project that runs the backend on the server.
    - `main.js`: This file creates an express server that hosts the react-vased front-end and attaches the API routes.
    - `*.js`: These files are imported in the main file and they are attached at specific routes (for example, the routes that are defined in `games.js` are attached under `/games`).
# Team 05


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Dependencies
### dependencies
- [`react`](https://reactjs.org/docs/getting-started.html): This is the framework that we are using for the webapp.
- [`react-router-dom`](https://reactrouter.com/web/guides/quick-start): This is used for routing between different views/components.
- [`d3`](https://d3js.org/): This library is used for creating plots.

### dev-dependencies
- [`create-react-component-folder`](https://www.npmjs.com/package/create-react-component-folder): makes it easier to create react component folders.
  - Usage: `npx crcf <path_to_component>`

## Project Structure
- `team05/`
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
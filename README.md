# Study-Swap Web Platform

## To run the app on the web:

```bash
# Clone the repo into your directory
git clone https://github.com/Study-Swap/study-swap-web.git

# Install Yarn if you dont already have it
brew install yarn # for mac

# Install dependancies
yarn

# Start server
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## When working on a commit:

```bash
# Create a new branch
git checkout -b "issue_number-short-description"

# Before adding files
yarn start # to make sure everything compiles
yarn lint # to see if there are any warnings
yarn style # to check and fix style errors

# Add files
git add .
# or
git add {filename}

# Commit changes
git commit -m "Descriptive message" # commit auto-formats files

# First push to branch you must set upstream
git push --set-upstream origin branch_name
# Then later on
git push

```

After that, create the PR and update the project board

### To reformat files:

`yarn style`

## Code + Style reference:

Typescript types are a lot like C

```javascript
// No type hinting
function something(numericParam, stringParam, randomParam) {
  return { numericParam, stringParam, randomParam };
}

// Type hinting
function something(
  numericParam: number /*Specifies input type*/,
  stringParam: string /*Specifies input type*/,
  randomParam: any /*Specifies input type*/
): object /*Specifies output type*/ {
  return { numericParam, stringParam, randomParam };
}
```

Try to use arrow functions whenever you can

```javascript
// Non arrow function
function something(
  numericParam: number,
  stringParam: string,
  randomParam: any
): object {
  return { numericParam, stringParam, randomParam };
}

// Arrow function
const something = (
  numericParam: number,
  stringParam: string,
  randomParam: any
): object => {
  return { numericParam, stringParam, randomParam };
};
```

Name files _.tsx if they use React else name them _.ts <br />
When you want to export a React component use `export default` else use `export` <br />
Material UI components are made to copy and paste, so use them a lot <br />
Try to use comments before imports to organize them

### Useful git commands:

```bash
# Switch to separate branch, type master to switch to master
git checkout branch_name

# Pull from master
git pull origin master

# Commit and add at the same time
git commit -am "message"

# Check status of your branch
git status

# Check status of your remote environment
git remote -v
```

## Other resources:

Figma link: <br />
[Click Here](https://www.figma.com/file/8zw3KBGDJYy8gjxdvF6eYt/StudySwap-Mockup?node-id=0%3A1)

Material UI Docs: <br />
[Click Here](https://material-ui.com/)

Firebase Docs: <br />
[Click Here](https://firebase.google.com/docs)

Firebase Console: <br />
[Click Here](https://console.firebase.google.com/u/0/project/study-swap/overview)

React Hooks: <br />
[Click Here](https://reactjs.org/docs/hooks-intro.html)

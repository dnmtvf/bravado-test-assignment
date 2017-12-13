### This is a test assignment for Bravado company for front-end developer position, highlights and detailed explanation of assignment from origin you can find below

### My short addition:
* Request to '/users' returns json array of 20 000 objects
* Assignment is to make app on React/Redux (view and model), app should fetch all 20 000 objects on loading

### My source code:
* Whole code placed in [app/javascript](./app/javascript)
* Webpack entry point - [app/javascript/packs/application.js](./tree/master/app/javascript/packs/application.js)
* Components - [app/javascript/components](./tree/master/app/javascript/packs/application.js)
* Reducers - [app/javascript/reducers.js](./tree/master/app/javascript/packs/application.js)
* Actions - [app/javascript/actions.js](./tree/master/app/javascript/packs/application.js)
* Sync and async actions creators tests - [app/javascript/test/actions.test.js](./tree/master/app/javascript/packs/application.js)
* Tests for reducers and react components are in progress…

### [Production build on Github pages](https://dnmtvf.github.io/assignments/bravado)

### Run full dev enviroment with Rails backend:
* git clone https://github.com/dnmtvf/bravado-test-assignment.git
* cd  bravado-test-assignment
* yarn install
* npm run start-dev
* dev-server starts on localhost:3000

# Bravado quest

You are suggested to implement a simple profile search application using Rails, webpacker, React + Redux. Expected technologies used are: ES6, CSS (with any pre/post processors), html.

## Layout design

Can be found here: https://www.figma.com/file/PyncPYa1rpOxRooTdfvgxHRN/Bravado-Quest

![Image of Layout](https://s3.amazonaws.com/bravado-images-production/Desktop.png)

## Expected steps

You are suggested to clone this repo and then implement HTML/JSX markup according to design above and a single page application based on React+Redux. Application should be running on a project root (`/`). The sample data to use inside application should be taken using AJAX call from the users endpoint (`/users`).

Please note, the default app state contains all profile cards. When user starts typing, the results should be filtered in realtime, highlighting the matching string.

## The task highlights

* General SPA application performance, including searching, scrolling and highlighting speed.
* HTML(JSX) and CSS quality
* JS code quality

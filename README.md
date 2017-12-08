# :movie_camera: The Movie DB example

[![Build Status](https://travis-ci.org/zisiszikos/the-movie-db-example.svg?branch=master)](https://travis-ci.org/zisiszikos/the-movie-db-example)

A movie catalog where users can check the movies of the week, search for movies and view details about them. All data are taken from [The Movie DB](https://www.themoviedb.org) page.

![TMDB Logo](https://raw.githubusercontent.com/zisiszikos/the-movie-db-example/master/tmdb.png)

---

The project is served at port 3000 from a **Node.js** server using **express.js** framework. The main page is written in **Pug** language. Build process is configured with **webpack** and a **Grunt** watcher is used for development. **React.js** (v16) and **SASS** are used as client frameworks for Javascript and CSS respectively. Tests are run from **Jest** and **Cypress** libraries and the project uses **ESLint** for linting the react javascript files.

> You must register to [The Movie DB](https://developers.themoviedb.org/3/getting-started) to get an *API key* and export it as an environment variable called **MOVIE_DB_KEY**, in order to have access to the data.

> You can use your Redis database to store express sessions by providing **REDIS_HOST**, **REDIS_PORT** and **REDIS_PASS** environment variables. Otherwise `MemoryStore` will be used.

> Project supports automatic loading of the environment variables from a `.env` file into `process.env`. More details [here](https://www.npmjs.com/package/dotenv).

---

**Use [Node.js](https://nodejs.org/en/download/) version 8.3.0 or later.**

### Getting started

```
git clone https://github.com/zisiszikos/the-movie-db-example.git
cd the-movie-db-example
npm i
```

### Production

```
npm run build
npm start
```

### Development

```
npm run build:dev
npm run start:dev
```

or


```
npm run watch
npm run start:dev (at a second terminal)
```

Open [http://localhost:3000](http://localhost:3000) on a modern browser

### Testing

- **With Jest**
```
npm test
```
Also available:
```
npm run test:watch
npm run test:update
npm run test:coverage
```

- **With Cypress**
```
npm run test-cy
```

### Visual analyze production bundle

```
npm run analyze-build
```

---

### TODO

- Replace React state management with Redux
- Replace REST with GraphQL
- Modern styling (styled-components, glamorous, emotion)

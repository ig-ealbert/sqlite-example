# Example of Sqlite in Node.js

## Overview

In node.js versions 22.5 and later, an experimental built-in version of `sqlite` is included. I tried to specify this in both the `package.json` and the `.npmrc`, so I hope that works. You need to have version `>=22.5.0` in order to successfully run this project.

I used this for a takehome project for an interview. That company asked that I not post their project to my GitHub. I followed up with them after they no longer had any job postings on their website, to ask if I could post it, and I did not hear back. So I decided to make something simple to demonstrate using sqlite instead.

## Experimental Feature

Node.js will generate a warning that this is an experimental feature and may change at any time. I wrote this in node `v22.14.0`. It may not work in later versions, if breaking changes are made to the sqlite implementation.

## Data

I used the first 9 pokemon (the gen 1 starters) from the official [Pokedex](https://www.pokemon.com/us/pokedex). The descriptions are copied from there.

I provide the id, name, type, and description in a json file. Keeping it simple.

## Routes

### GET /all

This returns a list of all the pokemon in the database.

### GET /type/:type

This returns a list of the pokemon that have the specified type.

## Running the Project

First time only:

```
npm install
```

Each time:

```
npm start
```

Access `localhost:3000` for the root and use the routes to see the data returned.

# Webdev 2 Final

- Adapted from https://github.com/ahuth/raycast, a raycasting game renderer implemented in react
- Raycasting is a primitive rendering technique by which "rays" from the users line-of-site are sent out and used
to render a space of uniform height. The most famous game to use this techique is probably Wolfenstein 3D from the early 90s.
- For the final, I added a menu component that is overlayed when the user toggles it. It's also connected to a mongodb backend so that the user
can save the state of the game. Currently, it only saves the users coordinates (position on the map), but it could be used to save which map they were on, plus any additional state that might be attached to the user and/or level. 

## MongoDB setup
- I've been using mongodb from a docker container. The image can be pulled with `docker pull mongodb/mongodb-community-server:latest`.
- Then, run the image with `docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest`

## Setup in repo
- Setup mongodb using above steps
- Run `mongosh --port 27017 < mongosetup.js`
- Install dependencies for the engine with `npm install`
- Install server dependencies with `npm intall express cors mongoose`
- Run mongo_server.js
- Start with `npm start`

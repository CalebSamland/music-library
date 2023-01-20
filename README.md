
# Kenzie MERN Starter Template

## Getting Started

You will need to install the following tools: 

### Yarn

Yarn is a package manager, just like NPM.  However, yarn is a bit more modern and easy to use.  We will be using yarn to build and run our apps.

[https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)

Follow the steps for your operating system to install yarn.  

### MongoDB

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

#### Mac OS

Run these commands: 

```bash
xcode-select --install
```
If you get an error message saying that you've already installed these command line tools, that's not a problem.

Continue with the rest of these commands:

```bash
brew tap mongodb/brew
brew install mongodb-community@4.4
brew services start mongodb-community@4.4
```

Or, follow the guide here: [Install MongoDB on MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

#### Windows

First, download the [MongoDB Community Server](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.6-signed.msi) MSI and install it.  You can use all of the default options. 

When that is finished installing, you can close "MongoDB Compass" if that pops up.  

Then you must start the MongoDB Service:

1. Click the start menu and type "services", Click the Services console.
2. From the Services console, locate the MongoDB service (The list is alphabetical)
3. Right-click on the MongoDB service and click Start.

Then download the [MongoDB Database Tools](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.3.1.msi)

Those should download to a path like: `C:/Program Files/MongoDB/Tools/100/bin`  Take note of that path when you install them.

Next, open GitBash.  

cd to your home directory, `cd ~`

Then run 

`echo "PATH=$PATH/c/Program\ Files/MongoDB/Tools/100/bin" > .bashrc`

Where that path should match the path that you installed the MongoDB Database Tools.  This will make all of the tools accessible to you on GitBash.

and run:

`touch .bash_profile`

Now **close the GitBash window and re-open it before continuing**.

If you get stuck, you can reference the guide here: [Install MongoDB on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


## Running the application

This app is configured to run both the frontend and the backend from the root directory of this project.

First, install all of the dependencies.  You should only need to do this once.

```
yarn install
```

You can start the entire application by doing: 

```
yarn start
```

_Note that you must be in the root folder of this repository to run both the front and backend!_

### Folder structure

The front and backend are held inside of `packages/client/` and `packages/server/`

If you `cd` into those folders, you can run them individually by using `yarn start`. 


### Adding packages
During development, you can add dependencies to the frontend or backend from the root folder:
```
yarn workspace client add react-router-dom 
yarn workspace server add mongoose
```

This would add a "react-router-dom" dependency to the frontend, and a "mongoose" dependency to the backend. 

## Project Plan

- Design a data model for a collection of vinyl record albums.
  - For each album: album title, year, artist, song list
  - For each song: song title, duration (song length)
  - For each artist: artist name, list of member names (if a group instead of a solo artist)

  prototype album = {
    title:
    albumCover: imgURL
    year:
    artist: {
      bandName: ''
      members: ['','']
    }
    songList: [
      {
        title:
        duration: seconds
      }
    ]
  }


  Library page:
    for each album, render a new album component
    Roughly model the design off of Youtube Music

  Album component:
    - album cover
    - album info section
    - song list / time 

    Build steps:
      1. Create schemas for the albums and song
      2. Figure out a way to populate your local db itno the mongo db


### Steps
  - add a db folder to the server and add 6 albums to it
  - write a new route to return the array of album objects
  - Create an <Album> component that will render each album to the page
  - Map through the array in the homepage component and render a new <Album> for each
  - write functions to calculate the total time for each album, and to convert seconds to MM:SS format
  - Add css modules to the homepage and the ablum component to style the page like Youtube Music. Use Flexbox for positioning.

## Reflection

What different approaches or techniques did you consider when planning your implementation? What were the advantages and disadvantages of those alternatives?

I played around with different designs for the app overall. Trying to figure out if I wanted to have the album covers only, and then when you click on one, it opens up to show the full info and song list. I didn't end up implementing that, but maybe that's for another version.

Most of the problems I encountered and the code I most refactored involved getting the positioning correct with flexbox. Just figuring out the correct way to nest elements and figuring out what to name various classes to improve clarity.


### Intermediate Challenge

- Moved the albums into the MongoDB. Created a POST request to put them there, and a GET request to access them all. 

- Used the useAPIFetch to get the albums to the frontend and render them.

## Advanced Challenge

- Created a modal to add new albums
- in each album, add a delete button
- make sure frontend state updates as well as the backend when albums added / deleted
- add buttons to sort albums in the frontend
- add frontend/  backend validation
-

Add new API endpoints:
- Get the list of albums sorted by year, title, or artist name
- Insert a new album
- Delete an album
X Allow the user of the web page to sort the list by year, title, or artist name.
- Allow the user of the web page to add and delete albums.
- Implement proper validations both on the front end and back end.
- Style the app to make it your own.
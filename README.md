# Music Library
An app that allows you to sort and visualize your personal music collection. 
Connects to a MongoDB database to add and delete your albums

<img width="600" alt="Screenshot 2023-01-20 at 2 02 40 PM" src="https://user-images.githubusercontent.com/86679848/213785361-3f147247-8486-49f0-9267-32877b7df55e.png">
<img width="600" alt="Screenshot 2023-01-20 at 2 00 59 PM" src="https://user-images.githubusercontent.com/86679848/213785367-72f9c202-51ba-4545-bb15-2c07cce65c39.png">


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

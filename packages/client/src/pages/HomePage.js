import React, { useEffect, useState } from "react";
import { useApiFetch } from "util/api";
import LoadingSpinner from "components/LoadingSpinner";
import Album from "components/Album";
import styles from "./HomePage.module.css";
import Header from "components/Header/Header";
import { Container, Button, Form, ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import AddAlbumModal from "components/AddAlbumModal/AddAlbumModal";
import axios from "axios";

export default function HomePage(props) {

  // set the albums in state
  const [albums, setAlbums] = useState(null);

  //Set the toggle buttons state
  const [radioValue, setRadioValue] = useState('1');


  // modal state open / close
  const [modalShow, setModalShow] = useState(false);

  // Sorting the albums
  const initialSortState = {
    sort: "albumTitle", // also 'year', 'band'
    order: "down", // also 'up'
  };
  const [sortData, setSortData] = useState(initialSortState);

  const handleSortChange = (e) => {

    e.preventDefault() 
    console.log(e)
    setSortData({
      ...sortData,
      [e.target.name]: e.target.value,
    });
    sortAlbums();
  };

  const sortAlbums = () => {
    let sortedAlbums = albums
    let sortType = sortData.sort;
    let order = sortData.order === "up" ? 1 : -1;

    setAlbums(sortedAlbums.sort((a, b) => {
      if (
        a[`${sortType}`].toString().toLowerCase() <
        b[`${sortType}`].toString().toLowerCase()
      ) {
        return order;
      }
      if (
        a[`${sortType}`].toString().toLowerCase() >
        b[`${sortType}`].toString().toLowerCase()
      ) {
        return -order;
      }
      // names must be equal
      return 0;
    }));

  };

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const allAlbums = await axios.get('http://localhost:3001/api/albums')
        setAlbums(allAlbums.data)
        sortAlbums()
      } catch (error) {
        console.error(error.message)
      }
    }
    getAlbums()
  }, [sortData])

  return (
    <main>
    
      <Header />
      <Container style={{justifyContent:'space-between', display: 'flex', flexDirection: 'row', borderBottom: '.01em solid #aaa', padding: '30px 10px'}}>

        {/* Sort Albums */}
      {/* <ButtonGroup> */}
        <div>
          <ButtonGroup style={{marginRight: '20px'}}>
            <Button  variant='secondary' name="sort" value='albumTitle' onClick={handleSortChange}>Album</Button>
            <Button  variant='secondary' name="sort" value='yearPublished' onClick={handleSortChange}>Year</Button>
            <Button  variant='secondary' name="sort" value='bandName' onClick={handleSortChange}>Band</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button  variant='secondary' name="order" value='up' onClick={handleSortChange}>▲</Button>
            <Button  variant='secondary' name="order" value='down' onClick={handleSortChange}>▼</Button> 
          </ButtonGroup>
         
        </div>
   
  
        {/* Modal / Add Album Form */}
        <Button variant="success" onClick={() => setModalShow(true)}>Add Album</Button>
        
            <AddAlbumModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            albums={albums}
            setAlbums={setAlbums}
            />
      </Container>

      {/* Display Albums */}
      { albums && 
            albums.map((album, i) => {
          return (
            <Album
              key={i}
              info={albums[i]}
              albums={albums}
              setAlbums={setAlbums}
            />
          );
        })}
    </main>
  );
}

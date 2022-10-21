import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modal, Form, Button, Row, Col } from "react-bootstrap";

const AddAlbumModal = ({show, onHide, albums, setAlbums}) => {
  
  const initialAlbumInfo = {
    albumTitle: "",
    bandName: "",
    yearPublished: null,
    albumCoverURL: "",
    bandMembers: [],
    songList: [],
  };

  const [albumInfo, setAlbumInfo] = useState(initialAlbumInfo);

  const handleAlbumChange = (e) => {
    setAlbumInfo({
      ...albumInfo,
      [e.target.name]: e.target.value,
    });
  };

  // handle adding band members
  const [bandMemberForms, setBandMemberForms] = useState([{ name: "" }]);

  const handleMemberChange = (i, e) => {
    let newBandMemberForms = [...bandMemberForms];
    newBandMemberForms[i][e.target.name] = e.target.value;
    setBandMemberForms(newBandMemberForms);
  };

  const addBandMemberField = () => {
    setBandMemberForms([...bandMemberForms, { name: "" }]);
  };

  const removeBandMemberField = (i) => {
    let newBandMemberForms = [...bandMemberForms];
    newBandMemberForms.splice(i, 1);
    setBandMemberForms(newBandMemberForms);
  };

  // handle adding band members
  const [songForms, setSongForms] = useState([{ title: "", duration: "" }]);

  const handleSongChange = (i, e) => {
    let newSongForms = [...songForms];
    newSongForms[i][e.target.name] = e.target.value;
    setSongForms(newSongForms);
  };

  const addSongField = () => {
    setSongForms([...songForms, { title: "", duration: "" }]);
  };

  const removeSongField = (i) => {
    let newSongForms = [...songForms];
    newSongForms.splice(i, 1);
    setSongForms(newSongForms);
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    onHide()
    const newAlbum = {
      albumTitle: albumInfo.albumTitle,
      bandName: albumInfo.bandName,
      yearPublished: albumInfo.yearPublished,
      albumCoverURL: albumInfo.albumCoverURL,
      songList: songForms,
      bandMembers: bandMemberForms,
    };
    try {

      console.log('albums from handleSubmit: ', albums)
      await axios.post(`http://localhost:3001/api/albums`, newAlbum)
      setAlbums([...albums, newAlbum])
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    const getAlbums = async () => {
      try {
        const allAlbums = await axios.get('http://localhost:3001/api/albums')
        console.log(allAlbums.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    getAlbums()
  }, [])


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Album
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} style={{margin: '5px 0'}}>
          <Form.Label column sm="2">
            Album Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Rubber Soul"
              name="albumTitle"
              value={albumInfo.albumTitle || ''}
              onChange={(e) => handleAlbumChange(e)}
              required
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{margin: '5px 0'}}>
          <Form.Label column sm="2">
            Band Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="The Beatles"
              name="bandName"
              value={albumInfo.bandName || ''}
              onChange={(e) => handleAlbumChange(e)}
              required
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{margin: '5px 0'}}>
          <Form.Label column sm="2">
            Year Published
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              placeholder="1968"
              name="yearPublished"
              value={albumInfo.yearPublished || ''}
              onChange={(e) => handleAlbumChange(e)}
              required
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{margin: '5px 0'}}>
          <Form.Label column sm="2">
            Album Cover URL
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="www.somesite.com/rubbersoul.jpg"
              name="albumCoverURL"
              value={albumInfo.albumCoverURL || ''}
              onChange={(e) => handleAlbumChange(e)}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group style={{ margin: "30px 0" }}>
          {bandMemberForms.map((element, index) => (
            <Form.Group as={Row} key={index} style={{margin: '5px 0'}}>
              <Form.Label column sm="2">
                Band Member
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Ringo Starr"
                  name="name"
                  value={element.name || ""}
                  onChange={(e) => handleMemberChange(index, e)}
                />
              </Col>
              <Col sm="1">
                {index ? (
                  <Button
                    variant="danger"
                    onClick={() => removeBandMemberField(index)}
                  >
                    x
                  </Button>
                ) : null}
              </Col>
            </Form.Group>
          ))}

          <Button size='sm' variant='success' onClick={() => addBandMemberField()}>Add Member</Button>
        </Form.Group>

        <Form.Group>
          {songForms.map((element, index) => (
            <Form.Group as={Row} key={index} style={{margin: '5px 0'}}>
              <Form.Label column sm="2">
                Song Title
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Wait"
                  value={element.title || ""}
                  onChange={(e) => handleSongChange(index, e)}
                  required
                />
              </Col>
              <Form.Label column sm="1">
                Seconds
              </Form.Label>
              <Col sm="2">
                <Form.Control
                  type="number"
                  name="duration"
                  placeholder="314"
                  value={element.duration || ""}
                  onChange={(e) => handleSongChange(index, e)}
                  required
                />
              </Col>
              <Col sm='1'>
              
              {index ? (
                <Button variant="danger" onClick={() => removeSongField(index)}>
                  x
                </Button>
              ) : null}
              </Col>
            </Form.Group>
          ))}
          <Button size='sm' variant='success' onClick={() => addSongField()}>
            Add Song
          </Button>

          <Form.Group as={Row}>
            <Button style={{margin: '5px 0'}} variant="success" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Form.Group>
      </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAlbumModal;

import React from "react";
import styles from "./Album.module.css";
import { Button } from 'react-bootstrap'
import axios from "axios";

const Album = ({ i, info, albums, setAlbums }) => {
  const deleteAlbum = async () => {
    try {
      let id = info._id 
      let remainingAlbums = albums.filter(album => album._id !== id)
      setAlbums(remainingAlbums)
      await axios.delete(`http://localhost:3001/api/deleteAlbum/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const secondsToMinutes = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  };

  const getAlbumDuration = (songs) => {
    let seconds = [];
    songs.map((song) => {
      seconds.push(song.duration);
    });
    let minutes = Math.round(seconds.reduce((a, b) => a + b) / 60);
    let hours = Math.round(minutes / 60);
    let minutesLeft = minutes - hours * 60;

    let time =
      minutes < 60
        ? `${minutes} minutes`
        : `${hours} hour, ${minutesLeft} minutes`;
    return time;
  };

  return (
    <div className={styles.album}>
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <img src={info.albumCoverURL || `https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png`} className={styles.albumCover} />
          <div className={styles.infoDetails}>
            <h2>{info.albumTitle}</h2>
            <h4>{info.yearPublished}</h4>
            <h3>{info.bandName}</h3>
            <p>
              {info.bandMembers.map((member, i) => {
                return i < info.bandMembers.length - 1 ? (
                  <span id={i}>{member.name}, </span>
                ) : (
                  <span id={i}> {member.name}</span>
                );
              })}
            </p>
            <h4>{getAlbumDuration(info.songList)}</h4>
          </div>
        </div>
        <div className={styles.deleteButton}>
          <Button variant='danger' onClick={deleteAlbum} style={{margin: '20px 0'}}>Remove Album</Button>
        </div>
      </div>

      <div className={styles.songList}>
        {info.songList.map((song, i) => {
          return (
            <span className={styles.song}>
              <span className={styles.songInfo}>
                <span className={styles.songNumber}>{i + 1}</span>
                <span className={styles.songTitle}>{song.title}</span>
              </span>
              <span className={styles.songDuration}>
                {secondsToMinutes(song.duration)}
              </span>
            </span>
          );
        })}
      </div>
      
    </div>
  );
};

export default Album;

import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const albumSchema = new mongoose.Schema(
  {
    albumTitle: {
      type: String,
      required: true
    },
    albumCoverURL: {
      type: String,
      required: false
    },
    bandName: {
      type: String,
      required: true
    },
    bandMembers: [
      { 
        name: {
          type: String,
          required: false
        }
      }
    ],
    songList: [
      {
        title: {
          type: String,
          required: true
        },
        duration: {
          type: Number,
          required: true,
        }
      }
    ],
    yearPublished: {
      type: Number,
      required: true,
      min: [1889],
      max: [new Date().getFullYear()]
    },
  }
)

const Album = mongoose.model('Album', albumSchema)

export default Album

const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteBrandSchema = new Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

// const FavoriteBrand = mongoose.model('FavoriteBrand', favoriteBrandSchema);

module.exports = mongoose.model('FavoriteBrand', favoriteBrandSchema);
const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteColorsSchema = new Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FavoriteColor', favoriteColorsSchema);
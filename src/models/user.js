const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const User = new Schema({
    member_since: {type: String},
    firebase_id: String,
    user_img: { type: String, default: 'none' },
    user_name: { type: String, default: 'none' },
    user_email : String,
    total_guides: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    badges: { type: [Schema.Types.ObjectId], default: [] },
  })


 module.exports = mongoose.model('User', User);
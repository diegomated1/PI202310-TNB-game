import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const UserModel = db.model('users', new mongoose.Schema({
    _id: String,
    id_hero: String,
    all_cards: [String],
    used_cards: [String]
}));

export default UserModel;
import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const GameModel = db.model('games', new mongoose.Schema({
    _id: String,
    ias: Number,
    players: [String],
    min_bet: Number,
    current_round: Number,
    current_turn: Number
}));

export default GameModel;
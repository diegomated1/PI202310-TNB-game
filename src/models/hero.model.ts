import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const HeroModel = db.model('heroes', new mongoose.Schema({
    _id: String,
    id_hero: String,
    name: String,
    type: String,
    life: Number,
    atq: {
        base: Number,
        range: Number
    },
    def: Number,
    dmg: {
        base: Number,
        range: Number
    },
    power: Number,
    last_dmg: Number
}));

export default HeroModel;
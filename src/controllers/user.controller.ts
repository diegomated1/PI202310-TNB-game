import { Request, Response } from "express";
import GameModel from "../models/game.model.js";
import ui from 'uniqid';
import UserModel from "models/user.model.js";
import axios from 'axios';
import HeroModel from "models/hero.model.js";

export default class UserController{

    constructor(){
    }

    async create(req:Request, res:Response){
        try{
            const {id_player, id_hero, cards} = req.body;
            const {data} = await axios.get(`${process.env.API_CARDS_URL}/heroes/${id_hero}`);
            await HeroModel.create({
                _id: ui.process(), id_hero,
                name: data.name, type: data.tyoe,
                life: data.life, def: data.defense,
                power: data.power, last_dmg: 0,
                atq: {
                    base: data.attack_basic,
                    range: data.attack_range
                },
                dmg: {
                    base: 1,
                    range: data.damage_range
                }
            });
            await UserModel.create({
                _id: id_player,
                all_cards: cards,
                id_hero
            });
            res.status(200).json({'message': 'ok'});
        }catch(error){
            res.status(500).json({'message': 'Internal error server'});
        }
    }

    async get(req:Request, res:Response){
        try{
            const {id_game, id_user} = req.params;
            const game = await GameModel.findOne({_id: id_game, players: id_user});
            if(game){
                const user = await UserModel.findById(id_user);
                const hero = await HeroModel.findById(user?.id_hero);
                res.status(200).json({user, hero});
            }else{
                res.status(400).json({message:'Game not found'});
            }
        }catch(error){
            res.status(500).json({message: 'Internal server error'});
        }
        
    };

}
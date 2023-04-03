import { Request, Response } from "express";
import GameModel from "../models/game.model.js";
import ui from 'uniqid';

export default class GameController{

    constructor(){
    }

    async create(req:Request, res:Response){
        try{
            const {players, ias, min_bet} = req.body;
            const id_game = ui.process();
            await GameModel.create({
                _id: id_game,
                current_round: 0,
                current_turn: 0,
                ias, min_bet, players
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
                res.status(200).json({game});
            }else{
                res.status(400).json({message:'Game not found'});
            }
        }catch(error){
            res.status(500).json({message: 'Internal server error'});
        }
    };
}
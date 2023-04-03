import { Router } from "express";
import GameController from "../controllers/game.controller.js";

export default class GameRouter{

    router: Router
    private controller: GameController

    constructor(){
        this.router = Router();
        this.controller = new GameController();
        this.routes();
    }

    private routes(){
        this.router.route('/').post(this.controller.create);
        this.router.route('/:id_card').get(this.controller.get);
    }
}
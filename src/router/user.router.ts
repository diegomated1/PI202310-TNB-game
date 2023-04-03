import { Router } from "express";
import UserController from "../controllers/game.controller.js";

export default class UserRouter{

    router: Router
    private controller: UserController

    constructor(){
        this.router = Router();
        this.controller = new UserController();
        this.routes();
    }

    private routes(){
        this.router.route('/').post(this.controller.create);
        this.router.route('/:id_card').get(this.controller.get);
    }
}
import {Server, Socket} from 'socket.io';
import GameModel from '../models/game.model.js';
import UserModel from '../models/user.model.js';
import HeroModel from '../models/hero.model.js';


export default class AuctionListeners{
    io: Server;
    socket: Socket;

    constructor(io: Server, socket: Socket){
        this.socket = socket;
        this.io = io;
        this.listeners();
    }

    private async gameUserJoin (id_user:string, id_game:string){
        const game = await GameModel.findOne({_id: id_game, "players": id_user});
        if(game){
            const _user = await UserModel.findById(id_user);
            const _hero = await HeroModel.findById(_user!.id_hero);
            this.io.to(`game:${id_game}`).emit('game:user:join', _user, _hero);
        }
    }

    listeners(){
        this.socket.on("game:user:join", this.gameUserJoin);
    }
}
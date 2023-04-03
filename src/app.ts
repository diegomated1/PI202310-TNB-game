import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import http from 'http';
import io, { Socket } from 'socket.io';
import GameRouter from './router/game.router.js';
import GameListeners from './listeners/game.listeners.js';
import cors from 'cors';

class App{

    app: Application
    server: http.Server
    io: io.Server
    AuctionRouter: GameRouter

    constructor(){
        this.app = express();
        this.server = new http.Server(this.app);
        this.io = new io.Server(this.server, {
            cors: {
                origin: '*'
            }
        });
        this.AuctionRouter = new GameRouter();
        this.config();
        this.routes();
        this.start();
    }

    config(){
        dotenv.config();
        this.app.use(cors({
            origin: "*"
        }));
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use('/auctions', this.AuctionRouter.router);
    }

    start(){
        this.io.on('connection', (socket)=>{
            console.log("conectado");
            new GameListeners(this.io, socket);
            socket.on('disconnect', () => {
                console.log('WebSocket connection closed');
            }); 
        });

        this.server.listen(3000, ()=>{
            console.log("Server on port 3000");
        });
    }

}

const app = new App();
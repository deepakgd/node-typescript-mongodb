import * as express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "./routes/routes";

class App {

    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();

    constructor() {
        this.app = express();
        this.config();        
        this.userRoutes.routes(this.app);     
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

}

export default new App().app;
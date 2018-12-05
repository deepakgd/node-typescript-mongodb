import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user";

export class UserRoutes {
    public userController: UserController = new UserController();

    public routes(app): void {
        app.post('/user', this.userController.createUsers);
        app.get('/user', this.userController.getUsers);
    }
}
import { Users } from '../models/users';
import { Request, Response } from 'express';
import { to } from 'await-to-js';

export class UserController{

    public async createUsers (req: Request, res: Response){
        let newUser = new Users(req.body);
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        let [error, user] = await to(newUser.save());
        if(error) return res.status(500).json({ error, message: 'Something Went Wrong!' });
        res.json(user);
    }


    public async getUsers (req: Request, res: Response){
        let [error, users] = await to(Users.find({}));
        if(error) return res.status(500).json({ error, message: "Something Went Wrong!" });
        return res.json(users)
    }

}
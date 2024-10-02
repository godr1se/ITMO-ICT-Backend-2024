import { Request, Response } from "express";
import AuthService from "../../service/auth";

export default class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.register(req.body);
            res.status(200).send(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: 'Registration failed' });
            }
        }
    };

    auth = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.auth(req.body.email, req.body.password);
            res.status(200).send(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: 'Authentication failed' });
            }
        }
    }
}

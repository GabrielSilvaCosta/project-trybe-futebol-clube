import { Request, Response } from 'express';
import UserService from '../Services/User.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const serviceResponse = await this.userService.login(req.body);
      const { status, data } = serviceResponse;
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async role(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body.userPayload;
      const serviceResponse = await this.userService.validateToken(email);
      const { status, data } = serviceResponse;
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

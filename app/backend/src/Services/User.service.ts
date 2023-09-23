import * as bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { Login } from '../Interfaces/users/IUser';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/users/Itoken';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public static createUnauthorizedResponse(message: string): ServiceResponse<ServiceMessage> {
    return { status: 'UNAUTHORIZED', data: { message } };
  }

  public static createSuccessResponse<T>(data: T): ServiceResponse<T> {
    return { status: 'SUCCESSFUL', data };
  }

  public async login(data: Login): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return UserService.createUnauthorizedResponse('Invalid email or password');
    }

    const token = JWT.sign({ email: user.email });
    return UserService.createSuccessResponse({ token });
  }
}

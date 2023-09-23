import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const userData = await this.model.findOne({
      where: { email },
    });

    return userData || null;
  }
}

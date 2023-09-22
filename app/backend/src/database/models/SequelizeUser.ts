import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import db from '.';

interface UserAttributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class SequelizeUser extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

SequelizeUser.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUser;

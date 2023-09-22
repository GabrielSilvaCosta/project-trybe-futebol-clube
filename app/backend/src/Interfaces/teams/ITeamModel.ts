import { ICRUDModelReader } from '../users/ICRUDModel';
import ITeam from './ITeams';

export interface ITeamModel extends ICRUDModelReader<ITeam> {
  id?: number
}

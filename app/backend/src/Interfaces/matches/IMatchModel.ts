import { ICRUDModelCreator } from '../users/ICRUDModel';
import IMatch, { IMatchInput } from './IMatch';

export interface MatchModelInterface extends ICRUDModelCreator<IMatch> {
  findAllMatches(): Promise<IMatch[]>
  findMatchesByProgress(query: boolean): Promise<IMatch[]>
  finishMatchById(id: number): Promise<void>
  updateMatchById(matchId: IMatch['id'], matchInput: IMatchInput): Promise<void>
}

import TeamModel from '../models/InstenceModel';
import MatchModel from '../models/MatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatchFromDB } from '../Interfaces/matches/IMatch';
import IPerformance from '../Interfaces/leaderBoard/IPerformaceTeams';
import ITeam from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderBoardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  private static goalsFavor(teamMatches: IMatchFromDB[], teamName: string): number {
    const totalGoalsFavor = teamMatches.reduce((acc, match) => {
      const isHomeTeam = match.homeTeam.teamName === teamName;
      return acc + (isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals);
    }, 0);
    return totalGoalsFavor;
  }

  private static goalsOwn(teamMatches: IMatchFromDB[], teamName: string): number {
    const totalGoalsOwn = teamMatches.reduce((acc, match) => {
      const isHomeTeam = match.homeTeam.teamName === teamName;
      return acc + (isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals);
    }, 0);
    return totalGoalsOwn;
  }

  static efficiencyTeam(
    teamMatches: IMatchFromDB[],
    _teamName: string,
    wins: IMatchFromDB[],
    draws: IMatchFromDB[],
  ) {
    const totalPoints = wins.length * 3 + draws.length;
    const totalGames = teamMatches.length;
    return Number((((totalPoints / (totalGames * 3)) * 100).toFixed(2)));
  }

  static generateTeam(
    teamName: string,
    teamMatches:IMatchFromDB[],
    wins: IMatchFromDB[],
    draws: IMatchFromDB[],
  ) {
    const teamGoalsFavor = LeaderBoardService.goalsFavor(teamMatches, teamName);
    const teamGoalsOwn = LeaderBoardService.goalsOwn(teamMatches, teamName);
    return { name: teamName,
      totalPoints: wins.length * 3 + draws.length,
      totalGames: teamMatches.length,
      totalVictories: wins.length,
      totalDraws: draws.length,
      totalLosses: teamMatches.length - wins.length - draws.length,
      goalsFavor: teamGoalsFavor,
      goalsOwn: teamGoalsOwn,
      goalsBalance: teamGoalsFavor - teamGoalsOwn,
      efficiency: LeaderBoardService.efficiencyTeam(teamMatches, teamName, wins, draws),
    };
  }

  private static orderTeamsByPoints(teams: IPerformance[]) {
    return teams.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public async getPerformanceTeamsHome(): Promise<ServiceResponse<IPerformance[]>> {
    const teams = await this.teamModel.findAll() as ITeam[];
    const matches = await this.matchModel.findAllMatches() as IMatchFromDB[];
    const finishedMatches = matches.filter(({ inProgress }) => !inProgress);

    const performanceOfTeams = teams.map(({ teamName }) => {
      const teamMatches = finishedMatches.filter(({ homeTeam }) => homeTeam.teamName === teamName);
      const wins = teamMatches.filter(({ homeTeamGoals, awayTeamGoals }) =>
        homeTeamGoals > awayTeamGoals);
      const draws = teamMatches.filter(({ homeTeamGoals, awayTeamGoals }) =>
        homeTeamGoals === awayTeamGoals);

      return LeaderBoardService.generateTeam(teamName, teamMatches, wins, draws);
    });

    const orderTeamsHomePoints = LeaderBoardService.orderTeamsByPoints(performanceOfTeams);

    return { status: 'SUCCESSFUL', data: orderTeamsHomePoints };
  }

  public async getPerformanceTeamsAway(): Promise<ServiceResponse<IPerformance[]>> {
    const teams = await this.teamModel.findAll() as ITeam[];
    const matches = await this.matchModel.findAllMatches() as IMatchFromDB[];
    const finishedMatches = matches.filter(({ inProgress }) => !inProgress);

    const performanceOfTeams = teams.map(({ teamName }) => {
      const teamMatches = finishedMatches.filter(({ awayTeam }) => awayTeam.teamName === teamName);
      const wins = teamMatches.filter(({ awayTeamGoals, homeTeamGoals }) =>
        awayTeamGoals > homeTeamGoals);
      const draws = teamMatches.filter(({ awayTeamGoals, homeTeamGoals }) =>
        awayTeamGoals === homeTeamGoals);

      return LeaderBoardService.generateTeam(teamName, teamMatches, wins, draws);
    });

    const orderTeamsAwayPoints = LeaderBoardService.orderTeamsByPoints(performanceOfTeams);

    return { status: 'SUCCESSFUL', data: orderTeamsAwayPoints };
  }

  public async getPerformanceTeamsOverall(): Promise<ServiceResponse<IPerformance[]>> {
    const teams = await this.teamModel.findAll() as ITeam[];
    const matches = await this.matchModel.findAllMatches() as IMatchFromDB[];
    const finishedMatches = matches.filter(({ inProgress }) => !inProgress);

    const performanceOfTeams = teams.map(({ teamName }) => {
      const teamMatches = finishedMatches.filter(
        (match) => match.homeTeam.teamName === teamName || match.awayTeam.teamName === teamName,
      );

      const wins = teamMatches.filter(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) =>
        (homeTeam.teamName === teamName && homeTeamGoals > awayTeamGoals)
               || (awayTeam.teamName === teamName && awayTeamGoals > homeTeamGoals));

      const draws = teamMatches.filter(({ homeTeamGoals, awayTeamGoals }) =>
        homeTeamGoals === awayTeamGoals);

      return LeaderBoardService.generateTeam(teamName, teamMatches, wins, draws);
    });

    const orderTeamsOverallPoints = LeaderBoardService.orderTeamsByPoints(performanceOfTeams);

    return { status: 'SUCCESSFUL', data: orderTeamsOverallPoints };
  }
}

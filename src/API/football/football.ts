import { footballApiClient } from '..';
import type {
  CompetitionTeamResponse,
  AllCompetitionResponse,
  CompetitionMatchesResponse,
  TeamCalendarResponse,
} from './entity';

export const getAllCompetitionData = async () => {
  const response =
    await footballApiClient.get<AllCompetitionResponse>('competitions');
  return response;
};

export const getCompetitionTeamData = async (competitionName: string) => {
  const response = await footballApiClient.get<CompetitionTeamResponse>(
    `competitions/${competitionName}/teams`,
  );
  return response;
};

export const getTeamCalendarData = async (teamId: number) => {
  const response = await footballApiClient.get<TeamCalendarResponse>(
    `teams/${teamId}/matches?status=SCHEDULED`,
  );
  return response;
};

export const getCompetitionMatchesData = async (competitionCode: string) => {
  const response = await footballApiClient.get<CompetitionMatchesResponse>(
    `competitions/${competitionCode}/matches`,
  );
  return response;
};

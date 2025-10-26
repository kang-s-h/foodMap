import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import {
  getAllCompetitionData,
  getCompetitionTeamData,
  getTeamCalendarData,
  getCompetitionMatchesData,
} from '@/API/football/football';
import { KindOfCompetition } from '@/store/useFootballStore';

export const useAllCompetitionData = () => {
  return useSuspenseQuery({
    queryKey: ['allCompetitionData'],
    queryFn: () => getAllCompetitionData(),
    select: (data) => {
      const filteredCompetitions = data.competitions.filter((comp) => {
        return KindOfCompetition.includes(comp.code);
      });
      return {
        ...data,
        competitions: filteredCompetitions,
      };
    },
  });
};

export const useCompetitionTeamData = (competitionName: string) => {
  return useSuspenseQuery({
    queryKey: ['competitionTeamData', competitionName],
    queryFn: () => getCompetitionTeamData(competitionName),
  });
};

export const useTeamCalendarData = (teamId: number) => {
  return useQuery({
    queryKey: ['teamCalendarData', teamId],
    queryFn: () => getTeamCalendarData(teamId),
  });
};

export const useCompetitionMatchesData = (competitionCode: string) => {
  return useQuery({
    queryKey: ['competitionMatchesData', competitionCode],
    queryFn: () => getCompetitionMatchesData(competitionCode),
  });
};

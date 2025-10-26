import { create } from 'zustand';

export const KindOfCompetition: string[] = [
  'CL',
  'BL1',
  'PD',
  'FL1',
  'PPL',
  'SA',
  'PL',
];

interface CompetitionState {
  type: 'comp';
  value: string | null;
}

interface TeamState {
  type: 'team';
  value: number | null;
}

export type SelectedState = CompetitionState | TeamState;

interface useFootballStoreType {
  selectedTeamOrCompetition: SelectedState;
  selectedTeamId: number | null;
  setSelectedTeamOrCompetition: (value: SelectedState) => void;
  setSelectedTeamId: (selectedTeamId: number | null) => void;
}

export const useFootballStore = create<useFootballStoreType>((set) => ({
  selectedTeamOrCompetition: { type: 'comp', value: null },
  selectedTeamId: null,
  setSelectedTeamOrCompetition: (value: SelectedState) =>
    set({ selectedTeamOrCompetition: value }),
  setSelectedTeamId: (teamId: number | null) => set({ selectedTeamId: teamId }),
}));

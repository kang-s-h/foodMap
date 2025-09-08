export interface AllCompetitionResponse {
  count: number;
  filters: Record<string, unknown>;
  competitions: Competition[];
}

export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  emblem: string;
  plan: string;
  currentSeason: CurrentSeason;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}

interface CurrentSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: null | string;
}

export interface CompetitionTeamResponse {
  count: number;
  filters: Record<string, unknown>;
  competition: Competition;
  season: CurrentSeason;
  teams: Team[];
}

interface Team {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: RunningCompetition[];
  coach: Coach;
  marketValue: string | null;
  squad: [];
  staff: [];
  lastUpdated: string;
}

interface Coach {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  contract: Contract;
}

interface Contract {
  start: string | null;
  until: string | null;
}

interface RunningCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface TeamCalendarResponse {
  filters: TeamCalendarFilters;
  status: string[];
  matches: Match[];
  resultSet: TeamResultSet;
}

interface TeamCalendarFilters {
  competitions: string;
  permission: string;
  limit: number;
}

export interface Match {
  area: Area;
  awayTeam: TeamSummary;
  competition: Competition2;
  group: string | null;
  homeTeam: TeamSummary;
  id: number;
  lastupdated: string;
  matchday: number;
  bookings: Bookings[];
  substitutions: Substitutions[];
  odds: {
    msg?: string;
    homeWin?: number;
    draw?: number;
    awayWin?: number;
  };
  referees: Human[];
  score: Score;
  season: Season;
  stage: string;
  status: string;
  utcDate: string;
  minute?: string;
  injuryTime?: string;
  attendance?: number;
  venue?: string;
  goals?: Goal[];
  penalties?: Penalties[];
}

interface TeamSummary {
  crest?: string;
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  coach?: Human;
}

interface Bookings {
  minute: number;
  team: TeamSummary;
  player: Human | null;
  card: string;
}

interface Substitutions {
  minute: number;
  team: TeamSummary;
  playerOut: Human | null;
  playerIn: Human | null;
}
interface Competition2 {
  code: string;
  emblem: string;
  id: number;
  name: string;
  type: string;
}

interface Human {
  id: number | null;
  name: string | null;
  type?: string | null;
  nationality?: string | null;
}

interface Score {
  duration: string;
  fullTime: GoalCount;
  halfTime: GoalCount;
  winner: string;
}

interface GoalCount {
  away: number | null;
  home: number | null;
}

interface Season {
  currentMatchday: number;
  endDate: string;
  id: number;
  startDate: string;
  winner: string | null;
}

interface TeamResultSet {
  competitions: string;
  count: number;
  draws: number;
  first: string;
  last: string;
  losses: number;
  played: number;
  wins: number;
}

interface Goal {
  minute: number;
  injuryTime: number | null;
  type: string;
  team: TeamSummary;
  scorer: Human | null;
  assist: Human | null;
  score: {
    home: number;
    away: number;
  };
}

interface Penalties {
  player: Human | null;
  team: TeamSummary;
  scored: boolean | null;
}

export interface CompetitionMatchesResponse {
  filters: CompetitionFilters;
  resultSet: CompetitionResultSet;
  competition: Competition;
  matches: Match[];
}

interface CompetitionFilters {
  season: string;
  mathchday: string;
}

interface CompetitionResultSet {
  count: number;
  frist: string;
  last: string;
  played: number;
}

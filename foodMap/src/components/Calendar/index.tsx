import CalendarComponent from './components/CalendarComponent';
import Competition from '@/components/Calendar/components/Competition';
import Team from '@/components/Calendar/components/Team';
import { useFootballStore } from '@/store/useFootballStore';

export default function Calendar() {
  const { selectedTeamOrCompetition } = useFootballStore();

  if (selectedTeamOrCompetition.value === null) {
    return <CalendarComponent data={null} />;
  }

  return selectedTeamOrCompetition.type === 'comp' ? (
    <Competition id={selectedTeamOrCompetition.value} />
  ) : (
    <Team id={selectedTeamOrCompetition.value} />
  );
}

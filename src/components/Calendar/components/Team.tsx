import CalendarComponent from './CalendarComponent';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTeamCalendarData } from '@/page/Football/hook/usefootballData';

function Team({ id }: { id: number }) {
  const { data, isLoading } = useTeamCalendarData(id);

  if (isLoading) return <LoadingSpinner />;

  return <CalendarComponent data={data} />;
}

export default Team;

import CalendarComponent from './CalendarComponent';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCompetitionMatchesData } from '@/page/Football/hook/usefootballData';

function Competition({ id }: { id: string }) {
  const { data, isLoading } = useCompetitionMatchesData(id);

  if (isLoading) return <LoadingSpinner />;

  return <CalendarComponent data={data} />;
}

export default Competition;

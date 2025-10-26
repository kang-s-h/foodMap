import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import FootballPage from '@/page/Football/components/FootballComponent';

export default function Football() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FootballPage />
    </Suspense>
  );
}

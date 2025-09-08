import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import KakaoMapComponent from '@/page/DeajeonRestuarntsMap/components/KakaoMapComponent';

function DeajeonRestuarntsMap() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <KakaoMapComponent />
    </Suspense>
  );
}

export default DeajeonRestuarntsMap;

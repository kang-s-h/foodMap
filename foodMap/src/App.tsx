import { Suspense } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Routes, Route } from 'react-router';
import LoadingSpinner from './components/LoadingSpinner';
import Pagination from './page/DeajeonRestuarntsMap/components/Pagination';
import MainPage from '@/page';
import DeajeonRestuarntsMap from '@/page/DeajeonRestuarntsMap';
import Football from '@/page/Football/intdex';
import StudyTimer from '@/page/StudyTimer';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(utc);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          메인
        </Route>
        <Route path="/DeajeonRestuarntsMap" element={<DeajeonRestuarntsMap />}>
          지도
        </Route>
        <Route path="/StudyTimer" element={<StudyTimer />}>
          공부타이머
        </Route>
        <Route path="/football" element={<Football />}>
          축구일정
        </Route>
        <Route path="*">없는 페이지</Route>
        <Route path="/pagination" element={<Pagination />}>
          페이지네이션
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

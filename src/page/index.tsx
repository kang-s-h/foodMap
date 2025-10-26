import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center gap-10 justify-center h-full text-xl">
      <button
        className="button"
        onClick={() => navigate('/DeajeonRestuarntsMap')}
      >
        지도
      </button>
      <button className="button" onClick={() => navigate('/StudyTimer')}>
        공부 타이머
      </button>
      <button className="button" onClick={() => navigate('/football')}>
        축구 일정
      </button>
      <button className="button" onClick={() => navigate('/pagination')}>
        페이지네이션
      </button>
    </div>
  );
}

export default MainPage;

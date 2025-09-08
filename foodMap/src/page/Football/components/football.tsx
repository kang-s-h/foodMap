import { useState, useEffect, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import type { SelectedState } from '@/store/useFootballStore';
import { getCompetitionTeamData } from '@/API/football/football';
import CloseIcon from '@/assets/close.svg';
import EmptyEmblem from '@/assets/cup.svg';
import DoubleArrowRight from '@/assets/doubleArrowRight.svg';
import Calendar from '@/components/Calendar/index';
import LoadingSpinner from '@/components/LoadingSpinner';
import Modal from '@/components/Modal';
import { useAllCompetitionData } from '@/page/Football/hook/usefootballData';
import { useCompetitionTeamData } from '@/page/Football/hook/usefootballData';
import { useFootballStore } from '@/store/useFootballStore';
import { KindOfCompetition } from '@/store/useFootballStore';
import useBooleanState from '@/utils/useBooleanState';

function FootballComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setSelectedTeamId, setSelectedTeamOrCompetition } =
    useFootballStore();

  const [isModalOpen, modalOpen, modalClose] = useBooleanState(false);
  const [selectedState, setSelectedState] = useState<SelectedState>({
    type: 'comp',
    value: null,
  });
  const [selectCompetition, setSelectCompetition] = useState<string>('');
  const [selectTeamCompetition, setselectTeamCompetition] =
    useState<string>('PL');
  const [selectTeam, setSelectTeam] = useState<number | null>(null);

  const { data: allCompetitionData } = useAllCompetitionData();
  const { data: competitionData } = useCompetitionTeamData(
    selectTeamCompetition,
  );

  const handleClickCompetition = (competition: string) => {
    if (selectCompetition === '' || selectCompetition !== competition) {
      console.log(competition); // 'PL', 'CL', ...
      return setSelectCompetition(competition);
    }
    return setSelectCompetition('');
  };

  const handleClickTeam = (id: number) => {
    if (id === null || id !== selectTeam) {
      return setSelectTeam(id);
    }
    return setSelectTeam(null);
  };

  const setCalendar = () => {
    setSelectedTeamId(selectTeam);

    if (selectedState.type === 'comp') {
      if (selectCompetition === '') return alert('대회를 선택해주세요.');

      const newState = {
        type: 'comp' as const,
        value: selectCompetition,
      };
      setSelectedTeamOrCompetition(newState);
      setSelectedState(newState);
    } else {
      if (selectTeam === null) return alert('구단을 선택해주세요.');

      const newState = {
        type: 'team' as const,
        value: selectTeam,
      };
      setSelectedTeamOrCompetition(newState);
      setSelectedState(newState);
    }
    modalClose();
  };

  const handleClickModalOpen = () => {
    setselectTeamCompetition('PL');
    setSelectTeam(null);
    setSelectedState({ type: 'comp', value: null });
    modalOpen();
  };

  useEffect(() => {
    const prefetchAll = async () => {
      const prefetchPromises = KindOfCompetition.map((competitionCode) => {
        return queryClient.prefetchQuery({
          queryKey: ['competitionTeamData', competitionCode],
          queryFn: () => getCompetitionTeamData(competitionCode),
        });
      });

      try {
        await Promise.all(prefetchPromises);
        console.log('모든 데이터 프리페칭 완료!');
      } catch (error) {
        console.error('프리페칭 중 오류 발생:', error);
      }
    };

    prefetchAll();
  }, [queryClient]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen h-full w-full">
        <div className="flex">
          <button className="selectBtn" onClick={() => navigate('/')}>
            뒤로가기
          </button>
          <button className="selectBtn" onClick={handleClickModalOpen}>
            선택
          </button>
        </div>
        <Calendar />
        <Modal isOpen={isModalOpen} onClose={modalClose}>
          <div className="flex flex-col h-full">
            <button
              className="w-8 h-8 bg-neutral-200 cursor-pointer rounded-full active: bg-neutral-300 active:scale-90 flex justify-center items-center m-4"
              onClick={modalClose}
            >
              <CloseIcon />
            </button>
            <div className="flex flex-1 justify-center h-60 box-border">
              <div className="flex flex-col pr-10 gap-50 border-r border-neutral-300 justify-center h-full">
                <div className="flex flex-col font-bold text-xl gap-5">
                  <div className="flex gap-5">
                    <input
                      className="peer"
                      type="radio"
                      id="comp"
                      name="filter"
                      defaultChecked
                      onChange={() => {
                        setSelectedState({ type: 'comp', value: null });
                        setSelectTeam(null);
                      }}
                    />
                    <label htmlFor="comp" className="label">
                      대회
                    </label>
                  </div>
                  <div className="flex gap-5">
                    <input
                      type="radio"
                      id="team"
                      name="filter"
                      className="peer"
                      onChange={() => {
                        setSelectedState({ type: 'team', value: null });
                        setSelectCompetition('');
                      }}
                    />
                    <label htmlFor="team" className="label">
                      구단
                    </label>
                  </div>
                </div>
              </div>
              <div
                className={clsx('w-60 overflow-y-scroll', {
                  'opacity-20 pointer-events-none cursor-not-allowed select-none':
                    selectedState.type !== 'comp',
                })}
              >
                {allCompetitionData &&
                  allCompetitionData.competitions.map((competition) => (
                    <div
                      key={competition.id}
                      className="border-b p-2 flex gap-4 mx-10 justify-center"
                    >
                      <button
                        className={clsx(
                          'cursor-pointer rounded-lg justify-center items-center flex flex-col gap-2 p-2 active:bg-yellow-200',
                          {
                            'bg-yellow-100 scale-110':
                              competition.code === selectCompetition,
                          },
                        )}
                        onClick={() => handleClickCompetition(competition.code)}
                      >
                        {competition.emblem && (
                          <img
                            className="w-20 h-20"
                            src={competition.emblem}
                            alt={competition.emblem}
                          />
                        )}
                        {!competition.emblem && <EmptyEmblem />}
                        <div>{competition.name}</div>
                      </button>
                    </div>
                  ))}
              </div>
              <div className="border-r border-neutral-300 mr-10"></div>
              <div
                className={clsx('h-full overflow-y-scroll', {
                  'opacity-20 pointer-events-none cursor-not-allowed select-none':
                    selectedState.type !== 'team',
                })}
              >
                <div className="flex h-full gap-5">
                  <div className="p-5 overflow-y-scroll flex flex-col gap-5">
                    {allCompetitionData &&
                      allCompetitionData.competitions.map((competition) => (
                        <button
                          key={competition.id}
                          className={clsx(
                            'cursor-pointer shadow-md p-2 flex flex-col justify-center items-center',
                            {
                              ' shadow-xl scale-110':
                                competition.code === selectTeamCompetition,
                            },
                          )}
                          onClick={() =>
                            setselectTeamCompetition(competition.code)
                          }
                        >
                          {competition.emblem && (
                            <img
                              className="w-20"
                              src={competition.emblem}
                              alt={competition.emblem}
                            />
                          )}
                          {!competition.emblem && <EmptyEmblem />}
                        </button>
                      ))}
                  </div>
                  <div className="flex justify-center items-center">
                    <DoubleArrowRight className="w-10 h-10" />
                  </div>
                  <div className="overflow-y-scroll flex flex-col gap-4">
                    {competitionData.teams.map((team) => (
                      <button
                        className={clsx(
                          'cursor-pointer flex flex-col items-center',
                          {
                            'scale-110 shadow-lg bg-yellow-100':
                              team.id === selectTeam,
                          },
                        )}
                        key={team.id}
                        onClick={() => handleClickTeam(team.id)}
                      >
                        <img
                          className="w-20"
                          src={team.crest}
                          alt={team.crest}
                        />
                        <div className="text-truncate">{team.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="p-3 bg-neutral-300 rounded-full m-3 font-bold hover:bg-neutral-400 active:bg-neutral-500 cursor-pointer"
                onClick={setCalendar}
              >
                선택
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Suspense>
  );
}
export default FootballComponent;

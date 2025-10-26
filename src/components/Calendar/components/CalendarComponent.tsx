import { useState, useMemo } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import type {
  Match,
  TeamCalendarResponse,
  CompetitionMatchesResponse,
} from '@/API/football/entity';
import ArrowLeftIcon from '@/assets/arrow_left.svg';
import ArrowRightIcon from '@/assets/arrow_right.svg';

type data = dayjs.Dayjs;
type action = 'prev' | 'next' | 'current';

type dataType =
  | TeamCalendarResponse
  | CompetitionMatchesResponse
  | null
  | undefined;

function CalendarComponent({ data }: { data: dataType }) {
  const [viewDate, setViewDate] = useState(dayjs());
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'] as const;

  const startWeek = viewDate.startOf('month').week();
  const endWeek =
    viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();

  const matchesByDate = useMemo(() => {
    if (!data?.matches) {
      return new Map();
    }

    const dateMap = new Map<string, Match[]>();

    data.matches.forEach((match) => {
      const dateKey = dayjs(match.utcDate).format('YYYY-MM-DD');

      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, []);
      }

      dateMap.get(dateKey)?.push(match);
    });

    return dateMap;
  }, [data]);

  const moveMonth = (data: data, action: action) => {
    if (action === 'prev') return setViewDate(data.subtract(1, 'month'));
    if (action === 'current') return setViewDate(dayjs());
    if (action === 'next') return setViewDate(data.add(1, 'month'));
  };

  return (
    <div className="h-screen">
      <div className="flex text-2xl justify-evenly items-center ">
        <button
          className="monthButton"
          onClick={() => moveMonth(viewDate, 'prev')}
        >
          <ArrowLeftIcon className="w-8 h-8" />
        </button>
        <button
          className="cursor-pointer active:scale-95"
          onClick={() => moveMonth(viewDate, 'current')}
        >{`${viewDate.get('year')}년  ${viewDate.get('month') + 1}월`}</button>
        <button
          className="monthButton"
          onClick={() => moveMonth(viewDate, 'next')}
        >
          <ArrowRightIcon className="w-8 h-8" />
        </button>
      </div>
      <div className="w-full mt-5">
        <div className="flex justify-around border-b text-lg pb-5 border-neutral-300">
          {weekDays.map((day) => (
            <div
              key={day}
              className={clsx({
                'text-blue-600': day === '토',
                'text-red-600': day === '일',
              })}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="flex flex-col h-full mt-10">
          {Array.from(
            { length: endWeek - startWeek + 1 },
            (_, index) => startWeek + index,
          ).map((week) => (
            <div className="flex justify-evenly" key={week}>
              {Array(7)
                .fill(0)
                .map((_, i) => {
                  const current = viewDate
                    .week(week)
                    .startOf('week')
                    .add(i, 'day');

                  const formatCurrentDate = current.format('YYYY-MM-DD');
                  const todaysMatches: Match[] =
                    matchesByDate.get(formatCurrentDate);

                  return (
                    <div key={`${week}_${i}`}>
                      <div>
                        <div>
                          <div className="w-50 h-40 flex flex-col">
                            <div
                              className={twMerge(
                                clsx(
                                  'bg-neutral-400 flex justify-between border-b border-neutral-500',
                                  {
                                    'text-blue-600':
                                      current.format('d') === '6',
                                    'text-red-600': current.format('d') === '0',
                                    'bg-neutral-200':
                                      (Number(current.format('D')) > 7 &&
                                        week === startWeek) ||
                                      (Number(current.format('D')) < 7 &&
                                        week === endWeek),
                                    'bg-yellow-300':
                                      current.format('YYYY-MM-DD') ===
                                      dayjs().format('YYYY-MM-DD'),
                                  },
                                ),
                              )}
                            >
                              {current.format('D')}
                              {current.format('YYYY-MM-DD') ===
                                dayjs().format('YYYY-MM-DD') && ' (today)'}
                            </div>
                            <div className="overflow-y-scroll flex-1">
                              {todaysMatches &&
                                todaysMatches.map((match) => (
                                  <div
                                    key={match.id}
                                    className="p-1 bg-blue-100 border"
                                  >
                                    <div className="text-xs rounded mb-1 flex justify-evenly">
                                      <div className="flex flex-col justify-center items-center">
                                        <img
                                          className="w-5 h-5"
                                          src={match.awayTeam.crest}
                                          alt={match.awayTeam.crest}
                                        />
                                        <div className="w-20 text-center text-ellipsis overflow-hidden">
                                          {match.awayTeam.shortName}
                                        </div>
                                      </div>
                                      <div className="self-center">VS</div>
                                      <div className="flex flex-col justify-center items-center">
                                        <img
                                          className="w-5 h-5"
                                          src={match.homeTeam.crest}
                                          alt={match.homeTeam.crest}
                                        />
                                        <div className="w-20 text-center text-ellipsis overflow-hidden">
                                          {match.homeTeam.shortName}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      {dayjs(match.utcDate).format('A HH:mm')}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;

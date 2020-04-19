import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useAsync } from 'react-use';
import { DailyData, fetchData } from '../../api';
import { CurrentCountry } from '../../App';
import { formatDate } from '../../helpers';
import styles from './Chart.module.scss';

interface Props {
  currentCountry: CurrentCountry | undefined;
}

const Chart: React.FC<Props> = ({ currentCountry }) => {
  const { value, error, loading } = useAsync(() =>
    fetchData<DailyData[]>('/daily'),
    []
  );

  if (loading) return <div>Loading ...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!value?.length && !currentCountry) return <div>No data !</div>

  console.info('[Chart] daily data', value, currentCountry);

  const reducedData = value?.map(dailyData => ({
    confirmed: dailyData.confirmed.total,
    deaths: dailyData.deaths.total,
    date: dailyData.reportDate
  }))

  const lineChart = (
    reducedData
    ? (
      <Line
        data={{
          labels: reducedData.map(({ date }) => formatDate(date)),
          datasets: [
            {
              data: reducedData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: reducedData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null
  );

  const barChart = currentCountry?.detail ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'Poeple',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [
              currentCountry.detail.confirmed.value,
              currentCountry.detail.recovered.value,
              currentCountry.detail.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${currentCountry.name}` },
      }}
    />
  ) : null;

  return (
    <section className={styles.container}>
      {currentCountry === undefined || currentCountry.name === 'global' ? lineChart : barChart}
    </section>
  );
};

export default Chart

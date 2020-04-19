import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import cn from 'classnames';
import React from 'react';
import CountUp from 'react-countup';
import { CurrentCountry } from '../../App';
import { formatDate } from '../../helpers';
import styles from './Cards.module.scss';

interface Props {
  data: CurrentCountry | undefined;
}

const Cards: React.FC<Props> = ({ data }) => {
  console.info('[Cards] data', data);

  if (!data?.detail) return <div>No data{data?.name ? ` for ${data.name}` : ''} !</div>
  const { confirmed, deaths, lastUpdate, recovered } = data.detail;

  return (
    <section className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className={cn(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">{ formatDate(lastUpdate) }</Typography>
            <Typography variant="body2">Number of active cases of COVID-19</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cn(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">{ formatDate(lastUpdate) }</Typography>
            <Typography variant="body2">Number of recoveries from COVID-19</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cn(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">{ formatDate(lastUpdate) }</Typography>
            <Typography variant="body2">Number of deaths from COVID-19</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </section>
  );
};
export default Cards

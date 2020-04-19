import { FormControl, NativeSelect } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { useAsync } from 'react-use';
import { Countries, fetchData } from '../../api';
import styles from './CountryPicker.module.scss';

interface Props {
  onCountryChange(event: ChangeEvent<HTMLSelectElement>): void
}

const CountryPicker: React.FC<Props> = ({ onCountryChange }) => {
  const { value, error, loading } = useAsync(() => fetchData<Countries>('/countries'), []);

  if (loading) return <div>Loading ...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!value?.countries.length) return <div>No data !</div>;

  console.info('[CountryPicker] countries', value);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue='global' onChange={onCountryChange}>
        <option value="global">Global</option>
        {value.countries.map(({ iso3, name }, i) => (
          <option key={i} value={name}>{name}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;

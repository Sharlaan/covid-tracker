import React, { ChangeEvent, useState } from 'react';
import { useAsync } from 'react-use';
import { Country, CountryDetail, CovidResponse, fetchData } from './api';
import styles from './App.module.scss';
import { Cards, Chart, CountryPicker } from './components';

// When detail is null, it means there were an error somewhere to grab the data
export interface CurrentCountry { name: Country['name']; detail: CountryDetail | null }

export default function App() {
  const { value: globalData, error, loading } = useAsync(() => fetchData<CovidResponse>(''), [])
  const [currentCountry, setCurrentCountry] = useState<CurrentCountry>();

  globalData && console.info('[App] globalData', globalData);

  // If currentCountry is undefined, it means it is not initialized yet
  // so we initialize it
  if (!loading && globalData && !currentCountry) {
    console.warn('Initializing currentCountry ...');
    setCurrentCountry({
      name: 'global',
      detail: {
        confirmed: globalData.confirmed,
        deaths: globalData.deaths,
        lastUpdate: globalData.lastUpdate,
        recovered: globalData.recovered,
      },
    });
  }

  async function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedCountryName = event.target.value as Country['name'] | 'global'
    let countryDetail: CountryDetail | null;
    if (selectedCountryName === 'global') {
      if (!globalData) throw new Error("CurrentCountry in App's state should not be undefined ...");
      countryDetail = {
        confirmed: globalData.confirmed,
        deaths: globalData.deaths,
        lastUpdate: globalData.lastUpdate,
        recovered: globalData.recovered,
      };
    } else {
      try {
        countryDetail = (await fetchData<CountryDetail>(`/countries/${selectedCountryName}`))
      } catch (error) {
        console.error(error)
        countryDetail = null;
      }
    }
    setCurrentCountry({ detail: countryDetail, name: selectedCountryName });
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>COVID-SRAS2 (2019 - 2020)</p> */}
      </header>

      <main className={styles.container}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <Cards data={currentCountry} />

            <CountryPicker onCountryChange={handleCountryChange} />

            <Chart currentCountry={currentCountry} />
          </>
        )}
      </main>
    </div>
  );
}

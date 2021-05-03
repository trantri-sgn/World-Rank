import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import CountriesTable from '../components/CountriesTable/CountriesTable';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css'
import { useState } from 'react';




export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(keyword) || country.region.toLowerCase().includes(keyword) || country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts} >
          Found {filterCountries.length} countries
      </div>
        <div className={styles.input} >
          <SearchInput placeholder="Filter by Name, Region, Subregion" onChange={onInputChange} />
        </div>
      </div>
      <CountriesTable countries={filterCountries} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
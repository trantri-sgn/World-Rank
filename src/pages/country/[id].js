import { useEffect, useState } from "react";

import Layout from '../../components/Layout/Layout'
import styles from './Country.module.css'


const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );

    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  console.log(borders);
    return (
        <Layout title={country.name}>
            <div className={styles.container}> 

                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.flag} />
                        <h2 className={styles.overview_name}>{country.name}</h2>
                        <h3 className={styles.overview_region}>{country.region}</h3>
              
                        <div className={styles.overview_numbers}>
                        <div>
                            <div >
                                {country.population}
                            </div>
                            <div className={styles.overview_label}>Population</div>
                        </div>
                        <div>
                            <div>
                                {country.area}
                            </div>
                            <div className={styles.overview_label}>Area</div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h3 className={styles.details_panel_heading }>Details</h3>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Capital
                           </div>
                            <div>{country.capital}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Subregion
                           </div>
                            <div>{country.subregion}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Languages
                           </div>
                            <div>{country.languages.map(({name}) => name).join(", ") }</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                               Currencies
                           </div>
                            <div>{country.currencies.map(({name})=> name).join(", ")}</div>
                        </div>

                         <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                              Native name
                           </div>
                            <div>{country.nativeName}</div>
                        </div>

                         <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                              Gini
                           </div>
                            <div>{country.gini}%</div>
                        </div>

                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>

                            <div className={styles.details_panel_borders_container }>
                                {borders.map(({ flag, name }) => (
                                    <div className={styles.details_panel_borders_country} key={name}>
                                        <img src={flag} alt={name}></img>
                                        <div className={styles.details_panel_borders_name}>
                                            {name}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Country;



export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`)

    const country = await res.json();

    return {
        props: {
            country
        }
    }
}
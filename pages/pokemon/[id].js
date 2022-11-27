/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://pokemon-dev-2.s3.ap-south-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Details({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div className={styles.imgcontainer}>
          <img
            className={styles.picture}
            height="200px"
            width="215px"
            src={`https://pokemon-dev-2.s3.ap-south-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
          <div className={styles.name}>{pokemon.name}</div>
        </div>
        <div className={styles.details}>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table style={{display: 'block'}}>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

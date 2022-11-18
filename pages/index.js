/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

export async function getServerSideProps() {
  const resp = await fetch(
    "https://ssr-pokemon-dev.s3.amazonaws.com/json/index.json"
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Home({ pokemon }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <LazyLoadImage
                  src={`https://ssr-pokemon-dev.s3.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                  height="200px"
                  width="215px"
                  effect="blur"
                  placeholderSrc={`LNO;A3xu?GR;tTD*M|9a~VRjIqIW`}
                />
                <div className={styles.name}>{pokemon.name}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

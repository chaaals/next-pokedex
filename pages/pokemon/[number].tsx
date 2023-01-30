import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";

import useApi from "@/hooks/useApi";
import CardImage from "@/components/CardImage/CardImage";
import ControlButton from "@/components/ControlButton";
import Layout from "@/components/Layout";

import { Version } from "@/interfaces";
import { parseURL, getVersionQuery, capitalize } from "@/utils";

import styles from "./PokeView.module.css";
import pokeball from "../../public/assets/pokeball.svg";

const PokemonView = () => {
  const router = useRouter();

  const { version, number } = router.query;
  const versionQuery = getVersionQuery(version as string);

  const {
    result: pokemon,
    loading,
    error,
  } = useApi({
    get: "pokemon",
    url: `https://pokeapi.co/api/v2/pokemon/`,
    params: {
      number: number as string,
    },
  });

  if (loading) {
    return (
      <Layout pokeView>
        <section className={styles["pv-container"]}>
          <p>Loading...</p>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout pokeView>
        <p>Oops, something went wrong!</p>
      </Layout>
    );
  }

  return (
    <>
      {pokemon && !Array.isArray(pokemon.data) && (
        <Layout pokeView>
          <Head>
            <title>{capitalize(pokemon.data.name)} | BookéDEX</title>
          </Head>

          <section className={styles["pv-container"]}>
            <section className={styles["pv-section-one"]}>
              <CardImage
                src={parseURL(versionQuery, number as string)}
                name={pokemon.data.name}
                fallback="https://img.pokemondb.net/sprites/home/normal/unown-qm.png"
                width={200}
                height={200}
              />

              <h3 className={styles.capitalize}>{pokemon.data.name}</h3>

              <section className={styles["p-type-container"]}>
                {pokemon.data.types.map(({ slot, type }) => {
                  const pTypeClassnames = clsx(
                    styles["pokemon-type"],
                    styles.capitalize,
                    styles[`type-${type.name}`]
                  );

                  return (
                    <div key={slot} className={pTypeClassnames}>
                      {type.name}
                    </div>
                  );
                })}
              </section>

              <p>
                Weight: {pokemon.data.weight} Height: {pokemon.data.height}
              </p>
            </section>

            <section className={styles["pv-section-two"]}>
              <Image
                className={styles["pv-pokeball-bg"]}
                src={pokeball}
                alt="pv-pokeball"
                width={160}
                height={160}
              />
              <div>
                <h3>Dex Entry</h3>
                <article>{pokemon.data.flavor_text}</article>
              </div>

              <div className={styles["base-stats"]}>
                <h3>Base Stats</h3>
                {pokemon.data.stats.map(({ base_stat, stat }) => (
                  <div key={`${stat.name}`} className={styles.capitalize}>
                    {stat.name}: {base_stat}
                  </div>
                ))}
              </div>
            </section>
          </section>

          <section className={styles["pv-control-btn-container"]}>
            <ControlButton
              href="#"
              buttonType="normal"
              onClick={() => {
                const page = router.query.from as string;
                const ver = router.query?.version as Version;

                router.push(
                  `/?page=${page}&version=${ver}`,
                  page === "1" ? "/" : `/?page=${page}`
                );
              }}
              controlType="back"
            >
              &larr; Go Back
            </ControlButton>
          </section>
        </Layout>
      )}
    </>
  );
};

export default PokemonView;

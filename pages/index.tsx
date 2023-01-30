import Head from "next/head";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

import useApi from "@/hooks/useApi";
import usePagination from "@/hooks/usePagination";

import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import SelectVersion from "@/components/SelectVersion";
import ControlButton from "@/components/ControlButton";
import PokemonCardView from "@/components/PokemonCardView";

import { Version } from "@/interfaces";
import { getVersionQuery, parseURL } from "@/utils";

import styles from "@/components/Layout/Layout.module.css";

const Home = () => {
  const router = useRouter();
  const versionQuery = getVersionQuery(router.query.version as string);

  const [version, setVersion] = useState<Version>(versionQuery);
  const [search, setSearch] = useState({ keyword: "" });
  const { page: currentPage, next, prev } = usePagination();

  const { result, loading, error } = useApi({
    get: "all-pokemon",
    url: `https://pokeapi.co/api/v2/pokemon/`,
    params: {
      offset: currentPage?.offset,
    },
  });

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as string;
    const name = e.currentTarget.name as string;

    setSearch((k) => {
      return {
        ...k,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.keyword === "") return;

    router.push(
      `/search/${search.keyword}?version=${version}&page=${currentPage?.number}`,
      `/search/${search.keyword}`
    );
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as Version;
    setVersion(value);
  };

  if (error) {
    return (
      <Layout>
        <section className={styles.resultsContainer}>
          <p>Oops, something went wrong!</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>BookéDEX | Pokedex App</title>
      </Head>

      <section className={styles["control-container"]}>
        <SearchBar
          value={search.keyword}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <SelectVersion version={version} handleChange={handleSelectChange} />
      </section>

      <section className={styles["all-pokemon-container"]}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {result && (
              <>
                {Array.isArray(result.data) && (
                  <section className={styles["results-container"]}>
                    {result.data.map((pokemon) => {
                      return (
                        <PokemonCardView
                          key={pokemon.name}
                          pid={pokemon.pid}
                          name={pokemon.name}
                          imageURL={parseURL(version, pokemon.pid)}
                          version={version}
                          from={currentPage?.number as number}
                        />
                      );
                    })}
                  </section>
                )}

                <section className={styles["control-container"]}>
                  <ControlButton
                    href={
                      currentPage?.number === 1
                        ? "/"
                        : `/?page=${currentPage?.prev as number}`
                    }
                    buttonType="link"
                    onClick={prev}
                    controlType="prev"
                    disabled={result.pagination.prev === null}
                  >
                    Prev
                  </ControlButton>

                  <ControlButton
                    href={`/?page=${currentPage?.next as number}`}
                    buttonType="link"
                    onClick={next}
                    controlType="next"
                    disabled={result.pagination.next === null}
                  >
                    Next
                  </ControlButton>
                </section>
              </>
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;

// use this for fetching pokemon: https://pokeapi.co/api/v2/pokemon/?limit=20
// use this link for pictures: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/{pokemonid}.png

// fallback img : https://img.pokemondb.net/sprites/home/normal/unown-qm.png

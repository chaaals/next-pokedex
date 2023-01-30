import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import useApi from "@/hooks/useApi";
import Layout from "@/components/Layout";
import PokemonCardView from "@/components/PokemonCardView";

import styles from "./PokeSearch.module.css";
import { getVersionQuery, parseURL } from "@/utils";

const SearchResult = () => {
  const router = useRouter();

  const { version, keyword, page } = router.query;
  const versionQuery = getVersionQuery(version as string);

  const { result, loading, error } = useApi({
    get: "search",
    url: `https://pokeapi.co/api/v2/pokemon/`,
    params: {
      search: keyword?.toString().toLowerCase(),
    },
  });

  if (error)
    return (
      <Layout>
        <section className={styles.searchContainer}>
          <p>Cannot find results for: {keyword}</p>
          <Link href={`${page === "1" ? "/" : `/?page=${page}`}`}>Go back</Link>
        </section>
      </Layout>
    );

  return (
    <Layout>
      <Head>
        <title>Search Result for: {keyword} | BookéDEX</title>
      </Head>

      <section className={styles["search-container"]}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <section className={styles["search-result-container"]}>
            <p>Result for: {keyword}</p>
            {result && Array.isArray(result.data) && (
              <>
                {result.data.map((pokemon) => (
                  <PokemonCardView
                    key={pokemon.name}
                    pid={pokemon.pid}
                    name={pokemon.name}
                    imageURL={parseURL(versionQuery, pokemon.pid)}
                    version={version as string}
                    from={page as string}
                  />
                ))}
              </>
            )}
          </section>
        )}
      </section>
    </Layout>
  );
};

export default SearchResult;

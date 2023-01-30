import { useEffect, useState, useCallback } from "react";
import { AllPokemon, ApiResponse, Result } from "@/interfaces";
import { getAPIQuery, getPokemonID, getFlavorText } from "@/utils";

interface UseAPIArgs {
  get: string;
  url: string;
  params?: {
    offset?: number;
    number?: string;
    search?: string;
  };
}

const useApi = ({ get, url, params }: UseAPIArgs): Result => {
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean | null>(null);

  const { number, offset, search } = params ?? {};

  let _url: string;

  switch (get) {
    case "all-pokemon":
      _url = `${url}${getAPIQuery({ offset: offset as number })}`;
      break;
    case "pokemon":
      _url = `${url}${number as string}/`;
      break;
    case "search":
      _url = `${url}${search as string}`;
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(_url);
      const data = await res.json();

      if (data && get === "search") {
        setResult(() => {
          return {
            data: [
              {
                pid: `${data.id}`,
                name: data.name,
              },
            ],
            pagination: { next: null, prev: null },
          };
        });
        setLoading(false);
        return;
      }

      if (data && get === "pokemon") {
        const _res = await fetch(data.species.url);
        const _data = await _res.json();

        setResult({
          data: {
            id: data.id,
            name: data.name,
            types: data.types,
            stats: data.stats,
            weight: data.weight,
            height: data.height,
            flavor_text: getFlavorText(
              _data.flavor_text_entries,
              "en"
            ) as string,
          },
          pagination: { next: undefined, prev: undefined },
        });

        setLoading(false);
        return;
      }

      const pagination = { next: data.next, prev: data.previous };

      const _data = data.results.map((p: AllPokemon) => {
        const pid = getPokemonID(p.url as string) as string;

        return {
          ...p,
          pid,
        };
      });

      setResult({ data: _data, pagination });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(true);
      setLoading(false);
    }
  }, [params?.number, params?.offset]);

  useEffect(() => {
    if (offset !== undefined || number !== undefined || search !== undefined)
      fetchData();
  }, [params?.offset, params?.number, params?.search]);

  return { result, loading, error };
};

export default useApi;

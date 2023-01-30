import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Pagination, Page } from "@/interfaces";
import { calcPageOffset } from "@/utils";

const usePagination = (): Pagination => {
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);

  const next = () => {
    if (!page) return;

    setPage(() => {
      const nextPage = page.number + 1;
      const newState = {
        number: nextPage,
        offset: calcPageOffset(nextPage),
        next: nextPage + 1,
        prev: page.number,
      };

      return newState;
    });
  };

  const prev = () => {
    if (!page || page.number === 1) return;

    setPage(() => {
      const nextPage = page.number - 1;
      const newState = {
        number: nextPage,
        offset: calcPageOffset(nextPage),
        next: page.number,
        prev: nextPage - 1,
      };

      return newState;
    });
  };

  useEffect(() => {
    if (router.isReady) {
      const page = router.query.page as string;

      setPage({
        number: +page || 1,
        offset: page === undefined ? 0 : calcPageOffset(+page),
        next: page === undefined ? 2 : +page + 1,
        prev: page === undefined ? null : +page - 1,
      });
    }
  }, [router.isReady]);

  return {
    page,
    next,
    prev,
  };
};

export default usePagination;

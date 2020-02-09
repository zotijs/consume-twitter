import { useEffect } from "react";

const useFetch = (fetchAction, fetchArgs = []) => {
  useEffect(
    () => {
      fetchAction(...fetchArgs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchArgs
  );
};

export default useFetch;

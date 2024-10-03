import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface QueryParam {
  name: string;
  value: string;
}

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams: any = useSearchParams();
  const params = new URLSearchParams(searchParams);

  searchParams.set = (queries: QueryParam | QueryParam[]) => {
    if (!Array.isArray(queries)) {
      queries = [queries];
    }

    queries.forEach(({ name, value }) => {
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  searchParams.getAll = () => {
    const keyValuePairs: any = {};
    for (const pair of params.entries()) {
      const [key, value] = pair;
      keyValuePairs[key] = value;
    }
    return keyValuePairs;
  };

  return searchParams;
};

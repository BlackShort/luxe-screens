"use client";

import { useApiResource } from "@/hooks/api/use-api-resource";
import type { Theater } from "@/types";

async function fetchTheater(id: string): Promise<Theater | null> {
  const res = await fetch(`/api/theaters/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load theater");
  const data = await res.json();
  return data.theater ?? null;
}

export function useTheater(id: string | undefined) {
  const { data, loading, error } = useApiResource(
    id ? `theater:${id}` : "theater:none",
    () => (id ? fetchTheater(id) : Promise.resolve(null))
  );
  return { theater: id ? data ?? null : null, loading: id ? loading : false, error };
}

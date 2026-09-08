"use client";

import { useApiResource } from "@/hooks/api/use-api-resource";
import type { Theater } from "@/types";

async function fetchTheaters(): Promise<Theater[]> {
  const res = await fetch("/api/theaters");
  if (!res.ok) throw new Error("Failed to load theaters");
  const data = await res.json();
  return data.theaters ?? [];
}

/** All theaters across every city. Filter client-side for city-specific views. */
export function useTheaters() {
  const { data, loading, error } = useApiResource("theaters", fetchTheaters);
  return { theaters: data ?? [], loading, error };
}

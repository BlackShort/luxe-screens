"use client";

import { useApiResource } from "@/hooks/api/use-api-resource";
import { withIcon } from "@/data/addon-icons";
import type { AddOn, AddOnDTO } from "@/types";

async function fetchAddOns(): Promise<AddOn[]> {
  const res = await fetch("/api/addons");
  if (!res.ok) throw new Error("Failed to load add-ons");
  const data = await res.json();
  return (data.addOns ?? []).map((addOn: AddOnDTO) => withIcon(addOn));
}

export function useAddOns() {
  const { data, loading, error } = useApiResource("addons", fetchAddOns);
  return { addOns: data ?? [], loading, error };
}

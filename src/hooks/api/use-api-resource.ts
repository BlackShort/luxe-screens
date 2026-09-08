"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

// Module-scoped cache: the theater/add-on catalog rarely changes within a
// session, and several components on the same page (or across the booking
// wizard's steps) need it. This avoids a fetch waterfall without pulling in
// a data-fetching library for a couple of read-only endpoints.
//
// Modeled as an external store (read via useSyncExternalStore) rather than
// mirrored into component state, since the fetch itself is a side effect
// that lives outside any single component's lifecycle.
type Entry<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

const store = new Map<string, Entry<unknown>>();
const listeners = new Map<string, Set<() => void>>();
const inflight = new Map<string, Promise<unknown>>();

// useSyncExternalStore compares snapshots by reference — returning a fresh
// `{ status: "loading" }` object literal on every call looks like "the
// store changed" on every render and causes an infinite update loop.
// Use one shared, stable object for the "not started/loading" case instead.
const LOADING_ENTRY: Entry<never> = { status: "loading" };

function notify(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string, onStoreChange: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(onStoreChange);
  return () => listeners.get(key)?.delete(onStoreChange);
}

function ensureFetchStarted<T>(key: string, fetcher: () => Promise<T>) {
  if (store.has(key) || inflight.has(key)) return;

  const promise = fetcher()
    .then((data) => {
      store.set(key, { status: "success", data });
      notify(key);
    })
    .catch((err: unknown) => {
      store.set(key, {
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
      notify(key);
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
}

export function useApiResource<T>(key: string, fetcher: () => Promise<T>) {
  const getSnapshot = useCallback(
    (): Entry<T> => (store.get(key) as Entry<T> | undefined) ?? LOADING_ENTRY,
    [key]
  );

  const subscribeToKey = useCallback(
    (onStoreChange: () => void) => subscribe(key, onStoreChange),
    [key]
  );

  const entry = useSyncExternalStore(subscribeToKey, getSnapshot, getSnapshot);

  useEffect(() => {
    ensureFetchStarted(key, fetcher);
    // Only `key` identifies the request — `fetcher` is expected to be a
    // stable recipe for that key even if the caller passes a new closure
    // on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return {
    data: entry.status === "success" ? entry.data : undefined,
    loading: entry.status === "loading",
    error: entry.status === "error" ? entry.message : null,
  };
}

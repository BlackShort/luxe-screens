"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";

import { useTheaters } from "@/hooks/api/use-theaters";
import { cities } from "@/data/content";
import { formatCurrency, cn } from "@/lib/utils";
import type { Theater } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/layout/site-layout";
type SortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating";

export default function GalleryPage() {
  const { theaters, loading } = useTheaters();
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [lightboxRoom, setLightboxRoom] =
    useState<Theater | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = theaters.filter((theater) => {
      const matchesCity =
        cityFilter === "All" || theater.city === cityFilter;

      const matchesQuery =
        q.length === 0 ||
        theater.name.toLowerCase().includes(q) ||
        theater.city.toLowerCase().includes(q) ||
        theater.amenities.some((amenity) =>
          amenity.toLowerCase().includes(q)
        );

      return matchesCity && matchesQuery;
    });

    list = [...list];

    if (sort === "price-asc") {
      list.sort((a, b) => a.basePrice - b.basePrice);
    }

    if (sort === "price-desc") {
      list.sort((a, b) => b.basePrice - a.basePrice);
    }

    if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [query, cityFilter, sort, theaters]);

  function openLightbox(room: Theater) {
    setLightboxRoom(room);
    setLightboxIndex(0);
  }

  function closeLightbox() {
    setLightboxRoom(null);
    setLightboxIndex(0);
  }

  function moveLightbox(delta: number) {
    if (!lightboxRoom) return;

    const length = lightboxRoom.images.length;

    if (length <= 1) return;

    setLightboxIndex(
      (current) => (current + delta + length) % length
    );
  }

  return (
    <SiteLayout>
      <div className="py-12 px-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Every room, at a glance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Explore our available rooms, compare amenities, and find
            the right space for your next screening.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search rooms, cities, amenities…"
              aria-label="Search rooms"
              className="pl-9 h-9"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* City */}
            <select
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
              aria-label="Filter by city"
              className={cn(
                "h-9 rounded-md border border-input bg-background px-3",
                "text-sm text-foreground shadow-xs",
                "outline-none transition-colors",
                "focus:border-ring focus:ring-3 focus:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <option value="All">All cities</option>

              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortKey)
              }
              aria-label="Sort rooms"
              className={cn(
                "h-9 rounded-md border border-input bg-background px-3",
                "text-sm text-foreground shadow-xs",
                "outline-none transition-colors",
                "focus:border-ring focus:ring-3 focus:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">
                Price: Low to High
              </option>
              <option value="price-desc">
                Price: High to Low
              </option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {loading ? (
          <p className="mb-6 text-xs text-muted-foreground">Loading rooms…</p>
        ) : (
          <p className="mb-6 text-xs text-muted-foreground">
            {results.length}{" "}
            {results.length === 1 ? "room" : "rooms"} found
          </p>
        )}

        {/* Gallery */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-4/3 animate-pulse rounded-lg border border-border bg-muted" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => openLightbox(room)}
                className={cn(
                  "group w-full text-left",
                  "rounded-lg outline-none",
                  "focus-visible:ring-3 focus-visible:ring-ring/50"
                )}
              >
                {/* Image */}
                <div
                  className={cn(
                    "relative aspect-4/3 overflow-hidden rounded-lg",
                    "border border-border bg-muted"
                  )}
                >
                  <Image
                    src={room.images[0] ?? ""}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-foreground/0",
                      "transition-colors duration-300",
                      "group-hover:bg-foreground/5"
                    )}
                  />
                </div>

                {/* Room details */}
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {room.name}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin
                        size={11}
                        aria-hidden="true"
                      />
                      {room.city}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-primary">
                    {formatCurrency(room.basePrice)}
                  </p>
                </div>

                {/* Meta */}
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star
                      size={11}
                      aria-hidden="true"
                      className="text-primary"
                      fill="currentColor"
                    />
                    {room.rating}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users
                      size={11}
                      aria-hidden="true"
                    />
                    {room.maxCapacity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="text-sm font-medium text-foreground">
              No rooms found
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try a different city or search keyword.
            </p>

            {(query || cityFilter !== "All") && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setQuery("");
                  setCityFilter("All");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}

        {/* Lightbox */}
        {lightboxRoom ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxRoom.name} gallery`}
            className="fixed inset-0 z-60 flex items-center justify-center bg-foreground/95 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close gallery"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 text-background hover:bg-background/10 hover:text-background"
            >
              <X size={20} />
            </Button>

            {/* Content */}
            <div
              className="w-full max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Main image */}
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted">
                <Image
                  src={
                    lightboxRoom.images[lightboxIndex] ?? ""
                  }
                  alt={lightboxRoom.name}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />

                {lightboxRoom.images.length > 1 ? (
                  <>
                    {/* Previous */}
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      aria-label="Previous image"
                      onClick={() => moveLightbox(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                    >
                      <ChevronLeft size={18} />
                    </Button>

                    {/* Next */}
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      aria-label="Next image"
                      onClick={() => moveLightbox(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </>
                ) : null}
              </div>

              {/* Details */}
              <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-background">
                    {lightboxRoom.name}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-sm text-background/70">
                    <MapPin size={13} aria-hidden="true" />
                    {lightboxRoom.address}, {lightboxRoom.city}
                  </p>
                </div>

                <p className="text-lg font-semibold text-primary">
                  {formatCurrency(lightboxRoom.basePrice)}
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-4 flex flex-wrap gap-2">
                {lightboxRoom.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-background/20 bg-background/5 px-3 py-1 text-xs text-background/80"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Image counter */}
              {lightboxRoom.images.length > 1 ? (
                <p className="mt-4 text-center text-xs text-background/60">
                  {lightboxIndex + 1} /{" "}
                  {lightboxRoom.images.length}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </SiteLayout>
  );
}
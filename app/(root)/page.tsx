import SearchForm from "../../components/SearchForm";
import { SanityLive } from "@/sanity/lib/live";
import { Suspense } from "react";
import StartupCards from "../../components/StartupCards";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup ,<br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <Suspense fallback={<Skeleton />}>
          <SearchForm searchParams={searchParams} />
        </Suspense>
      </section>

      <section className="section_container">
        <Suspense fallback={<Skeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </section>

      <SanityLive />
    </>
  );
}

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";

  return (
    <>
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>
      <StartupCards searchParams={searchParams} />
    </>
  );
}

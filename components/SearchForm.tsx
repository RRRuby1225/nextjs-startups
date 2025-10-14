import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";


const SearchForm = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search for Startups"
      />

      <div className="flex gap-2">
        <button type="submit" className="search-btn text-white">
          <Search />
        </button>
        <SearchFormReset />
      </div>
    </Form>
  );
};

export default SearchForm;

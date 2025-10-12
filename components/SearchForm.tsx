import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

// 1. 将组件函数标记为 async
const SearchForm = async ({
  // 2. 明确 props 的类型为 Promise，这有助于 TypeScript 和代码可读性
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  // 3. 使用 await 来解开 Promise
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

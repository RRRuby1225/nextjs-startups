"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const router = useRouter();

  const reset = () => {
    const form = document.querySelector("form");
    if (form) {
      form.reset();
    }
    router.push("/");
  };

  return (
    <button type="reset" onClick={reset} className="search-btn text-white">
      <X />
    </button>
  );
};

export default SearchFormReset;

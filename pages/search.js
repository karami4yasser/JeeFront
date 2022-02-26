import { useRouter } from "next/router";
import React, { useState } from "react";

function search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleclick = () => {
    router.push(`/?product=${search}`);
  };

  return (
    <div className="flex flex-col">
      <h1>where i am</h1>
      <form>
        <h5>search</h5>
        <input
          className="h-8 px-2 mb-5 bg-slate-900 "
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <button className="bg-white caret-white" onClick={handleclick}>
        search
      </button>
    </div>
  );
}

export default search;

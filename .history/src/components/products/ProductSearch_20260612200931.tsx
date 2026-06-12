"use client";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ProductSearch({
  searchQuery,
  onSearchChange,
}: ProductSearchProps) {
  return (
    <div className="mx-auto mb-8 max-w-xl">
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search cakes, pastries, cookies..."
        className="
          w-full
          rounded-full
          border
          border-[#F3E7E2]
          bg-white
          px-6
          py-3
          text-[#3A2A2A]
          shadow-sm
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-[#D7A8A0]
          focus:ring-2
          focus:ring-[#F7C8D0]
        "
      />
    </div>
  );
}
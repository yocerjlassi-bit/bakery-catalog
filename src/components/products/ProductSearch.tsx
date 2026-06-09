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
    <div className="mx-auto mb-6 max-w-xl">
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search products..."
        className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 outline-none focus:border-pink-500"
      />
    </div>
  );
}
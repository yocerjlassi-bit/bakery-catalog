"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              isSelected
                ? "border-[#D7A8A0] bg-[#F7C8D0] text-[#3A2A2A] shadow-sm"
                : "border-[#F3E7E2] bg-white text-[#6B5B5B] hover:border-[#D7A8A0] hover:bg-[#FFF8F4]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
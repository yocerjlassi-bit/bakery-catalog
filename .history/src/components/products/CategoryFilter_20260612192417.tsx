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
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              isSelected ? "bg-[#B97A95] text-white"
              : "bg-white text-[#6B5B5B]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

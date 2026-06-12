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
              isSelected
                ? "bg-pink-600 text-white"
                : "bg-white text-gray-700 hover:bg-[#A86C86] hover:bg-[#A86C86]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

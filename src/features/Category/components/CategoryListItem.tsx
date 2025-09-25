import { Link } from "react-router";
import { ImageOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types";

interface Props {
  className?: string;
  cat: Category;
}

export default function CategoryListItem({ cat }: Props) {
  return (
    <Card
      key={cat.id}
      className="bg-pure-white shadow-sm hover:shadow-md transition-shadow group"
    >
      <Link to={`/category/${cat.id}`}>
        <CardContent className="p-3 flex flex-col items-center text-center">
          <div className="h-20 w-full flex items-center justify-center bg-smoke-white rounded-md overflow-hidden">
            {cat.thumbnailUrl ? (
              <img
                src={cat.thumbnailUrl}
                alt={cat.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <ImageOff className="h-6 w-6 text-graphite-gray" />
            )}
          </div>
          <p className="mt-2 text-xs font-medium text-charcoal-black line-clamp-2">
            {cat.name}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

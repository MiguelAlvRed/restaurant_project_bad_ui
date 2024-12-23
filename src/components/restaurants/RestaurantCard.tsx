import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import type { Restaurant } from '../../types/database.types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavoriteToggle: (id: string) => void;
  isFavorite: boolean;
}

export function RestaurantCard({ restaurant, onFavoriteToggle, isFavorite }: RestaurantCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-card hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] bg-muted">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 z-10 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          onClick={() => onFavoriteToggle(restaurant.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite && "fill-current text-red-500"
            )} 
          />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{restaurant.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{restaurant.address}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">{'€'.repeat(restaurant.price_range)}</span>
          <span className="text-muted-foreground">·</span>
          <div className="flex items-center">
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({restaurant.review_count})</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {restaurant.cuisine_types.map((type) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
          {restaurant.dietary_options.map((option) => (
            <Badge key={option} variant="outline" className="text-xs">
              {option}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
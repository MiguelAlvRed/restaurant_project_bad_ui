import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { RestaurantFilters } from './RestaurantFilters';
import { RestaurantList } from './RestaurantList';
import { useRestaurants } from '../../lib/hooks/useRestaurants';
import { useGeolocation } from '../../lib/hooks/useGeolocation';
import { useFavorites } from '../../hooks/useFavorites';
import type { FilterState } from '../../lib/types';

export function RestaurantSearch() {
  const { location, loading: isLocating, requestLocation } = useGeolocation();
  const { favorites, toggleFavorite } = useFavorites();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [],
    cuisineTypes: [],
    dietaryOptions: [],
    radius: 5,
    rating: 0
  });

  const { restaurants, loading, error } = useRestaurants(filters, location);

  return (
    <div className="space-y-6">
      <Input
        icon={<Search className="h-5 w-5" />}
        type="text"
        placeholder="Buscar restaurantes..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <RestaurantFilters
        filters={filters}
        onFilterChange={setFilters}
        onLocationRequest={requestLocation}
        isLocating={isLocating}
      />

      {error ? (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      ) : (
        <RestaurantList
          restaurants={restaurants}
          favorites={favorites}
          onFavoriteToggle={toggleFavorite}
        />
      )}
    </div>
  );
}
import { Button } from '../ui/button';
import { CUISINE_TYPES, DIETARY_OPTIONS } from '../../lib/constants';
import type { FilterState } from '../../lib/types';

interface RestaurantFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onLocationRequest: () => void;
  isLocating: boolean;
}

export function RestaurantFilters({
  filters,
  onFilterChange,
  onLocationRequest,
  isLocating
}: RestaurantFiltersProps) {
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo de Cocina</label>
        <div className="flex flex-wrap gap-2">
          {CUISINE_TYPES.map((cuisine) => (
            <Button
              key={cuisine}
              variant={filters.cuisineTypes.includes(cuisine) ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => {
                const newCuisineTypes = filters.cuisineTypes.includes(cuisine)
                  ? filters.cuisineTypes.filter((c) => c !== cuisine)
                  : [...filters.cuisineTypes, cuisine];
                handleFilterChange('cuisineTypes', newCuisineTypes);
              }}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Opciones Dietéticas</label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={filters.dietaryOptions.includes(option) ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => {
                const newDietaryOptions = filters.dietaryOptions.includes(option)
                  ? filters.dietaryOptions.filter((o) => o !== option)
                  : [...filters.dietaryOptions, option];
                handleFilterChange('dietaryOptions', newDietaryOptions);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Ubicación</label>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLocationRequest}
            disabled={isLocating}
          >
            {isLocating ? 'Localizando...' : 'Usar mi ubicación'}
          </Button>
        </div>
      </div>
    </div>
  );
}
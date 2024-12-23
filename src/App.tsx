import { ThemeProvider } from './components/theme-provider';
import { Header } from './components/layout/Header';
import { RestaurantSearch } from './components/restaurants/RestaurantSearch';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="hambre-theme">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Encuentra tu restaurante ideal en Madrid
          </h1>
          <div className="max-w-5xl mx-auto">
            <RestaurantSearch />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
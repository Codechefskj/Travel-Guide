import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext(undefined);
const STORAGE_KEY = '@travelguide:favorites';

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  // `hydrated` prevents us from overwriting saved data with the empty
  // initial state before AsyncStorage has finished loading.
  const [hydrated, setHydrated] = useState(false);

  // Load persisted favourites once, when the app starts.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (mounted && raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setFavoriteIds(parsed);
        }
      } catch (err) {
        console.warn('Could not load favourites:', err);
      } finally {
        if (mounted) setHydrated(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist favourites whenever they change (but only after hydration).
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds)).catch((err) =>
      console.warn('Could not save favourites:', err)
    );
  }, [favoriteIds, hydrated]);

  const isFavorite = useCallback((id) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clearFavorites = useCallback(() => setFavoriteIds([]), []);

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite, clearFavorites, hydrated }),
    [favoriteIds, isFavorite, toggleFavorite, clearFavorites, hydrated]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside a FavoritesProvider');
  return ctx;
}
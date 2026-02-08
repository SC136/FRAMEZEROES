'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wallpaper-favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever favorites change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
        }
    }, [favorites, isLoaded]);

    const isFavorite = useCallback((wallpaperId) => {
        return favorites.includes(wallpaperId);
    }, [favorites]);

    const toggleFavorite = useCallback((wallpaperId) => {
        setFavorites(prev => {
            if (prev.includes(wallpaperId)) {
                return prev.filter(id => id !== wallpaperId);
            }
            return [...prev, wallpaperId];
        });
    }, []);

    const addFavorite = useCallback((wallpaperId) => {
        setFavorites(prev => {
            if (prev.includes(wallpaperId)) return prev;
            return [...prev, wallpaperId];
        });
    }, []);

    const removeFavorite = useCallback((wallpaperId) => {
        setFavorites(prev => prev.filter(id => id !== wallpaperId));
    }, []);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return {
        favorites,
        isLoaded,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
        count: favorites.length,
    };
}

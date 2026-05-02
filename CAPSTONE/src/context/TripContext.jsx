import { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
  try {
    const saved = localStorage.getItem('yatraboyz_trips');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        from: "Delhi",
        destination: "Goa",
        budget: 15000,
        days: 5,
        notes: "Beach + parties"
      },
      {
        id: 2,
        from: "Mumbai",
        destination: "Manali",
        budget: 20000,
        days: 6,
        notes: "Snow + adventure"
      },
      {
        id: 3,
        from: "Bangalore",
        destination: "Jaipur",
        budget: 12000,
        days: 4,
        notes: "Heritage trip"
      }
    ];
  } catch {
    return [];
  }
});

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('yatraboyz_dark') === 'true';
  });

  // Persist trips
  useEffect(() => {
    localStorage.setItem('yatraboyz_trips', JSON.stringify(trips));
  }, [trips]);

  // Persist & apply dark mode
  useEffect(() => {
    localStorage.setItem('yatraboyz_dark', darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTrip = (trip) => {
    setTrips(prev => [...prev, { id: Date.now(), ...trip }]);
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  const editTrip = (id, updated) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const totalBudget = trips.reduce((sum, t) => sum + Number(t.budget || 0), 0);

  return (
    <TripContext.Provider value={{
      trips, addTrip, deleteTrip, editTrip,
      darkMode, setDarkMode,
      totalBudget
    }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrips = () => useContext(TripContext);

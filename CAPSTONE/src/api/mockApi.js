export function fetchMockTrips() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          from: 'Delhi',
          destination: 'Goa',
          budget: 20000,
          days: 5,
          notes: 'Beach + nightlife 🌴'
        },
        {
          id: 2,
          from: 'Mumbai',
          destination: 'Manali',
          budget: 15000,
          days: 4,
          notes: 'Snow vibes ❄️'
        },
        {
          id: 3,
          from: 'Bangalore',
          destination: 'Jaipur',
          budget: 12000,
          days: 3,
          notes: 'Palaces 🏰'
        }
      ]);
    }, 500); // simulate loading
  });
}
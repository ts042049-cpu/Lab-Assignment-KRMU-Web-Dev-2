const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export const fetchRealPlaces = async (query) => {
  if (!API_KEY) {
    throw new Error('API Key missing. Please add VITE_GOOGLE_PLACES_API_KEY to your .env file.');
  }

  try {
    // Note: Calling Google Places API directly from the browser usually results in CORS errors.
    // For this local prototype, we route it through a public CORS proxy. 
    // In production, this call must be moved to your backend server.
    const targetUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    
    // Add a timeout so it doesn't hang forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    const data = await response.json();
    
    if (data.status === 'REQUEST_DENIED' || data.error_message) {
      throw new Error(data.error_message || 'API request denied. Is your API key valid?');
    }
    
    if (data.results && data.results.length > 0) {
      // Return top 4 results
      return data.results.slice(0, 4).map(place => ({
        name: place.name,
        rating: place.rating || 'N/A',
        address: place.formatted_address || 'Address not available'
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching real places for query: ${query}`, error);
    throw error; // Re-throw to AiPlannerPage so it can show the warning
  }
};

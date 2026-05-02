import { useState, useEffect } from 'react';
import { useTrips } from '../context/TripContext';
import './Planner.css';


const AVIATIONSTACK_KEY = '2e0c74c1ea54873ed6393e92c79d79a8';
const ORS_KEY           = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImM3ZjAzMGFmNDgyZDRmZGU4NzFmYjI3YzY2NDdjMTdiIiwiaCI6Im11cm11cjY0In0=';

const CITY_IATA = {
  Delhi: 'DEL', Goa: 'GOI', Manali: 'KUU', Jaipur: 'JAI',
  Kerala: 'COK', Ladakh: 'IXL', Rishikesh: 'DED', Mysore: 'MYQ',
  Andaman: 'IXZ', Coorg: 'IXI', Spiti: 'KUU', Varanasi: 'VNS',
  Meghalaya: 'SHL', Mumbai: 'BOM', Bangalore: 'BLR',
  Hyderabad: 'HYD', Kolkata: 'CCU', Chennai: 'MAA',
  Pune: 'PNQ', Ahmedabad: 'AMD',
};

const CITY_COORDS = {
  Delhi:      [77.2090, 28.6139], Goa:        [73.8278, 15.4909],
  Manali:     [77.1892, 32.2396], Jaipur:     [75.7873, 26.9124],
  Kerala:     [76.2673, 10.8505], Ladakh:     [77.5771, 34.1526],
  Rishikesh:  [78.2676, 30.0869], Mysore:     [76.6394, 12.2958],
  Andaman:    [92.7265, 11.7401], Coorg:      [75.7382, 12.3375],
  Spiti:      [78.0338, 32.2461], Varanasi:   [82.9739, 25.3176],
  Meghalaya:  [91.3662, 25.4670], Mumbai:     [72.8777, 19.0760],
  Bangalore:  [77.5946, 12.9716], Hyderabad:  [78.4867, 17.3850],
  Kolkata:    [88.3639, 22.5726], Chennai:    [80.2707, 13.0827],
  Pune:       [73.8567, 18.5204], Ahmedabad:  [72.5714, 23.0225],
  Chandigarh: [76.7794, 30.7333], Amritsar:   [74.8727, 31.6340],
  Lucknow:    [80.9462, 26.8467], Indore:     [75.8577, 22.7196],
  Bhopal:     [77.4126, 23.2599], Nagpur:     [79.0882, 21.1458],
  Surat:      [72.8311, 21.1702], Agra:       [78.0081, 27.1767],
};

function resolveCoords(cityName) {
  if (!cityName) return null;
  const direct = CITY_COORDS[cityName];
  if (direct) return direct;
  const key = Object.keys(CITY_COORDS).find(k =>
    cityName.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(cityName.toLowerCase())
  );
  return key ? CITY_COORDS[key] : null;
}

function resolveIata(cityName) {
  if (!cityName) return null;
  const direct = CITY_IATA[cityName];
  if (direct) return direct;
  const key = Object.keys(CITY_IATA).find(k =>
    cityName.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(cityName.toLowerCase())
  );
  return key ? CITY_IATA[key] : null;
}

function useFlights(from, destination, active) {
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!active || !from || !destination) return;
    const depIata = resolveIata(from);
    const arrIata = resolveIata(destination);

    if (!depIata || !arrIata) {
      setError('Airport code not found for this route.');
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setFlights(null);

    fetch(
      `https://api.aviationstack.com/v1/flights?access_key=${AVIATIONSTACK_KEY}&dep_iata=${depIata}&arr_iata=${arrIata}&limit=5`,
      { signal: controller.signal }
    )
      .then(r => r.json())
      .then(json => {
        if (json.error) throw new Error(json.error.info || 'API error');
        const data = json.data || [];
        if (data.length === 0) setError('No flights found for this route today.');
        else setFlights(data.slice(0, 5));
      })
      .catch(err => { if (err.name !== 'AbortError') setError(err.message || 'Could not fetch flights.'); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [from, destination, active]);

  return { flights, loading, error };
}


function useRoad(from, destination, active) {
  const [road, setRoad]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (!active || !from || !destination) return;
    const fromCoords = resolveCoords(from);
    const toCoords   = resolveCoords(destination);

    if (!fromCoords || !toCoords) {
      setError('Coordinates not found for this route. Try a major city name.');
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setRoad(null);

    fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': ORS_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [fromCoords, toCoords],
      }),
    })
      .then(r => r.json())
      .then(json => {
        if (json.error) throw new Error(json.error.message || 'ORS API error');
        const summary = json.routes?.[0]?.summary;
        if (!summary) throw new Error('No route found between these cities.');
        const distKm  = (summary.distance / 1000).toFixed(0);
        const durMin  = Math.round(summary.duration / 60);
        const hours   = Math.floor(durMin / 60);
        const mins    = durMin % 60;
        setRoad({
          distanceKm: distKm,
          durationText: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`,
          via: 'Driving (fastest route)',
        });
      })
      .catch(err => { if (err.name !== 'AbortError') setError(err.message || 'Could not fetch road data.'); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [from, destination, active]);

  return { road, loading, error };
}


function TransportTabs({ from, destination }) {
  const [tab, setTab] = useState(null);  

  const flightActive = tab === 'flights';
  const roadActive   = tab === 'road';

  const { flights, loading: fLoading, error: fError } = useFlights(from, destination, flightActive);
  const { road,    loading: rLoading, error: rError  } = useRoad(from, destination, roadActive);

  if (!from || !destination) return null;

  return (
    <div className='transport-tabs'>
      <div className='transport-tab-btns'>
        <button
          className={`transport-tab-btn ${tab === 'flights' ? 'active' : ''}`}
          onClick={() => setTab(t => t === 'flights' ? null : 'flights')}
        >
          Flights
        </button>
        <button
          className={`transport-tab-btn ${tab === 'road' ? 'active' : ''}`}
          onClick={() => setTab(t => t === 'road' ? null : 'road')}
        >
          Road
        </button>
      </div>


      {tab === 'flights' && (
        <div className='transport-panel'>
          {fLoading && <div className='transport-loading'>Fetching live flights...</div>}
          {fError   && <div className='transport-error'>{fError}</div>}
          {flights && flights.length > 0 && (
            <div className='flight-table-wrap'>
              <table className='flight-table'>
                <thead>
                  <tr>
                    <th>Airline</th>
                    <th>Flight</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((f, i) => {
                    const depTime = f.departure?.scheduled
                      ? new Date(f.departure.scheduled).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                      : '--';
                    const arrTime = f.arrival?.scheduled
                      ? new Date(f.arrival.scheduled).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                      : '--';
                    const status = f.flight_status || 'scheduled';
                    return (
                      <tr key={i}>
                        <td>{f.airline?.name || '--'}</td>
                        <td>{f.flight?.iata || '--'}</td>
                        <td>{depTime}</td>
                        <td>{arrTime}</td>
                        <td>
                          <span className={`flight-status flight-status--${status}`}>{status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}


      {tab === 'road' && (
        <div className='transport-panel'>
          {rLoading && <div className='transport-loading'>Calculating road route...</div>}
          {rError   && <div className='transport-error'>{rError}</div>}
          {road && (
            <div className='road-result'>
              <div className='road-row'>
                <span className='road-label'>Distance</span>
                <span className='road-val'>{road.distanceKm} km</span>
              </div>
              <div className='road-row'>
                <span className='road-label'>Drive time</span>
                <span className='road-val'>{road.durationText}</span>
              </div>
              <div className='road-row'>
                <span className='road-label'>Mode</span>
                <span className='road-val'>{road.via}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const DESTINATIONS = [
  
  'Goa', 'Andaman', 'Pondicherry', 'Gokarna', 'Varkala',
  'Manali', 'Shimla', 'Dharamshala', 'Spiti', 'Ladakh',
  'Mussoorie', 'Nainital', 'Auli', 'Kasauli',
  'Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Agra',
  'Delhi', 'Varanasi', 'Lucknow', 'Hyderabad',

  'Kerala', 'Munnar', 'Coorg', 'Ooty', 'Wayanad', 'Mysore',
  'Meghalaya', 'Shillong', 'Gangtok', 'Tawang', 'Kaziranga',

  'Rishikesh', 'Haridwar', 'Amritsar', 'Tirupati',
  'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
];

const EMPTY_FORM = { from: '', destination: '', budget: '', days: '', notes: '' };

function Planner() {
  const { trips, addTrip, deleteTrip, editTrip } = useTrips();
  const [form, setForm]     = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.from.trim()) e.from = 'Please enter departure city';
    if (!form.destination) e.destination = 'Please select a destination';
    if (!form.budget || isNaN(form.budget) || Number(form.budget) <= 0) e.budget = 'Enter a valid budget';
    if (!form.days || isNaN(form.days) || Number(form.days) <= 0) e.days = 'Enter valid number of days';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editId !== null) {
      editTrip(editId, form);
      setEditId(null);
    } else {
      addTrip({ ...form, budget: Number(form.budget), days: Number(form.days) });
    }
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleEdit = (trip) => {
    setForm({ from: trip.from, destination: trip.destination, budget: trip.budget, days: trip.days, notes: trip.notes || '' });
    setEditId(trip.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setErrors({});
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className='planner container'>
      <div className='planner-layout'>
        <div className='planner-form card fade-up'>
          <h2>{editId ? 'Edit Trip' : 'Plan a Trip'}</h2>
          <div className='form-group'>
            <label>From</label>
            <select
              value={form.from}
              onChange={e => handleChange('from', e.target.value)}
              className={errors.from ? 'input-error' : ''}
            >
              <option value=''>Select departure city...</option>
              {Object.keys(CITY_COORDS).map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>
            {errors.from && <span className='error-msg'>{errors.from}</span>}
          </div>
          <div className='form-group'>
            <label>Destination</label>
            <select
              value={form.destination}
              onChange={e => handleChange('destination', e.target.value)}
              className={errors.destination ? 'input-error' : ''}
            >
              <option value=''>Select destination...</option>
              {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
            </select>
            {errors.destination && <span className='error-msg'>{errors.destination}</span>}
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label>Budget (₹)</label>
              <input
                type='number'
                value={form.budget}
                onChange={e => handleChange('budget', e.target.value)}
                placeholder='e.g. 15000'
                className={errors.budget ? 'input-error' : ''}
              />
              {errors.budget && <span className='error-msg'>{errors.budget}</span>}
            </div>
            <div className='form-group'>
              <label>Number of Days</label>
              <input
                type='number'
                value={form.days}
                onChange={e => handleChange('days', e.target.value)}
                placeholder='e.g. 5'
                className={errors.days ? 'input-error' : ''}
              />
              {errors.days && <span className='error-msg'>{errors.days}</span>}
            </div>
          </div>

          <div className='form-group'>
            <label>Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={e => handleChange('notes', e.target.value)}
              placeholder='Any special plans, must-visits...'
              rows={3}
            />
          </div>

          <div className='form-actions'>
            <button className='btn-primary' onClick={handleSubmit}>
              {editId ? 'Save Changes' : 'Create Trip'}
            </button>
            {editId && <button className='btn-danger' onClick={handleCancel}>Cancel</button>}
          </div>
        </div>

        <BudgetCalculator />
      </div>

      <div className='trips-section'>
        <h2>My Trips ({trips.length})</h2>
        {trips.length === 0 ? (
          <div className='empty-state card'>
            <span>🗺️</span>
            <p>No trips yet! Plan your first adventure above.</p>
          </div>
        ) : (
          <div className='trips-grid'>
            {trips.map(t => (
              <TripCard key={t.id} trip={t} onEdit={handleEdit} onDelete={deleteTrip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TripCard({ trip, onEdit, onDelete }) {
  const daily = trip.days ? Math.round(trip.budget / trip.days) : 0;

  return (
    <div className='trip-card card fade-up'>
      <div className='trip-header'>
        <div>
          <h3 className='trip-route'>{trip.from} → {trip.destination}</h3>
          <span className='trip-meta'>{trip.days} days · ₹{Number(trip.budget).toLocaleString('en-IN')}</span>
        </div>
        <span className='tag'>₹{daily.toLocaleString('en-IN')}/day</span>
      </div>
      {trip.notes && <p className='trip-notes'>{trip.notes}</p>}
      <div className='trip-actions'>
        <button className='btn-edit' onClick={() => onEdit(trip)}>Edit</button>
        <button className='btn-danger' onClick={() => onDelete(trip.id)}>Delete</button>
      </div>
      <TransportTabs from={trip.from} destination={trip.destination} />
    </div>
  );
}

function BudgetCalculator() {
  const [dest, setDest]     = useState('');
  const [days, setDays]     = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState(null);

  const BASE_COSTS = {
    'Goa':       { hotel: 2500, food: 800,  transport: 600  },
    'Manali':    { hotel: 2000, food: 700,  transport: 500  },
    'Jaipur':    { hotel: 1800, food: 600,  transport: 400  },
    'Kerala':    { hotel: 3000, food: 900,  transport: 700  },
    'Ladakh':    { hotel: 2500, food: 800,  transport: 1200 },
    'Rishikesh': { hotel: 1500, food: 500,  transport: 300  },
  };

  const calculate = () => {
    if (!dest || !days || !budget) return;
    const costs = BASE_COSTS[dest] || { hotel: 2000, food: 700, transport: 500 };
    const d = Number(days);
    const b = Number(budget);
    const hotelTotal     = costs.hotel * d;
    const foodTotal      = costs.food * d;
    const transportTotal = costs.transport * d;
    const total          = hotelTotal + foodTotal + transportTotal;
    setResult({ hotelTotal, foodTotal, transportTotal, total, remaining: b - total, days: d });
  };

  return (
    <div className='budget-calc card fade-up'>
      <h3>Budget Calculator</h3>
      <p className='calc-sub'>Estimate your trip costs instantly</p>

      <select value={dest} onChange={e => setDest(e.target.value)}>
        <option value=''>Select destination</option>
        {[
          'Goa', 'Andaman', 'Pondicherry', 'Gokarna', 'Varkala',
          'Manali', 'Shimla', 'Dharamshala', 'Spiti', 'Ladakh',
          'Mussoorie', 'Nainital', 'Auli', 'Kasauli',

          'Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Agra', 'Hyderabad', 'Ooty', 'Wayanad', 'Mysore',

          'Meghalaya', 'Shillong', 'Gangtok', 'Tawang', 'Kaziranga',

          'Rishikesh', 'Haridwar', 'Amritsar', 'Tirupati',

          'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',].map(d => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <input type='number' placeholder='Days' value={days} onChange={e => setDays(e.target.value)} />
      <input type='number' placeholder='Total Budget (₹)' value={budget} onChange={e => setBudget(e.target.value)} />

      <button className='btn-primary' onClick={calculate}>Calculate</button>

      {result && (
        <div className='calc-result'>
          <div className='calc-row'><span>Hotels ({result.days}d)</span><span>₹{result.hotelTotal.toLocaleString('en-IN')}</span></div>
          <div className='calc-row'><span>Food</span><span>₹{result.foodTotal.toLocaleString('en-IN')}</span></div>
          <div className='calc-row'><span>Transport</span><span>₹{result.transportTotal.toLocaleString('en-IN')}</span></div>
          <div className='calc-divider' />
          <div className='calc-row total'><span>Total Est.</span><span>₹{result.total.toLocaleString('en-IN')}</span></div>
          <div className={`calc-row ${result.remaining >= 0 ? 'surplus' : 'deficit'}`}>
            <span>{result.remaining >= 0 ? 'Remaining' : 'Over budget'}</span>
            <span>₹{Math.abs(result.remaining).toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Planner;

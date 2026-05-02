import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import { useTrips } from '../context/TripContext';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
  const { trips, totalBudget } = useTrips();

  const avgBudget = trips.length ? Math.round(totalBudget / trips.length) : 0;
  const avgDays = trips.length
    ? Math.round(trips.reduce((s, t) => s + Number(t.days || 0), 0) / trips.length)
    : 0;

  // Top destinations by frequency
  const destCount = trips.reduce((acc, t) => {
    acc[t.destination] = (acc[t.destination] || 0) + 1;
    return acc;
  }, {});

  const topDest = Object.entries(destCount).sort((a, b) => b[1] - a[1])[0];

  // Pie data — budget split estimate
  const pieData = {
    labels: ['Hotels', 'Food', 'Transport', 'Misc'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#1D9E75', '#4ADE80', '#F59E0B', '#94A3B8'],
      borderWidth: 0,
    }]
  };

  // Bar data — trips budget
  const barData = {
    labels: trips.map(t => t.destination || 'Trip'),
    datasets: [{
      label: 'Budget (₹)',
      data: trips.map(t => t.budget),
      backgroundColor: '#1D9E75',
      borderRadius: 8,
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(100,116,139,0.1)' } },
      x: { grid: { display: false } }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { padding: 16, font: { size: 13 } } }
    }
  };

  return (
    <div className='dashboard container'>
      <div className='dash-header fade-up'>
        <h2>Trip Dashboard</h2>
        <p>Your travel statistics at a glance</p>
      </div>

      <div className='dash-stats'>
        {[
          { icon: '✈️', label: 'Total Trips', val: trips.length },
          { icon: '💰', label: 'Total Budget', val: `₹${totalBudget.toLocaleString('en-IN')}` },
          { icon: '📊', label: 'Avg Budget', val: `₹${avgBudget.toLocaleString('en-IN')}` },
          { icon: '📅', label: 'Avg Duration', val: `${avgDays} days` },
          { icon: '🏆', label: 'Top Destination', val: topDest ? topDest[0] : '—' },
        ].map((s, i) => (
          <div className='dash-stat card fade-up' key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className='dash-stat-icon'>{s.icon}</span>
            <div className='dash-stat-val'>{s.val}</div>
            <div className='dash-stat-label'>{s.label}</div>
          </div>
        ))}
      </div>

      {trips.length === 0 ? (
        <div className='no-data card'>
          <span>📊</span>
          <h3>No trip data yet</h3>
          <p>Create some trips in the Planner to see your dashboard come alive!</p>
        </div>
      ) : (
        <div className='dash-charts'>
          <div className='chart-card card'>
            <h3>Budget Breakdown</h3>
            <p className='chart-sub'>Typical expense distribution</p>
            <div className='pie-wrapper'>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          <div className='chart-card card'>
            <h3>Trip Budgets Comparison</h3>
            <p className='chart-sub'>Budget per trip (₹)</p>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      )}

      {trips.length > 0 && (
        <div className='dash-table card fade-up'>
          <h3>All Trips Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Destination</th>
                <th>Days</th>
                <th>Budget</th>
                <th>Daily Cost</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {trips.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.destination}</strong></td>
                  <td>{t.days}</td>
                  <td>₹{Number(t.budget).toLocaleString('en-IN')}</td>
                  <td>₹{t.days ? Math.round(t.budget / t.days).toLocaleString('en-IN') : '—'}</td>
                  <td className='notes-cell'>{t.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

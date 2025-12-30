import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;


function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts API endpoint:', API_URL);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  const renderTable = () => {
    if (!workouts.length) return <tr><td colSpan="100%">No workouts found.</td></tr>;
    const columns = Object.keys(workouts[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, idx) => (
            <tr key={idx}>
              {columns.map(col => <td key={col}>{String(workout[col])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Workouts;

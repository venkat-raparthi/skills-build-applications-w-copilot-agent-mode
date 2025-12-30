import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities API endpoint:', API_URL);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  const renderTable = () => {
    if (!activities.length) return <tr><td colSpan="100%">No activities found.</td></tr>;
    const columns = Object.keys(activities[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={idx}>
              {columns.map(col => <td key={col}>{String(activity[col])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;

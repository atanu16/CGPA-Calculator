import React, { useState } from 'react';
import './App.css';

function App() {
  const [semesters, setSemesters] = useState([{ sgpa: '' }]);
  const [cgpa, setCgpa] = useState(null);

  const handleChange = (index, event) => {
    const values = [...semesters];
    values[index].sgpa = event.target.value;
    setSemesters(values);
  };

  const handleAddSemester = () => {
    setSemesters([...semesters, { sgpa: '' }]);
  };

  const handleRemoveSemester = (index) => {
    const values = [...semesters];
    values.splice(index, 1);
    setSemesters(values);
  };

  const handleCalculate = () => {
    const totalSgpa = semesters.reduce((acc, semester) => acc + parseFloat(semester.sgpa || 0), 0);
    const calculatedCgpa = totalSgpa / semesters.length;
    setCgpa(calculatedCgpa.toFixed(2));
  };

  return (
    <div className="App">
      <h1>CGPA Calculator</h1>
      {semesters.map((semester, index) => (
        <div key={index}>
          <label>Semester {index + 1} SGPA: </label>
          <input
            type="number"
            value={semester.sgpa}
            onChange={(event) => handleChange(index, event)}
            step="0.01"
            min="0"
            max="10"
          />
          {semesters.length > 1 && (
            <button onClick={() => handleRemoveSemester(index)}>Remove</button>
          )}
        </div>
      ))}
      <button onClick={handleAddSemester}>Add Semester</button>
      <button onClick={handleCalculate}>Calculate CGPA</button>
      {cgpa !== null && (
        <div>
          <h2>Your CGPA is: {cgpa}</h2>
        </div>
      )}
    </div>
  );
}

export default App;

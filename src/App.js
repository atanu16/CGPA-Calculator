import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import './App.css';

function App() {
  const [semesters, setSemesters] = useState([{ sgpa: '' }]);
  const [cgpa, setCgpa] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

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
    const validSgpas = semesters.filter(semester => semester.sgpa !== '' && !isNaN(semester.sgpa));
    const totalSgpa = validSgpas.reduce((acc, semester) => acc + parseFloat(semester.sgpa), 0);
    const calculatedCgpa = totalSgpa / validSgpas.length;
    setCgpa(validSgpas.length ? calculatedCgpa.toFixed(2) : null);
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <div className="App">
      <h1>CGPA Calculator</h1>
      <div className="toggle-container">
        <label>{darkMode ? 'Dark Mode' : 'Light Mode'}</label>
        <Switch
          onChange={toggleDarkMode}
          checked={darkMode}
          offColor="#ccc"
          onColor="#333"
        />
      </div>
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
            className="input-field"
          />
          {semesters.length > 1 && (
            <button className="remove-button" onClick={() => handleRemoveSemester(index)}>Remove</button>
          )}
        </div>
      ))}
      <button className="add-button" onClick={handleAddSemester}>Add Semester</button>
      <button className="calculate-button" onClick={handleCalculate}>Calculate CGPA</button>
      {cgpa !== null && (
        <div>
          <h2>Your CGPA is: {cgpa}</h2>
        </div>
      )}
    </div>
  );
}

export default App;

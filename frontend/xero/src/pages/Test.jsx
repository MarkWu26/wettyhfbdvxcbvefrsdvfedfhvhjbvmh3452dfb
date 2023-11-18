import React, { useState } from 'react';

const Test = () => {
  const [metricValues, setMetricValues] = useState({});
  const [selectedOperation, setSelectedOperation] = useState('add');
  const [result, setResult] = useState(null);

  const metricTypes = ['Revenue', 'Expense', 'Profit', 'Loss'];

  const handleMetricChange = (metricType, value) => {
    setMetricValues((prevValues) => ({
      ...prevValues,
      [metricType]: parseFloat(value) || 0,
    }));
  };

  const handleOperationChange = (operation) => {
    setSelectedOperation(operation);
  };

  const calculateResult = () => {
    const values = Object.values(metricValues);
    let calculationResult;

    switch (selectedOperation) {
      case 'add':
        calculationResult = values.reduce((acc, val) => acc + val, 0);
        break;
      case 'subtract':
        calculationResult = values.reduce((acc, val) => acc - val, 0);
        break;
      case 'multiply':
        calculationResult = values.reduce((acc, val) => acc * val, 1);
        break;
      case 'divide':
        calculationResult = values.length > 0 ? values.reduce((acc, val) => acc / val) : 0;
        break;
      default:
        calculationResult = null;
    }

    setResult(calculationResult);
  };

  return (
    <div>
      <h2>Calculator</h2>

      <div>
        {metricTypes.map((metricType) => (
          <div key={metricType}>
            <label htmlFor={metricType}>{metricType}:</label>
            <input
              type="number"
              id={metricType}
              value={metricValues[metricType] || ''}
              onChange={(e) => handleMetricChange(metricType, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="operation">Operation:</label>
        <select
          id="operation"
          value={selectedOperation}
          onChange={(e) => handleOperationChange(e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>

      <button onClick={calculateResult}>Calculate</button>

      {result !== null && (
        <div>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Test;

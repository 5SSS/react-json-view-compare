import React from 'react';
import { render } from 'react-dom';
import JsonCompare from '../lib/index.js';
import './style.css';

const oldData = {
  name: 'super',
  age: 18,
  task: [
    { name: 'eat', time: '09:00' },
    { name: 'work', time: '10:00' },
    { name: 'sleep', time: '22:00' },
  ],
};
const newData = {
  name: 'coolapt',
  age: 20,
  task: [
    { name: 'eat', time: '09:00' },
    { name: 'work', time: '10:00' },
    { name: 'sleep', time: '23:00' },
    { name: 'running', time: '08:00' },
  ],
};

function App() {
  return (
    <div>
      <div className="origin-data">
        <div className="old-data">
          <p className="title">😊old data:</p>
          <pre>{JSON.stringify(oldData, null, 2)}</pre>
        </div>
        <div className="new-data">
          <p className="title">😊new data:</p>
          <pre>{JSON.stringify(newData, null, 2)}</pre>
        </div>
      </div>
      <p className="title">👌The merged view:</p>
      <JsonCompare oldData={oldData} newData={newData} />
    </div>
  );
}
render(App(), document.getElementById('root'));

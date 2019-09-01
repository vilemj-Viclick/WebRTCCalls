import React from 'react';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <aside className="left">
        <video
          className="my-cam"
        />
      </aside>
      <aside className="right">
        <video
          className="remote-cam"
        />
      </aside>
    </div>
  );
};

export default App;

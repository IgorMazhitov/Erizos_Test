import React from 'react';
import ParseStringFunction from './functions/parseStringFunction';
import SpiralMatrix from './functions/spiralMatrix';
import MyBrowser from './file-browser/fileBrowser';
import fakeData from './fakeData/fakeFileSystem';

class App extends React.Component {
  render() {
    return <div className="App">
      <header className="App-header">
        <ParseStringFunction />
        <SpiralMatrix />
        <MyBrowser data={fakeData} />
      </header>
    </div>
  };
}

export default App;

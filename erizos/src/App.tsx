import React from 'react';
import MyBrowser from './file-browser/fileBrowser';
import fakeData from './fakeData/fakeFileSystem';
import ParseStringFunction from './components/parseStringFunction';
import SpiralMatrix from './components/spiralMatrix';

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

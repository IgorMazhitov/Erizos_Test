import React from "react";
import MyBrowser from "./file-browser/fileBrowser";
import fakeData from "./fakeData/fakeFileSystem";
import ParseStringFunction from "./components/parseString";
import SpiralMatrix from "./components/spiralMatrix";

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontFamily: "Arial, sans-serif",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <ParseStringFunction />
            <SpiralMatrix />
          </div>
          <MyBrowser
            data={fakeData}
            defaultExpandedFolders={
              new Set<string>(["/Common7", "/Common7/IDE"])
            }
          />
        </header>
      </div>
    );
  }
}

export default App;

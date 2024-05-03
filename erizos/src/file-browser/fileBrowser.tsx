import React, { Component } from "react";

interface FileProps {
  mime: string;
  name: string;
  type: string;
}

interface FolderProps {
  children: (FolderProps | FileProps)[];
  name: string;
  type: string;
}

interface MyBrowserProps {
  data: FolderProps[];
}

interface MyBrowserState {
  expandedFolders: Set<string>;
}

class MyBrowser extends Component<MyBrowserProps, MyBrowserState> {
  constructor(props: MyBrowserProps) {
    super(props);
    this.state = {
      expandedFolders: new Set<string>(),
    };
  }

  toggleFolder(name: string) {
    const { expandedFolders } = this.state;
    if (expandedFolders.has(name)) {
      expandedFolders.delete(name);
    } else {
      expandedFolders.add(name);
    }
    this.setState({ expandedFolders: new Set(expandedFolders) });
  }

  renderFolder(folder: FolderProps, path: string) {
    const { expandedFolders } = this.state;
    const fullPath = `${path}/${folder.name}`;

    return (
      <div key={fullPath} style={{ marginBottom: "10px" }}>
        <div
          onClick={() => this.toggleFolder(fullPath)}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
            color: expandedFolders.has(fullPath) ? "blue" : "black",
          }}
        >
          {folder.name}
        </div>
        {expandedFolders.has(fullPath) && (
          <div style={{ paddingLeft: "20px" }}>
            {folder.children.map((child, index) =>
              "children" in child ? (
                this.renderFolder(child, fullPath)
              ) : (
                <div
                  key={index}
                  style={{ marginTop: "5px", fontStyle: "italic" }}
                >
                  {child.name}
                </div>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <>
        <label style={{ fontWeight: "bold", padding: "10px" }}>File Browser</label>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            marginTop: "30px",
          }}
        >
          {data.map((folder, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              {this.renderFolder(folder, "")}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default MyBrowser;

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
  searchName: string;
  searchResults: (FolderProps | FileProps)[];
}

class MyBrowser extends Component<MyBrowserProps, MyBrowserState> {
  constructor(props: MyBrowserProps) {
    super(props);
    this.state = {
      expandedFolders: new Set<string>(),
      searchName: "",
      searchResults: [],
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

  renderFolder = (folder: FolderProps, path: string) => {
    const { expandedFolders, searchResults } = this.state;
    const fullPath = `${path}/${folder.name}`;

    return (
      <div key={fullPath} style={{ marginBottom: "10px" }}>
        <div
          onClick={() => this.toggleFolder(fullPath)}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline",
            color: expandedFolders.has(fullPath) ? "blue" : "black", // Change color based on folder state
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
  };

  handleSearch = (searchName: string) => {
    const paths: string[] = [];
    if (searchName === "") {
      this.setState({ searchName });
      this.setState({ expandedFolders: new Set() });
      return;
    }
    this.setState({ searchName });
    const dfs = (folder: FolderProps, tempPath: string = "") => {
      for (const child of folder.children) {
        if ("children" in child) {
          const fullPath = `${tempPath}/${child.name}`;
          dfs(child, fullPath);
        } else {
          if (child.name.trim().includes(searchName.trim())) {
            const fullPath = `${tempPath}/${child.name}`;
            paths.push(fullPath);
          }
        }
      }
    };
    for (const folder of this.props.data) {
      dfs(folder, folder.name);
    }
    const newSet = new Set<string>();
    if (paths.length === 0) {
        this.setState({ expandedFolders: newSet });
        return;
    }
    for (const path of paths) {
      const folders = path.split("/");
      for (let i = 0; i < folders.length; i++) {
        const folderPath = "/" + folders.slice(0, i + 1).join("/");
        newSet.add(folderPath);
        this.setState({ expandedFolders: new Set(newSet) });
      }
    }
  };

  render() {
    const { data } = this.props;
    const { searchName } = this.state;

    return (
      <div style={{ backgroundColor: "#f5f5f5", padding: "10px" }}>
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
        // INPUT FOR SEARCH
        <input
          type="text"
          value={searchName}
          onChange={(e) => this.handleSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
    );
  }
}

export default MyBrowser;

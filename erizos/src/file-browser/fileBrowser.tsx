import React, { Component } from "react";
import "./fileBrowser.css";

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
  defaultExpandedFolders: Set<string>;
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
      expandedFolders: this.props.defaultExpandedFolders,
      searchName: "",
      searchResults: [],
    };
  }

  toggleFolder(name: string) {
    const { expandedFolders } = this.state;
    if (expandedFolders.has(name)) {
      expandedFolders.forEach((expandedFolder) => {
        if (expandedFolder.match(name)) {
          expandedFolders.delete(expandedFolder);
        }
      });
      expandedFolders.delete(name);
    } else {
      expandedFolders.add(name);
    }
    this.setState({ expandedFolders: new Set(expandedFolders) });
  }

  renderFolder = (folder: FolderProps, path: string) => {
    const { expandedFolders } = this.state;
    const fullPath = `${path}/${folder.name}`;

    return (
      <div key={fullPath} className="folder">
        <div
          onClick={() => this.toggleFolder(fullPath)}
          className={
            expandedFolders.has(fullPath)
              ? "folder-name expanded"
              : "folder-name"
          }
        >
          {folder.name}
        </div>
        {expandedFolders.has(fullPath) && (
          <div className="folder-children">
            {folder.children.map((child, index) =>
              "children" in child ? (
                this.renderFolder(child, fullPath)
              ) : (
                <div key={index} className="file">
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
    // If search is empty, reset search results and expanded folders
    if (searchName === "") {
      this.setState({ searchName });
      this.setState({ expandedFolders: new Set() });
      return;
    }
    this.setState({ searchName });

    // DFS to find all paths that contain the search name
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

    // DFS for each folder in the data
    for (const folder of this.props.data) {
      dfs(folder, folder.name);
    }

    // Expand all folders that contain the search name
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
      <div className="my-browser">
        {data
          .filter((folder) =>
            folder.name.toLowerCase().includes(searchName.toLowerCase())
          )
          .map((folder, index) => (
            <div key={index} className="folder-container">
              {this.renderFolder(folder, "")}
            </div>
          ))}
        <input
          type="text"
          value={searchName}
          onChange={(e) => this.handleSearch(e.target.value)}
          placeholder="Search"
          className="search-input"
        />
      </div>
    );
  }
}

export default MyBrowser;

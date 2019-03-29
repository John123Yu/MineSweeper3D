import React, { Component } from "react";
import { ToastProvider } from "react-toast-notifications";
import Map3D from "./containers/map";
// import MSInfo from "./statelessComps/minesweeperInfo";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ToastProvider placement="top-left" autoDismiss={true}>
        <div className="App">
          <br />
          <Map3D className="map" />
          {/* <MSInfo /> */}
        </div>
      </ToastProvider>
    );
  }
}

export default App;

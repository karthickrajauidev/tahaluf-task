// App.js

import React, { useState } from "react";
import Listing from "./components/Listing";
import Details from "./components/Details";
import "./styles.css";

const App = () => {
  const [details, setDetails] = useState(null);

  return (
    <div className="app">
      {details ? (
        <Details university={details} goBack={() => setDetails(null)} />
      ) : (
        <Listing setDetails={setDetails} />
      )}
    </div>
  );
};

export default App;

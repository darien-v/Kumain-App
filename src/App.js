import React from "react";
import Main from "./Components/Main/Main";
import Components from "./Components/Components";
import * as Env from "./environments";
import Parse from "parse";


Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  //return <Main />;
  return <Components />;
}

export default App;
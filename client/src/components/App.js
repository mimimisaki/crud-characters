import React, { Component } from "react";
import AddForm from "./AddForm";
import CharacterList from "./CharacterList";

class App extends Component {
  render() {
    return (
      <div>
        <AddForm />
        <CharacterList />
      </div>
    );
  }
}

export default App;

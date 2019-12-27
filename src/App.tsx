import React from "react";
import "./App.css";
import ExampleBlock from "./Components/ExampleBlock";

const App: React.FC = () => {
    return (
        <div className="App">
            <ExampleBlock title="XState" />
            <ExampleBlock title="State Machine" />
        </div>
    );
};

export default App;

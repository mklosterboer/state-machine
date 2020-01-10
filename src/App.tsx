import React from "react";
import "./App.css";
import ExampleBlock from "./Components/ExampleBlock";
import XStateExample from "./Components/XStateExample";

const App: React.FC = () => {
    return (
        <div className="App">
            <ExampleBlock title="XState">
                <XStateExample />
            </ExampleBlock>
            <ExampleBlock title="State Machine" />
        </div>
    );
};

export default App;

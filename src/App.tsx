import './App.css';
import {TextField, Button} from "@material-ui/core";
import {Panel} from './panel'
import * as React from "react";
import {ContactsList} from "./list";

type Person = {
  name: {
    first: string,
    last: string,
  }
}

const data: Person[] = [
  {
    name: {
      first: "JL",
      last: "David"
    },
  },
{
    name: {
      first: "JL",
      last: "David"
    },
  },
  {
    name: {
      first: "JL",
      last: "David"
    },
  },
]

function App() {
  const [panel, setPanel] = React.useState<boolean>(false);
  const [panelIndex, setPanelIndex] = React.useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" color="primary" onClick={() => setPanel(!panel)}>
          Primary
        </Button>
        <TextField id="standard-basic" label="Standard"/>
        <Panel panel={panel} index={panelIndex}/>
        <ContactsList list={data} setPanelIndex={setPanelIndex}/>
      </header>
    </div>
  );
}

export default App;

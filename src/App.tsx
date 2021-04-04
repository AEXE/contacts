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

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" color="primary" onClick={() => setPanel(!panel)}>
          Primary
        </Button>
        <TextField id="standard-basic" label="Standard"/>
        <Panel panel={panel}/>
        <ContactsList list={data}/>
      </header>
    </div>
  );
}

export default App;

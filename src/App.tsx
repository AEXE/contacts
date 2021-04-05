import './App.css';
import {TextField, Button} from "@material-ui/core";
import {Panel} from './panel'
import React, {useState} from "react";
import {ContactsList} from "./list";
import {SyntheticEvent} from "react";

type Contact = {
  name: {
    first: string,
    last: string,
  }
}

const data: Contact[] = [
  {
    name: {
      first: "John",
      last: "Hanouna"
    },
  },
  {
    name: {
      first: "Michel",
      last: "Le Riton"
    },
  },
  {
    name: {
      first: "Joe",
      last: "La Blague"
    },
  },
]

function App() {
  const [panel, setPanel] = useState<boolean>(false);
  const [panelData, setPanelData] = useState<Contact>({
    name: {
      first: "",
      last: "",
    }
  });

  function handleParentClick() {
    console.log("set panel false")
    setPanel(false)
  }

  function setPanelDataAndOpenPanel(e: SyntheticEvent, contact: Contact) {
    e.stopPropagation();
    setPanelData(contact);
    setPanel(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <TextField label="Standard"/>
          <div className="listParent" onClick={() => handleParentClick()}>
            <ContactsList list={data} setPanelData={setPanelDataAndOpenPanel}/>
          </div>
          <Panel panel={panel} contact={panelData}/>
        </div>

      </header>
    </div>
  );
}

export default App;

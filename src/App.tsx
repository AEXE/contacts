import './App.css';
import {TextField, Button} from "@material-ui/core";
import {Panel} from './panel'
import React, {useState} from "react";
import {ContactsList} from "./list";
import {SyntheticEvent} from "react";
import {UseFetch} from "./utils/useFetch";
import {Contact} from "./type";

function App() {
  const [panel, setPanel] = useState<boolean>(false);

  const { status, data, error } = UseFetch<Contact[]>(
    `http://localhost:3000/contacts/`,
  )
  console.log(data);
  const [panelData, setPanelData] = useState<Contact>({
    name: {
      first: "",
      last: "",
    },
    id: 0
  });

  function handleParentClick() {
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
            <ContactsList list={data ? data : undefined} setPanelData={setPanelDataAndOpenPanel}/>
          </div>
          <Panel panel={panel} contact={panelData} create={false}/>
        </div>

      </header>
    </div>
  );
}

export default App;

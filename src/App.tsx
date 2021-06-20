import './App.css';
import {TextField, Button} from "@material-ui/core";
import {Panel} from './panel'
import React, {useEffect, useState} from "react";
import {ContactsList} from "./list";
import {SyntheticEvent} from "react";
import {UseFetch} from "./utils/useFetch";
import emptyContact, {Contact} from "./type";

function App() {
  const [panel, setPanel] = useState<boolean>(false);

  const [status, setStatus] = useState<
    "initial" | "loading" | "success" | "error"
    >("initial")
  const [data, setData] = useState<Contact[] | null>(null)
  const [error, setError] = useState<"string" | null>(null)


  const [panelData, setPanelData] = useState<Contact>(emptyContact);
  const [reloadData, setReloadData] = useState<boolean>(false);



  useEffect(() => {
    console.log('go')
    setStatus("loading");
    setError(null);

    fetch('http://localhost:3000/contacts/')
      .then<Contact[]>((res) => res.json())
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      })
  }, [reloadData])
  function handleParentClick() {
    setPanel(false)
  }

  function setPanelDataAndOpenPanel(e: SyntheticEvent, contact: Contact) {
    e.stopPropagation();
    setPanelData(contact);
    setPanel(true);
  }

  function reloadListData(index: number, contact: Contact) {
    if (data) {
      data[index] = contact;
    }
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
          <div className={panel ? "panel panelOpen" : "panel"}>
            <Panel contact={panelData} create={false} reloadData={setReloadData}/>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;

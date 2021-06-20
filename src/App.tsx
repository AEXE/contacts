import './App.css';
import {TextField, Button} from "@material-ui/core";
import {Panel} from './panel'
import React, {ChangeEvent, useEffect, useState} from "react";
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
  const [filteredData, setFilteredData] = useState<Contact[] | null>(null)
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
        setFilteredData(data);
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
  function filterResults (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (data) {
      let filter = data?.filter(function (e) {
        return e.name.first.includes(event.target.value) || e.name.last.includes(event.target.value);
      });
      setFilteredData(filter);
    }
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
          <TextField label="Standard" onChange={(e) => filterResults(e)}/>
          <div className="listParent" onClick={() => handleParentClick()}>
            <ContactsList list={filteredData ? filteredData : undefined} setPanelData={setPanelDataAndOpenPanel}/>
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

import './App.css';
import {TextField, Button} from "@material-ui/core";
import {Panel} from './panel'
import React, {ChangeEvent, useEffect, useState} from "react";
import {ContactsList} from "./list";
import {SyntheticEvent} from "react";
import emptyContact, {Contact} from "./type";

function App() {
  const [panel, setPanel] = useState<boolean>(false);
  const [data, setData] = useState<Contact[] | null>(null)
  const [filteredData, setFilteredData] = useState<Contact[] | null>(null)
  const [create, setCreate] = useState<boolean>(false)


  const [panelData, setPanelData] = useState<Contact>(emptyContact);
  const [reloadData, setReloadData] = useState<boolean>(true);


  useEffect(() => {
    if (reloadData) {
      fetch('http://localhost:3000/contacts/')
        .then<Contact[]>((res) => res.json())
        .then((data) => {
          setData(data);
          setFilteredData(data);
        })
        .catch((err) => {
        })
      setReloadData(false)
    }
  }, [reloadData])

  function handleParentClick() {
    setPanel(false)
  }

  function setPanelDataAndOpenPanel(e: SyntheticEvent, contact: Contact, create: boolean) {
    e.stopPropagation();
    setCreate(create)
    setPanelData(contact);
    setPanel(true);
  }

  function filterResults(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (data) {
      let filter = data?.filter(function (e) {
        return e.first.includes(event.target.value) || e.last.includes(event.target.value);
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
        <div className="content" onClick={() => handleParentClick()}>
          <div className="topBar">
            <div className="searchContainer">
              <TextField label="Search" onChange={(e) => filterResults(e)}/>
            </div>
            <Button className="create" variant="contained" color="primary"
                    onClick={(e) => setPanelDataAndOpenPanel(e, emptyContact, true)}>
              Create
            </Button>
          </div>
          <div className="listParent">
            <ContactsList list={filteredData ? filteredData : undefined} setPanelData={setPanelDataAndOpenPanel} reloadData={setReloadData}/>
          </div>
        </div>

        {panel && <div className="panel">
          <Panel contact={panelData} create={create} reloadData={setReloadData}/>
        </div>}

      </header>
    </div>
  );
}

export default App;

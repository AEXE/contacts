import React, {useCallback, useState} from "react"
import {Contact} from "./type";
import {Button, TextField} from "@material-ui/core";
import {UpsertContact} from "./utils/upsertContact"

export function Panel(props: {panel: boolean, contact: Contact, create: Boolean}) {

  const [editedContact, setEditedContact] = useState<Contact>({
    name: {
      first: props.contact.name.first,
      last: props.contact.name.last,
    },
    id: props.contact.id,
  });

  function handleChange(evt: any) {
    const value = evt.target.value;
    const defaultValue = evt.target.defaultValue;
    setEditedContact({
      name: {
        ...editedContact.name,
        [evt.target.name]: value ? value : defaultValue
      },
      id: props.contact.id,
    });
  }

  const upsertCustomer = async () => {
    console.log(props);
    fetch("http://localhost:3000/contacts/" + props.contact.id && !props.create ? props.contact.id.toString() : "", {
      method: props.create ? "POST" : "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.contact)
    })
      .then((res) => console.log(res.json()))
      .then((data) => {
      })
      .catch((err) => {
      })
    }

  //const canSave = JSON.stringify(editedContact) !== JSON.stringify(props.contact);
    //"panel" + props.panel ? " panelOpen" : ""
  return <div className={props.panel ? "panel panelOpen" : "panel"}>
    <ul className="inputs">
      <li key={props.contact.name.first}>
        <TextField name="first" id="first" defaultValue={props.contact.name.first} onChange={handleChange}/>
      </li>
      <li key={props.contact.name.last}>
        <TextField name="last" id="last" defaultValue={props.contact.name.last} onChange={handleChange}/>
      </li>
      <li>
        <Button variant="contained" color="primary" onClick={upsertCustomer}>
          Primary
        </Button>
      </li>

    </ul>

  </div>
}
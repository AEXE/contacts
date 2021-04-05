import React, {useEffect, useState} from "react"
import {Contact} from "./type";
import {Button, TextField} from "@material-ui/core";

export function Panel(props: {panel: boolean, contact: Contact}) {

  const [editedContact, setEditedContact] = useState<Contact>({
    name: {
      first: props.contact.name.first,
      last: props.contact.name.last,
    }
  });
    function handleChange(evt: any) {
    const value = evt.target.value;
    const defaultValue = evt.target.defaultValue;
    setEditedContact({
      name: {
        ...editedContact.name,
        [evt.target.name]: value ? value : defaultValue
      }
    });
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
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </li>

    </ul>

  </div>
}
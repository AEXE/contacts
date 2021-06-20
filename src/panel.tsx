import React, {Dispatch, SetStateAction, useCallback, useState} from "react"
import emptyContact, {Contact} from "./type";
import {Button, TextField} from "@material-ui/core";
import {UpsertContact} from "./utils/upsertContact"

export function Panel(props: { contact: Contact, create: Boolean, reloadData: Dispatch<SetStateAction<boolean>>}) {

  const [editedContact, setEditedContact] = useState<Contact>(emptyContact);

  function handleChange(evt: any) {
    const value = evt.target.value;
    const defaultValue = evt.target.defaultValue;
    setEditedContact({
      name: {
        ...editedContact.name,
        [evt.target.name]: value ? value : defaultValue
      },
      id: props.contact.id,
      email: props.contact.email,
      birthdate: props.contact.birthdate,
      notes: props.contact.notes,
    });
  }

  const upsertCustomer = async () => {
    const {...contact} = editedContact;
    fetch("http://localhost:3000/contacts/" + (!isNaN(contact.id) && !props.create ? contact.id : ""), {
      method: props.create ? "POST" : "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
      .then((res) => console.log(res.json()))
      .then((data) => {
        props.reloadData(true);
      })
      .catch((err) => {
      })
  }

  //const canSave = JSON.stringify(editedContact) !== JSON.stringify(props.contact);
  //"panel" + props.panel ? " panelOpen" : ""
  return <ul className="inputs">
    <li key={"paneFirstlKey" + props.contact.name.first}>
      <TextField name="first" defaultValue={props.contact.name.first} onChange={handleChange}/>
    </li>
    <li key={"panelLastKey" + props.contact.name.last}>
      <TextField name="last" defaultValue={props.contact.name.last} onChange={handleChange}/>
    </li>
    <li key={"panelEmailKey" + props.contact.email}>
      <TextField name="email" defaultValue={props.contact.email} onChange={handleChange}/>
    </li>
    <li key={"panelBirthdateKey" + props.contact.birthdate}>
      <TextField name="birthdate" defaultValue={props.contact.birthdate} onChange={handleChange}/>
    </li>
    <li key={"panelNotesKey" + props.contact.notes}>
      <TextField name="notes" defaultValue={props.contact.notes} onChange={handleChange}/>
    </li>
    <li>
      <Button variant="contained" color="primary" onClick={upsertCustomer}>
        Primary
      </Button>
    </li>
  </ul>
}
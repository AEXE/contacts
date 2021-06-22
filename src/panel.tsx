import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react"
import emptyContact, {Contact} from "./type";
import {Button, TextField} from "@material-ui/core";

type UpdateProperty = {
  property: string,
  value: string
}

export function Panel(props: { contact: Contact, create: boolean, reloadData: Dispatch<SetStateAction<boolean>> }) {

  const [editedContact, setEditedContact] = useState<Contact>(props.contact);
  const [cantSave, setCantSave] = useState<boolean>(true);
  const [create, setCreate] = useState<boolean>(props.create);
  const [updatedProperty, setUpdatedProperty] = useState<UpdateProperty>({property: "", value: ""});


  function handleChange(evt: any) {
    // @ts-ignore
    let updatedField = {
      property: evt.target.name,
      value: evt.target.value
    }
    setUpdatedProperty(updatedField);
  }
  useEffect(() => {
    setCreate(props.create);
  }, [props.create]);

  useEffect(() => {
    setEditedContact(props.contact);
  }, [props.contact]);


  useEffect(() => {
    let contact = {...editedContact};
    // @ts-ignore
    contact[updatedProperty.property] = updatedProperty.value;
    setEditedContact(contact);
    setCantSave(false);
  }, [updatedProperty]);
  const upsertCustomer = async () => {
    const {...contact} = editedContact;
    // @ts-ignore
    if (!props.create) {
      contact.id = props.contact.id
    } else {
      delete contact.id
    }
    fetch("http://localhost:3000/contacts/" + (!create ? contact.id : ""), {
      method: create ? "POST" : "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
      .then((res) => {})
      .then((data) => {
        props.reloadData(true);
        setCreate(false);
      })
      .catch((err) => {
        alert(err);
      })
  }

  return <ul className="inputs">
    <li key={"paneFirstlKey" + props.contact.first}>
      <TextField name="first" defaultValue={props.contact.first} label="First Name" onChange={handleChange}/>
    </li>
    <li key={"panelLastKey" + props.contact.last}>
      <TextField name="last" defaultValue={props.contact.last} label="Last Name" onChange={handleChange}/>
    </li>
    <li key={"panelEmailKey" + props.contact.email}>
      <TextField name="email" defaultValue={props.contact.email} label="Email" onChange={handleChange}/>
    </li>
    <li key={"panelBirthdateKey" + props.contact.birthdate}>
      <TextField name="birthdate" label="birthdate" type="date" defaultValue={props.contact.birthdate} InputLabelProps={{
        shrink: true,
      }} onChange={handleChange}/>
    </li>
    <li key={"panelNotesKey" + props.contact.notes}>
      <TextField name="notes" defaultValue={props.contact.notes} multiline rows={2} rowsMax={8} label="Notes" onChange={handleChange}/>
    </li>
    <li>
      <Button variant="contained" color="primary" onClick={upsertCustomer} disabled={cantSave}>
        Save
      </Button>
    </li>
  </ul>
}
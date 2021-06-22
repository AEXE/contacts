import * as React from "react"
import {Contact} from "./type";
import {Button} from "@material-ui/core";
export function ContactsList(props: {list?: Contact[], setPanelData: Function, reloadData: Function}) {


  const deleteCustomer = async (index: number | undefined) => {
    if (!index) return;
    fetch("http://localhost:3000/contacts/" + index, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {})
      .then((data) => {
        props.reloadData(true);
      })
      .catch((err) => {
        alert(err)
      })
  }
  //"panel" + props.panel ? " panelOpen" : ""
  return <ul className="contactList">
    {props.list && props.list.map((contact, index) => {
      return (
        <li  className="contactListItem" key={"contact"+index} >
          <div className="contactListContent" onClick={(event) => props.setPanelData(event, contact, false)} key={index}>
            <div className="contactListText">
              {contact.first + " " + contact.last}
            </div>
            <div className="contactListText">
              {contact.email}
            </div>
            <div className="contactListText">
              {contact.birthdate}
            </div>

          </div>
            <Button variant="contained" className="deleteButton" color="default" onClick={() => deleteCustomer(contact.id)}>
              Delete
            </Button>
        </li>
      )
    })
    }
  </ul>
}
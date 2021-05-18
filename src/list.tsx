import * as React from "react"
import {Contact} from "./type";

export function ContactsList(props: {list?: Contact[], setPanelData: Function}) {



  //"panel" + props.panel ? " panelOpen" : ""
  return <ul className="contactList">
    {props.list && props.list.map((contact, index) => {
      return (
        <li  className="contactListItem" onClick={(event) => props.setPanelData(event, contact)} key={index}>
          <div className="contactListContent">
            <div className="contactListItemFirstName">
              {contact.name.first}
            </div>
            <div className="contactListItemLastName">
              {contact.name.last}
            </div>
          </div>
        </li>
      )
    })
    }
  </ul>
}
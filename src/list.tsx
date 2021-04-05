import * as React from "react"
import {Contact} from "./type";

export function ContactsList(props: {list: Contact[], setPanelData: Function}) {



  //"panel" + props.panel ? " panelOpen" : ""
  return <ul className="contactList">
    {props.list && props.list.map((contact, index) => {
      return (
        <li className={"dataItem"} onClick={(event) => props.setPanelData(event, contact)} key={index}>
          {contact.name.first}
          {contact.name.last}
        </li>
      )
    })
    }
  </ul>
}
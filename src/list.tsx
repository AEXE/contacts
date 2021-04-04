import * as React from "react"

type Person = {
  name: {
    first: string,
    last: string,
  }
}

export function ContactsList(props: {list: Person[]}) {
  //"panel" + props.panel ? " panelOpen" : ""
  return <ul className={"dataDisplay"}>
    {props.list && props.list.map((e, index) => {
      return (
        <li className={"dataItem"}>
          {e.name.first}
          {e.name.last}
        </li>
      )
    })
    }
  </ul>
}
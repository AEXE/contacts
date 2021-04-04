import * as React from "react"

type Person = {
  name: {
    first: string,
    last: string,
  }
}

export function ContactsList(props: {list: Person[], setPanelIndex: Function}) {

  function setPanelIndex(index: number) {
    props.setPanelIndex(index);
  }

  //"panel" + props.panel ? " panelOpen" : ""
  return <ul className={"dataDisplay"}>
    {props.list && props.list.map((e, index) => {
      return (
        <li className={"dataItem"} onClick={() => setPanelIndex(index)} key={index}>
          {e.name.first}
          {e.name.last}
        </li>
      )
    })
    }
  </ul>
}
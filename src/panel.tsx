import * as React from "react"

export function Panel(props: {panel: boolean, index?: number}) {
    //"panel" + props.panel ? " panelOpen" : ""
  return <div className={props.panel ? "panel" : "panel panelOpen"}>
    <div>{props.index}</div>
  </div>
}
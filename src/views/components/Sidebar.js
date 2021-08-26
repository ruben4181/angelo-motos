import React from "react";
import "./styles/Sidebar.css";

class Sidebar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      main : props.main || "",
      inventory : props.inventory || "",
      selling : props.selling || ""
    }
  }
  render(){
    return(
      <div className="d-flex flex-column sidebar-main-container bg-white shadow-sm fixed-top sidebar sidebar-show" 
        id="sidebar-container">
        <a href="/main" className={"d-flex w-100 flex-row align-items-center nav-item text-dark p-3 "+this.state.main}
          style={{textDecoration : "none"}}>
          <span className="nav-text">Dashboard</span>
          <i className="fas fa-chart-bar fa-2x ms-auto"></i>
        </a>
        <a href="/inventory" className={"d-flex w-100 flex-row align-items-center nav-item text-dark p-3 "+this.state.inventory}
          style={{textDecoration : "none"}}>
          <span className="nav-text">Inventario</span>
          <i className="fas fa-dolly-flatbed fa-2x ms-auto"></i>
        </a>
        <a href="/selling" className={"d-flex w-100 flex-row align-items-center nav-item text-dark p-3 "+this.state.selling}
          style={{textDecoration : "none"}}>
          <span className="nav-text">Venta</span>
          <i className="fas fa-cash-register fa-2x ms-auto"></i>
        </a>
      </div>
    )
  }
}

export default Sidebar;
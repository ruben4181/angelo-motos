import React from "react";
import "./styles/NavBar.css";

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title : props.title || "Dashboard",
      showingSideBar : true,
      closedByJS : false,
      back : props.back
    }
    this.toggleSideBar = this.toggleSideBar.bind(this);
    window.addEventListener("resize", (e)=>{
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      if(vw<992 && this.state.showingSideBar){
        this.toggleSideBar(e);
        this.state.closedByJS = true;
      }
      if(vw>=992 && !this.state.showingSideBar && this.state.closedByJS){
        this.toggleSideBar(e);
        this.state.closedByJS = false;
      }
    });
    this.drawBack = this.drawBack.bind(this);
  }
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container-fluid navbar-own-menu menu-view" id="navbar-container">
          <div className="d-flex flex-row align-items-center">
            {this.drawBack()}
            <div className="icon p-3" onClick={this.toggleSideBar}>
              <i className="fas fa-bars me-3"></i>
              <span>{this.state.title}</span>
            </div>
          </div>
          <a className="navbar-brand" href="#">Angelo Motos</a>
        </div>
      </nav>
    );
  }
  drawBack(){
    if(this.state.back){
      return(
        <div>
          <a href={this.state.back}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </a>
        </div>
      );
    }
  }
  toggleSideBar(e){
    e.preventDefault();
    let sidebar = document.getElementById("sidebar-container");
    let navbar = document.getElementById("navbar-container");
    let mainContainer = document.getElementById("main-container");

    if(this.state.showingSideBar){
      this.setState({showingSideBar:false});
      sidebar.classList.remove("sidebar-show");
      sidebar.classList.add("sidebar-hide");
      navbar.classList.remove("menu-view");
      navbar.classList.add("menu-hide");
      mainContainer.classList.remove("menu-view");
      mainContainer.classList.add("menu-hide");
    } else{
      this.setState({showingSideBar:true});
      sidebar.classList.add("sidebar-show");
      sidebar.classList.remove("sidebar-hide");
      navbar.classList.add("menu-view");
      navbar.classList.remove("menu-hide");
      mainContainer.classList.add("menu-view");
      mainContainer.classList.remove("menu-hide");
    }
  }
  
}

export default NavBar;
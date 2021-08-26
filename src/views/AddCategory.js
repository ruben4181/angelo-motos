import React from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

class AddCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      category_name : "",
      category_code : "",
      category_description : "",
      storeID : props.storeID || "angelo-motos"
    }
    this.addCategory = this.addCategory.bind(this);
  }
  render(){
    return(
      <div className="container-fluid p-0 bg-light">
        <NavBar title="Agregar categoría" back="/inventory"/>
        <Sidebar inventory="active"/>
        <div className="main-container" id="main-container">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12 col-lg-8">
                <div className="mb-3">
                  <label className="form-label">Nombre de la Categoría</label>
                  <input type="text" className="form-control"
                  onChange={(e)=>{this.setState({category_name : e.target.value})}}/>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Codigo de categoría (opcional)</label>
                  <input type="text" className="form-control"
                  onChange={(e)=>{this.setState({category_code : e.target.value})}}/>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Descripcción (opcional)</label>
                  <textarea className="form-control" style={{height:"100px"}}
                  onChange={(e)=>{this.setState({category_description : e.target.value})}}></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 text-end">
                  <button className="btn btn-success"
                  onClick={this.addCategory}>Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  addCategory(e){
    const {category_name, category_code, category_description, storeID} = this.state;
    let now = new Date();
    let stamp = now.getTime();
    let config = {
      url : "http://localhost:7060/category",
      method : "post",
      data : {
        category_name,
        category_code,
        category_description,
        category_id : stamp,
        storeID
      }
    }
    axios(config).then((resp)=>{
      console.log(resp.data);
      const {history} = this.props;
      history.push("/inventory", {});
    }).catch((err)=>{
      console.log("Error while adding category", err);
    })
  }
}

export default AddCategory;
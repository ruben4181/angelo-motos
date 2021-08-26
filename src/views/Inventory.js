import React from "react";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";

import "../styles/mainView.css";
import "../styles/inventory.css";
import axios from "axios";

class Inventory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search : "",
      storeID : props.storeID || "angelo-motos",
      filteredProducts : []
    }
    this.getProducts = this.getProducts.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }
  componentDidMount(){
    this.getProducts();
  }
  render(){
    return(
      <div className="container-fluid p-0 bg-light">
        <NavBar title="Inventario"/>
        <Sidebar inventory="active"/>
        <div className="main-container" id="main-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-6 col-lg-3 mb-3">
                    <div className="card">
                      <a href="/add-product" className="text-decoration-none text-dark">
                      <div className="card-body">
                        <p className="card-text">
                          <i className="fas fa-plus me-3"></i>
                          Agregar un producto
                        </p>
                      </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3 mb-3">
                    <div className="card">
                      <a href="/add-category" className="text-decoration-none text-dark">
                      <div className="card-body">
                        <p className="card-text">
                          <i className="fas fa-plus me-3"></i>
                          Agregar una categoria
                        </p>
                      </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                        <i className="fas fa-minus me-3"></i>
                          Borrar productos
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                        <i className="fas fa-minus me-3"></i>
                          Borrar una categoria
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="Buscar producto"/>
                      <label>Buscar producto o categoria</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Codigo</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Stock</th>
                      <th scope="col"><i className="fas fa-minus me-3"></i></th>
                    </tr>
                  </thead>
                  <tbody id="inventory-tbody">
                    {this.renderProducts()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderProducts(){
    const {filteredProducts} = this.state;
    let items = [];
    for(let i=0; i<filteredProducts.length; i++){
      let product = filteredProducts[i];
      items.push(
        <tr className="product-item">
          <th scope="row">{product.product_code}</th>
          <th>{product.categoryID}</th>
          <th>{product.product_name}</th>
          <th>${product.product_price}</th>
          <th>{product.product_stock}</th>
          <th>
            <input type="checkbox" name="product-del-item" value="1063212123"/>
          </th>
        </tr>
      )
    }
    return items;
  }
  filterProducts(){

  }
  getProducts(){
    const {storeID} = this.state;

    let config = {
      url : "http://localhost:7060/products",
      method : "get",
      params : {
        storeID
      }
    }
    
    axios(config).then((resp)=>{
      this.setState({
        products : resp.data.data,
        filteredProducts : resp.data.data
      });
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export default Inventory;
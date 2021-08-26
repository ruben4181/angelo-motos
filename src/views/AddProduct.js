import React from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

class AddProduct extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      storeID: props.storeID || "angelo-motos",
      product_name : "",
      product_code : "",
      product_price : 0,
      product_cost : 0,
      product_stock : 1,
      product_provider : "",
      product_category : "no-category",
      product_description : ""
    }
    this.getCategories = this.getCategories.bind(this);
    this.sendProduct = this.sendProduct.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }
  componentDidMount(){
    this.getCategories();
  }
  render(){
    return(
      <div className="container-fluid p-0 bg-light">
        <NavBar title="Agregar producto" back="/inventory"/>
        <Sidebar inventory="active"/>
        <div className="main-container" id="main-container">
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12 col-md-8">
                <div className="mb-3">
                  <label className="form-label">Nombre del producto</label>
                  <input type="text" className="form-control" id="product_name"
                  value={this.state.product_name} onChange={(e)=>{this.setState({product_name : e.target.value})}}/>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Codigo del producto
                    </label>
                  <div className="d-flex flex-row">
                  <input type="text" className="form-control" id="product_code"
                  value={this.state.product_code} onChange={(e)=>{this.setState({product_code : e.target.value})}}/>
                    <div className="ms-3 btn btn-light shadow-sm">
                      <i className="fas fa-barcode"></i>
                    </div>
                  </div>
                  <div className="form-text">Usa el codigo de barras del producto, si no tiene, usa un codigo
                  único propio</div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input type="number" className="form-control" min="0" value="0" step="1" id="product_cost"
                  value={this.state.product_stock} onChange={(e)=>{this.setState({product_stock : e.target.value})}}/>
                  <div className="form-text">Cantidad de productos disponible</div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Precio unitario</label>
                  <input type="number" className="form-control" min="0" step="50" value="0" id="product_price"
                  value={this.state.product_price} onChange={(e)=>{this.setState({product_price : e.target.value})}}/>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Costo unitario</label>
                  <input type="number" className="form-control" min="0" value="0" id="product_cost"
                  value={this.state.product_cost} onChange={(e)=>{this.setState({product_cost : e.target.value})}}/>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Proveedor (opcional)</label>
                  <input type="text" className="form-control" id="product_provider"
                  value={this.state.product_provider} onChange={(e)=>{this.setState({product_provider : e.target.value})}}/>
                  <div className="form-text">Si deseas llevar control de tus proveedores</div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select className="form-select" aria-label="Category Select" id="product_category"
                    onChange={(e)=>{this.setState({product_category : e.target.value}, ()=>{console.log(this.state.product_category)})}}>
                    {this.renderCategories()}
                  </select>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Descripcción (opcional)</label>
                  <textarea className="form-control" id="product_description" style={{height:"100px"}}
                  onChange={(e)=>{this.setState({product_description : e.target.value})}}></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 text-end">
                  <button className="btn btn-success"
                  onClick={this.sendProduct}>Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  sendProduct(e){
    const {product_name, product_code, product_price, product_cost, 
      product_provider, product_category, product_description,
    storeID, product_stock} = this.state;
    let config = {
      url : "http://localhost:7060/product",
      method : "post",
      data : {
        product_name,
        product_code,
        product_price,
        product_cost,
        product_provider,
        categoryID : product_category,
        product_description,
        storeID,
        product_stock
      }
    }
    axios(config).then((resp)=>{
      const {history} = this.props;
      history.push("/inventory", {});
    }).catch((err)=>{
      console.log(err);
    });
  }
  renderCategories(){
    let items = [<option value="no-category">Sin categoria</option>];
    const {categories} = this.state;
    if(categories){
      for(let i=0; i<categories.length; i++){
        let category = categories[i];
        items.push(
          <option value={category.category_name}>{category.category_name}</option>
        )
      }
    }
    return items;
  }
  getCategories(){
    const {storeID} = this.state;

    let config={
      url : "http://localhost:7060/categories",
      method : "get",
      params : {
        storeID
      }
    }
    axios(config).then((resp)=>{
      this.setState({
        categories : resp.data.data
      });
    }).catch((err)=>{
      console.log(err);
    });
  }
}

export default AddProduct;
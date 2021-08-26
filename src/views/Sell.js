import React from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

class Sell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search : "",
      products : [],
      billProducts : [],
      ammount : 0,
      filteredProducts : [],
      storeID : props.storeID || "angelo-motos"
    }
    this.getProducts = this.getProducts.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addCount = this.addCount.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  componentDidMount(){
    this.getProducts();
  }
  render(){
    return(
      <div className="container-fluid p-0 bg-light">
        <NavBar title="Facturación"/>
        <Sidebar selling="active"/>
        <div className="main-container" id="main-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-10 col-lg-11">
                <div className="form-floating mb-0">
                  <input type="text" className="form-control" placeholder="Buscar producto"
                  value={this.state.search}
                  onChange={(e)=>{this.setState({search : e.target.value})}}/>
                  <label>Buscar producto</label>
                </div>
                <div className="d-flex flex-column" style={{cursor: "pointer"}}>
                  {this.renderFilteredProducts()}
                </div>
              </div>
              <div className="col-2 col-lg-1">
                <div className="btn btn-light shadow-sm">
                  <i className="fas fa-barcode"></i>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Nombre cliente</label>
                  <input type="text" className="form-control"/>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Número de identificación</label>
                  <input type="text" className="form-control"/>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Telefono</label>
                  <input type="text" className="form-control"/>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Pago</label>
                  <div className="d-flex flex-row">
                    <div className="form-check me-3">
                      <input className="form-check-input" type="radio" name="pago" defaultChecked/>
                      <label className="form-check-label">Contado</label>
                    </div>
                    <div className="form-check me-3">
                      <input className="form-check-input" type="radio" name="pago"/>
                      <label className="form-check-label">Credito</label>
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
                      <th scope="col">Cantidad</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col"><i className="fas fa-minus me-3"></i></th>
                    </tr>
                  </thead>
                  <tbody id="inventory-tbody">
                    {this.renderBillProducts()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        products : resp.data.data
      }, ()=>{console.log(this.state.products)});
    }).catch((err)=>{
      console.log(err);
    })
  }
  renderProducts(){
    let items = [];
    return items;
  }
  renderFilteredProducts(){
    let items = [];
    const filteredProducts = this.filterProducts();

    for(let i=0; i<filteredProducts.length; i++){
      let product = filteredProducts[i];
      items.push(
        <div className="d-flex flex-row w-100 bg-white p-3" onClick={(e)=>{this.addProduct(product)}}>
          {product.product_name}
        </div>
      );
    }
    return items;
  }
  addProduct(product){
    console.log("Clickeo", product);
    const {billProducts} = this.state;
    let flag = true;
    for(let i=0; i<billProducts.length; i++){
      let billProduct = billProducts[i];
      if(billProduct.product_code==product.product_code){
        billProducts[i].product_count=parseInt(billProducts[i].product_count)+1;
        billProducts[i].product_ammount+=parseInt(product.product_price);
        flag = false;
      }
    }
    if(billProducts.length==0 || flag){
      console.log("ENTRO VACIO BILLS")
      billProducts.push({
        product_code : product.product_code,
        categoryID : product.categoryID,
        product_name : product.product_name,
        product_price : product.product_price,
        product_count : 1,
        product_ammount : parseInt(product.product_price)
      });
    }
    this.setState({
      billProducts,
      search : ""
    });
  }
  renderBillProducts(){
    const {billProducts} = this.state;
    let items = [];

    for(let i=0; i<billProducts.length; i++){
      let billProduct = billProducts[i];
      items.push(
        <tr className="product-item">
          <th scope="row">{billProduct.product_code}</th>
          <th>{billProduct.categoryID}</th>
          <th>{billProduct.product_name}</th>
          <th>${billProduct.product_price}</th>
          <th><input type="number" className="form-control" style={{width:"60px"}} 
            step="1" min="1"
            value={billProduct.product_count}
            onChange={(e)=>{this.addCount(billProduct.product_code, e.target.value)}}/>
          </th>
          <th>${billProduct.product_ammount}</th>
          <th>
            <div className="d-flex" onClick={(e)=>{this.deleteProduct(billProduct.product_code)}}>
              <i class="far fa-trash-alt"></i>
            </div>
          </th>
        </tr>
      ); 
    }
    return items;
  }
  deleteProduct(product_code){
    const {billProducts} = this.state;
    var tmp = [];
    for(let i=0; i<billProducts.length; i++){
      if(product_code!=billProducts[i].product_code){
        tmp.push(billProducts[i]);
      }
    }
    this.setState({
      billProducts : tmp
    });
    
  }
  addCount(product_code, value){
    const {billProducts} = this.state;
    for(let i=0; i<billProducts.length; i++){
      let billProduct = billProducts[i];
      if(billProduct.product_code==product_code){
        billProducts[i].product_count=parseInt(value);
        billProducts[i].product_ammount = parseInt(billProducts[i].product_price)*parseInt(value);
        break;
      }
    }
    this.setState({billProducts});
  }
  filterProducts(){
    const {products, search} = this.state;
    if(search==""){
      return [];
    }
    let items = [];

    for(let i=0; i<products.length; i++){
      let product = products[i];
      let name = product.product_name.toLowerCase().includes(search.toLowerCase());
      let code = product.product_code.toLowerCase().includes(search.toLowerCase());
      let category = product.categoryID.toLowerCase().includes(search.toLowerCase());
      if(name || code || category){
        items.push(product);
        //console.log(product.product_name);
      }
    }
    return items.slice(0, Math.min(3, items.length));
  }
}

export default Sell;
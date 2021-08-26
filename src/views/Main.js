import React from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import "../styles/mainView.css";

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        username : props.username,
        name : props.name || "Rubén"
    }
  } 
  render(){
    return(
      <div className="container-fluid p-0 bg-light">
        <NavBar title="Dashboard"/>
        <Sidebar main="active"/>
        <div className="main-container" id="main-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 col-md-4 mb-3">
                <card class="card h-100">
                  <img className="img-fluid card-img-top" src="https://quickchart.io/chart?bkg=white&c={type:%27bar%27,data:{labels:[%27Q1%27,%27Q2%27,%27Q3%27,%27Q4%27],%20datasets:[{label:%27Users%27,data:[50,60,70,180]},{label:%27Revenue%27,data:[100,200,300,400]}]}}"/>
                  <div className="card-body">
                    <h5 className="card-title">Resumen del día</h5>
                    <p class="card-text">
                      Ver el resumen diario de ventas totales o por producto
                    </p>
                    
                  </div>
                </card>
              </div>
              <div className="col-6 col-md-4 mb-3">
                <card class="card h-100">
                  <img className="img-fluid card-img-top" src="https://quickchart.io/chart?bkg=white&c={type:%27bar%27,data:{labels:[%27Q1%27,%27Q2%27,%27Q3%27,%27Q4%27],%20datasets:[{label:%27Users%27,data:[50,60,70,180]},{label:%27Revenue%27,data:[100,200,300,400]}]}}"/>
                  <div className="card-body">
                    <h5 className="card-title">Resumen semanal</h5>
                    <p class="card-text">
                      Resumen de las ventas totales, o por productos, por semanas
                    </p>
                    
                  </div>
                </card>
              </div>
              <div className="col-6 col-md-4 mb-3">
                <card class="card h-100">
                  <img className="img-fluid card-img-top" src="https://quickchart.io/chart?bkg=white&c={type:%27bar%27,data:{labels:[%27Q1%27,%27Q2%27,%27Q3%27,%27Q4%27],%20datasets:[{label:%27Users%27,data:[50,60,70,180]},{label:%27Revenue%27,data:[100,200,300,400]}]}}"/>
                  <div className="card-body">
                    <h5 className="card-title">Resumen mensual</h5>
                    <p class="card-text">
                      Aquí puedes revisar el resumen del mes actual y de los demás meses,
                      además de poder seleccionar fechas personalizadas
                    </p>
                    
                  </div>
                </card>
              </div>
              <div className="col-6 col-md-4 mb-3">
                <card class="card h-100">
                  <img className="img-fluid card-img-top" src="https://quickchart.io/chart?bkg=white&c={type:%27bar%27,data:{labels:[%27Q1%27,%27Q2%27,%27Q3%27,%27Q4%27],%20datasets:[{label:%27Users%27,data:[50,60,70,180]},{label:%27Revenue%27,data:[100,200,300,400]}]}}"/>
                  <div className="card-body">
                    <h5 className="card-title">Resumen anual</h5>
                    <p class="card-text">
                      Todo acerca de ventas y gastos anuales de tu negocio
                    </p>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
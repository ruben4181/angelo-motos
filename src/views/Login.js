import React from 'react';
import "../styles/Login.css";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : ""
    }
    this.login = this.login.bind(this);
  }
  render(){
    return(
      <div className="d-flex bg-light justify-content-center align-items-center" style={{height : "100vh", width : "100vw"}}>
        <div className="card shadow" style={{width: "600px", height : "400px"}}>
          <div class="container m-auto p-5">
            <div className="row">
              <div className="col-12 text-center mb-4">
                  <h3>Iniciar Sesión</h3>
                </div>
                <form>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="Nombre de usuario"
                      onChange={(e)=>{this.setState({username : e.target.value})}}/>
                      <label>Nombre de usuario</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="Nombre de usuario"
                      onChange={(e)=>{this.setState({password : e.target.value})}}/>
                      <label>Contraseña</label>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary" onClick={this.login}>Ingresar</button>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
    login(e){
      e.preventDefault();
      
      const { history } = this.props;
      history.push("/main", {
        username : this.state.username
      });
    }
}

export default Login;
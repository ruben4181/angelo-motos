import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddCategory from './views/AddCategory';
import AddProduct from './views/AddProduct';
import Inventory from './views/Inventory';
import Login from './views/Login';
import Main from './views/Main';
import Sell from './views/Sell';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/main' exact component={Main}/>
        <Route path="/inventory" exact component={Inventory}/>
        <Route path="/add-product" exact component={AddProduct}/>
        <Route path="/add-category" exact component={AddCategory}/>
        <Route path="/selling" exact component={Sell}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

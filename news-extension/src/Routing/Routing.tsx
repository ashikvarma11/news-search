import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
  } from "react-router-dom";
import { Home } from '../components/Home/Home';
import { Interests } from '../components/Interests/Interests';
type Props = {

}
const Routing: React.FC<Props> = () => {
    return (<>
    
    <Router>
      <div>
        <Switch>
          <Route exact path="/home">
            <Home interests={[]}/>
          </Route>
          <Route path="/">
            <Interests />
          </Route>
        </Switch>
      </div>
    </Router>
    </>);
}

export {Routing}
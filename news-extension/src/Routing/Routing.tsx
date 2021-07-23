import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from '../components/Home/Home'
import { Interests } from '../components/Interests/Interests'

const Routing: React.FC<{}> = () => (
  <>
    <Router>
      <div>
        <Switch>
          <Route exact={true} path="/home">
            <Home interests={[]} />
          </Route>
          <Route path="/">
            <Interests />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
)

export { Routing }

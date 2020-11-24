import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Countries} from './components/Countries/Countries';
import {Country} from './components/Country/Country';

import './App.css';

const App = () => (
    <Router>
        <Switch>
            <Route path="/:countryCode" exact={true}>
                <Country />
            </Route>
            <Route path="/">
                <Countries />
            </Route>
        </Switch>
    </Router>
)

export default App;

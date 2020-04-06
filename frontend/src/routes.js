import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Incidents from './pages/Ong/Incidents';
import NewIncident from './pages/Ong/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/ong/incidents" component={Incidents} />
        <Route path="/ong/new-incident" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}

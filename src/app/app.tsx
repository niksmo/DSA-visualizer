import '../shared/ui/common.css';
import '../shared/ui/box.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  FibonacciPage,
  ListPage,
  MainPage,
  QueuePage,
  SortingPage,
  StackPage,
  StringComponent
} from '../pages';

export const App = () => (
  <BrowserRouter basename="/projects/algososh">
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/recursion">
        <StringComponent />
      </Route>
      <Route path="/fibonacci">
        <FibonacciPage />
      </Route>
      <Route path="/sorting">
        <SortingPage />
      </Route>
      <Route path="/stack">
        <StackPage />
      </Route>
      <Route path="/queue">
        <QueuePage />
      </Route>
      <Route path="/list">
        <ListPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

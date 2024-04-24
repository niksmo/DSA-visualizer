import './assets/styles/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
	FibonacciPage,
	DequePage,
	MainPage,
	RingBufferPage,
	SortingPage,
	StackPage,
	StringComponent
} from '../pages';

export const App = () => (
	<BrowserRouter>
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
				<RingBufferPage />
			</Route>
			<Route path="/list">
				<DequePage />
			</Route>
		</Switch>
	</BrowserRouter>
);

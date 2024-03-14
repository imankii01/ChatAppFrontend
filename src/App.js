import React from 'react';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
// import reducer from "./redux/reducers";
// import rootSaga from "./redux/saga";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer';
import rootSaga from './redux/saga';
const sagaMiddleware = createSagaMiddleware();
const Logger = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, Logger));

sagaMiddleware.run(rootSaga);
function App() {
  return (
    <Router>
     <Provider store={store}>
     <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/registration" component={<p>ffhgdgh</p>} />
        </Provider>
   
      {/* Add more routes as needed */}
    </Router>
  );
}

export default App;

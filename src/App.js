import React from "react";
import'./App.css'
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";
import rootSaga from "./redux/saga";
import { Auth } from "./auth";
import { logged } from "./tokenProvider";
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
        <Auth LoggedIn={logged} />
      </Provider>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { PublicRoutes } from "./routes";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import rootSaga from "./redux/saga";
import rootReducer from "./redux/reducers";
import { logged } from "./Components/Auth/tokenProvider";
import Auth from "./Components/Auth";
import { pdfjs } from 'react-pdf';
const sagaMiddleware = createSagaMiddleware();
const Logger = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, Logger));

sagaMiddleware.run(rootSaga);



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
function App() {
  return (
    <>
      <Router>
        {/* <Auth LoggedIn={logged} /> */}
        <Provider store={store}>
        <Auth LoggedIn={logged} />
       
        </Provider>
      </Router>
    </>
  );
}

export default App;

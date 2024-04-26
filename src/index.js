import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as Sentry from "@sentry/react";
// import { SENTRY_DSN } from "./Constants";
// import { useLocation } from "react-router-dom";

// Sentry.init({
//   dsn: "https://4550837962d5434ea4f32d462375fb9b@sentry.zaryaapp.com/5",
//   replaysSessionSampleRate: 0.8,
//   replaysOnErrorSampleRate: 0.8,
//   integrations: [
//     new Sentry.BrowserTracing({
//       routingInstrumentation: Sentry.reactRouterV6Instrumentation(
//         React.useEffect,
//         useLocation
//         //useNavigationType,
//         //createRoutesFromChildren,
//         //matchRoutes
//       ),
//     }),
//     new Sentry.Replay({
//       maskAllText: true,
//       blockAllMedia: true,
//     }),
//   ],
//   tracesSampleRate: 0.8,
// });

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

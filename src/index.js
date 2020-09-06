import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import ScrollTop from "./components/ScrollTop";
import ErrorBoundary from "./components/ErrorBoundary";
import MenuActive from "./components/MenuActive";
import {axiosConfig} from "./axioxConfig";
import VisionStyle from "./VisionStyle";
import ReactGA from "react-ga";
import {YMInitializer} from "react-yandex-metrika";

axiosConfig.register();

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <ScrollTop/>
                <MenuActive/>
                <VisionStyle>
                    <App/>
                </VisionStyle>
            </BrowserRouter>
            <YMInitializer accounts={[+process.env.REACT_APP_YANDEX_METRIKA_KEY]} options={{
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                trackHash: false
            }} version="2"/>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
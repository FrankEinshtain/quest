"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var react_1 = __importDefault(require("react"));
var gatsby_theme_auth0_ts_1 = require("gatsby-theme-auth0-ts");
var Header_1 = require("./Header");
exports.Layout = function (_a) {
    var children = _a.children;
    var session = react_1.default.useContext(gatsby_theme_auth0_ts_1.SessionContext);
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            minHeight: '100vh',
            padding: '20px',
            flexDirection: 'column',
            boxSizing: 'border-box',
        } },
        react_1.default.createElement(Header_1.Header, null),
        react_1.default.createElement("div", { style: { flex: '1' } }, children),
        react_1.default.createElement("footer", null, "FooTer")));
};
// import * as React from 'react'
// // import { graphql, Link, PageProps } from 'gatsby'
// // import * as styles from '../../scss/components/Layout.module.scss'
// import Seo from '../Seo'
// interface LayoutProps {
//   children: React.ReactChild | React.ReactChildren | JSX.Element[]
// }
// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <>
//       <Seo />
//       <div>
//         <header>Header</header>
//         {children}
//         <footer>Footer</footer>
//       </div>
//     </>
//   )
// }
// export default Layout

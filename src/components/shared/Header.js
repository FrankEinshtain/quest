"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var react_1 = __importDefault(require("react"));
var gatsby_theme_auth0_ts_1 = require("gatsby-theme-auth0-ts");
var router_1 = require("@reach/router");
var gatsby_1 = require("gatsby");
exports.Header = function () {
    var session = react_1.default.useContext(gatsby_theme_auth0_ts_1.SessionContext);
    var user = session.user, _a = session.auth, authorize = _a.authorize, logout = _a.logout;
    var data = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query {\n      site {\n        siteMetadata {\n          title\n        }\n      }\n    }\n  "], ["\n    query {\n      site {\n        siteMetadata {\n          title\n        }\n      }\n    }\n  "]))));
    return (react_1.default.createElement("header", null,
        react_1.default.createElement(router_1.Link, { to: '/' },
            react_1.default.createElement("h1", null, data.site.siteMetadata.title)),
        react_1.default.createElement("nav", null, user.isLoggedIn ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(router_1.Link, { to: '/thegame' }, "The Game"),
            react_1.default.createElement(router_1.Link, { to: '/thegame/settings' }, "Settings"),
            react_1.default.createElement(router_1.Link, { to: '/thegame/billing' }, "Billing"),
            react_1.default.createElement("button", { onClick: function () { return logout(); } }, "Log Out"))) : (react_1.default.createElement("button", { onClick: function () { return authorize(); } }, "Log In")))));
};
var templateObject_1;

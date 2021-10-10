"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// import { useAuth0 } from '@auth0/auth0-react'
var LoginButton = function () {
    // const { loginWithRedirect } = useAuth0()
    // console.log('loginWithRedirect :>> ', loginWithRedirect)
    // return <button onClick={() => loginWithRedirect()}>Log In</button>
    return react_1.default.createElement("button", { onClick: function (e) { return console.log('LoginButton E: ', e); } }, "Log In");
};
exports.default = LoginButton;

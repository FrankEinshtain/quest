"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_helmet_1 = require("react-helmet");
var gatsby_1 = require("gatsby");
function SEO(_a) {
    var _b, _c;
    var _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.lang, lang = _e === void 0 ? 'en' : _e, _f = _a.meta, meta = _f === void 0 ? [] : _f, _g = _a.title, title = _g === void 0 ? 'default title' : _g;
    var site = gatsby_1.useStaticQuery(SEOStaticQuery).site;
    var metaDescription = description || site.siteMetadata.description;
    var defaultTitle = ((_b = site.siteMetadata) === null || _b === void 0 ? void 0 : _b.title) || title;
    return (react_1.default.createElement(react_helmet_1.Helmet, { htmlAttributes: {
            lang: lang,
        }, title: '', 
        // title={defaultTitle}
        // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
        meta: [
            {
                name: "description",
                content: metaDescription,
            },
            {
                property: "og:title",
                content: defaultTitle,
            },
            {
                property: "og:description",
                content: metaDescription,
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                name: "twitter:card",
                content: "summary",
            },
            {
                name: "twitter:creator",
                content: ((_c = site.siteMetadata) === null || _c === void 0 ? void 0 : _c.author) || "",
            },
            {
                name: "twitter:title",
                content: defaultTitle,
            },
            {
                name: "twitter:description",
                content: metaDescription,
            },
        ].concat(meta) }));
}
exports.default = SEO;
// Queries
var SEOStaticQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query {\n    site {\n      siteMetadata {\n        title\n        description\n        author\n      }\n    }\n  }\n"], ["\n  query {\n    site {\n      siteMetadata {\n        title\n        description\n        author\n      }\n    }\n  }\n"])));
var templateObject_1;

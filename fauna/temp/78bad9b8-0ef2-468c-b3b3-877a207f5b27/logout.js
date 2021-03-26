var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/fn-annotate/index.js
var require_fn_annotate = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = annotate;
  function annotate(fn) {
    if (typeof fn !== "function") {
      throw new Error("Could not parse function signature for injection dependencies: Object is not a function");
    }
    if (!fn.length)
      return [];
    var injects = /^()\(?([^)=]*)\)? *=>/.exec(fn + "") || /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(fn + "");
    if (!injects) {
      throw new Error("Could not parse function signature for injection dependencies: " + fn + "");
    }
    var argumentString = injects[2].replace(/\/\*[\S\s]*?\*\//g, " ").replace(/\/\/.*/g, " ");
    function groupSubArguments(_, type, keys) {
      return type + keys.split(",").map(function(arg) {
        return arg && arg.trim();
      }).filter(Boolean).join("@");
    }
    argumentString = argumentString.replace(/(\{)([^}]*)\}/g, groupSubArguments);
    argumentString = argumentString.replace(/(\[)([^}]*)\]/g, groupSubArguments);
    return argumentString.split(",").map(function(arg) {
      return arg && arg.trim();
    }).map(function(arg) {
      if (arg[0] === "{") {
        return arg.substring(1).split("@");
      }
      if (arg[0] === "[") {
        return {items: arg.substring(1).split("@")};
      }
      return arg;
    }).filter(Boolean);
  }
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS((exports2, module2) => {
  module2.exports = require("util").deprecate;
});

// node_modules/faunadb/src/_util.js
var require_util = __commonJS((exports2, module2) => {
  "use strict";
  function inherits(ctor, superCtor) {
    if (ctor === void 0 || ctor === null) {
      throw new TypeError('The constructor to "inherits" must not be null or undefined');
    }
    if (superCtor === void 0 || superCtor === null) {
      throw new TypeError('The super constructor to "inherits" must not be null or undefined');
    }
    if (superCtor.prototype === void 0) {
      throw new TypeError('The super constructor to "inherits" must have a prototype');
    }
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
  function isNodeEnv() {
    return typeof window === "undefined" && typeof process !== "undefined" && process.versions != null && process.versions.node != null;
  }
  function getBrowserDetails() {
    var browser = navigator.appName;
    var browserVersion = "" + parseFloat(navigator.appVersion);
    var nameOffset, verOffset, ix;
    if ((verOffset = navigator.userAgent.indexOf("Opera")) != -1) {
      browser = "Opera";
      browserVersion = navigator.userAgent.substring(verOffset + 6);
      if ((verOffset = navigator.userAgent.indexOf("Version")) != -1) {
        browserVersion = navigator.userAgent.substring(verOffset + 8);
      }
    } else if ((verOffset = navigator.userAgent.indexOf("MSIE")) != -1) {
      browser = "Microsoft Internet Explorer";
      browserVersion = navigator.userAgent.substring(verOffset + 5);
    } else if (browser == "Netscape" && navigator.userAgent.indexOf("Trident/") != -1) {
      browser = "Microsoft Internet Explorer";
      browserVersion = navigator.userAgent.substring(verOffset + 5);
      if ((verOffset = navigator.userAgent.indexOf("rv:")) != -1) {
        browserVersion = navigator.userAgent.substring(verOffset + 3);
      }
    } else if ((verOffset = navigator.userAgent.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      browserVersion = navigator.userAgent.substring(verOffset + 7);
    } else if ((verOffset = navigator.userAgent.indexOf("Safari")) != -1) {
      browser = "Safari";
      browserVersion = navigator.userAgent.substring(verOffset + 7);
      if ((verOffset = navigator.userAgent.indexOf("Version")) != -1) {
        browserVersion = navigator.userAgent.substring(verOffset + 8);
      }
      if (navigator.userAgent.indexOf("CriOS") != -1) {
        browser = "Chrome";
      }
    } else if ((verOffset = navigator.userAgent.indexOf("Firefox")) != -1) {
      browser = "Firefox";
      browserVersion = navigator.userAgent.substring(verOffset + 8);
    } else if ((nameOffset = navigator.userAgent.lastIndexOf(" ") + 1) < (verOffset = navigator.userAgent.lastIndexOf("/"))) {
      browser = navigator.userAgent.substring(nameOffset, verOffset);
      browserVersion = navigator.userAgent.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    if ((ix = browserVersion.indexOf(";")) != -1)
      browserVersion = browserVersion.substring(0, ix);
    if ((ix = browserVersion.indexOf(" ")) != -1)
      browserVersion = browserVersion.substring(0, ix);
    if ((ix = browserVersion.indexOf(")")) != -1)
      browserVersion = browserVersion.substring(0, ix);
    return [browser, browserVersion].join("-");
  }
  function getBrowserOsDetails() {
    var os = "unknown";
    var clientStrings = [
      {s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/},
      {s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/},
      {s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/},
      {s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/},
      {s: "Windows Vista", r: /Windows NT 6.0/},
      {s: "Windows Server 2003", r: /Windows NT 5.2/},
      {s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/},
      {s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/},
      {s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/},
      {s: "Windows 98", r: /(Windows 98|Win98)/},
      {s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/},
      {s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s: "Windows CE", r: /Windows CE/},
      {s: "Windows 3.11", r: /Win16/},
      {s: "Android", r: /Android/},
      {s: "Open BSD", r: /OpenBSD/},
      {s: "Sun OS", r: /SunOS/},
      {s: "Chrome OS", r: /CrOS/},
      {s: "Linux", r: /(Linux|X11(?!.*CrOS))/},
      {s: "iOS", r: /(iPhone|iPad|iPod)/},
      {s: "Mac OS X", r: /Mac OS X/},
      {s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s: "QNX", r: /QNX/},
      {s: "UNIX", r: /UNIX/},
      {s: "BeOS", r: /BeOS/},
      {s: "OS/2", r: /OS\/2/},
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(navigator.userAgent)) {
        os = cs.s;
        break;
      }
    }
    var osVersion = "unknown";
    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = "Windows";
    }
    switch (os) {
      case "Mac OS":
      case "Mac OS X":
      case "Android":
        osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(navigator.userAgent)[1];
        break;
      case "iOS":
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
        osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
        break;
    }
    return [os, osVersion].join("-");
  }
  function getNodeRuntimeEnv() {
    var runtimeEnvs = [
      {
        name: "Netlify",
        check: () => process.env.hasOwnProperty("NETLIFY_IMAGES_CDN_DOMAIN")
      },
      {
        name: "Vercel",
        check: () => process.env.hasOwnProperty("VERCEL")
      },
      {
        name: "Heroku",
        check: () => process.env.hasOwnProperty("PATH") && process.env.PATH.indexOf(".heroku") !== -1
      },
      {
        name: "AWS Lambda",
        check: () => process.env.hasOwnProperty("AWS_LAMBDA_FUNCTION_VERSION")
      },
      {
        name: "GCP Cloud Functions",
        check: () => process.env.hasOwnProperty("_") && process.env._.indexOf("google") !== -1
      },
      {
        name: "GCP Compute Instances",
        check: () => process.env.hasOwnProperty("GOOGLE_CLOUD_PROJECT")
      },
      {
        name: "Azure Cloud Functions",
        check: () => process.env.hasOwnProperty("WEBSITE_FUNCTIONS_AZUREMONITOR_CATEGORIES")
      },
      {
        name: "Azure Compute",
        check: () => process.env.hasOwnProperty("ORYX_ENV_TYPE") && process.env.hasOwnProperty("WEBSITE_INSTANCE_ID") && process.env.ORYX_ENV_TYPE === "AppService"
      },
      {
        name: "Worker",
        check: () => {
          try {
            return global instanceof ServiceWorkerGlobalScope;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: "Mongo Stitch",
        check: () => typeof global.StitchError === "function"
      },
      {
        name: "Render",
        check: () => process.env.hasOwnProperty("RENDER_SERVICE_ID")
      },
      {
        name: "Begin",
        check: () => process.env.hasOwnProperty("BEGIN_DATA_SCOPE_ID")
      }
    ];
    var detectedEnv = runtimeEnvs.find((env) => env.check());
    return detectedEnv ? detectedEnv.name : "unknown";
  }
  function defaults(obj, def) {
    if (obj === void 0) {
      return def;
    } else {
      return obj;
    }
  }
  function applyDefaults(provided, defaults2) {
    var out = {};
    for (var providedKey in provided) {
      if (!(providedKey in defaults2)) {
        throw new Error("No such option " + providedKey);
      }
      out[providedKey] = provided[providedKey];
    }
    for (var defaultsKey in defaults2) {
      if (!(defaultsKey in out)) {
        out[defaultsKey] = defaults2[defaultsKey];
      }
    }
    return out;
  }
  function removeNullAndUndefinedValues(object) {
    var res = {};
    for (var key in object) {
      var val = object[key];
      if (val !== null && val !== void 0) {
        res[key] = val;
      }
    }
    return res;
  }
  function removeUndefinedValues(object) {
    var res = {};
    for (var key in object) {
      var val = object[key];
      if (val !== void 0) {
        res[key] = val;
      }
    }
    return res;
  }
  function checkInstanceHasProperty(obj, prop) {
    return typeof obj === "object" && obj !== null && Boolean(obj[prop]);
  }
  function formatUrl(base, path, query) {
    query = typeof query === "object" ? querystringify(query) : query;
    return [
      base,
      path ? path.charAt(0) === "/" ? "" : "/" + path : "",
      query ? query.charAt(0) === "?" ? "" : "?" + query : ""
    ].join("");
  }
  function querystringify(obj, prefix) {
    prefix = prefix || "";
    var pairs = [], value, key;
    if (typeof prefix !== "string")
      prefix = "?";
    for (key in obj) {
      if (checkInstanceHasProperty(obj, key)) {
        value = obj[key];
        if (!value && (value === null || value === void 0 || isNaN(value))) {
          value = "";
        }
        key = encode(key);
        value = encode(value);
        if (key === null || value === null)
          continue;
        pairs.push(key + "=" + value);
      }
    }
    return pairs.length ? prefix + pairs.join("&") : "";
  }
  function encode(input) {
    try {
      return encodeURIComponent(input);
    } catch (e) {
      return null;
    }
  }
  function mergeObjects(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }
  module2.exports = {
    mergeObjects,
    formatUrl,
    querystringify,
    inherits,
    isNodeEnv,
    defaults,
    applyDefaults,
    removeNullAndUndefinedValues,
    removeUndefinedValues,
    checkInstanceHasProperty,
    getBrowserDetails,
    getBrowserOsDetails,
    getNodeRuntimeEnv
  };
});

// node_modules/faunadb/src/Expr.js
var require_Expr = __commonJS((exports2, module2) => {
  "use strict";
  var util = require_util();
  function Expr(obj) {
    this.raw = obj;
  }
  Expr.prototype._isFaunaExpr = true;
  Expr.prototype.toJSON = function() {
    return this.raw;
  };
  Expr.prototype.toFQL = function() {
    return exprToString(this.raw);
  };
  var varArgsFunctions = [
    "Do",
    "Call",
    "Union",
    "Intersection",
    "Difference",
    "Equals",
    "Add",
    "BitAnd",
    "BitOr",
    "BitXor",
    "Divide",
    "Max",
    "Min",
    "Modulo",
    "Multiply",
    "Subtract",
    "LT",
    "LTE",
    "GT",
    "GTE",
    "And",
    "Or"
  ];
  var specialCases = {
    containsstrregex: "ContainsStrRegex",
    endswith: "EndsWith",
    findstr: "FindStr",
    findstrregex: "FindStrRegex",
    gt: "GT",
    gte: "GTE",
    is_nonempty: "is_non_empty",
    lowercase: "LowerCase",
    lt: "LT",
    lte: "LTE",
    ltrim: "LTrim",
    rtrim: "RTrim",
    regexescape: "RegexEscape",
    replacestr: "ReplaceStr",
    replacestrregex: "ReplaceStrRegex",
    startswith: "StartsWith",
    substring: "SubString",
    titlecase: "TitleCase",
    uppercase: "UpperCase"
  };
  function isExpr(expression) {
    return expression instanceof Expr || util.checkInstanceHasProperty(expression, "_isFaunaExpr");
  }
  function printObject(obj) {
    return "{" + Object.keys(obj).map(function(k) {
      return k + ": " + exprToString(obj[k]);
    }).join(", ") + "}";
  }
  function printArray(arr, toStr) {
    return arr.map(function(item) {
      return toStr(item);
    }).join(", ");
  }
  function convertToCamelCase(fn) {
    if (fn in specialCases)
      fn = specialCases[fn];
    return fn.split("_").map(function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }).join("");
  }
  var exprToString = function(expr, caller) {
    if (isExpr(expr)) {
      if ("value" in expr)
        return expr.toString();
      expr = expr.raw;
    }
    if (expr === null) {
      return "null";
    }
    switch (typeof expr) {
      case "string":
        return JSON.stringify(expr);
      case "symbol":
      case "number":
      case "boolean":
        return expr.toString();
      case "undefined":
        return "undefined";
    }
    if (Array.isArray(expr)) {
      var array = printArray(expr, exprToString);
      return varArgsFunctions.indexOf(caller) != -1 ? array : "[" + array + "]";
    }
    if ("match" in expr) {
      var matchStr = exprToString(expr["match"]);
      var terms = expr["terms"] || [];
      if (isExpr(terms))
        terms = terms.raw;
      if (Array.isArray(terms) && terms.length == 0)
        return "Match(" + matchStr + ")";
      if (Array.isArray(terms)) {
        return "Match(" + matchStr + ", [" + printArray(terms, exprToString) + "])";
      }
      return "Match(" + matchStr + ", " + exprToString(terms) + ")";
    }
    if ("paginate" in expr) {
      var exprKeys = Object.keys(expr);
      if (exprKeys.length === 1) {
        return "Paginate(" + exprToString(expr["paginate"]) + ")";
      }
      var expr2 = Object.assign({}, expr);
      delete expr2["paginate"];
      return "Paginate(" + exprToString(expr["paginate"]) + ", " + printObject(expr2) + ")";
    }
    if ("let" in expr && "in" in expr) {
      var letExpr = "";
      if (Array.isArray(expr["let"]))
        letExpr = "[" + printArray(expr["let"], printObject) + "]";
      else
        letExpr = printObject(expr["let"]);
      return "Let(" + letExpr + ", " + exprToString(expr["in"]) + ")";
    }
    if ("object" in expr)
      return printObject(expr["object"]);
    if ("merge" in expr) {
      if (expr.lambda) {
        return "Merge(" + exprToString(expr.merge) + ", " + exprToString(expr.with) + ", " + exprToString(expr.lambda) + ")";
      }
      return "Merge(" + exprToString(expr.merge) + ", " + exprToString(expr.with) + ")";
    }
    if ("lambda" in expr) {
      return "Lambda(" + exprToString(expr["lambda"]) + ", " + exprToString(expr["expr"]) + ")";
    }
    if ("filter" in expr) {
      return "Filter(" + exprToString(expr["collection"]) + ", " + exprToString(expr["filter"]) + ")";
    }
    if ("call" in expr) {
      return "Call(" + exprToString(expr["call"]) + ", " + exprToString(expr["arguments"]) + ")";
    }
    if ("map" in expr) {
      return "Map(" + exprToString(expr["collection"]) + ", " + exprToString(expr["map"]) + ")";
    }
    if ("foreach" in expr) {
      return "Foreach(" + exprToString(expr["collection"]) + ", " + exprToString(expr["foreach"]) + ")";
    }
    var keys = Object.keys(expr);
    var fn = keys[0];
    fn = convertToCamelCase(fn);
    var args = keys.filter((k) => expr[k] !== null || keys.length > 1).map((k) => exprToString(expr[k], fn)).join(", ");
    return fn + "(" + args + ")";
  };
  Expr.toString = exprToString;
  module2.exports = Expr;
});

// node_modules/faunadb/src/errors.js
var require_errors = __commonJS((exports2, module2) => {
  "use strict";
  var util = require_util();
  function FaunaError(name, message, description) {
    Error.call(this);
    this.name = name;
    this.message = message;
    this.description = description;
  }
  util.inherits(FaunaError, Error);
  function InvalidValue(message) {
    FaunaError.call(this, "InvalidValue", message);
  }
  util.inherits(InvalidValue, FaunaError);
  function InvalidArity(min, max, actual, callerFunc) {
    var arityInfo = `${callerFunc} function requires ${messageForArity(min, max)} argument(s) but ${actual} were given`;
    var documentationLink = logDocumentationLink(callerFunc);
    FaunaError.call(this, "InvalidArity", `${arityInfo}
${documentationLink}`);
    this.min = min;
    this.max = max;
    this.actual = actual;
    function messageForArity(min2, max2) {
      if (max2 === null)
        return "at least " + min2;
      if (min2 === null)
        return "up to " + max2;
      if (min2 === max2)
        return min2;
      return "from " + min2 + " to " + max2;
    }
    function logDocumentationLink(functionName) {
      var docsURL = "https://docs.fauna.com/fauna/current/api/fql/functions/";
      return `For more info, see the docs: ${docsURL}${functionName.toLowerCase()}`;
    }
  }
  util.inherits(InvalidArity, FaunaError);
  function FaunaHTTPError(name, requestResult) {
    var response = requestResult.responseContent;
    var errors = response.errors;
    var message = errors.length === 0 ? '(empty "errors")' : errors[0].code;
    var description = errors.length === 0 ? '(empty "errors")' : errors[0].description;
    FaunaError.call(this, name, message, description);
    this.requestResult = requestResult;
  }
  util.inherits(FaunaHTTPError, FaunaError);
  FaunaHTTPError.prototype.errors = function() {
    return this.requestResult.responseContent.errors;
  };
  FaunaHTTPError.raiseForStatusCode = function(requestResult) {
    var code = requestResult.statusCode;
    if (code < 200 || code >= 300) {
      switch (code) {
        case 400:
          throw new BadRequest(requestResult);
        case 401:
          throw new Unauthorized(requestResult);
        case 403:
          throw new PermissionDenied(requestResult);
        case 404:
          throw new NotFound(requestResult);
        case 405:
          throw new MethodNotAllowed(requestResult);
        case 500:
          throw new InternalError(requestResult);
        case 503:
          throw new UnavailableError(requestResult);
        default:
          throw new FaunaHTTPError("UnknownError", requestResult);
      }
    }
  };
  function BadRequest(requestResult) {
    FaunaHTTPError.call(this, "BadRequest", requestResult);
  }
  util.inherits(BadRequest, FaunaHTTPError);
  function Unauthorized(requestResult) {
    FaunaHTTPError.call(this, "Unauthorized", requestResult);
  }
  util.inherits(Unauthorized, FaunaHTTPError);
  function PermissionDenied(requestResult) {
    FaunaHTTPError.call(this, "PermissionDenied", requestResult);
  }
  util.inherits(PermissionDenied, FaunaHTTPError);
  function NotFound(requestResult) {
    FaunaHTTPError.call(this, "NotFound", requestResult);
  }
  util.inherits(NotFound, FaunaHTTPError);
  function MethodNotAllowed(requestResult) {
    FaunaHTTPError.call(this, "MethodNotAllowed", requestResult);
  }
  util.inherits(MethodNotAllowed, FaunaHTTPError);
  function InternalError(requestResult) {
    FaunaHTTPError.call(this, "InternalError", requestResult);
  }
  util.inherits(InternalError, FaunaHTTPError);
  function UnavailableError(requestResult) {
    FaunaHTTPError.call(this, "UnavailableError", requestResult);
  }
  util.inherits(UnavailableError, FaunaHTTPError);
  function StreamError(name, message, description) {
    FaunaError.call(this, name, message, description);
  }
  util.inherits(StreamError, FaunaError);
  function StreamsNotSupported(description) {
    FaunaError.call(this, "StreamsNotSupported", "streams not supported", description);
  }
  util.inherits(StreamsNotSupported, StreamError);
  function StreamErrorEvent(event) {
    var error = event.data || {};
    FaunaError.call(this, "StreamErrorEvent", error.code, error.description);
    this.event = event;
  }
  util.inherits(StreamErrorEvent, StreamError);
  module2.exports = {
    FaunaError,
    FaunaHTTPError,
    InvalidValue,
    InvalidArity,
    BadRequest,
    Unauthorized,
    PermissionDenied,
    NotFound,
    MethodNotAllowed,
    InternalError,
    UnavailableError,
    StreamError,
    StreamsNotSupported,
    StreamErrorEvent
  };
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS((exports2) => {
  "use strict";
  exports2.byteLength = byteLength;
  exports2.toByteArray = toByteArray;
  exports2.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1)
      validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
});

// node_modules/faunadb/src/values.js
var require_values = __commonJS((exports2, module2) => {
  "use strict";
  var base64 = require_base64_js();
  var deprecate = require_node();
  var errors = require_errors();
  var Expr = require_Expr();
  var util = require_util();
  var nodeUtil = util.isNodeEnv() ? require("util") : null;
  var customInspect = nodeUtil && nodeUtil.inspect.custom;
  var stringify = nodeUtil ? nodeUtil.inspect : JSON.stringify;
  function Value() {
  }
  Value.prototype._isFaunaValue = true;
  util.inherits(Value, Expr);
  function Ref(id, collection, database) {
    if (!id)
      throw new errors.InvalidValue("id cannot be null or undefined");
    this.value = {id};
    if (collection)
      this.value["collection"] = collection;
    if (database)
      this.value["database"] = database;
  }
  Ref.prototype._isFaunaRef = true;
  util.inherits(Ref, Value);
  Object.defineProperty(Ref.prototype, "collection", {
    get: function() {
      return this.value["collection"];
    }
  });
  Object.defineProperty(Ref.prototype, "class", {
    get: deprecate(function() {
      return this.value["collection"];
    }, "class is deprecated, use collection instead")
  });
  Object.defineProperty(Ref.prototype, "database", {
    get: function() {
      return this.value["database"];
    }
  });
  Object.defineProperty(Ref.prototype, "id", {
    get: function() {
      return this.value["id"];
    }
  });
  Ref.prototype.toJSON = function() {
    return {"@ref": this.value};
  };
  wrapToString(Ref, function() {
    var constructors = {
      collections: "Collection",
      databases: "Database",
      indexes: "Index",
      functions: "Function",
      roles: "Role",
      access_providers: "AccessProvider"
    };
    var isNative = function(ref) {
      return ref.collection === void 0;
    };
    var toString = function(ref) {
      if (isNative(ref)) {
        var db = ref.database !== void 0 ? ref.database.toString() : "";
        if (ref.id === "access_providers")
          return "AccessProviders(" + db + ")";
        return ref.id.charAt(0).toUpperCase() + ref.id.slice(1) + "(" + db + ")";
      }
      if (isNative(ref.collection)) {
        var constructor = constructors[ref.collection.id];
        if (constructor !== void 0) {
          var db = ref.database !== void 0 ? ", " + ref.database.toString() : "";
          return constructor + '("' + ref.id + '"' + db + ")";
        }
      }
      return "Ref(" + toString(ref.collection) + ', "' + ref.id + '")';
    };
    return toString(this);
  });
  Ref.prototype.valueOf = function() {
    return this.value;
  };
  Ref.prototype.equals = function(other) {
    return (other instanceof Ref || util.checkInstanceHasProperty(other, "_isFaunaRef")) && this.id === other.id && (this.collection === void 0 && other.collection === void 0 || this.collection.equals(other.collection)) && (this.database === void 0 && other.database === void 0 || this.database.equals(other.database));
  };
  var Native = {
    COLLECTIONS: new Ref("collections"),
    INDEXES: new Ref("indexes"),
    DATABASES: new Ref("databases"),
    FUNCTIONS: new Ref("functions"),
    ROLES: new Ref("roles"),
    KEYS: new Ref("keys"),
    ACCESS_PROVIDERS: new Ref("access_providers")
  };
  Native.fromName = function(name) {
    switch (name) {
      case "collections":
        return Native.COLLECTIONS;
      case "indexes":
        return Native.INDEXES;
      case "databases":
        return Native.DATABASES;
      case "functions":
        return Native.FUNCTIONS;
      case "roles":
        return Native.ROLES;
      case "keys":
        return Native.KEYS;
      case "access_providers":
        return Native.ACCESS_PROVIDERS;
    }
    return new Ref(name);
  };
  function SetRef(value) {
    this.value = value;
  }
  util.inherits(SetRef, Value);
  wrapToString(SetRef, function() {
    return Expr.toString(this.value);
  });
  SetRef.prototype.toJSON = function() {
    return {"@set": this.value};
  };
  function FaunaTime(value) {
    if (value instanceof Date) {
      value = value.toISOString();
    } else if (!(value.charAt(value.length - 1) === "Z")) {
      throw new errors.InvalidValue("Only allowed timezone is 'Z', got: " + value);
    }
    this.value = value;
  }
  util.inherits(FaunaTime, Value);
  Object.defineProperty(FaunaTime.prototype, "date", {
    get: function() {
      return new Date(this.value);
    }
  });
  wrapToString(FaunaTime, function() {
    return 'Time("' + this.value + '")';
  });
  FaunaTime.prototype.toJSON = function() {
    return {"@ts": this.value};
  };
  function FaunaDate(value) {
    if (value instanceof Date) {
      value = value.toISOString().slice(0, 10);
    }
    this.value = value;
  }
  util.inherits(FaunaDate, Value);
  Object.defineProperty(FaunaDate.prototype, "date", {
    get: function() {
      return new Date(this.value);
    }
  });
  wrapToString(FaunaDate, function() {
    return 'Date("' + this.value + '")';
  });
  FaunaDate.prototype.toJSON = function() {
    return {"@date": this.value};
  };
  function Bytes(value) {
    if (value instanceof ArrayBuffer) {
      this.value = new Uint8Array(value);
    } else if (typeof value === "string") {
      this.value = base64.toByteArray(value);
    } else if (value instanceof Uint8Array) {
      this.value = value;
    } else {
      throw new errors.InvalidValue("Bytes type expect argument to be either Uint8Array|ArrayBuffer|string, got: " + stringify(value));
    }
  }
  util.inherits(Bytes, Value);
  wrapToString(Bytes, function() {
    return 'Bytes("' + base64.fromByteArray(this.value) + '")';
  });
  Bytes.prototype.toJSON = function() {
    return {"@bytes": base64.fromByteArray(this.value)};
  };
  function Query2(value) {
    this.value = value;
  }
  util.inherits(Query2, Value);
  wrapToString(Query2, function() {
    return "Query(" + Expr.toString(this.value) + ")";
  });
  Query2.prototype.toJSON = function() {
    return {"@query": this.value};
  };
  function wrapToString(type, fn) {
    type.prototype.toString = fn;
    type.prototype.inspect = fn;
    if (customInspect) {
      type.prototype[customInspect] = fn;
    }
  }
  module2.exports = {
    Value,
    Ref,
    Native,
    SetRef,
    FaunaTime,
    FaunaDate,
    Bytes,
    Query: Query2
  };
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS((exports2, module2) => {
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  "use strict";
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
});

// node_modules/faunadb/src/query.js
var require_query = __commonJS((exports2, module2) => {
  "use strict";
  var annotate = require_fn_annotate();
  var deprecate = require_node();
  var Expr = require_Expr();
  var errors = require_errors();
  var values = require_values();
  var objectAssign = require_object_assign();
  var util = require_util();
  function Ref() {
    arity.between(1, 2, arguments, Ref.name);
    switch (arguments.length) {
      case 1:
        return new Expr({"@ref": wrap(arguments[0])});
      case 2:
        return new Expr({ref: wrap(arguments[0]), id: wrap(arguments[1])});
    }
  }
  function Bytes(bytes) {
    arity.exact(1, arguments, Bytes.name);
    return new values.Bytes(bytes);
  }
  function Abort(msg) {
    arity.exact(1, arguments, Abort.name);
    return new Expr({abort: wrap(msg)});
  }
  function At(timestamp, expr) {
    arity.exact(2, arguments, At.name);
    return new Expr({at: wrap(timestamp), expr: wrap(expr)});
  }
  function Let3(vars, expr) {
    arity.exact(2, arguments, Let3.name);
    var bindings = [];
    if (Array.isArray(vars)) {
      bindings = vars.map(function(item) {
        return wrapValues(item);
      });
    } else {
      bindings = Object.keys(vars).map(function(k) {
        var b = {};
        b[k] = wrap(vars[k]);
        return b;
      });
    }
    if (typeof expr === "function") {
      if (Array.isArray(vars)) {
        var expr_vars = [];
        vars.forEach(function(item) {
          Object.keys(item).forEach(function(name) {
            expr_vars.push(Var4(name));
          });
        });
        expr = expr.apply(null, expr_vars);
      } else {
        expr = expr.apply(null, Object.keys(vars).map(function(name) {
          return Var4(name);
        }));
      }
    }
    return new Expr({let: bindings, in: wrap(expr)});
  }
  function Var4(varName) {
    arity.exact(1, arguments, Var4.name);
    return new Expr({var: wrap(varName)});
  }
  function If3(condition, then, _else) {
    arity.exact(3, arguments, If3.name);
    return new Expr({if: wrap(condition), then: wrap(then), else: wrap(_else)});
  }
  function Do3() {
    arity.min(1, arguments, Do3.name);
    var args = argsToArray(arguments);
    return new Expr({do: wrap(args)});
  }
  var objectFunction = function(fields) {
    arity.exact(1, arguments, objectFunction.name);
    return new Expr({object: wrapValues(fields)});
  };
  function Lambda3() {
    arity.between(1, 2, arguments, Lambda3.name);
    switch (arguments.length) {
      case 1:
        var value = arguments[0];
        if (typeof value === "function") {
          return _lambdaFunc(value);
        } else if (value instanceof Expr || util.checkInstanceHasProperty(value, "_isFaunaExpr")) {
          return value;
        } else {
          throw new errors.InvalidValue("Lambda function takes either a Function or an Expr.");
        }
      case 2:
        var var_name = arguments[0];
        var expr = arguments[1];
        return _lambdaExpr(var_name, expr);
    }
  }
  function _lambdaFunc(func) {
    var vars = annotate(func);
    switch (vars.length) {
      case 0:
        throw new errors.InvalidValue("Provided Function must take at least 1 argument.");
      case 1:
        return _lambdaExpr(vars[0], func(Var4(vars[0])));
      default:
        return _lambdaExpr(vars, func.apply(null, vars.map(function(name) {
          return Var4(name);
        })));
    }
  }
  function _lambdaExpr(var_name, expr) {
    return new Expr({lambda: wrap(var_name), expr: wrap(expr)});
  }
  function Call(ref) {
    arity.min(1, arguments, Call.name);
    var args = argsToArray(arguments);
    args.shift();
    return new Expr({call: wrap(ref), arguments: wrap(varargs(args))});
  }
  function Query2(lambda) {
    arity.exact(1, arguments, Query2.name);
    return new Expr({query: wrap(lambda)});
  }
  function Map2(collection, lambda_expr) {
    arity.exact(2, arguments, Map2.name);
    return new Expr({map: wrap(lambda_expr), collection: wrap(collection)});
  }
  function Foreach(collection, lambda_expr) {
    arity.exact(2, arguments, Foreach.name);
    return new Expr({foreach: wrap(lambda_expr), collection: wrap(collection)});
  }
  function Filter(collection, lambda_expr) {
    arity.exact(2, arguments, Filter.name);
    return new Expr({filter: wrap(lambda_expr), collection: wrap(collection)});
  }
  function Take(number, collection) {
    arity.exact(2, arguments, Take.name);
    return new Expr({take: wrap(number), collection: wrap(collection)});
  }
  function Drop(number, collection) {
    arity.exact(2, arguments, Drop.name);
    return new Expr({drop: wrap(number), collection: wrap(collection)});
  }
  function Prepend(elements, collection) {
    arity.exact(2, arguments, Prepend.name);
    return new Expr({prepend: wrap(elements), collection: wrap(collection)});
  }
  function Append(elements, collection) {
    arity.exact(2, arguments, Append.name);
    return new Expr({append: wrap(elements), collection: wrap(collection)});
  }
  function IsEmpty(collection) {
    arity.exact(1, arguments, IsEmpty.name);
    return new Expr({is_empty: wrap(collection)});
  }
  function IsNonEmpty(collection) {
    arity.exact(1, arguments, IsNonEmpty.name);
    return new Expr({is_nonempty: wrap(collection)});
  }
  function IsNumber(expr) {
    arity.exact(1, arguments, IsNumber.name);
    return new Expr({is_number: wrap(expr)});
  }
  function IsDouble(expr) {
    arity.exact(1, arguments, IsDouble.name);
    return new Expr({is_double: wrap(expr)});
  }
  function IsInteger(expr) {
    arity.exact(1, arguments, IsInteger.name);
    return new Expr({is_integer: wrap(expr)});
  }
  function IsBoolean(expr) {
    arity.exact(1, arguments, IsBoolean.name);
    return new Expr({is_boolean: wrap(expr)});
  }
  function IsNull(expr) {
    arity.exact(1, arguments, IsNull.name);
    return new Expr({is_null: wrap(expr)});
  }
  function IsBytes(expr) {
    arity.exact(1, arguments, IsBytes.name);
    return new Expr({is_bytes: wrap(expr)});
  }
  function IsTimestamp(expr) {
    arity.exact(1, arguments, IsTimestamp.name);
    return new Expr({is_timestamp: wrap(expr)});
  }
  function IsDate(expr) {
    arity.exact(1, arguments, IsDate.name);
    return new Expr({is_date: wrap(expr)});
  }
  function IsString(expr) {
    arity.exact(1, arguments, IsString.name);
    return new Expr({is_string: wrap(expr)});
  }
  function IsArray(expr) {
    arity.exact(1, arguments, IsArray.name);
    return new Expr({is_array: wrap(expr)});
  }
  function IsObject(expr) {
    arity.exact(1, arguments, IsObject.name);
    return new Expr({is_object: wrap(expr)});
  }
  function IsRef(expr) {
    arity.exact(1, arguments, IsRef.name);
    return new Expr({is_ref: wrap(expr)});
  }
  function IsSet(expr) {
    arity.exact(1, arguments, IsSet.name);
    return new Expr({is_set: wrap(expr)});
  }
  function IsDoc(expr) {
    arity.exact(1, arguments, IsDoc.name);
    return new Expr({is_doc: wrap(expr)});
  }
  function IsLambda(expr) {
    arity.exact(1, arguments, IsLambda.name);
    return new Expr({is_lambda: wrap(expr)});
  }
  function IsCollection(expr) {
    arity.exact(1, arguments, IsCollection.name);
    return new Expr({is_collection: wrap(expr)});
  }
  function IsDatabase(expr) {
    arity.exact(1, arguments, IsDatabase.name);
    return new Expr({is_database: wrap(expr)});
  }
  function IsIndex(expr) {
    arity.exact(1, arguments, IsIndex.name);
    return new Expr({is_index: wrap(expr)});
  }
  function IsFunction(expr) {
    arity.exact(1, arguments, IsFunction.name);
    return new Expr({is_function: wrap(expr)});
  }
  function IsKey(expr) {
    arity.exact(1, arguments, IsKey.name);
    return new Expr({is_key: wrap(expr)});
  }
  function IsToken(expr) {
    arity.exact(1, arguments, IsToken.name);
    return new Expr({is_token: wrap(expr)});
  }
  function IsCredentials(expr) {
    arity.exact(1, arguments, IsCredentials.name);
    return new Expr({is_credentials: wrap(expr)});
  }
  function IsRole(expr) {
    arity.exact(1, arguments, IsRole.name);
    return new Expr({is_role: wrap(expr)});
  }
  function Get2(ref, ts) {
    arity.between(1, 2, arguments, Get2.name);
    ts = util.defaults(ts, null);
    return new Expr(params({get: wrap(ref)}, {ts: wrap(ts)}));
  }
  function KeyFromSecret(secret) {
    arity.exact(1, arguments, KeyFromSecret.name);
    return new Expr({key_from_secret: wrap(secret)});
  }
  function Reduce(lambda, initial, collection) {
    arity.exact(3, arguments, Reduce.name);
    return new Expr({
      reduce: wrap(lambda),
      initial: wrap(initial),
      collection: wrap(collection)
    });
  }
  function Paginate2(set, opts) {
    arity.between(1, 2, arguments, Paginate2.name);
    opts = util.defaults(opts, {});
    return new Expr(objectAssign({paginate: wrap(set)}, wrapValues(opts)));
  }
  function Exists2(ref, ts) {
    arity.between(1, 2, arguments, Exists2.name);
    ts = util.defaults(ts, null);
    return new Expr(params({exists: wrap(ref)}, {ts: wrap(ts)}));
  }
  function Create3(collection_ref, params2) {
    arity.between(1, 2, arguments, Create3.name);
    return new Expr({create: wrap(collection_ref), params: wrap(params2)});
  }
  function Update2(ref, params2) {
    arity.exact(2, arguments, Update2.name);
    return new Expr({update: wrap(ref), params: wrap(params2)});
  }
  function Replace(ref, params2) {
    arity.exact(2, arguments, Replace.name);
    return new Expr({replace: wrap(ref), params: wrap(params2)});
  }
  function Delete2(ref) {
    arity.exact(1, arguments, Delete2.name);
    return new Expr({delete: wrap(ref)});
  }
  function Insert(ref, ts, action, params2) {
    arity.exact(4, arguments, Insert.name);
    return new Expr({
      insert: wrap(ref),
      ts: wrap(ts),
      action: wrap(action),
      params: wrap(params2)
    });
  }
  function Remove(ref, ts, action) {
    arity.exact(3, arguments, Remove.name);
    return new Expr({remove: wrap(ref), ts: wrap(ts), action: wrap(action)});
  }
  function CreateClass(params2) {
    arity.exact(1, arguments, CreateClass.name);
    return new Expr({create_class: wrap(params2)});
  }
  function CreateCollection(params2) {
    arity.exact(1, arguments, CreateCollection.name);
    return new Expr({create_collection: wrap(params2)});
  }
  function CreateDatabase(params2) {
    arity.exact(1, arguments, CreateDatabase.name);
    return new Expr({create_database: wrap(params2)});
  }
  function CreateIndex(params2) {
    arity.exact(1, arguments, CreateIndex.name);
    return new Expr({create_index: wrap(params2)});
  }
  function CreateKey(params2) {
    arity.exact(1, arguments, CreateKey.name);
    return new Expr({create_key: wrap(params2)});
  }
  function CreateFunction2(params2) {
    arity.exact(1, arguments, CreateFunction2.name);
    return new Expr({create_function: wrap(params2)});
  }
  function CreateRole(params2) {
    arity.exact(1, arguments, CreateRole.name);
    return new Expr({create_role: wrap(params2)});
  }
  function CreateAccessProvider(params2) {
    arity.exact(1, arguments, CreateAccessProvider.name);
    return new Expr({create_access_provider: wrap(params2)});
  }
  function Singleton(ref) {
    arity.exact(1, arguments, Singleton.name);
    return new Expr({singleton: wrap(ref)});
  }
  function Events(ref_set) {
    arity.exact(1, arguments, Events.name);
    return new Expr({events: wrap(ref_set)});
  }
  function Match3(index) {
    arity.min(1, arguments, Match3.name);
    var args = argsToArray(arguments);
    args.shift();
    return new Expr({match: wrap(index), terms: wrap(varargs(args))});
  }
  function Union() {
    arity.min(1, arguments, Union.name);
    return new Expr({union: wrap(varargs(arguments))});
  }
  function Merge(merge, _with, lambda) {
    arity.between(2, 3, arguments, Merge.name);
    return new Expr(params({merge: wrap(merge), with: wrap(_with)}, {lambda: wrap(lambda)}));
  }
  function Intersection() {
    arity.min(1, arguments, Intersection.name);
    return new Expr({intersection: wrap(varargs(arguments))});
  }
  function Difference() {
    arity.min(1, arguments, Difference.name);
    return new Expr({difference: wrap(varargs(arguments))});
  }
  function Distinct(set) {
    arity.exact(1, arguments, Distinct.name);
    return new Expr({distinct: wrap(set)});
  }
  function Join(source, target) {
    arity.exact(2, arguments, Join.name);
    return new Expr({join: wrap(source), with: wrap(target)});
  }
  function Range(set, from, to) {
    arity.exact(3, arguments, Range.name);
    return new Expr({range: wrap(set), from: wrap(from), to: wrap(to)});
  }
  function Login(ref, params2) {
    arity.exact(2, arguments, Login.name);
    return new Expr({login: wrap(ref), params: wrap(params2)});
  }
  function Logout2(delete_tokens) {
    arity.exact(1, arguments, Logout2.name);
    return new Expr({logout: wrap(delete_tokens)});
  }
  function Identify(ref, password) {
    arity.exact(2, arguments, Identify.name);
    return new Expr({identify: wrap(ref), password: wrap(password)});
  }
  function Identity() {
    arity.exact(0, arguments, Identity.name);
    return new Expr({identity: null});
  }
  function CurrentIdentity4() {
    arity.exact(0, arguments, CurrentIdentity4.name);
    return new Expr({current_identity: null});
  }
  function HasIdentity() {
    arity.exact(0, arguments, HasIdentity.name);
    return new Expr({has_identity: null});
  }
  function HasCurrentIdentity() {
    arity.exact(0, arguments, HasCurrentIdentity.name);
    return new Expr({has_current_identity: null});
  }
  function CurrentToken3() {
    arity.exact(0, arguments, CurrentToken3.name);
    return new Expr({current_token: null});
  }
  function HasCurrentToken2() {
    arity.exact(0, arguments, HasCurrentToken2.name);
    return new Expr({has_current_token: null});
  }
  function Concat(strings, separator) {
    arity.min(1, arguments, Concat.name);
    separator = util.defaults(separator, null);
    return new Expr(params({concat: wrap(strings)}, {separator: wrap(separator)}));
  }
  function Casefold(string, normalizer) {
    arity.min(1, arguments, Casefold.name);
    return new Expr(params({casefold: wrap(string)}, {normalizer: wrap(normalizer)}));
  }
  function ContainsStr(value, search) {
    arity.exact(2, arguments, ContainsStr.name);
    return new Expr({containsstr: wrap(value), search: wrap(search)});
  }
  function ContainsStrRegex(value, pattern) {
    arity.exact(2, arguments, ContainsStrRegex.name);
    return new Expr({containsstrregex: wrap(value), pattern: wrap(pattern)});
  }
  function StartsWith(value, search) {
    arity.exact(2, arguments, StartsWith.name);
    return new Expr({startswith: wrap(value), search: wrap(search)});
  }
  function EndsWith(value, search) {
    arity.exact(2, arguments, EndsWith.name);
    return new Expr({endswith: wrap(value), search: wrap(search)});
  }
  function RegexEscape(value) {
    arity.exact(1, arguments, RegexEscape.name);
    return new Expr({regexescape: wrap(value)});
  }
  function FindStr(value, find, start) {
    arity.between(2, 3, arguments, FindStr.name);
    start = util.defaults(start, null);
    return new Expr(params({findstr: wrap(value), find: wrap(find)}, {start: wrap(start)}));
  }
  function FindStrRegex(value, pattern, start, numResults) {
    arity.between(2, 4, arguments, FindStrRegex.name);
    start = util.defaults(start, null);
    return new Expr(params({findstrregex: wrap(value), pattern: wrap(pattern)}, {start: wrap(start), num_results: wrap(numResults)}));
  }
  function Length(value) {
    arity.exact(1, arguments, Length.name);
    return new Expr({length: wrap(value)});
  }
  function LowerCase(value) {
    arity.exact(1, arguments, LowerCase.name);
    return new Expr({lowercase: wrap(value)});
  }
  function LTrim(value) {
    arity.exact(1, arguments, LTrim.name);
    return new Expr({ltrim: wrap(value)});
  }
  function NGram(terms, min, max) {
    arity.between(1, 3, arguments, NGram.name);
    min = util.defaults(min, null);
    max = util.defaults(max, null);
    return new Expr(params({ngram: wrap(terms)}, {min: wrap(min), max: wrap(max)}));
  }
  function Repeat(value, number) {
    arity.between(1, 2, arguments, Repeat.name);
    number = util.defaults(number, null);
    return new Expr(params({repeat: wrap(value)}, {number: wrap(number)}));
  }
  function ReplaceStr(value, find, replace) {
    arity.exact(3, arguments, ReplaceStr.name);
    return new Expr({
      replacestr: wrap(value),
      find: wrap(find),
      replace: wrap(replace)
    });
  }
  function ReplaceStrRegex(value, pattern, replace, first) {
    arity.between(3, 4, arguments, ReplaceStrRegex.name);
    first = util.defaults(first, null);
    return new Expr(params({
      replacestrregex: wrap(value),
      pattern: wrap(pattern),
      replace: wrap(replace)
    }, {first: wrap(first)}));
  }
  function RTrim(value) {
    arity.exact(1, arguments, RTrim.name);
    return new Expr({rtrim: wrap(value)});
  }
  function Space(num) {
    arity.exact(1, arguments, Space.name);
    return new Expr({space: wrap(num)});
  }
  function SubString(value, start, length) {
    arity.between(1, 3, arguments, SubString.name);
    start = util.defaults(start, null);
    length = util.defaults(length, null);
    return new Expr(params({substring: wrap(value)}, {start: wrap(start), length: wrap(length)}));
  }
  function TitleCase(value) {
    arity.exact(1, arguments, TitleCase.name);
    return new Expr({titlecase: wrap(value)});
  }
  function Trim(value) {
    arity.exact(1, arguments, Trim.name);
    return new Expr({trim: wrap(value)});
  }
  function UpperCase(value) {
    arity.exact(1, arguments, UpperCase.name);
    return new Expr({uppercase: wrap(value)});
  }
  function Format(string) {
    arity.min(1, arguments, Format.name);
    var args = argsToArray(arguments);
    args.shift();
    return new Expr({format: wrap(string), values: wrap(varargs(args))});
  }
  function Time(string) {
    arity.exact(1, arguments, Time.name);
    return new Expr({time: wrap(string)});
  }
  function Epoch(number, unit) {
    arity.exact(2, arguments, Epoch.name);
    return new Expr({epoch: wrap(number), unit: wrap(unit)});
  }
  function TimeAdd2(base, offset, unit) {
    arity.exact(3, arguments, TimeAdd2.name);
    return new Expr({
      time_add: wrap(base),
      offset: wrap(offset),
      unit: wrap(unit)
    });
  }
  function TimeSubtract(base, offset, unit) {
    arity.exact(3, arguments, TimeSubtract.name);
    return new Expr({
      time_subtract: wrap(base),
      offset: wrap(offset),
      unit: wrap(unit)
    });
  }
  function TimeDiff(start, finish, unit) {
    arity.exact(3, arguments, TimeDiff.name);
    return new Expr({
      time_diff: wrap(start),
      other: wrap(finish),
      unit: wrap(unit)
    });
  }
  function Date2(string) {
    arity.exact(1, arguments, Date2.name);
    return new Expr({date: wrap(string)});
  }
  function Now2() {
    arity.exact(0, arguments, Now2.name);
    return new Expr({now: wrap(null)});
  }
  function NextId() {
    arity.exact(0, arguments, NextId.name);
    return new Expr({next_id: null});
  }
  function NewId2() {
    arity.exact(0, arguments, NewId2.name);
    return new Expr({new_id: null});
  }
  function Database(name, scope) {
    arity.between(1, 2, arguments, Database.name);
    switch (arguments.length) {
      case 1:
        return new Expr({database: wrap(name)});
      case 2:
        return new Expr({database: wrap(name), scope: wrap(scope)});
    }
  }
  function Index3(name, scope) {
    arity.between(1, 2, arguments, Index3.name);
    switch (arguments.length) {
      case 1:
        return new Expr({index: wrap(name)});
      case 2:
        return new Expr({index: wrap(name), scope: wrap(scope)});
    }
  }
  function Class(name, scope) {
    arity.between(1, 2, arguments, Class.name);
    switch (arguments.length) {
      case 1:
        return new Expr({class: wrap(name)});
      case 2:
        return new Expr({class: wrap(name), scope: wrap(scope)});
    }
  }
  function Collection2(name, scope) {
    arity.between(1, 2, arguments, Collection2.name);
    switch (arguments.length) {
      case 1:
        return new Expr({collection: wrap(name)});
      case 2:
        return new Expr({collection: wrap(name), scope: wrap(scope)});
    }
  }
  function FunctionFn(name, scope) {
    arity.between(1, 2, arguments, FunctionFn.name);
    switch (arguments.length) {
      case 1:
        return new Expr({function: wrap(name)});
      case 2:
        return new Expr({function: wrap(name), scope: wrap(scope)});
    }
  }
  function Role(name, scope) {
    arity.between(1, 2, arguments, Role.name);
    scope = util.defaults(scope, null);
    return new Expr(params({role: wrap(name)}, {scope: wrap(scope)}));
  }
  function AccessProviders(scope) {
    arity.max(1, arguments, AccessProviders.name);
    scope = util.defaults(scope, null);
    return new Expr({access_providers: wrap(scope)});
  }
  function Classes(scope) {
    arity.max(1, arguments, Classes.name);
    scope = util.defaults(scope, null);
    return new Expr({classes: wrap(scope)});
  }
  function Collections(scope) {
    arity.max(1, arguments, Collections.name);
    scope = util.defaults(scope, null);
    return new Expr({collections: wrap(scope)});
  }
  function Databases(scope) {
    arity.max(1, arguments, Databases.name);
    scope = util.defaults(scope, null);
    return new Expr({databases: wrap(scope)});
  }
  function Indexes(scope) {
    arity.max(1, arguments, Indexes.name);
    scope = util.defaults(scope, null);
    return new Expr({indexes: wrap(scope)});
  }
  function Functions(scope) {
    arity.max(1, arguments, Functions.name);
    scope = util.defaults(scope, null);
    return new Expr({functions: wrap(scope)});
  }
  function Roles(scope) {
    arity.max(1, arguments, Roles.name);
    scope = util.defaults(scope, null);
    return new Expr({roles: wrap(scope)});
  }
  function Keys(scope) {
    arity.max(1, arguments, Keys.name);
    scope = util.defaults(scope, null);
    return new Expr({keys: wrap(scope)});
  }
  function Tokens2(scope) {
    arity.max(1, arguments, Tokens2.name);
    scope = util.defaults(scope, null);
    return new Expr({tokens: wrap(scope)});
  }
  function Credentials(scope) {
    arity.max(1, arguments, Credentials.name);
    scope = util.defaults(scope, null);
    return new Expr({credentials: wrap(scope)});
  }
  function Equals2() {
    arity.min(1, arguments, Equals2.name);
    return new Expr({equals: wrap(varargs(arguments))});
  }
  function Contains(path, _in) {
    arity.exact(2, arguments, Contains.name);
    return new Expr({contains: wrap(path), in: wrap(_in)});
  }
  function ContainsValue(value, _in) {
    arity.exact(2, arguments, ContainsValue.name);
    return new Expr({contains_value: wrap(value), in: wrap(_in)});
  }
  function ContainsField(field, obj) {
    arity.exact(2, arguments, ContainsField.name);
    return new Expr({contains_field: wrap(field), in: wrap(obj)});
  }
  function ContainsPath(path, _in) {
    arity.exact(2, arguments, ContainsPath.name);
    return new Expr({contains_path: wrap(path), in: wrap(_in)});
  }
  function Select2(path, from, _default) {
    arity.between(2, 3, arguments, Select2.name);
    var exprObj = {select: wrap(path), from: wrap(from)};
    if (_default !== void 0) {
      exprObj.default = wrap(_default);
    }
    return new Expr(exprObj);
  }
  function SelectAll(path, from) {
    arity.exact(2, arguments, SelectAll.name);
    return new Expr({select_all: wrap(path), from: wrap(from)});
  }
  function Abs(expr) {
    arity.exact(1, arguments, Abs.name);
    return new Expr({abs: wrap(expr)});
  }
  function Add() {
    arity.min(1, arguments, Add.name);
    return new Expr({add: wrap(varargs(arguments))});
  }
  function BitAnd() {
    arity.min(1, arguments, BitAnd.name);
    return new Expr({bitand: wrap(varargs(arguments))});
  }
  function BitNot(expr) {
    arity.exact(1, arguments, BitNot.name);
    return new Expr({bitnot: wrap(expr)});
  }
  function BitOr() {
    arity.min(1, arguments, BitOr.name);
    return new Expr({bitor: wrap(varargs(arguments))});
  }
  function BitXor() {
    arity.min(1, arguments, BitXor.name);
    return new Expr({bitxor: wrap(varargs(arguments))});
  }
  function Ceil(expr) {
    arity.exact(1, arguments, Ceil.name);
    return new Expr({ceil: wrap(expr)});
  }
  function Divide() {
    arity.min(1, arguments, Divide.name);
    return new Expr({divide: wrap(varargs(arguments))});
  }
  function Floor(expr) {
    arity.exact(1, arguments, Floor.name);
    return new Expr({floor: wrap(expr)});
  }
  function Max() {
    arity.min(1, arguments, Max.name);
    return new Expr({max: wrap(varargs(arguments))});
  }
  function Min() {
    arity.min(1, arguments, Min.name);
    return new Expr({min: wrap(varargs(arguments))});
  }
  function Modulo() {
    arity.min(1, arguments, Modulo.name);
    return new Expr({modulo: wrap(varargs(arguments))});
  }
  function Multiply() {
    arity.min(1, arguments, Multiply.name);
    return new Expr({multiply: wrap(varargs(arguments))});
  }
  function Round(value, precision) {
    arity.min(1, arguments, Round.name);
    precision = util.defaults(precision, null);
    return new Expr(params({round: wrap(value)}, {precision: wrap(precision)}));
  }
  function Subtract() {
    arity.min(1, arguments, Subtract.name);
    return new Expr({subtract: wrap(varargs(arguments))});
  }
  function Sign(expr) {
    arity.exact(1, arguments, Sign.name);
    return new Expr({sign: wrap(expr)});
  }
  function Sqrt(expr) {
    arity.exact(1, arguments, Sqrt.name);
    return new Expr({sqrt: wrap(expr)});
  }
  function Trunc(value, precision) {
    arity.min(1, arguments, Trunc.name);
    precision = util.defaults(precision, null);
    return new Expr(params({trunc: wrap(value)}, {precision: wrap(precision)}));
  }
  function Count(collection) {
    arity.exact(1, arguments, Count.name);
    return new Expr({count: wrap(collection)});
  }
  function Sum(collection) {
    arity.exact(1, arguments, Sum.name);
    return new Expr({sum: wrap(collection)});
  }
  function Mean(collection) {
    arity.exact(1, arguments, Mean.name);
    return new Expr({mean: wrap(collection)});
  }
  function Any(collection) {
    arity.exact(1, arguments, Any.name);
    return new Expr({any: wrap(collection)});
  }
  function All(collection) {
    arity.exact(1, arguments, All.name);
    return new Expr({all: wrap(collection)});
  }
  function Acos(expr) {
    arity.exact(1, arguments, Acos.name);
    return new Expr({acos: wrap(expr)});
  }
  function Asin(expr) {
    arity.exact(1, arguments, Asin.name);
    return new Expr({asin: wrap(expr)});
  }
  function Atan(expr) {
    arity.exact(1, arguments, Atan.name);
    return new Expr({atan: wrap(expr)});
  }
  function Cos(expr) {
    arity.exact(1, arguments, Cos.name);
    return new Expr({cos: wrap(expr)});
  }
  function Cosh(expr) {
    arity.exact(1, arguments, Cosh.name);
    return new Expr({cosh: wrap(expr)});
  }
  function Degrees(expr) {
    arity.exact(1, arguments, Degrees.name);
    return new Expr({degrees: wrap(expr)});
  }
  function Exp(expr) {
    arity.exact(1, arguments, Exp.name);
    return new Expr({exp: wrap(expr)});
  }
  function Hypot(value, side) {
    arity.min(1, arguments, Hypot.name);
    side = util.defaults(side, null);
    return new Expr(params({hypot: wrap(value)}, {b: wrap(side)}));
  }
  function Ln(expr) {
    arity.exact(1, arguments, Ln.name);
    return new Expr({ln: wrap(expr)});
  }
  function Log(expr) {
    arity.exact(1, arguments, Log.name);
    return new Expr({log: wrap(expr)});
  }
  function Pow(value, exponent) {
    arity.min(1, arguments, Pow.name);
    exponent = util.defaults(exponent, null);
    return new Expr(params({pow: wrap(value)}, {exp: wrap(exponent)}));
  }
  function Radians(expr) {
    arity.exact(1, arguments, Radians.name);
    return new Expr({radians: wrap(expr)});
  }
  function Sin(expr) {
    arity.exact(1, arguments, Sin.name);
    return new Expr({sin: wrap(expr)});
  }
  function Sinh(expr) {
    arity.exact(1, arguments, Sinh.name);
    return new Expr({sinh: wrap(expr)});
  }
  function Tan(expr) {
    arity.exact(1, arguments, Tan.name);
    return new Expr({tan: wrap(expr)});
  }
  function Tanh(expr) {
    arity.exact(1, arguments, Tanh.name);
    return new Expr({tanh: wrap(expr)});
  }
  function LT() {
    arity.min(1, arguments, LT.name);
    return new Expr({lt: wrap(varargs(arguments))});
  }
  function LTE() {
    arity.min(1, arguments, LTE.name);
    return new Expr({lte: wrap(varargs(arguments))});
  }
  function GT2() {
    arity.min(1, arguments, GT2.name);
    return new Expr({gt: wrap(varargs(arguments))});
  }
  function GTE() {
    arity.min(1, arguments, GTE.name);
    return new Expr({gte: wrap(varargs(arguments))});
  }
  function And2() {
    arity.min(1, arguments, And2.name);
    return new Expr({and: wrap(varargs(arguments))});
  }
  function Or() {
    arity.min(1, arguments, Or.name);
    return new Expr({or: wrap(varargs(arguments))});
  }
  function Not2(boolean) {
    arity.exact(1, arguments, Not2.name);
    return new Expr({not: wrap(boolean)});
  }
  function ToString(expr) {
    arity.exact(1, arguments, ToString.name);
    return new Expr({to_string: wrap(expr)});
  }
  function ToNumber(expr) {
    arity.exact(1, arguments, ToNumber.name);
    return new Expr({to_number: wrap(expr)});
  }
  function ToObject(expr) {
    arity.exact(1, arguments, ToObject.name);
    return new Expr({to_object: wrap(expr)});
  }
  function ToArray(expr) {
    arity.exact(1, arguments, ToArray.name);
    return new Expr({to_array: wrap(expr)});
  }
  function ToDouble(expr) {
    arity.exact(1, arguments, ToDouble.name);
    return new Expr({to_double: wrap(expr)});
  }
  function ToInteger(expr) {
    arity.exact(1, arguments, ToInteger.name);
    return new Expr({to_integer: wrap(expr)});
  }
  function ToTime(expr) {
    arity.exact(1, arguments, ToTime.name);
    return new Expr({to_time: wrap(expr)});
  }
  function ToSeconds(expr) {
    arity.exact(1, arguments, ToSeconds.name);
    return new Expr({to_seconds: wrap(expr)});
  }
  function ToMillis(expr) {
    arity.exact(1, arguments, ToMillis.name);
    return new Expr({to_millis: wrap(expr)});
  }
  function ToMicros(expr) {
    arity.exact(1, arguments, ToMicros.name);
    return new Expr({to_micros: wrap(expr)});
  }
  function DayOfWeek(expr) {
    arity.exact(1, arguments, DayOfWeek.name);
    return new Expr({day_of_week: wrap(expr)});
  }
  function DayOfYear(expr) {
    arity.exact(1, arguments, DayOfYear.name);
    return new Expr({day_of_year: wrap(expr)});
  }
  function DayOfMonth(expr) {
    arity.exact(1, arguments, DayOfMonth.name);
    return new Expr({day_of_month: wrap(expr)});
  }
  function Hour(expr) {
    arity.exact(1, arguments, Hour.name);
    return new Expr({hour: wrap(expr)});
  }
  function Minute(expr) {
    arity.exact(1, arguments, Minute.name);
    return new Expr({minute: wrap(expr)});
  }
  function Second(expr) {
    arity.exact(1, arguments, Second.name);
    return new Expr({second: wrap(expr)});
  }
  function Month(expr) {
    arity.exact(1, arguments, Month.name);
    return new Expr({month: wrap(expr)});
  }
  function Year(expr) {
    arity.exact(1, arguments, Year.name);
    return new Expr({year: wrap(expr)});
  }
  function ToDate(expr) {
    arity.exact(1, arguments, ToDate.name);
    return new Expr({to_date: wrap(expr)});
  }
  function MoveDatabase(from, to) {
    arity.exact(2, arguments, MoveDatabase.name);
    return new Expr({move_database: wrap(from), to: wrap(to)});
  }
  function Documents(collection) {
    arity.exact(1, arguments, Documents.name);
    return new Expr({documents: wrap(collection)});
  }
  function Reverse(expr) {
    arity.exact(1, arguments, Reverse.name);
    return new Expr({reverse: wrap(expr)});
  }
  function AccessProvider(name) {
    arity.exact(1, arguments, AccessProvider.name);
    return new Expr({access_provider: wrap(name)});
  }
  function arity(min, max, args, callerFunc) {
    if (min !== null && args.length < min || max !== null && args.length > max) {
      throw new errors.InvalidArity(min, max, args.length, callerFunc);
    }
  }
  arity.exact = function(n, args, callerFunc) {
    arity(n, n, args, callerFunc);
  };
  arity.max = function(n, args, callerFunc) {
    arity(null, n, args, callerFunc);
  };
  arity.min = function(n, args, callerFunc) {
    arity(n, null, args, callerFunc);
  };
  arity.between = function(min, max, args, callerFunc) {
    arity(min, max, args, callerFunc);
  };
  function params(mainParams, optionalParams) {
    for (var key in optionalParams) {
      var val = optionalParams[key];
      if (val !== null && val !== void 0) {
        mainParams[key] = val;
      }
    }
    return mainParams;
  }
  function varargs(values2) {
    var valuesAsArr = Array.isArray(values2) ? values2 : Array.prototype.slice.call(values2);
    return values2.length === 1 ? values2[0] : valuesAsArr;
  }
  function argsToArray(args) {
    var rv = [];
    rv.push.apply(rv, args);
    return rv;
  }
  function wrap(obj) {
    arity.exact(1, arguments, wrap.name);
    if (obj === null) {
      return null;
    } else if (obj instanceof Expr || util.checkInstanceHasProperty(obj, "_isFaunaExpr")) {
      return obj;
    } else if (typeof obj === "symbol") {
      return obj.toString().replace(/Symbol\((.*)\)/, function(str, symbol) {
        return symbol;
      });
    } else if (typeof obj === "function") {
      return Lambda3(obj);
    } else if (Array.isArray(obj)) {
      return new Expr(obj.map(function(elem) {
        return wrap(elem);
      }));
    } else if (obj instanceof Uint8Array || obj instanceof ArrayBuffer) {
      return new values.Bytes(obj);
    } else if (typeof obj === "object") {
      return new Expr({object: wrapValues(obj)});
    } else {
      return obj;
    }
  }
  function wrapValues(obj) {
    if (obj !== null) {
      var rv = {};
      Object.keys(obj).forEach(function(key) {
        rv[key] = wrap(obj[key]);
      });
      return rv;
    } else {
      return null;
    }
  }
  module2.exports = {
    Ref,
    Bytes,
    Abort,
    At,
    Let: Let3,
    Var: Var4,
    If: If3,
    Do: Do3,
    Object: objectFunction,
    Lambda: Lambda3,
    Call,
    Query: Query2,
    Map: Map2,
    Foreach,
    Filter,
    Take,
    Drop,
    Prepend,
    Append,
    IsEmpty,
    IsNonEmpty,
    IsNumber,
    IsDouble,
    IsInteger,
    IsBoolean,
    IsNull,
    IsBytes,
    IsTimestamp,
    IsDate,
    IsString,
    IsArray,
    IsObject,
    IsRef,
    IsSet,
    IsDoc,
    IsLambda,
    IsCollection,
    IsDatabase,
    IsIndex,
    IsFunction,
    IsKey,
    IsToken,
    IsCredentials,
    IsRole,
    Get: Get2,
    KeyFromSecret,
    Reduce,
    Paginate: Paginate2,
    Exists: Exists2,
    Create: Create3,
    Update: Update2,
    Replace,
    Delete: Delete2,
    Insert,
    Remove,
    CreateClass: deprecate(CreateClass, "CreateClass() is deprecated, use CreateCollection() instead"),
    CreateCollection,
    CreateDatabase,
    CreateIndex,
    CreateKey,
    CreateFunction: CreateFunction2,
    CreateRole,
    CreateAccessProvider,
    Singleton,
    Events,
    Match: Match3,
    Union,
    Merge,
    Intersection,
    Difference,
    Distinct,
    Join,
    Range,
    Login,
    Logout: Logout2,
    Identify,
    Identity: deprecate(Identity, "Identity() is deprecated, use CurrentIdentity() instead"),
    CurrentIdentity: CurrentIdentity4,
    HasIdentity: deprecate(HasIdentity, "HasIdentity() is deprecated, use HasCurrentIdentity() instead"),
    HasCurrentIdentity,
    CurrentToken: CurrentToken3,
    HasCurrentToken: HasCurrentToken2,
    Concat,
    Casefold,
    ContainsStr,
    ContainsStrRegex,
    StartsWith,
    EndsWith,
    FindStr,
    FindStrRegex,
    Length,
    LowerCase,
    LTrim,
    NGram,
    Repeat,
    ReplaceStr,
    ReplaceStrRegex,
    RegexEscape,
    RTrim,
    Space,
    SubString,
    TitleCase,
    Trim,
    UpperCase,
    Format,
    Time,
    TimeAdd: TimeAdd2,
    TimeSubtract,
    TimeDiff,
    Epoch,
    Date: Date2,
    Now: Now2,
    NextId: deprecate(NextId, "NextId() is deprecated, use NewId() instead"),
    NewId: NewId2,
    Database,
    Index: Index3,
    Class: deprecate(Class, "Class() is deprecated, use Collection() instead"),
    Collection: Collection2,
    Function: FunctionFn,
    Role,
    AccessProviders,
    Classes: deprecate(Classes, "Classes() is deprecated, use Collections() instead"),
    Collections,
    Databases,
    Indexes,
    Functions,
    Roles,
    Keys,
    Tokens: Tokens2,
    Credentials,
    Equals: Equals2,
    Contains: deprecate(Contains, "Contains() is deprecated, use ContainsPath() instead"),
    ContainsPath,
    ContainsField,
    ContainsValue,
    Select: Select2,
    SelectAll: deprecate(SelectAll, "SelectAll() is deprecated. Avoid use."),
    Abs,
    Add,
    BitAnd,
    BitNot,
    BitOr,
    BitXor,
    Ceil,
    Divide,
    Floor,
    Max,
    Min,
    Modulo,
    Multiply,
    Round,
    Subtract,
    Sign,
    Sqrt,
    Trunc,
    Count,
    Sum,
    Mean,
    Any,
    All,
    Acos,
    Asin,
    Atan,
    Cos,
    Cosh,
    Degrees,
    Exp,
    Hypot,
    Ln,
    Log,
    Pow,
    Radians,
    Sin,
    Sinh,
    Tan,
    Tanh,
    LT,
    LTE,
    GT: GT2,
    GTE,
    And: And2,
    Or,
    Not: Not2,
    ToString,
    ToNumber,
    ToObject,
    ToArray,
    ToDouble,
    ToInteger,
    ToTime,
    ToSeconds,
    ToMicros,
    ToMillis,
    DayOfMonth,
    DayOfWeek,
    DayOfYear,
    Second,
    Minute,
    Hour,
    Month,
    Year,
    ToDate,
    MoveDatabase,
    Documents,
    Reverse,
    AccessProvider,
    wrap
  };
});

// node_modules/faunadb/package.json
var require_package = __commonJS((exports2, module2) => {
  module2.exports = {
    name: "faunadb",
    version: "4.1.3",
    apiVersion: "4",
    description: "FaunaDB Javascript driver for Node.JS and Browsers",
    homepage: "https://fauna.com",
    repository: "fauna/faunadb-js",
    license: "MPL-2.0",
    keywords: [
      "database",
      "fauna",
      "official",
      "driver"
    ],
    bugs: {
      url: "https://github.com/fauna/faunadb-js/issues"
    },
    files: [
      "index.d.ts",
      "src/",
      "dist/"
    ],
    main: "index.js",
    scripts: {
      doc: "jsdoc -c ./jsdoc.json",
      browserify: "browserify index.js --standalone faunadb -o dist/faunadb.js",
      "browserify-min": "browserify index.js --standalone faunadb | terser -c -m --keep-fnames --keep-classnames -o dist/faunadb-min.js",
      prettify: 'prettier --write "{src,test}/**/*.{js,ts}"',
      test: "jest --env=node --verbose=false --forceExit ./test",
      "semantic-release": "semantic-release",
      wp: "webpack"
    },
    types: "index.d.ts",
    dependencies: {
      "abort-controller": "^3.0.0",
      "base64-js": "^1.2.0",
      "btoa-lite": "^1.0.0",
      "cross-fetch": "^3.0.6",
      dotenv: "^8.2.0",
      "fn-annotate": "^1.1.3",
      "object-assign": "^4.1.0",
      "util-deprecate": "^1.0.2"
    },
    devDependencies: {
      browserify: "^16.2.2",
      eslint: "^5.3.0",
      "eslint-config-prettier": "^6.5.0",
      "eslint-plugin-prettier": "^3.1.1",
      husky: ">=1",
      "ink-docstrap": "^1.2.1",
      jest: "^24.9.0",
      jsdoc: "^3.6.3",
      "lint-staged": ">=8",
      prettier: "1.18.2",
      "semantic-release": "^17.1.2",
      terser: "^4.3.9",
      webpack: "^5.23.0",
      "webpack-cli": "^4.5.0"
    },
    husky: {
      hooks: {
        "pre-commit": "lint-staged"
      }
    },
    "lint-staged": {
      "*.{js,css,json,md}": [
        "prettier --write",
        "git add"
      ],
      "*.js": [
        "eslint --fix",
        "git add"
      ]
    },
    release: {
      branches: [
        "master"
      ]
    },
    browser: {
      http2: false,
      http: false,
      https: false,
      os: false,
      util: false
    }
  };
});

// node_modules/faunadb/src/PageHelper.js
var require_PageHelper = __commonJS((exports2, module2) => {
  "use strict";
  var query = require_query();
  var objectAssign = require_object_assign();
  function PageHelper(client, set, params, options) {
    if (params === void 0) {
      params = {};
    }
    if (options === void 0) {
      options = {};
    }
    this.reverse = false;
    this.params = {};
    this.before = void 0;
    this.after = void 0;
    objectAssign(this.params, params);
    var cursorParams = this.params.cursor || this.params;
    if ("before" in cursorParams) {
      this.before = cursorParams.before;
      delete cursorParams.before;
    } else if ("after" in cursorParams) {
      this.after = cursorParams.after;
      delete cursorParams.after;
    }
    this.options = {};
    objectAssign(this.options, options);
    this.client = client;
    this.set = set;
    this._faunaFunctions = [];
  }
  PageHelper.prototype.map = function(lambda) {
    var rv = this._clone();
    rv._faunaFunctions.push(function(q4) {
      return query.Map(q4, lambda);
    });
    return rv;
  };
  PageHelper.prototype.filter = function(lambda) {
    var rv = this._clone();
    rv._faunaFunctions.push(function(q4) {
      return query.Filter(q4, lambda);
    });
    return rv;
  };
  PageHelper.prototype.each = function(lambda) {
    return this._retrieveNextPage(this.after, false).then(this._consumePages(lambda, false));
  };
  PageHelper.prototype.eachReverse = function(lambda) {
    return this._retrieveNextPage(this.before, true).then(this._consumePages(lambda, true));
  };
  PageHelper.prototype.previousPage = function() {
    var self2 = this;
    return this._retrieveNextPage(this.before, true).then(this._adjustCursors.bind(self2));
  };
  PageHelper.prototype.nextPage = function() {
    var self2 = this;
    return this._retrieveNextPage(this.after, false).then(this._adjustCursors.bind(self2));
  };
  PageHelper.prototype._adjustCursors = function(page) {
    if (page.after !== void 0) {
      this.after = page.after;
    }
    if (page.before !== void 0) {
      this.before = page.before;
    }
    return page.data;
  };
  PageHelper.prototype._consumePages = function(lambda, reverse) {
    var self2 = this;
    return function(page) {
      var data = [];
      page.data.forEach(function(item) {
        if (item.document) {
          item.instance = item.document;
        }
        if (item.value && item.value.document) {
          item.value.instance = item.value.document;
        }
        data.push(item);
      });
      lambda(data);
      var nextCursor;
      if (reverse) {
        nextCursor = page.before;
      } else {
        nextCursor = page.after;
      }
      if (nextCursor !== void 0) {
        return self2._retrieveNextPage(nextCursor, reverse).then(self2._consumePages(lambda, reverse));
      } else {
        return Promise.resolve();
      }
    };
  };
  PageHelper.prototype._retrieveNextPage = function(cursor, reverse) {
    var opts = {};
    objectAssign(opts, this.params);
    var cursorOpts = opts.cursor || opts;
    if (cursor !== void 0) {
      if (reverse) {
        cursorOpts.before = cursor;
      } else {
        cursorOpts.after = cursor;
      }
    } else {
      if (reverse) {
        cursorOpts.before = null;
      }
    }
    var q4 = query.Paginate(this.set, opts);
    if (this._faunaFunctions.length > 0) {
      this._faunaFunctions.forEach(function(lambda) {
        q4 = lambda(q4);
      });
    }
    return this.client.query(q4, this.options);
  };
  PageHelper.prototype._clone = function() {
    return Object.create(PageHelper.prototype, {
      client: {value: this.client},
      set: {value: this.set},
      _faunaFunctions: {value: this._faunaFunctions},
      before: {value: this.before},
      after: {value: this.after}
    });
  };
  module2.exports = PageHelper;
});

// node_modules/faunadb/src/RequestResult.js
var require_RequestResult = __commonJS((exports2, module2) => {
  "use strict";
  function RequestResult(method, path, query, requestRaw, requestContent, responseRaw, responseContent, statusCode, responseHeaders, startTime, endTime) {
    this.method = method;
    this.path = path;
    this.query = query;
    this.requestRaw = requestRaw;
    this.requestContent = requestContent;
    this.responseRaw = responseRaw;
    this.responseContent = responseContent;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  Object.defineProperty(RequestResult.prototype, "timeTaken", {
    get: function() {
      return this.endTime - this.startTime;
    }
  });
  module2.exports = RequestResult;
});

// node_modules/faunadb/src/_http/errors.js
var require_errors2 = __commonJS((exports2, module2) => {
  "use strict";
  var util = require_util();
  function TimeoutError(message) {
    Error.call(this);
    this.message = message || "Request aborted due to timeout";
    this.isTimeoutError = true;
  }
  util.inherits(TimeoutError, Error);
  function AbortError(message) {
    Error.call(this);
    this.message = message || "Request aborted";
    this.isAbortError = true;
  }
  util.inherits(AbortError, Error);
  module2.exports = {
    TimeoutError,
    AbortError
  };
});

// node_modules/faunadb/src/_http/http2Adapter.js
var require_http2Adapter = __commonJS((exports2, module2) => {
  "use strict";
  var http2 = require("http2");
  var errors = require_errors2();
  var util = require_util();
  var DESTROY_HTTP2_SESSION_TIME = 1e3 * 60;
  var STREAM_PREFIX = "stream::";
  function Http2Adapter() {
    this.type = "http2";
    this._sessionMap = {};
  }
  Http2Adapter.prototype._resolveSessionFor = function(origin, isStreaming) {
    var sessionKey = isStreaming ? STREAM_PREFIX + origin : origin;
    if (!this._sessionMap[sessionKey]) {
      var self2 = this;
      var cleanup = function() {
        self2._cleanupSessionFor(origin, isStreaming);
      };
      this._sessionMap[sessionKey] = http2.connect(origin).once("error", cleanup).once("goaway", cleanup).setTimeout(DESTROY_HTTP2_SESSION_TIME, cleanup);
    }
    return this._sessionMap[sessionKey];
  };
  Http2Adapter.prototype._cleanupSessionFor = function(origin, isStreaming) {
    var sessionKey = isStreaming ? STREAM_PREFIX + origin : origin;
    if (this._sessionMap[sessionKey]) {
      this._sessionMap[sessionKey].close();
      delete this._sessionMap[sessionKey];
    }
  };
  Http2Adapter.prototype.execute = function(options) {
    var self2 = this;
    var isStreaming = options.streamConsumer != null;
    return new Promise(function(resolvePromise, rejectPromise) {
      var isPromiseSettled = false;
      var isCanceled = false;
      var resolve = function(value) {
        isPromiseSettled = true;
        resolvePromise(value);
      };
      var rejectOrOnError = function(error) {
        if (isPromiseSettled && isStreaming) {
          return options.streamConsumer.onError(error);
        }
        isPromiseSettled = true;
        rejectPromise(error);
      };
      var cleanup = function() {
        if (options.signal) {
          options.signal.removeEventListener("abort", onAbort);
        }
      };
      var onError = function(error) {
        cleanup();
        rejectOrOnError(error);
      };
      var onAbort = function() {
        isCanceled = true;
        cleanup();
        request.close(http2.constants.NGHTTP2_CANCEL);
        rejectOrOnError(new errors.AbortError());
      };
      var onTimeout = function() {
        isCanceled = true;
        cleanup();
        request.close(http2.constants.NGHTTP2_CANCEL);
        rejectOrOnError(new errors.TimeoutError());
      };
      var onResponse = function(responseHeaders) {
        var status = responseHeaders[http2.constants.HTTP2_HEADER_STATUS];
        var isOkStatus = status >= 200 && status < 400;
        var processStream = isOkStatus && isStreaming;
        var responseBody = "";
        var onData = function(chunk) {
          if (processStream) {
            return options.streamConsumer.onData(chunk);
          }
          responseBody += chunk;
        };
        var onEnd = function() {
          cleanup();
          if (!processStream) {
            return resolve({
              body: responseBody,
              headers: responseHeaders,
              status
            });
          }
          if (!isCanceled) {
            options.streamConsumer.onError(new TypeError("network error"));
          }
        };
        if (processStream) {
          resolve({
            body: "[stream]",
            headers: responseHeaders,
            status
          });
        }
        request.on("data", onData).on("end", onEnd);
      };
      try {
        var pathname = (options.path[0] === "/" ? options.path : "/" + options.path) + util.querystringify(options.query, "?");
        var requestHeaders = Object.assign({}, options.headers, {
          [http2.constants.HTTP2_HEADER_PATH]: pathname,
          [http2.constants.HTTP2_HEADER_METHOD]: options.method
        });
        var session = self2._resolveSessionFor(options.origin, isStreaming);
        var request = session.request(requestHeaders).setEncoding("utf8").on("error", onError).on("response", onResponse);
        if (!options.signal && options.timeout) {
          request.setTimeout(options.timeout, onTimeout);
        }
        if (options.signal) {
          options.signal.addEventListener("abort", onAbort);
        }
        if (options.body != null) {
          request.write(options.body);
        }
        request.end();
      } catch (error) {
        self2._cleanupSessionFor(options.origin, isStreaming);
        rejectOrOnError(error);
      }
    });
  };
  module2.exports = Http2Adapter;
});

// node_modules/abort-controller/polyfill.mjs
var require_polyfill = __commonJS(() => {
  var g = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : void 0;
  if (g) {
    if (typeof g.AbortController === "undefined") {
      g.AbortController = AbortController2;
    }
    if (typeof g.AbortSignal === "undefined") {
      g.AbortSignal = AbortSignal;
    }
  }
});

// node_modules/node-fetch/lib/index.mjs
var require_lib = __commonJS((exports2) => {
  __markAsModule(exports2);
  __export(exports2, {
    FetchError: () => FetchError,
    Headers: () => Headers,
    Request: () => Request,
    Response: () => Response,
    default: () => lib_default
  });
  var import_stream = __toModule(require("stream"));
  var import_http = __toModule(require("http"));
  var import_url = __toModule(require("url"));
  var import_https = __toModule(require("https"));
  var import_zlib = __toModule(require("zlib"));
  var Readable = import_stream.default.Readable;
  var BUFFER = Symbol("buffer");
  var TYPE = Symbol("type");
  var Blob = class {
    constructor() {
      this[TYPE] = "";
      const blobParts = arguments[0];
      const options = arguments[1];
      const buffers = [];
      let size = 0;
      if (blobParts) {
        const a = blobParts;
        const length = Number(a.length);
        for (let i = 0; i < length; i++) {
          const element = a[i];
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length;
          buffers.push(buffer);
        }
      }
      this[BUFFER] = Buffer.concat(buffers);
      let type = options && options.type !== void 0 && String(options.type).toLowerCase();
      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }
    get size() {
      return this[BUFFER].length;
    }
    get type() {
      return this[TYPE];
    }
    text() {
      return Promise.resolve(this[BUFFER].toString());
    }
    arrayBuffer() {
      const buf = this[BUFFER];
      const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      return Promise.resolve(ab);
    }
    stream() {
      const readable = new Readable();
      readable._read = function() {
      };
      readable.push(this[BUFFER]);
      readable.push(null);
      return readable;
    }
    toString() {
      return "[object Blob]";
    }
    slice() {
      const size = this.size;
      const start = arguments[0];
      const end = arguments[1];
      let relativeStart, relativeEnd;
      if (start === void 0) {
        relativeStart = 0;
      } else if (start < 0) {
        relativeStart = Math.max(size + start, 0);
      } else {
        relativeStart = Math.min(start, size);
      }
      if (end === void 0) {
        relativeEnd = size;
      } else if (end < 0) {
        relativeEnd = Math.max(size + end, 0);
      } else {
        relativeEnd = Math.min(end, size);
      }
      const span = Math.max(relativeEnd - relativeStart, 0);
      const buffer = this[BUFFER];
      const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
      const blob = new Blob([], {type: arguments[2]});
      blob[BUFFER] = slicedBuffer;
      return blob;
    }
  };
  Object.defineProperties(Blob.prototype, {
    size: {enumerable: true},
    type: {enumerable: true},
    slice: {enumerable: true}
  });
  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: "Blob",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    if (systemError) {
      this.code = this.errno = systemError.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = "FetchError";
  var convert;
  try {
    convert = require("encoding").convert;
  } catch (e) {
  }
  var INTERNALS = Symbol("Body internals");
  var PassThrough = import_stream.default.PassThrough;
  function Body(body) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
    let size = _ref$size === void 0 ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
    if (body == null) {
      body = null;
    } else if (isURLSearchParams(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS] = {
      body,
      disturbed: false,
      error: null
    };
    this.size = size;
    this.timeout = timeout;
    if (body instanceof import_stream.default) {
      body.on("error", function(err) {
        const error = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
        _this[INTERNALS].error = error;
      });
    }
  }
  Body.prototype = {
    get body() {
      return this[INTERNALS].body;
    },
    get bodyUsed() {
      return this[INTERNALS].disturbed;
    },
    arrayBuffer() {
      return consumeBody.call(this).then(function(buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },
    blob() {
      let ct = this.headers && this.headers.get("content-type") || "";
      return consumeBody.call(this).then(function(buf) {
        return Object.assign(new Blob([], {
          type: ct.toLowerCase()
        }), {
          [BUFFER]: buf
        });
      });
    },
    json() {
      var _this2 = this;
      return consumeBody.call(this).then(function(buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
        }
      });
    },
    text() {
      return consumeBody.call(this).then(function(buffer) {
        return buffer.toString();
      });
    },
    buffer() {
      return consumeBody.call(this);
    },
    textConverted() {
      var _this3 = this;
      return consumeBody.call(this).then(function(buffer) {
        return convertBody(buffer, _this3.headers);
      });
    }
  };
  Object.defineProperties(Body.prototype, {
    body: {enumerable: true},
    bodyUsed: {enumerable: true},
    arrayBuffer: {enumerable: true},
    blob: {enumerable: true},
    json: {enumerable: true},
    text: {enumerable: true}
  });
  Body.mixIn = function(proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (!(name in proto)) {
        const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
        Object.defineProperty(proto, name, desc);
      }
    }
  };
  function consumeBody() {
    var _this4 = this;
    if (this[INTERNALS].disturbed) {
      return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    }
    this[INTERNALS].disturbed = true;
    if (this[INTERNALS].error) {
      return Body.Promise.reject(this[INTERNALS].error);
    }
    let body = this.body;
    if (body === null) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    if (isBlob(body)) {
      body = body.stream();
    }
    if (Buffer.isBuffer(body)) {
      return Body.Promise.resolve(body);
    }
    if (!(body instanceof import_stream.default)) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    let accum = [];
    let accumBytes = 0;
    let abort = false;
    return new Body.Promise(function(resolve, reject) {
      let resTimeout;
      if (_this4.timeout) {
        resTimeout = setTimeout(function() {
          abort = true;
          reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
        }, _this4.timeout);
      }
      body.on("error", function(err) {
        if (err.name === "AbortError") {
          abort = true;
          reject(err);
        } else {
          reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
        }
      });
      body.on("data", function(chunk) {
        if (abort || chunk === null) {
          return;
        }
        if (_this4.size && accumBytes + chunk.length > _this4.size) {
          abort = true;
          reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
          return;
        }
        accumBytes += chunk.length;
        accum.push(chunk);
      });
      body.on("end", function() {
        if (abort) {
          return;
        }
        clearTimeout(resTimeout);
        try {
          resolve(Buffer.concat(accum, accumBytes));
        } catch (err) {
          reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
        }
      });
    });
  }
  function convertBody(buffer, headers) {
    if (typeof convert !== "function") {
      throw new Error("The package `encoding` must be installed to use the textConverted() function");
    }
    const ct = headers.get("content-type");
    let charset = "utf-8";
    let res, str;
    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    }
    str = buffer.slice(0, 1024).toString();
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (!res) {
        res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
        if (res) {
          res.pop();
        }
      }
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === "gb2312" || charset === "gbk") {
        charset = "gb18030";
      }
    }
    return convert(buffer, "UTF-8", charset).toString();
  }
  function isURLSearchParams(obj) {
    if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
      return false;
    }
    return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
  }
  function isBlob(obj) {
    return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
  }
  function clone(instance) {
    let p1, p2;
    let body = instance.body;
    if (instance.bodyUsed) {
      throw new Error("cannot clone body after it is used");
    }
    if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
      p1 = new PassThrough();
      p2 = new PassThrough();
      body.pipe(p1);
      body.pipe(p2);
      instance[INTERNALS].body = p1;
      body = p2;
    }
    return body;
  }
  function extractContentType(body) {
    if (body === null) {
      return null;
    } else if (typeof body === "string") {
      return "text/plain;charset=UTF-8";
    } else if (isURLSearchParams(body)) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isBlob(body)) {
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      return null;
    } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      return null;
    } else if (ArrayBuffer.isView(body)) {
      return null;
    } else if (typeof body.getBoundary === "function") {
      return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else if (body instanceof import_stream.default) {
      return null;
    } else {
      return "text/plain;charset=UTF-8";
    }
  }
  function getTotalBytes(instance) {
    const body = instance.body;
    if (body === null) {
      return 0;
    } else if (isBlob(body)) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (body && typeof body.getLengthSync === "function") {
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
        return body.getLengthSync();
      }
      return null;
    } else {
      return null;
    }
  }
  function writeToStream(dest, instance) {
    const body = instance.body;
    if (body === null) {
      dest.end();
    } else if (isBlob(body)) {
      body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
      dest.write(body);
      dest.end();
    } else {
      body.pipe(dest);
    }
  }
  Body.Promise = global.Promise;
  var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
  var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
  function validateName(name) {
    name = `${name}`;
    if (invalidTokenRegex.test(name) || name === "") {
      throw new TypeError(`${name} is not a legal HTTP header name`);
    }
  }
  function validateValue(value) {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
      throw new TypeError(`${value} is not a legal HTTP header value`);
    }
  }
  function find(map, name) {
    name = name.toLowerCase();
    for (const key in map) {
      if (key.toLowerCase() === name) {
        return key;
      }
    }
    return void 0;
  }
  var MAP = Symbol("map");
  var Headers = class {
    constructor() {
      let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      this[MAP] = Object.create(null);
      if (init instanceof Headers) {
        const rawHeaders = init.raw();
        const headerNames = Object.keys(rawHeaders);
        for (const headerName of headerNames) {
          for (const value of rawHeaders[headerName]) {
            this.append(headerName, value);
          }
        }
        return;
      }
      if (init == null)
        ;
      else if (typeof init === "object") {
        const method = init[Symbol.iterator];
        if (method != null) {
          if (typeof method !== "function") {
            throw new TypeError("Header pairs must be iterable");
          }
          const pairs = [];
          for (const pair of init) {
            if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
              throw new TypeError("Each header pair must be iterable");
            }
            pairs.push(Array.from(pair));
          }
          for (const pair of pairs) {
            if (pair.length !== 2) {
              throw new TypeError("Each header pair must be a name/value tuple");
            }
            this.append(pair[0], pair[1]);
          }
        } else {
          for (const key of Object.keys(init)) {
            const value = init[key];
            this.append(key, value);
          }
        }
      } else {
        throw new TypeError("Provided initializer must be an object");
      }
    }
    get(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key === void 0) {
        return null;
      }
      return this[MAP][key].join(", ");
    }
    forEach(callback) {
      let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
      let pairs = getHeaders(this);
      let i = 0;
      while (i < pairs.length) {
        var _pairs$i = pairs[i];
        const name = _pairs$i[0], value = _pairs$i[1];
        callback.call(thisArg, value, name, this);
        pairs = getHeaders(this);
        i++;
      }
    }
    set(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      this[MAP][key !== void 0 ? key : name] = [value];
    }
    append(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        this[MAP][key].push(value);
      } else {
        this[MAP][name] = [value];
      }
    }
    has(name) {
      name = `${name}`;
      validateName(name);
      return find(this[MAP], name) !== void 0;
    }
    delete(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        delete this[MAP][key];
      }
    }
    raw() {
      return this[MAP];
    }
    keys() {
      return createHeadersIterator(this, "key");
    }
    values() {
      return createHeadersIterator(this, "value");
    }
    [Symbol.iterator]() {
      return createHeadersIterator(this, "key+value");
    }
  };
  Headers.prototype.entries = Headers.prototype[Symbol.iterator];
  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: "Headers",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Headers.prototype, {
    get: {enumerable: true},
    forEach: {enumerable: true},
    set: {enumerable: true},
    append: {enumerable: true},
    has: {enumerable: true},
    delete: {enumerable: true},
    keys: {enumerable: true},
    values: {enumerable: true},
    entries: {enumerable: true}
  });
  function getHeaders(headers) {
    let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === "key" ? function(k) {
      return k.toLowerCase();
    } : kind === "value" ? function(k) {
      return headers[MAP][k].join(", ");
    } : function(k) {
      return [k.toLowerCase(), headers[MAP][k].join(", ")];
    });
  }
  var INTERNAL = Symbol("internal");
  function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target,
      kind,
      index: 0
    };
    return iterator;
  }
  var HeadersIteratorPrototype = Object.setPrototypeOf({
    next() {
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError("Value of `this` is not a HeadersIterator");
      }
      var _INTERNAL = this[INTERNAL];
      const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
      const values = getHeaders(target, kind);
      const len = values.length;
      if (index >= len) {
        return {
          value: void 0,
          done: true
        };
      }
      this[INTERNAL].index = index + 1;
      return {
        value: values[index],
        done: false
      };
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: "HeadersIterator",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function exportNodeCompatibleHeaders(headers) {
    const obj = Object.assign({__proto__: null}, headers[MAP]);
    const hostHeaderKey = find(headers[MAP], "Host");
    if (hostHeaderKey !== void 0) {
      obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }
    return obj;
  }
  function createHeadersLenient(obj) {
    const headers = new Headers();
    for (const name of Object.keys(obj)) {
      if (invalidTokenRegex.test(name)) {
        continue;
      }
      if (Array.isArray(obj[name])) {
        for (const val of obj[name]) {
          if (invalidHeaderCharRegex.test(val)) {
            continue;
          }
          if (headers[MAP][name] === void 0) {
            headers[MAP][name] = [val];
          } else {
            headers[MAP][name].push(val);
          }
        }
      } else if (!invalidHeaderCharRegex.test(obj[name])) {
        headers[MAP][name] = [obj[name]];
      }
    }
    return headers;
  }
  var INTERNALS$1 = Symbol("Response internals");
  var STATUS_CODES = import_http.default.STATUS_CODES;
  var Response = class {
    constructor() {
      let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      Body.call(this, body, opts);
      const status = opts.status || 200;
      const headers = new Headers(opts.headers);
      if (body != null && !headers.has("Content-Type")) {
        const contentType = extractContentType(body);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      this[INTERNALS$1] = {
        url: opts.url,
        status,
        statusText: opts.statusText || STATUS_CODES[status],
        headers,
        counter: opts.counter
      };
    }
    get url() {
      return this[INTERNALS$1].url || "";
    }
    get status() {
      return this[INTERNALS$1].status;
    }
    get ok() {
      return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
    }
    get redirected() {
      return this[INTERNALS$1].counter > 0;
    }
    get statusText() {
      return this[INTERNALS$1].statusText;
    }
    get headers() {
      return this[INTERNALS$1].headers;
    }
    clone() {
      return new Response(clone(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected
      });
    }
  };
  Body.mixIn(Response.prototype);
  Object.defineProperties(Response.prototype, {
    url: {enumerable: true},
    status: {enumerable: true},
    ok: {enumerable: true},
    redirected: {enumerable: true},
    statusText: {enumerable: true},
    headers: {enumerable: true},
    clone: {enumerable: true}
  });
  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: "Response",
    writable: false,
    enumerable: false,
    configurable: true
  });
  var INTERNALS$2 = Symbol("Request internals");
  var parse_url = import_url.default.parse;
  var format_url = import_url.default.format;
  var streamDestructionSupported = "destroy" in import_stream.default.Readable.prototype;
  function isRequest(input) {
    return typeof input === "object" && typeof input[INTERNALS$2] === "object";
  }
  function isAbortSignal(signal) {
    const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === "AbortSignal");
  }
  var Request = class {
    constructor(input) {
      let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let parsedURL;
      if (!isRequest(input)) {
        if (input && input.href) {
          parsedURL = parse_url(input.href);
        } else {
          parsedURL = parse_url(`${input}`);
        }
        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }
      let method = init.method || input.method || "GET";
      method = method.toUpperCase();
      if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body");
      }
      let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
      Body.call(this, inputBody, {
        timeout: init.timeout || input.timeout || 0,
        size: init.size || input.size || 0
      });
      const headers = new Headers(init.headers || input.headers || {});
      if (inputBody != null && !headers.has("Content-Type")) {
        const contentType = extractContentType(inputBody);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      let signal = isRequest(input) ? input.signal : null;
      if ("signal" in init)
        signal = init.signal;
      if (signal != null && !isAbortSignal(signal)) {
        throw new TypeError("Expected signal to be an instanceof AbortSignal");
      }
      this[INTERNALS$2] = {
        method,
        redirect: init.redirect || input.redirect || "follow",
        headers,
        parsedURL,
        signal
      };
      this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
      this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
      this.counter = init.counter || input.counter || 0;
      this.agent = init.agent || input.agent;
    }
    get method() {
      return this[INTERNALS$2].method;
    }
    get url() {
      return format_url(this[INTERNALS$2].parsedURL);
    }
    get headers() {
      return this[INTERNALS$2].headers;
    }
    get redirect() {
      return this[INTERNALS$2].redirect;
    }
    get signal() {
      return this[INTERNALS$2].signal;
    }
    clone() {
      return new Request(this);
    }
  };
  Body.mixIn(Request.prototype);
  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: "Request",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Request.prototype, {
    method: {enumerable: true},
    url: {enumerable: true},
    headers: {enumerable: true},
    redirect: {enumerable: true},
    clone: {enumerable: true},
    signal: {enumerable: true}
  });
  function getNodeRequestOptions(request) {
    const parsedURL = request[INTERNALS$2].parsedURL;
    const headers = new Headers(request[INTERNALS$2].headers);
    if (!headers.has("Accept")) {
      headers.set("Accept", "*/*");
    }
    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError("Only absolute URLs are supported");
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError("Only HTTP(S) protocols are supported");
    }
    if (request.signal && request.body instanceof import_stream.default.Readable && !streamDestructionSupported) {
      throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
    }
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = "0";
    }
    if (request.body != null) {
      const totalBytes = getTotalBytes(request);
      if (typeof totalBytes === "number") {
        contentLengthValue = String(totalBytes);
      }
    }
    if (contentLengthValue) {
      headers.set("Content-Length", contentLengthValue);
    }
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
    }
    if (request.compress && !headers.has("Accept-Encoding")) {
      headers.set("Accept-Encoding", "gzip,deflate");
    }
    let agent = request.agent;
    if (typeof agent === "function") {
      agent = agent(parsedURL);
    }
    if (!headers.has("Connection") && !agent) {
      headers.set("Connection", "close");
    }
    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: exportNodeCompatibleHeaders(headers),
      agent
    });
  }
  function AbortError(message) {
    Error.call(this, message);
    this.type = "aborted";
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
  AbortError.prototype = Object.create(Error.prototype);
  AbortError.prototype.constructor = AbortError;
  AbortError.prototype.name = "AbortError";
  var PassThrough$1 = import_stream.default.PassThrough;
  var resolve_url = import_url.default.resolve;
  function fetch(url, opts) {
    if (!fetch.Promise) {
      throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
    }
    Body.Promise = fetch.Promise;
    return new fetch.Promise(function(resolve, reject) {
      const request = new Request(url, opts);
      const options = getNodeRequestOptions(request);
      const send = (options.protocol === "https:" ? import_https.default : import_http.default).request;
      const signal = request.signal;
      let response = null;
      const abort = function abort2() {
        let error = new AbortError("The user aborted a request.");
        reject(error);
        if (request.body && request.body instanceof import_stream.default.Readable) {
          request.body.destroy(error);
        }
        if (!response || !response.body)
          return;
        response.body.emit("error", error);
      };
      if (signal && signal.aborted) {
        abort();
        return;
      }
      const abortAndFinalize = function abortAndFinalize2() {
        abort();
        finalize();
      };
      const req = send(options);
      let reqTimeout;
      if (signal) {
        signal.addEventListener("abort", abortAndFinalize);
      }
      function finalize() {
        req.abort();
        if (signal)
          signal.removeEventListener("abort", abortAndFinalize);
        clearTimeout(reqTimeout);
      }
      if (request.timeout) {
        req.once("socket", function(socket) {
          reqTimeout = setTimeout(function() {
            reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
            finalize();
          }, request.timeout);
        });
      }
      req.on("error", function(err) {
        reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
        finalize();
      });
      req.on("response", function(res) {
        clearTimeout(reqTimeout);
        const headers = createHeadersLenient(res.headers);
        if (fetch.isRedirect(res.statusCode)) {
          const location = headers.get("Location");
          const locationURL = location === null ? null : resolve_url(request.url, location);
          switch (request.redirect) {
            case "error":
              reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
              finalize();
              return;
            case "manual":
              if (locationURL !== null) {
                try {
                  headers.set("Location", locationURL);
                } catch (err) {
                  reject(err);
                }
              }
              break;
            case "follow":
              if (locationURL === null) {
                break;
              }
              if (request.counter >= request.follow) {
                reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                finalize();
                return;
              }
              const requestOpts = {
                headers: new Headers(request.headers),
                follow: request.follow,
                counter: request.counter + 1,
                agent: request.agent,
                compress: request.compress,
                method: request.method,
                body: request.body,
                signal: request.signal,
                timeout: request.timeout,
                size: request.size
              };
              if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                finalize();
                return;
              }
              if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                requestOpts.method = "GET";
                requestOpts.body = void 0;
                requestOpts.headers.delete("content-length");
              }
              resolve(fetch(new Request(locationURL, requestOpts)));
              finalize();
              return;
          }
        }
        res.once("end", function() {
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
        });
        let body = res.pipe(new PassThrough$1());
        const response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers,
          size: request.size,
          timeout: request.timeout,
          counter: request.counter
        };
        const codings = headers.get("Content-Encoding");
        if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        const zlibOptions = {
          flush: import_zlib.default.Z_SYNC_FLUSH,
          finishFlush: import_zlib.default.Z_SYNC_FLUSH
        };
        if (codings == "gzip" || codings == "x-gzip") {
          body = body.pipe(import_zlib.default.createGunzip(zlibOptions));
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        if (codings == "deflate" || codings == "x-deflate") {
          const raw = res.pipe(new PassThrough$1());
          raw.once("data", function(chunk) {
            if ((chunk[0] & 15) === 8) {
              body = body.pipe(import_zlib.default.createInflate());
            } else {
              body = body.pipe(import_zlib.default.createInflateRaw());
            }
            response = new Response(body, response_options);
            resolve(response);
          });
          return;
        }
        if (codings == "br" && typeof import_zlib.default.createBrotliDecompress === "function") {
          body = body.pipe(import_zlib.default.createBrotliDecompress());
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        response = new Response(body, response_options);
        resolve(response);
      });
      writeToStream(req, request);
    });
  }
  fetch.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  fetch.Promise = global.Promise;
  var lib_default = fetch;
});

// node_modules/cross-fetch/dist/node-ponyfill.js
var require_node_ponyfill = __commonJS((exports2, module2) => {
  var nodeFetch = require_lib();
  var realFetch = nodeFetch.default || nodeFetch;
  var fetch = function(url, options) {
    if (/^\/\//.test(url)) {
      url = "https:" + url;
    }
    return realFetch.call(this, url, options);
  };
  fetch.ponyfill = true;
  module2.exports = exports2 = fetch;
  exports2.fetch = fetch;
  exports2.Headers = nodeFetch.Headers;
  exports2.Request = nodeFetch.Request;
  exports2.Response = nodeFetch.Response;
  exports2.default = fetch;
});

// node_modules/faunadb/src/_http/fetchAdapter.js
var require_fetchAdapter = __commonJS((exports2, module2) => {
  "use strict";
  require_polyfill();
  var util = require_util();
  var faunaErrors = require_errors();
  var errors = require_errors2();
  function FetchAdapter(options) {
    options = options || {};
    this.type = "fetch";
    this._fetch = resolveFetch(options.fetch);
    if (util.isNodeEnv() && options.keepAlive) {
      this._keepAliveEnabledAgent = new (options.isHttps ? require("https") : require("http")).Agent({keepAlive: true});
    }
  }
  FetchAdapter.prototype.execute = function(options) {
    var signal = options.signal;
    var useTimeout = !options.signal && !!options.timeout;
    var timerId;
    var cleanup = function() {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
    var onResponse = function(response) {
      cleanup();
      var headers = responseHeadersAsObject(response.headers);
      var isStreaming = response.ok && options.streamConsumer != null;
      if (!isStreaming) {
        return response.text().then(function(content) {
          return {
            body: content,
            headers,
            status: response.status
          };
        });
      }
      attachStreamConsumer(response, options.streamConsumer);
      return {
        body: "[stream]",
        headers,
        status: response.status
      };
    };
    var onError = function(error) {
      cleanup();
      return Promise.reject(remapFetchError(error, useTimeout));
    };
    if (useTimeout) {
      var ctrl = new AbortController();
      signal = ctrl.signal;
      timerId = setTimeout(ctrl.abort.bind(ctrl), options.timeout);
    }
    return this._fetch(util.formatUrl(options.origin, options.path, options.query), {
      method: options.method,
      headers: options.headers,
      body: options.body,
      agent: this._keepAliveEnabledAgent,
      signal
    }).then(onResponse).catch(onError);
  };
  function attachStreamConsumer(response, consumer) {
    var onError = function(error) {
      consumer.onError(remapFetchError(error));
    };
    if (util.isNodeEnv()) {
      response.body.on("error", onError).on("data", consumer.onData).on("end", function() {
        consumer.onError(new TypeError("network error"));
      });
      return;
    }
    try {
      let pump = function() {
        return reader.read().then(function(msg) {
          if (!msg.done) {
            var chunk = decoder.decode(msg.value, {stream: true});
            consumer.onData(chunk);
            return pump();
          }
          consumer.onError(new TypeError("network error"));
        });
      };
      var reader = response.body.getReader();
      var decoder = new TextDecoder("utf-8");
      pump().catch(onError);
    } catch (err) {
      throw new faunaErrors.StreamsNotSupported("Please, consider providing a Fetch API-compatible function with streamable response bodies. " + err);
    }
  }
  function remapFetchError(error, useTimeout) {
    var isAbortError = error && error.name === "AbortError";
    if (!isAbortError) {
      return error;
    }
    return useTimeout ? new errors.TimeoutError() : new errors.AbortError();
  }
  function resolveFetch(fetchOverride) {
    if (typeof fetchOverride === "function") {
      return fetchOverride;
    }
    if (typeof global.fetch === "function") {
      return global.fetch.bind(global);
    }
    return require_node_ponyfill();
  }
  function responseHeadersAsObject(headers) {
    var result = {};
    for (var header of headers.entries()) {
      var key = header[0];
      var value = header[1];
      result[key] = value;
    }
    return result;
  }
  module2.exports = FetchAdapter;
});

// node_modules/faunadb/src/_http/index.js
var require_http = __commonJS((exports2, module2) => {
  "use strict";
  var packageJson = require_package();
  var {getBrowserOsDetails} = require_util();
  var util = require_util();
  var errors = require_errors2();
  function HttpClient(options) {
    var isHttps = options.scheme === "https";
    if (!options.port) {
      options.port = isHttps ? 443 : 80;
    }
    var useHttp2Adapter = !options.fetch && util.isNodeEnv() && isHttp2Supported();
    this._adapter = useHttp2Adapter ? new (require_http2Adapter())() : new (require_fetchAdapter())({
      isHttps,
      fetch: options.fetch,
      keepAlive: options.keepAlive
    });
    this._baseUrl = options.scheme + "://" + options.domain + ":" + options.port;
    this._secret = options.secret;
    this._headers = Object.assign({}, options.headers, getDefaultHeaders());
    this._queryTimeout = options.queryTimeout;
    this._lastSeen = null;
    this._timeout = Math.floor(options.timeout * 1e3);
  }
  HttpClient.prototype.getLastTxnTime = function() {
    return this._lastSeen;
  };
  HttpClient.prototype.syncLastTxnTime = function(time) {
    if (this._lastSeen == null || this._lastSeen < time) {
      this._lastSeen = time;
    }
  };
  HttpClient.prototype.execute = function(options) {
    options = options || {};
    var invalidStreamConsumer = options.streamConsumer && (typeof options.streamConsumer.onData !== "function" || typeof options.streamConsumer.onError !== "function");
    if (invalidStreamConsumer) {
      return Promise.reject(new TypeError('Invalid "streamConsumer" provided'));
    }
    var secret = options.secret || this._secret;
    var queryTimeout = options.queryTimeout || this._queryTimeout;
    var headers = this._headers;
    headers["Authorization"] = secret && secretHeader(secret);
    headers["X-Last-Seen-Txn"] = this._lastSeen;
    headers["X-Query-Timeout"] = queryTimeout;
    return this._adapter.execute({
      origin: this._baseUrl,
      path: options.path || "/",
      query: options.query,
      method: options.method || "GET",
      headers: util.removeNullAndUndefinedValues(headers),
      body: options.body,
      signal: options.signal,
      timeout: this._timeout,
      streamConsumer: options.streamConsumer
    });
  };
  function secretHeader(secret) {
    return "Bearer " + secret;
  }
  function getDefaultHeaders() {
    var driverEnv = {
      driver: ["javascript", packageJson.version].join("-")
    };
    if (util.isNodeEnv()) {
      driverEnv.runtime = ["nodejs", process.version].join("-");
      driverEnv.env = util.getNodeRuntimeEnv();
      var os = require("os");
      driverEnv.os = [os.platform(), os.release()].join("-");
    } else {
      driverEnv.runtime = util.getBrowserDetails();
      driverEnv.env = "unknown";
      driverEnv.os = getBrowserOsDetails();
    }
    var headers = {
      "X-FaunaDB-API-Version": packageJson.apiVersion
    };
    if (util.isNodeEnv()) {
      headers["X-Driver-Env"] = Object.keys(driverEnv).map((key) => [key, driverEnv[key].toLowerCase()].join("=")).join("; ");
    }
    return headers;
  }
  function isHttp2Supported() {
    try {
      require("http2");
      return true;
    } catch (_) {
      return false;
    }
  }
  module2.exports = {
    HttpClient,
    TimeoutError: errors.TimeoutError,
    AbortError: errors.AbortError
  };
});

// node_modules/faunadb/src/_json.js
var require_json = __commonJS((exports2, module2) => {
  "use strict";
  var values = require_values();
  function toJSON(object, pretty) {
    pretty = typeof pretty !== "undefined" ? pretty : false;
    if (pretty) {
      return JSON.stringify(object, null, "  ");
    } else {
      return JSON.stringify(object);
    }
  }
  function parseJSON(json) {
    return JSON.parse(json, json_parse);
  }
  function parseJSONStreaming(content) {
    var values2 = [];
    try {
      values2.push(parseJSON(content));
      content = "";
    } catch (err) {
      while (true) {
        var pos = content.indexOf("\n") + 1;
        if (pos <= 0) {
          break;
        }
        var slice = content.slice(0, pos).trim();
        if (slice.length > 0) {
          values2.push(parseJSON(slice));
        }
        content = content.slice(pos);
      }
    }
    return {
      values: values2,
      buffer: content
    };
  }
  function json_parse(_, val) {
    if (typeof val !== "object" || val === null) {
      return val;
    } else if ("@ref" in val) {
      var ref = val["@ref"];
      if (!("collection" in ref) && !("database" in ref)) {
        return values.Native.fromName(ref["id"]);
      }
      var col = json_parse("collection", ref["collection"]);
      var db = json_parse("database", ref["database"]);
      return new values.Ref(ref["id"], col, db);
    } else if ("@obj" in val) {
      return val["@obj"];
    } else if ("@set" in val) {
      return new values.SetRef(val["@set"]);
    } else if ("@ts" in val) {
      return new values.FaunaTime(val["@ts"]);
    } else if ("@date" in val) {
      return new values.FaunaDate(val["@date"]);
    } else if ("@bytes" in val) {
      return new values.Bytes(val["@bytes"]);
    } else if ("@query" in val) {
      return new values.Query(val["@query"]);
    } else {
      return val;
    }
  }
  module2.exports = {
    toJSON,
    parseJSON,
    parseJSONStreaming
  };
});

// node_modules/faunadb/src/stream.js
var require_stream = __commonJS((exports2, module2) => {
  "use strict";
  require_polyfill();
  var RequestResult = require_RequestResult();
  var errors = require_errors();
  var json = require_json();
  var http = require_http();
  var q4 = require_query();
  var util = require_util();
  var DefaultEvents = ["start", "error", "version", "history_rewrite"];
  var DocumentStreamEvents = DefaultEvents.concat(["snapshot"]);
  function StreamClient(client, expression, options, onEvent) {
    options = util.applyDefaults(options, {
      fields: null
    });
    this._client = client;
    this._onEvent = onEvent;
    this._query = q4.wrap(expression);
    this._urlParams = options.fields ? {fields: options.fields.join(",")} : null;
    this._abort = new AbortController();
    this._state = "idle";
  }
  StreamClient.prototype.snapshot = function() {
    var self2 = this;
    self2._client.query(q4.Get(self2._query)).then(function(doc) {
      self2._onEvent({
        type: "snapshot",
        event: doc
      });
    }).catch(function(error) {
      self2._onEvent({
        type: "error",
        event: error
      });
    });
  };
  StreamClient.prototype.subscribe = function() {
    var self2 = this;
    if (self2._state === "idle") {
      self2._state = "open";
    } else {
      throw new Error("Subscription#start should not be called several times, consider instantiating a new stream instead.");
    }
    var body = JSON.stringify(self2._query);
    var startTime = Date.now();
    var buffer = "";
    function onResponse(response) {
      var endTime = Date.now();
      var parsed;
      try {
        parsed = json.parseJSON(response.body);
      } catch (_) {
        parsed = response.body;
      }
      var result = new RequestResult("POST", "stream", self2._urlParams, body, self2._query, response.body, parsed, response.status, response.headers, startTime, endTime);
      self2._client._handleRequestResult(response, result);
    }
    function onData(data) {
      var result = json.parseJSONStreaming(buffer + data);
      buffer = result.buffer;
      result.values.forEach(function(event) {
        if (event.txn !== void 0) {
          self2._client.syncLastTxnTime(event.txn);
        }
        if (event.event === "error") {
          onError(new errors.StreamErrorEvent(event));
        } else {
          self2._onEvent(event);
        }
      });
    }
    function onError(error) {
      if (error instanceof http.AbortError) {
        return;
      }
      self2._onEvent({
        type: "error",
        event: error
      });
    }
    self2._client._http.execute({
      method: "POST",
      path: "stream",
      body,
      query: self2._urlParams,
      signal: this._abort.signal,
      streamConsumer: {
        onError,
        onData
      }
    }).then(onResponse).catch(onError);
  };
  StreamClient.prototype.close = function() {
    if (this._state !== "closed") {
      this._state = "closed";
      this._abort.abort();
    }
  };
  function EventDispatcher(allowedEvents) {
    this._allowedEvents = allowedEvents;
    this._listeners = {};
  }
  EventDispatcher.prototype.on = function(type, callback) {
    if (this._allowedEvents.indexOf(type) === -1) {
      throw new Error("Unknown event type: " + type);
    }
    if (this._listeners[type] === void 0) {
      this._listeners[type] = [];
    }
    this._listeners[type].push(callback);
  };
  EventDispatcher.prototype.dispatch = function(event) {
    var listeners = this._listeners[event.type];
    if (!listeners) {
      return;
    }
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].call(null, event.event, event);
    }
  };
  function Subscription(client, dispatcher) {
    this._client = client;
    this._dispatcher = dispatcher;
  }
  Subscription.prototype.on = function(type, callback) {
    this._dispatcher.on(type, callback);
    return this;
  };
  Subscription.prototype.start = function() {
    this._client.subscribe();
    return this;
  };
  Subscription.prototype.close = function() {
    this._client.close();
  };
  function StreamAPI(client) {
    var api = function(expression, options) {
      var dispatcher = new EventDispatcher(DefaultEvents);
      var streamClient = new StreamClient(client, expression, options, function(event) {
        dispatcher.dispatch(event);
      });
      return new Subscription(streamClient, dispatcher);
    };
    api.document = function(expression, options) {
      var buffer = [];
      var buffering = true;
      var dispatcher = new EventDispatcher(DocumentStreamEvents);
      var streamClient = new StreamClient(client, expression, options, onEvent);
      function onEvent(event) {
        switch (event.type) {
          case "start":
            dispatcher.dispatch(event);
            streamClient.snapshot();
            break;
          case "snapshot":
            resume(event);
            break;
          case "error":
            dispatcher.dispatch(event);
            break;
          default:
            if (buffering) {
              buffer.push(event);
            } else {
              dispatcher.dispatch(event);
            }
        }
      }
      function resume(snapshotEvent) {
        dispatcher.dispatch(snapshotEvent);
        for (var i = 0; i < buffer.length; i++) {
          var bufferedEvent = buffer[i];
          if (bufferedEvent.txn > snapshotEvent.event.ts) {
            dispatcher.dispatch(bufferedEvent);
          }
        }
        buffering = false;
        buffer = null;
      }
      return new Subscription(streamClient, dispatcher);
    };
    return api;
  }
  module2.exports = {
    StreamAPI
  };
});

// node_modules/faunadb/src/Client.js
var require_Client = __commonJS((exports2, module2) => {
  "use strict";
  var packageJson = require_package();
  var PageHelper = require_PageHelper();
  var RequestResult = require_RequestResult();
  var errors = require_errors();
  var http = require_http();
  var json = require_json();
  var query = require_query();
  var stream = require_stream();
  var util = require_util();
  var values = require_values();
  function Client(options) {
    options = util.applyDefaults(options, {
      domain: "db.fauna.com",
      scheme: "https",
      port: null,
      secret: null,
      timeout: 60,
      observer: null,
      keepAlive: true,
      headers: {},
      fetch: void 0,
      queryTimeout: null
    });
    this._observer = options.observer;
    this._http = new http.HttpClient(options);
    this.stream = stream.StreamAPI(this);
  }
  Client.apiVersion = packageJson.apiVersion;
  Client.prototype.query = function(expression, options) {
    return this._execute("POST", "", query.wrap(expression), null, options);
  };
  Client.prototype.paginate = function(expression, params, options) {
    params = util.defaults(params, {});
    options = util.defaults(options, {});
    return new PageHelper(this, expression, params, options);
  };
  Client.prototype.ping = function(scope, timeout) {
    return this._execute("GET", "ping", null, {scope, timeout});
  };
  Client.prototype.getLastTxnTime = function() {
    return this._http.getLastTxnTime();
  };
  Client.prototype.syncLastTxnTime = function(time) {
    this._http.syncLastTxnTime(time);
  };
  Client.prototype._execute = function(method, path, data, query2, options) {
    query2 = util.defaults(query2, null);
    if (path instanceof values.Ref || util.checkInstanceHasProperty(path, "_isFaunaRef")) {
      path = path.value;
    }
    if (query2 !== null) {
      query2 = util.removeUndefinedValues(query2);
    }
    var startTime = Date.now();
    var self2 = this;
    var body = ["GET", "HEAD"].indexOf(method) >= 0 ? void 0 : JSON.stringify(data);
    return this._http.execute(Object.assign({}, options, {
      path,
      query: query2,
      method,
      body
    })).then(function(response) {
      var endTime = Date.now();
      var responseObject = json.parseJSON(response.body);
      var result = new RequestResult(method, path, query2, body, data, response.body, responseObject, response.status, response.headers, startTime, endTime);
      self2._handleRequestResult(response, result, options);
      return responseObject["resource"];
    });
  };
  Client.prototype._handleRequestResult = function(response, result, options) {
    var txnTimeHeaderKey = "x-txn-time";
    if (response.headers[txnTimeHeaderKey] != null) {
      this.syncLastTxnTime(parseInt(response.headers[txnTimeHeaderKey], 10));
    }
    var observers = [this._observer, options && options.observer];
    observers.forEach((observer) => {
      if (typeof observer == "function") {
        observer(result, this);
      }
    });
    errors.FaunaHTTPError.raiseForStatusCode(result);
  };
  module2.exports = Client;
});

// node_modules/faunadb/src/clientLogger.js
var require_clientLogger = __commonJS((exports2, module2) => {
  "use strict";
  var json = require_json();
  function logger(loggerFunction) {
    return function(requestResult, client) {
      return loggerFunction(showRequestResult(requestResult), client);
    };
  }
  function showRequestResult(requestResult) {
    var query = requestResult.query, method = requestResult.method, path = requestResult.path, requestContent = requestResult.requestContent, responseHeaders = requestResult.responseHeaders, responseContent = requestResult.responseContent, statusCode = requestResult.statusCode, timeTaken = requestResult.timeTaken;
    var out = "";
    function log(str) {
      out = out + str;
    }
    log("Fauna " + method + " /" + path + _queryString(query) + "\n");
    if (requestContent != null) {
      log("  Request JSON: " + _showJSON(requestContent) + "\n");
    }
    log("  Response headers: " + _showJSON(responseHeaders) + "\n");
    log("  Response JSON: " + _showJSON(responseContent) + "\n");
    log("  Response (" + statusCode + "): Network latency " + timeTaken + "ms\n");
    return out;
  }
  function _indent(str) {
    var indentStr = "  ";
    return str.split("\n").join("\n" + indentStr);
  }
  function _showJSON(object) {
    return _indent(json.toJSON(object, true));
  }
  function _queryString(query) {
    if (query == null) {
      return "";
    }
    var keys = Object.keys(query);
    if (keys.length === 0) {
      return "";
    }
    var pairs = keys.map(function(key) {
      return key + "=" + query[key];
    });
    return "?" + pairs.join("&");
  }
  module2.exports = {
    logger,
    showRequestResult
  };
});

// node_modules/faunadb/index.js
var require_faunadb = __commonJS((exports2, module2) => {
  var query = require_query();
  var util = require_util();
  module2.exports = util.mergeObjects({
    Client: require_Client(),
    Expr: require_Expr(),
    PageHelper: require_PageHelper(),
    RequestResult: require_RequestResult(),
    clientLogger: require_clientLogger(),
    errors: require_errors(),
    values: require_values(),
    query
  }, query);
});

// fauna/resources/functions/logout.js
__markAsModule(exports);
__export(exports, {
  default: () => logout_default
});

// node_modules/event-target-shim/dist/event-target-shim.mjs
var privateData = new WeakMap();
var wrappers = new WeakMap();
function pd(event) {
  const retv = privateData.get(event);
  console.assert(retv != null, "'this' is expected an Event object, but got", event);
  return retv;
}
function setCancelFlag(data) {
  if (data.passiveListener != null) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
    }
    return;
  }
  if (!data.event.cancelable) {
    return;
  }
  data.canceled = true;
  if (typeof data.event.preventDefault === "function") {
    data.event.preventDefault();
  }
}
function Event(eventTarget, event) {
  privateData.set(this, {
    eventTarget,
    event,
    eventPhase: 2,
    currentTarget: eventTarget,
    canceled: false,
    stopped: false,
    immediateStopped: false,
    passiveListener: null,
    timeStamp: event.timeStamp || Date.now()
  });
  Object.defineProperty(this, "isTrusted", {value: false, enumerable: true});
  const keys = Object.keys(event);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (!(key in this)) {
      Object.defineProperty(this, key, defineRedirectDescriptor(key));
    }
  }
}
Event.prototype = {
  get type() {
    return pd(this).event.type;
  },
  get target() {
    return pd(this).eventTarget;
  },
  get currentTarget() {
    return pd(this).currentTarget;
  },
  composedPath() {
    const currentTarget = pd(this).currentTarget;
    if (currentTarget == null) {
      return [];
    }
    return [currentTarget];
  },
  get NONE() {
    return 0;
  },
  get CAPTURING_PHASE() {
    return 1;
  },
  get AT_TARGET() {
    return 2;
  },
  get BUBBLING_PHASE() {
    return 3;
  },
  get eventPhase() {
    return pd(this).eventPhase;
  },
  stopPropagation() {
    const data = pd(this);
    data.stopped = true;
    if (typeof data.event.stopPropagation === "function") {
      data.event.stopPropagation();
    }
  },
  stopImmediatePropagation() {
    const data = pd(this);
    data.stopped = true;
    data.immediateStopped = true;
    if (typeof data.event.stopImmediatePropagation === "function") {
      data.event.stopImmediatePropagation();
    }
  },
  get bubbles() {
    return Boolean(pd(this).event.bubbles);
  },
  get cancelable() {
    return Boolean(pd(this).event.cancelable);
  },
  preventDefault() {
    setCancelFlag(pd(this));
  },
  get defaultPrevented() {
    return pd(this).canceled;
  },
  get composed() {
    return Boolean(pd(this).event.composed);
  },
  get timeStamp() {
    return pd(this).timeStamp;
  },
  get srcElement() {
    return pd(this).eventTarget;
  },
  get cancelBubble() {
    return pd(this).stopped;
  },
  set cancelBubble(value) {
    if (!value) {
      return;
    }
    const data = pd(this);
    data.stopped = true;
    if (typeof data.event.cancelBubble === "boolean") {
      data.event.cancelBubble = true;
    }
  },
  get returnValue() {
    return !pd(this).canceled;
  },
  set returnValue(value) {
    if (!value) {
      setCancelFlag(pd(this));
    }
  },
  initEvent() {
  }
};
Object.defineProperty(Event.prototype, "constructor", {
  value: Event,
  configurable: true,
  writable: true
});
if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
  Object.setPrototypeOf(Event.prototype, window.Event.prototype);
  wrappers.set(window.Event.prototype, Event);
}
function defineRedirectDescriptor(key) {
  return {
    get() {
      return pd(this).event[key];
    },
    set(value) {
      pd(this).event[key] = value;
    },
    configurable: true,
    enumerable: true
  };
}
function defineCallDescriptor(key) {
  return {
    value() {
      const event = pd(this).event;
      return event[key].apply(event, arguments);
    },
    configurable: true,
    enumerable: true
  };
}
function defineWrapper(BaseEvent, proto) {
  const keys = Object.keys(proto);
  if (keys.length === 0) {
    return BaseEvent;
  }
  function CustomEvent(eventTarget, event) {
    BaseEvent.call(this, eventTarget, event);
  }
  CustomEvent.prototype = Object.create(BaseEvent.prototype, {
    constructor: {value: CustomEvent, configurable: true, writable: true}
  });
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (!(key in BaseEvent.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);
      const isFunc = typeof descriptor.value === "function";
      Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
    }
  }
  return CustomEvent;
}
function getWrapper(proto) {
  if (proto == null || proto === Object.prototype) {
    return Event;
  }
  let wrapper = wrappers.get(proto);
  if (wrapper == null) {
    wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
    wrappers.set(proto, wrapper);
  }
  return wrapper;
}
function wrapEvent(eventTarget, event) {
  const Wrapper = getWrapper(Object.getPrototypeOf(event));
  return new Wrapper(eventTarget, event);
}
function isStopped(event) {
  return pd(event).immediateStopped;
}
function setEventPhase(event, eventPhase) {
  pd(event).eventPhase = eventPhase;
}
function setCurrentTarget(event, currentTarget) {
  pd(event).currentTarget = currentTarget;
}
function setPassiveListener(event, passiveListener) {
  pd(event).passiveListener = passiveListener;
}
var listenersMap = new WeakMap();
var CAPTURE = 1;
var BUBBLE = 2;
var ATTRIBUTE = 3;
function isObject(x) {
  return x !== null && typeof x === "object";
}
function getListeners(eventTarget) {
  const listeners = listenersMap.get(eventTarget);
  if (listeners == null) {
    throw new TypeError("'this' is expected an EventTarget object, but got another value.");
  }
  return listeners;
}
function defineEventAttributeDescriptor(eventName) {
  return {
    get() {
      const listeners = getListeners(this);
      let node = listeners.get(eventName);
      while (node != null) {
        if (node.listenerType === ATTRIBUTE) {
          return node.listener;
        }
        node = node.next;
      }
      return null;
    },
    set(listener) {
      if (typeof listener !== "function" && !isObject(listener)) {
        listener = null;
      }
      const listeners = getListeners(this);
      let prev = null;
      let node = listeners.get(eventName);
      while (node != null) {
        if (node.listenerType === ATTRIBUTE) {
          if (prev !== null) {
            prev.next = node.next;
          } else if (node.next !== null) {
            listeners.set(eventName, node.next);
          } else {
            listeners.delete(eventName);
          }
        } else {
          prev = node;
        }
        node = node.next;
      }
      if (listener !== null) {
        const newNode = {
          listener,
          listenerType: ATTRIBUTE,
          passive: false,
          once: false,
          next: null
        };
        if (prev === null) {
          listeners.set(eventName, newNode);
        } else {
          prev.next = newNode;
        }
      }
    },
    configurable: true,
    enumerable: true
  };
}
function defineEventAttribute(eventTargetPrototype, eventName) {
  Object.defineProperty(eventTargetPrototype, `on${eventName}`, defineEventAttributeDescriptor(eventName));
}
function defineCustomEventTarget(eventNames) {
  function CustomEventTarget() {
    EventTarget.call(this);
  }
  CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
    constructor: {
      value: CustomEventTarget,
      configurable: true,
      writable: true
    }
  });
  for (let i = 0; i < eventNames.length; ++i) {
    defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
  }
  return CustomEventTarget;
}
function EventTarget() {
  if (this instanceof EventTarget) {
    listenersMap.set(this, new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    return defineCustomEventTarget(arguments[0]);
  }
  if (arguments.length > 0) {
    const types = new Array(arguments.length);
    for (let i = 0; i < arguments.length; ++i) {
      types[i] = arguments[i];
    }
    return defineCustomEventTarget(types);
  }
  throw new TypeError("Cannot call a class as a function");
}
EventTarget.prototype = {
  addEventListener(eventName, listener, options) {
    if (listener == null) {
      return;
    }
    if (typeof listener !== "function" && !isObject(listener)) {
      throw new TypeError("'listener' should be a function or an object.");
    }
    const listeners = getListeners(this);
    const optionsIsObj = isObject(options);
    const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
    const listenerType = capture ? CAPTURE : BUBBLE;
    const newNode = {
      listener,
      listenerType,
      passive: optionsIsObj && Boolean(options.passive),
      once: optionsIsObj && Boolean(options.once),
      next: null
    };
    let node = listeners.get(eventName);
    if (node === void 0) {
      listeners.set(eventName, newNode);
      return;
    }
    let prev = null;
    while (node != null) {
      if (node.listener === listener && node.listenerType === listenerType) {
        return;
      }
      prev = node;
      node = node.next;
    }
    prev.next = newNode;
  },
  removeEventListener(eventName, listener, options) {
    if (listener == null) {
      return;
    }
    const listeners = getListeners(this);
    const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
    const listenerType = capture ? CAPTURE : BUBBLE;
    let prev = null;
    let node = listeners.get(eventName);
    while (node != null) {
      if (node.listener === listener && node.listenerType === listenerType) {
        if (prev !== null) {
          prev.next = node.next;
        } else if (node.next !== null) {
          listeners.set(eventName, node.next);
        } else {
          listeners.delete(eventName);
        }
        return;
      }
      prev = node;
      node = node.next;
    }
  },
  dispatchEvent(event) {
    if (event == null || typeof event.type !== "string") {
      throw new TypeError('"event.type" should be a string.');
    }
    const listeners = getListeners(this);
    const eventName = event.type;
    let node = listeners.get(eventName);
    if (node == null) {
      return true;
    }
    const wrappedEvent = wrapEvent(this, event);
    let prev = null;
    while (node != null) {
      if (node.once) {
        if (prev !== null) {
          prev.next = node.next;
        } else if (node.next !== null) {
          listeners.set(eventName, node.next);
        } else {
          listeners.delete(eventName);
        }
      } else {
        prev = node;
      }
      setPassiveListener(wrappedEvent, node.passive ? node.listener : null);
      if (typeof node.listener === "function") {
        try {
          node.listener.call(this, wrappedEvent);
        } catch (err) {
          if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(err);
          }
        }
      } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
        node.listener.handleEvent(wrappedEvent);
      }
      if (isStopped(wrappedEvent)) {
        break;
      }
      node = node.next;
    }
    setPassiveListener(wrappedEvent, null);
    setEventPhase(wrappedEvent, 0);
    setCurrentTarget(wrappedEvent, null);
    return !wrappedEvent.defaultPrevented;
  }
};
Object.defineProperty(EventTarget.prototype, "constructor", {
  value: EventTarget,
  configurable: true,
  writable: true
});
if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
  Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
}

// node_modules/abort-controller/dist/abort-controller.mjs
var AbortSignal = class extends EventTarget {
  constructor() {
    super();
    throw new TypeError("AbortSignal cannot be constructed directly");
  }
  get aborted() {
    const aborted = abortedFlags.get(this);
    if (typeof aborted !== "boolean") {
      throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
    }
    return aborted;
  }
};
defineEventAttribute(AbortSignal.prototype, "abort");
function createAbortSignal() {
  const signal = Object.create(AbortSignal.prototype);
  EventTarget.call(signal);
  abortedFlags.set(signal, false);
  return signal;
}
function abortSignal(signal) {
  if (abortedFlags.get(signal) !== false) {
    return;
  }
  abortedFlags.set(signal, true);
  signal.dispatchEvent({type: "abort"});
}
var abortedFlags = new WeakMap();
Object.defineProperties(AbortSignal.prototype, {
  aborted: {enumerable: true}
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
  Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
    configurable: true,
    value: "AbortSignal"
  });
}
var AbortController2 = class {
  constructor() {
    signals.set(this, createAbortSignal());
  }
  get signal() {
    return getSignal(this);
  }
  abort() {
    abortSignal(getSignal(this));
  }
};
var signals = new WeakMap();
function getSignal(controller) {
  const signal = signals.get(controller);
  if (signal == null) {
    throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
  }
  return signal;
}
Object.defineProperties(AbortController2.prototype, {
  signal: {enumerable: true},
  abort: {enumerable: true}
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
  Object.defineProperty(AbortController2.prototype, Symbol.toStringTag, {
    configurable: true,
    value: "AbortController"
  });
}

// fauna/resources/functions/logout.js
var import_faunadb4 = __toModule(require_faunadb());

// fauna/auth/logout.ts
var import_faunadb3 = __toModule(require_faunadb());

// fauna/auth/tokens.ts
var import_faunadb2 = __toModule(require_faunadb());

// fauna/auth/anomalies.ts
var import_faunadb = __toModule(require_faunadb());
var q = import_faunadb.default.query;
var {Do, Create, Collection, CurrentToken, CurrentIdentity} = q;
var REFRESH_TOKEN_REUSE_ERROR = {
  code: "REFRESH_TOKEN_REUSE",
  message: "The refresh token was used outside of the grace period which indicates that it was leaked"
};
var REFRESH_TOKEN_EXPIRED = {
  code: "REFRESH_TOKEN_EXPIRED",
  message: "The refresh token was expired"
};
var REFRESH_TOKEN_USED_AFTER_LOGOUT = {
  code: "REFRESH_TOKEN_USED_AFTER_LOGOUT",
  message: "The refresh token was used after logging out"
};
function LogAnomaly(error, action) {
  return Do(Create(Collection("anomalies"), {
    data: {
      error,
      token: CurrentToken(),
      user: CurrentIdentity(),
      action
    }
  }), error);
}

// fauna/auth/tokens.ts
var q2 = import_faunadb2.default.query;
var {
  Let,
  Var,
  Create: Create2,
  Select,
  Tokens,
  Now,
  TimeAdd,
  Equals,
  Get,
  CurrentToken: CurrentToken2,
  HasCurrentToken,
  Exists,
  Update,
  Match,
  Index,
  NewId,
  Do: Do2,
  Delete,
  And,
  GT,
  CurrentIdentity: CurrentIdentity2,
  Not
} = q2;
function GetSessionId() {
  return Select(["data", "sessionId"], Get(CurrentToken2()));
}
function VerifyRefreshToken(fqlStatementOnSuccessfulVerification, action) {
  return (0, import_faunadb2.If)(And(IsTokenUsed(), Not(IsWithinGracePeriod())), LogAnomaly(REFRESH_TOKEN_REUSE_ERROR, action), (0, import_faunadb2.If)(IsTokenStillValid(), (0, import_faunadb2.If)(Not(IsTokenLoggedOut()), fqlStatementOnSuccessfulVerification, LogAnomaly(REFRESH_TOKEN_USED_AFTER_LOGOUT, action)), LogAnomaly(REFRESH_TOKEN_EXPIRED, action)));
}
function IsTokenLoggedOut() {
  return Select(["data", "loggedOut"], Get(CurrentToken2()));
}
function IsTokenUsed() {
  return Select(["data", "used"], Get(CurrentToken2()));
}
function IsTokenStillValid() {
  return GT(Select(["data", "validUntil"], Get(CurrentToken2())), Now());
}
function IsWithinGracePeriod() {
  return GT(Select(["data", "gracePeriodUntil"], Get(CurrentToken2())), Now());
}
function InvalidateAccessToken(refreshTokenRef) {
  return (0, import_faunadb2.If)(Exists(Match(Index("access_token_by_refresh_token"), refreshTokenRef)), Delete(Select(["ref"], Get(Match(Index("access_token_by_refresh_token"), refreshTokenRef)))), false);
}
function LogoutRefreshToken(refreshTokenRef) {
  return Update(refreshTokenRef, {data: {loggedOut: true}});
}
function LogoutAccessAndRefreshToken(refreshTokenRef) {
  return Do2(InvalidateAccessToken(refreshTokenRef), LogoutRefreshToken(refreshTokenRef));
}

// fauna/auth/logout.ts
var q3 = import_faunadb3.default.query;
var {Let: Let2, Var: Var2, Lambda, Match: Match2, CurrentIdentity: CurrentIdentity3, Index: Index2, If: If2, Paginate} = q3;
function LogoutAll() {
  return Let2({
    refreshTokens: Paginate(Match2(Index2("tokens_by_instance_type_and_loggedout"), CurrentIdentity3(), "refresh", false), {size: 1e5})
  }, q3.Map(Var2("refreshTokens"), Lambda(["token"], LogoutAccessAndRefreshToken(Var2("token")))));
}
function LogoutOne() {
  return Let2({
    refreshTokens: Paginate(Match2(Index2("tokens_by_instance_sessionid_type_and_loggedout"), CurrentIdentity3(), GetSessionId(), "refresh", false), {size: 1e5})
  }, q3.Map(Var2("refreshTokens"), Lambda(["token"], LogoutAccessAndRefreshToken(Var2("token")))));
}
function Logout(all) {
  return VerifyRefreshToken(If2(all, LogoutAll(), LogoutOne()), "logout");
}

// fauna/resources/functions/logout.js
var logout_default = (0, import_faunadb4.CreateFunction)({
  name: "logout",
  body: (0, import_faunadb4.Query)((0, import_faunadb4.Lambda)(["all"], Logout((0, import_faunadb4.Var)("all")))),
  role: "server"
});

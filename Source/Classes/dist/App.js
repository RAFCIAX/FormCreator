// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../Enums/FieldType.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldType = void 0;
var FieldType;

(function (FieldType) {
  FieldType["Textbox"] = "text";
  FieldType["Textlargebox"] = "textarea";
  FieldType["Date"] = "date";
  FieldType["Email"] = "email";
  FieldType["Selectbox"] = "radio";
  FieldType["Checkbox"] = "checkbox";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
},{}],"FieldLabel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldLabel = void 0;

var FieldLabel =
/** @class */
function () {
  function FieldLabel(container, tagStyle, content) {
    var element = document.createElement("LABEL");
    element.className = tagStyle;
    element.innerHTML = content;
    container.appendChild(element);
  }

  ;
  return FieldLabel;
}();

exports.FieldLabel = FieldLabel;
},{}],"TextAreaField.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAreaField = void 0;

var FieldType_1 = require("./../Enums/FieldType");

var FieldLabel_1 = require("./FieldLabel");

var TextAreaField =
/** @class */
function () {
  function TextAreaField(name, label, value) {
    this.Type = FieldType_1.FieldType.Textlargebox;
    this.Name = name;
    this.Label = label;
    this.Value = value;
  }

  TextAreaField.prototype.render = function (container) {
    var _this = this;

    new FieldLabel_1.FieldLabel(container, 'question-label', this.Label);
    var element = document.createElement('textarea');
    element.value = this.Value;
    container.appendChild(element);
    this.Input = element;
    element.addEventListener('keyup', function (ev) {
      _this.Value = ev.target.value;
    });
    element.addEventListener('paste', function (ev) {
      _this.Value = ev.target.value;
    });
    element.addEventListener('cut', function (ev) {
      _this.Value = ev.target.value;
    });
  };

  TextAreaField.prototype.setValue = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation(); //this.Value = event.target.value;
  };

  TextAreaField.prototype.getValue = function () {
    return this.Value;
  };

  return TextAreaField;
}();

exports.TextAreaField = TextAreaField;
},{"./../Enums/FieldType":"../Enums/FieldType.ts","./FieldLabel":"FieldLabel.ts"}],"SelectField.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectField = void 0;

var FieldType_1 = require("./../Enums/FieldType");

var FieldLabel_1 = require("./FieldLabel");

var SelectField =
/** @class */
function () {
  function SelectField(name, label, options, value) {
    this.Type = FieldType_1.FieldType.Selectbox;
    this.Name = name;
    this.Label = label;
    this.Options = options;
    this.Value = value;
  }

  SelectField.prototype.render = function (container) {
    var _this = this;

    new FieldLabel_1.FieldLabel(container, 'question-label', this.Label);
    var element = document.createElement('select');
    container.appendChild(element);
    this.Options.forEach(function (text) {
      var optionElement = document.createElement('option');
      optionElement.value = text;
      optionElement.innerHTML = text;
      element.appendChild(optionElement);
    });
    element.value = this.Value;
    this.Input = element;
    element.addEventListener('change', function (ev) {
      _this.Value = ev.target.value;
    });
  };

  SelectField.prototype.setValue = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.Value = event.target.value;
  };

  SelectField.prototype.getValue = function () {
    return this.Value;
  };

  return SelectField;
}();

exports.SelectField = SelectField;
},{"./../Enums/FieldType":"../Enums/FieldType.ts","./FieldLabel":"FieldLabel.ts"}],"EmailField.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailField = void 0;

var FieldType_1 = require("./../Enums/FieldType");

var FieldLabel_1 = require("./FieldLabel");

var EmailField =
/** @class */
function () {
  function EmailField(name, label, value) {
    this.Type = FieldType_1.FieldType.Email;
    this.Name = name;
    this.Label = label;
    this.Value = value;
  }

  EmailField.prototype.render = function (container) {
    var _this = this;

    new FieldLabel_1.FieldLabel(container, 'question-label', this.Label);
    var element = document.createElement('input');
    element.setAttribute('type', this.Type);
    container.appendChild(element);
    element.value = this.Value;
    this.Input = element;
    element.addEventListener('keyup', function (ev) {
      _this.Value = ev.target.value;
    });
    element.addEventListener('paste', function (ev) {
      _this.Value = ev.target.value;
    });
    element.addEventListener('cut', function (ev) {
      _this.Value = ev.target.value;
    });
  };

  EmailField.prototype.setValue = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.Value = event.target.value;
  };

  EmailField.prototype.getValue = function () {
    return this.Value;
  };

  return EmailField;
}();

exports.EmailField = EmailField;
},{"./../Enums/FieldType":"../Enums/FieldType.ts","./FieldLabel":"FieldLabel.ts"}],"DateField.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateField = void 0;

var FieldType_1 = require("./../Enums/FieldType");

var FieldLabel_1 = require("./FieldLabel");

var DateField =
/** @class */
function () {
  function DateField(name, label, value) {
    this.Type = FieldType_1.FieldType.Date;
    this.Name = name;
    this.Label = label;
    this.Value = value;
  }

  DateField.prototype.render = function (container) {
    var _this = this;

    new FieldLabel_1.FieldLabel(container, 'question-label', this.Label);
    var element = document.createElement('input');
    element.setAttribute('type', this.Type);
    container.appendChild(element);
    element.value = this.Value;
    this.Input = element;
    element.addEventListener('change', function (ev) {
      _this.Value = ev.target.value;
    });
  };

  DateField.prototype.setValue = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.Value = event.target.value;
  };

  DateField.prototype.getValue = function () {
    return this.Value;
  };

  return DateField;
}();

exports.DateField = DateField;
},{"./../Enums/FieldType":"../Enums/FieldType.ts","./FieldLabel":"FieldLabel.ts"}],"CheckboxField.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxField = void 0;

var FieldType_1 = require("./../Enums/FieldType");

var FieldLabel_1 = require("./FieldLabel");

var CheckboxField =
/** @class */
function () {
  function CheckboxField(name, label, value) {
    this.Type = FieldType_1.FieldType.Checkbox;
    this.Name = name;
    this.Label = label;
    this.Value = value;
  }

  CheckboxField.prototype.render = function (container) {
    var _this = this;

    new FieldLabel_1.FieldLabel(container, 'question-label', this.Label);
    var element = document.createElement('input');
    element.setAttribute('type', this.Type);
    container.appendChild(element);
    this.Input = element;

    if (this.Value === true) {
      element.checked = true;
    }

    ;
    element.addEventListener('change', function () {
      if (element.checked == true) {
        _this.Value = true;
      } else {
        _this.Value = false;
      }
    });
  };

  CheckboxField.prototype.setValue = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.Value = true;
  };

  CheckboxField.prototype.getValue = function () {
    return this.Value;
  };

  return CheckboxField;
}();

exports.CheckboxField = CheckboxField;
},{"./../Enums/FieldType":"../Enums/FieldType.ts","./FieldLabel":"FieldLabel.ts"}],"InputField.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputField = void 0;

var FieldLabel_1 = require("./FieldLabel");

var FieldType_1 = require("./../Enums/FieldType");

var InputField =
/** @class */
function () {
  function InputField(name, label, value) {
    this.Type = FieldType_1.FieldType.Textbox;
    this.Name = name;
    this.Label = label;
    this.Value = value;
  }

  InputField.prototype.render = function (container) {
    var _this = this;

    new FieldLabel_1.FieldLabel(container, 'question-label', this.Label);
    var element = document.createElement('input');
    element.setAttribute('type', this.Type);
    container.appendChild(element);
    element.value = this.Value;
    this.Input = element;
    element.addEventListener('keyup', function (ev) {
      _this.Value = ev.target.value;
    });
    element.addEventListener('paste', function (ev) {
      _this.Value = ev.target.value;
    });
    element.addEventListener('cut', function (ev) {
      _this.Value = ev.target.value;
    });
  };

  InputField.prototype.setValue = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.Value = event.target.value;
  };

  InputField.prototype.getValue = function () {
    return this.Value;
  };

  return InputField;
}();

exports.InputField = InputField;
},{"./FieldLabel":"FieldLabel.ts","./../Enums/FieldType":"../Enums/FieldType.ts"}],"LocStorage.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocStorage = void 0;

var LocStorage =
/** @class */
function () {
  function LocStorage() {
    this.DataStorage = window.localStorage;
  }

  LocStorage.prototype.saveDocument = function (documentObject) {
    var saveDocument = this.DataStorage.setItem("document-" + Date.now(), JSON.stringify(documentObject));
    return saveDocument;
  };

  LocStorage.prototype.saveEditedDocument = function (documentObject, key) {
    var savedDocument = this.DataStorage.setItem(key, JSON.stringify(documentObject));
    return savedDocument;
  };

  LocStorage.prototype.loadDocument = function (key) {
    var loadedDocument = this.DataStorage.getItem(key);
    return loadedDocument;
  };

  LocStorage.prototype.getDocuments = function () {
    var documents = __assign({}, this.DataStorage);

    var documentsArray = [];

    for (var key in documents) {
      if (!documents.hasOwnProperty(key)) continue;
      documentsArray.push(key);
    }

    return documentsArray;
  };

  LocStorage.prototype.removeDocument = function (key) {
    this.DataStorage.removeItem(key);
  };

  return LocStorage;
}();

exports.LocStorage = LocStorage;
},{}],"Router.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var Router =
/** @class */
function () {
  function Router() {}

  Router.getParam = function () {
    var query = window.location.search.substr(1);
    var urlParams = new URLSearchParams(query);
    var id = urlParams.get('id');
    return id;
  };

  return Router;
}();

exports.Router = Router;
},{}],"Form.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var LocStorage_1 = require("./LocStorage");

var Router_1 = require("./Router");

var Form =
/** @class */
function () {
  function Form(fields) {
    this.fieldsArray = fields;
  }

  Form.prototype.render = function (pole) {
    var _this = this;

    var formDocument = document.createElement("form");
    formDocument.classList.add("form");
    var saveButton = document.createElement('button');
    saveButton.innerHTML = "Save";
    var backwardButton = document.createElement('button');
    backwardButton.innerHTML = "Back";
    this.fieldsArray.forEach(function (field) {
      field.render(formDocument);
    });
    formDocument.appendChild(saveButton);
    saveButton.addEventListener('click', function (ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();

      if (Router_1.Router.getParam() != null) {
        _this.saveEdit(_this, Router_1.Router.getParam());
      } else {
        _this.save(_this);
      }
    });
    formDocument.appendChild(backwardButton);
    backwardButton.addEventListener('click', this.back);
    pole.appendChild(formDocument);
  };

  Form.prototype.getValue = function () {
    return this.fieldsArray.map(function (field) {
      return {
        type: field.Type,
        label: field.Label,
        name: field.Name,
        value: field.Value
      };
    });
  };

  Form.prototype.saveEdit = function (data, key) {
    var storage = new LocStorage_1.LocStorage();
    storage.saveEditedDocument(data, key);
    alert("Document saved");
    window.location.href = "index.html";
  };

  Form.prototype.save = function (data) {
    var storage = new LocStorage_1.LocStorage();
    storage.saveDocument(data);
    alert("Document successfully saved!");
    window.location.href = "index.html";
  };

  Form.prototype.back = function () {
    window.location.href = "index.html";
  };

  return Form;
}();

exports.Form = Form;
},{"./LocStorage":"LocStorage.ts","./Router":"Router.ts"}],"App.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var TextAreaField_1 = require("./TextAreaField");

var SelectField_1 = require("./SelectField");

var EmailField_1 = require("./EmailField");

var DateField_1 = require("./DateField");

var CheckboxField_1 = require("./CheckboxField");

var InputField_1 = require("./InputField");

var Form_1 = require("./Form");

var App =
/** @class */
function () {
  function App() {
    var fields = [];
    fields.push(new InputField_1.InputField('input-test', 'Czy podoba Ci się nauka na WSEI?', 'test'));
    fields.push(new CheckboxField_1.CheckboxField('checkbox-test1', 'Czy preferujesz e-learning?', 'test'));
    fields.push(new CheckboxField_1.CheckboxField('checkbox-test2', 'Checkbox2', 'test'));
    fields.push(new CheckboxField_1.CheckboxField('checkbox-test3', 'Checkbox3', 'test'));
    fields.push(new DateField_1.DateField('date-test', 'Data', ''));
    fields.push(new EmailField_1.EmailField('email-test', 'E-mail', 'test'));
    fields.push(new SelectField_1.SelectField('select-test', 'Wybrany kierunek studiów:', ['Informatyka', 'Ekonometria', 'Psychologia'], ''));
    fields.push(new TextAreaField_1.TextAreaField('textarea-test', 'Uwagi', 'test'));
    var formContainer = document.createElement('div');
    document.body.appendChild(formContainer);
    this.DocumentContainer = formContainer;
    var testForm = new Form_1.Form(fields);
    this.TestForm = testForm;
  }

  App.prototype.renderDocument = function (form) {
    form.render(this.DocumentContainer);
  };

  return App;
}();

exports.App = App;
},{"./TextAreaField":"TextAreaField.ts","./SelectField":"SelectField.ts","./EmailField":"EmailField.ts","./DateField":"DateField.ts","./CheckboxField":"CheckboxField.ts","./InputField":"InputField.ts","./Form":"Form.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57817" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","App.ts"], null)
//# sourceMappingURL=/App.js.map
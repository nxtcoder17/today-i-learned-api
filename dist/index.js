/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ "babel-polyfill");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src */ "./src/index.js");



/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnApp": () => /* binding */ getAnApp,
/* harmony export */   "finishApp": () => /* binding */ finishApp
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_pino_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-pino-logger */ "express-pino-logger");
/* harmony import */ var express_pino_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_pino_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fastest_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fastest-validator */ "fastest-validator");
/* harmony import */ var fastest_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fastest_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! express-fileupload */ "express-fileupload");
/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(express_fileupload__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! http-status-codes */ "http-status-codes");
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var http_errors_lite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! http-errors-lite */ "http-errors-lite");
/* harmony import */ var http_errors_lite__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(http_errors_lite__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @commons/logger */ "./src/commons/logger.js");










var logger = (0,_commons_logger__WEBPACK_IMPORTED_MODULE_9__.getLogger)('app.js');
var getAnApp = function getAnApp() {
  var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
  app.use(cors__WEBPACK_IMPORTED_MODULE_3___default()({
    origin: "http://localhost:9999",
    credentials: true
  }));
  app.use(helmet__WEBPACK_IMPORTED_MODULE_2___default()());
  app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_4___default()());
  app.use(express_fileupload__WEBPACK_IMPORTED_MODULE_6___default()({
    createParentPath: true
  }));
  if (true) app.use(express_pino_logger__WEBPACK_IMPORTED_MODULE_1___default()({
    logger: logger,
    serializers: {
      req: function req(_req) {
        return {
          method: _req.method,
          url: _req.url,
          body: _req.body
        };
      },
      res: function res(_res) {
        return {
          statusCode: _res.statusCode,
          body: _res.raw.body
        };
      }
    }
  }));
  app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
  return app;
};

var notFoundHandler = function notFoundHandler(req, res, next) {
  next(http_errors_lite__WEBPACK_IMPORTED_MODULE_8___default()(http_status_codes__WEBPACK_IMPORTED_MODULE_7__.StatusCodes.NOT_FOUND, 'Not Found'));
};

var isGoodError = function isGoodError(error) {
  return error.statusCode <= 404;
};

var errorHandler = function errorHandler(error, req, res, _next) {
  if (true) {
    logger.error("".concat(error.statusCode, " \uD83D\uDCA5 ").concat(error.message));
    logger.error(error.stack);
  }

  if (['development', 'test'].some(function (x) {
    return x === "development";
  })) {
    res.status(error.statusCode || 500);
    res.send({
      error: error.message
    });
  } else {
    res.status(isGoodError(error) ? error.statusCode : 500);
    res.send({
      error: isGoodError(error) ? error.message : 'SOMETHING WENT WRONG'
    });
  }
};

var finishApp = function finishApp(expressApp) {
  expressApp.use(notFoundHandler);
  expressApp.use(errorHandler);
};

/***/ }),

/***/ "./src/commons/http-handler.js":
/*!*************************************!*\
  !*** ./src/commons/http-handler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "httpHandler": () => /* binding */ httpHandler
/* harmony export */ });
var httpHandler = function httpHandler(asyncFn) {
  return function (req, res, next) {
    asyncFn(req, res, next)["catch"](function (err) {
      next(err);
    });
  };
};

/***/ }),

/***/ "./src/commons/logger.js":
/*!*******************************!*\
  !*** ./src/commons/logger.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLogger": () => /* binding */ getLogger
/* harmony export */ });
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pino */ "pino");
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);

var getLogger = function getLogger(source) {
  var logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({
    level: 'debug',
    prettyPrint: {
      colorize: true,
      // levelFirst: true,
      translateTime: 'SYS:HH:MM:ss dd-mm-yyyy',
      ignore: 'pid,hostname'
    }
  });
  return logger.child({
    name: source
  });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status-codes */ "http-status-codes");
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app */ "./src/app.js");
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @commons/logger */ "./src/commons/logger.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules */ "./src/modules/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var logger = (0,_commons_logger__WEBPACK_IMPORTED_MODULE_2__.getLogger)('src/index.js');
var app = (0,_app__WEBPACK_IMPORTED_MODULE_1__.getAnApp)();
app.get('/healthy', function (req, res) {
  res.send(http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.OK);
});

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0,_modules__WEBPACK_IMPORTED_MODULE_3__.loadModules)(app);

        case 2:
          (0,_app__WEBPACK_IMPORTED_MODULE_1__.finishApp)(app);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return app.listen(Number("3000"));

        case 3:
          logger.info("API Server started @ ".concat("3000"));
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          logger.error(_context2.t0);
          process.exit(1);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[0, 6]]);
}))();

/***/ }),

/***/ "./src/modules/db/index.js":
/*!*********************************!*\
  !*** ./src/modules/db/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @commons/logger */ "./src/commons/logger.js");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var logger = (0,_commons_logger__WEBPACK_IMPORTED_MODULE_0__.getLogger)('db/index');

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return mongoose__WEBPACK_IMPORTED_MODULE_1___default().connect("mongodb://localhost/giiki", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          });

        case 3:
          logger.info("Successfully connected to Mongo running @ ".concat("mongodb://localhost/giiki"));
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          logger.error("Failed connecting to mongo runnning @ ".concat("mongodb://localhost/giiki"));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))();

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadModules": () => /* binding */ loadModules
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db */ "./src/modules/db/index.js");
/* harmony import */ var _posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posts */ "./src/modules/posts/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var modules = [_posts__WEBPACK_IMPORTED_MODULE_1__.PostsModule];
function loadModules(_x) {
  return _loadModules.apply(this, arguments);
}

function _loadModules() {
  _loadModules = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(expressApp) {
    var p;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            p = modules.map(function (_ref) {
              var init = _ref.init;
              return init(expressApp);
            });
            return _context.abrupt("return", Promise.all(p));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadModules.apply(this, arguments);
}

/***/ }),

/***/ "./src/modules/posts/index.js":
/*!************************************!*\
  !*** ./src/modules/posts/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostsModule": () => /* binding */ PostsModule
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./src/modules/posts/router/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();
router.use('/til', _router__WEBPACK_IMPORTED_MODULE_1__.tilRouter);
var PostsModule = {
  init: function () {
    var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(app) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", app.use(router));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init(_x) {
      return _init.apply(this, arguments);
    }

    return init;
  }()
};

/***/ }),

/***/ "./src/modules/posts/models/blog-post-model.js":
/*!*****************************************************!*\
  !*** ./src/modules/posts/models/blog-post-model.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

var schema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  author: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('post', schema));

/***/ }),

/***/ "./src/modules/posts/models/index.js":
/*!*******************************************!*\
  !*** ./src/modules/posts/models/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostsDBModule": () => /* binding */ PostsDBModule
/* harmony export */ });
/* harmony import */ var _blog_post_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blog-post-model */ "./src/modules/posts/models/blog-post-model.js");

var PostsDBModule = {
  posts: _blog_post_model__WEBPACK_IMPORTED_MODULE_0__.default
};

/***/ }),

/***/ "./src/modules/posts/router/index.js":
/*!*******************************************!*\
  !*** ./src/modules/posts/router/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tilRouter": () => /* binding */ tilRouter
/* harmony export */ });
/* harmony import */ var _commons_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @commons/http-handler */ "./src/commons/http-handler.js");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http_errors_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-errors-lite */ "http-errors-lite");
/* harmony import */ var http_errors_lite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_errors_lite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http-status-codes */ "http-status-codes");
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service */ "./src/modules/posts/service/index.js");
/* harmony import */ var _service_parsing_file__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/parsing-file */ "./src/modules/posts/service/parsing-file.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var tilRouter = (0,express__WEBPACK_IMPORTED_MODULE_1__.Router)();
var FILE_KEY = 'blog-post';
tilRouter.post('/upload', (0,_commons_http_handler__WEBPACK_IMPORTED_MODULE_0__.httpHandler)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var file, blogJson;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = req.files[FILE_KEY];

            if (file) {
              _context.next = 3;
              break;
            }

            throw http_errors_lite__WEBPACK_IMPORTED_MODULE_2___default()(http_status_codes__WEBPACK_IMPORTED_MODULE_3__.StatusCodes.BAD_REQUEST, 'No File Uploaded with correct field');

          case 3:
            res.send('File Uploaded');
            _context.next = 6;
            return (0,_service_parsing_file__WEBPACK_IMPORTED_MODULE_5__.markdownParser)(file.data);

          case 6:
            blogJson = _context.sent;
            _context.next = 9;
            return _service__WEBPACK_IMPORTED_MODULE_4__.postsService.addRecord(blogJson);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
tilRouter.get('/', (0,_commons_http_handler__WEBPACK_IMPORTED_MODULE_0__.httpHandler)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var query, results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = req.query.query;
            _context2.next = 3;
            return _service__WEBPACK_IMPORTED_MODULE_4__.postsService.fetchRecords(query);

          case 3:
            results = _context2.sent;
            res.send(results);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));
tilRouter.get('/tags/:tag', (0,_commons_http_handler__WEBPACK_IMPORTED_MODULE_0__.httpHandler)( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tag, results;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tag = req.params.tag;
            _context3.next = 3;
            return _service__WEBPACK_IMPORTED_MODULE_4__.postsService.fetchByTag(tag);

          case 3:
            results = _context3.sent;
            res.send(results);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()));
tilRouter.get('/id/:record_id', (0,_commons_http_handler__WEBPACK_IMPORTED_MODULE_0__.httpHandler)( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var recordId, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            recordId = req.params.record_id;
            _context4.next = 3;
            return _service__WEBPACK_IMPORTED_MODULE_4__.postsService.getRecord(recordId);

          case 3:
            result = _context4.sent;
            res.send(result);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()));
tilRouter.put('/id/:record_id', (0,_commons_http_handler__WEBPACK_IMPORTED_MODULE_0__.httpHandler)( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var recordId, file, blogJson, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            recordId = req.params.record_id;
            file = req.files[FILE_KEY];
            _context5.next = 4;
            return (0,_service_parsing_file__WEBPACK_IMPORTED_MODULE_5__.markdownParser)(file.data);

          case 4:
            blogJson = _context5.sent;
            _context5.next = 7;
            return _service__WEBPACK_IMPORTED_MODULE_4__.postsService.updateRecord({
              id: recordId,
              data: blogJson
            });

          case 7:
            result = _context5.sent;
            res.send(result);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()));
tilRouter["delete"]('/id/:record_id', (0,_commons_http_handler__WEBPACK_IMPORTED_MODULE_0__.httpHandler)( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var recordId;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            recordId = req.params.record_id;
            _context6.next = 3;
            return _service__WEBPACK_IMPORTED_MODULE_4__.postsService.deleteRecord(recordId);

          case 3:
            res.send(http_status_codes__WEBPACK_IMPORTED_MODULE_3__.StatusCodes.OK);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()));

/***/ }),

/***/ "./src/modules/posts/service/index.js":
/*!********************************************!*\
  !*** ./src/modules/posts/service/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postsService": () => /* binding */ postsService
/* harmony export */ });
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assert */ "assert");
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models */ "./src/modules/posts/models/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var service = {};

service.addRecord = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var r;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!('date' in data)) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return service.fetchRecords({
              date: data.date
            });

          case 3:
            r = _context.sent;

            if (!(r.length > 0)) {
              _context.next = 7;
              break;
            }

            assert__WEBPACK_IMPORTED_MODULE_0___default()(r.length === 0);
            return _context.abrupt("return", service.updateRecord({
              id: r._id,
              data: data
            }));

          case 7:
            return _context.abrupt("return", _models__WEBPACK_IMPORTED_MODULE_1__.PostsDBModule.posts.create(data));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

service.fetchRecords = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var query,
      _args2 = arguments;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          return _context2.abrupt("return", _models__WEBPACK_IMPORTED_MODULE_1__.PostsDBModule.posts.find(query));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}));

service.fetchByTag = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(tag) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _models__WEBPACK_IMPORTED_MODULE_1__.PostsDBModule.posts.find({
              tags: tag
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();

service.getRecord = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _models__WEBPACK_IMPORTED_MODULE_1__.PostsDBModule.posts.findById(id));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();

service.updateRecord = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref5) {
    var id, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = _ref5.id, data = _ref5.data;
            return _context5.abrupt("return", _models__WEBPACK_IMPORTED_MODULE_1__.PostsDBModule.posts.findOneAndUpdate({
              _id: id
            }, data, {
              "new": true
            }));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x4) {
    return _ref6.apply(this, arguments);
  };
}();

service.deleteRecord = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _models__WEBPACK_IMPORTED_MODULE_1__.PostsDBModule.posts.deleteOne({
              _id: id
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x5) {
    return _ref7.apply(this, arguments);
  };
}();

var postsService = service;

/***/ }),

/***/ "./src/modules/posts/service/parsing-file.js":
/*!***************************************************!*\
  !*** ./src/modules/posts/service/parsing-file.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "markdownParser": () => /* binding */ markdownParser
/* harmony export */ });
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @commons/logger */ "./src/commons/logger.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-restricted-syntax */

var logger = (0,_commons_logger__WEBPACK_IMPORTED_MODULE_0__.getLogger)('parsing-file.js');
function markdownParser(_x) {
  return _markdownParser.apply(this, arguments);
}

function _markdownParser() {
  _markdownParser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(buffer) {
    var content, lines, indexStart, indexEnd, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = buffer.toString();
            lines = content.split('\n');
            data = lines.reduce(function (acc, curr, i) {
              var temp = {};
              var blog = '';

              if (/^---$/.test(curr)) {
                if (indexStart == null) {
                  indexStart = i;
                } else if (!indexEnd) {
                  indexEnd = i;
                }
              }

              if (indexStart != null && i > indexStart && (!indexEnd || i < indexEnd)) {
                var _lines$i$split = lines[i].split(':', 2),
                    _lines$i$split2 = _slicedToArray(_lines$i$split, 2),
                    key = _lines$i$split2[0],
                    value = _lines$i$split2[1];

                temp[key] = value.trim();
              }

              if (indexEnd && i > indexEnd) {
                blog = lines[i];
              }

              return _objectSpread(_objectSpread(_objectSpread({}, acc), temp), {}, {
                content: [].concat(_toConsumableArray(acc.content), [blog])
              });
            }, {
              content: []
            });
            data.tags = 'tags' in data ? data.tags.split(',') : [];
            data.content = 'content' in data ? data.content.filter(function (x) {
              return x;
            }).join('\n') : '';
            logger.info('Parsed Document: ', data);
            return _context.abrupt("return", data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _markdownParser.apply(this, arguments);
}

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");;

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("babel-polyfill");;

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("express-fileupload");;

/***/ }),

/***/ "express-pino-logger":
/*!**************************************!*\
  !*** external "express-pino-logger" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("express-pino-logger");;

/***/ }),

/***/ "fastest-validator":
/*!************************************!*\
  !*** external "fastest-validator" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("fastest-validator");;

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");;

/***/ }),

/***/ "http-errors-lite":
/*!***********************************!*\
  !*** external "http-errors-lite" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("http-errors-lite");;

/***/ }),

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("http-status-codes");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("pino");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map
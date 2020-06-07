/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@actions/core/lib/command.js":
/*!***************************************************!*\
  !*** ./node_modules/@actions/core/lib/command.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst os = __importStar(__webpack_require__(/*! os */ \"os\"));\n/**\n * Commands\n *\n * Command Format:\n *   ::name key=value,key=value::message\n *\n * Examples:\n *   ::warning::This is the message\n *   ::set-env name=MY_VAR::some value\n */\nfunction issueCommand(command, properties, message) {\n    const cmd = new Command(command, properties, message);\n    process.stdout.write(cmd.toString() + os.EOL);\n}\nexports.issueCommand = issueCommand;\nfunction issue(name, message = '') {\n    issueCommand(name, {}, message);\n}\nexports.issue = issue;\nconst CMD_STRING = '::';\nclass Command {\n    constructor(command, properties, message) {\n        if (!command) {\n            command = 'missing.command';\n        }\n        this.command = command;\n        this.properties = properties;\n        this.message = message;\n    }\n    toString() {\n        let cmdStr = CMD_STRING + this.command;\n        if (this.properties && Object.keys(this.properties).length > 0) {\n            cmdStr += ' ';\n            let first = true;\n            for (const key in this.properties) {\n                if (this.properties.hasOwnProperty(key)) {\n                    const val = this.properties[key];\n                    if (val) {\n                        if (first) {\n                            first = false;\n                        }\n                        else {\n                            cmdStr += ',';\n                        }\n                        cmdStr += `${key}=${escapeProperty(val)}`;\n                    }\n                }\n            }\n        }\n        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;\n        return cmdStr;\n    }\n}\n/**\n * Sanitizes an input into a string so it can be passed into issueCommand safely\n * @param input input to sanitize into a string\n */\nfunction toCommandValue(input) {\n    if (input === null || input === undefined) {\n        return '';\n    }\n    else if (typeof input === 'string' || input instanceof String) {\n        return input;\n    }\n    return JSON.stringify(input);\n}\nexports.toCommandValue = toCommandValue;\nfunction escapeData(s) {\n    return toCommandValue(s)\n        .replace(/%/g, '%25')\n        .replace(/\\r/g, '%0D')\n        .replace(/\\n/g, '%0A');\n}\nfunction escapeProperty(s) {\n    return toCommandValue(s)\n        .replace(/%/g, '%25')\n        .replace(/\\r/g, '%0D')\n        .replace(/\\n/g, '%0A')\n        .replace(/:/g, '%3A')\n        .replace(/,/g, '%2C');\n}\n//# sourceMappingURL=command.js.map\n\n//# sourceURL=webpack:///./node_modules/@actions/core/lib/command.js?");

/***/ }),

/***/ "./node_modules/@actions/core/lib/core.js":
/*!************************************************!*\
  !*** ./node_modules/@actions/core/lib/core.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst command_1 = __webpack_require__(/*! ./command */ \"./node_modules/@actions/core/lib/command.js\");\nconst os = __importStar(__webpack_require__(/*! os */ \"os\"));\nconst path = __importStar(__webpack_require__(/*! path */ \"path\"));\n/**\n * The code to exit an action\n */\nvar ExitCode;\n(function (ExitCode) {\n    /**\n     * A code indicating that the action was successful\n     */\n    ExitCode[ExitCode[\"Success\"] = 0] = \"Success\";\n    /**\n     * A code indicating that the action was a failure\n     */\n    ExitCode[ExitCode[\"Failure\"] = 1] = \"Failure\";\n})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));\n//-----------------------------------------------------------------------\n// Variables\n//-----------------------------------------------------------------------\n/**\n * Sets env variable for this action and future actions in the job\n * @param name the name of the variable to set\n * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify\n */\n// eslint-disable-next-line @typescript-eslint/no-explicit-any\nfunction exportVariable(name, val) {\n    const convertedVal = command_1.toCommandValue(val);\n    process.env[name] = convertedVal;\n    command_1.issueCommand('set-env', { name }, convertedVal);\n}\nexports.exportVariable = exportVariable;\n/**\n * Registers a secret which will get masked from logs\n * @param secret value of the secret\n */\nfunction setSecret(secret) {\n    command_1.issueCommand('add-mask', {}, secret);\n}\nexports.setSecret = setSecret;\n/**\n * Prepends inputPath to the PATH (for this action and future actions)\n * @param inputPath\n */\nfunction addPath(inputPath) {\n    command_1.issueCommand('add-path', {}, inputPath);\n    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;\n}\nexports.addPath = addPath;\n/**\n * Gets the value of an input.  The value is also trimmed.\n *\n * @param     name     name of the input to get\n * @param     options  optional. See InputOptions.\n * @returns   string\n */\nfunction getInput(name, options) {\n    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';\n    if (options && options.required && !val) {\n        throw new Error(`Input required and not supplied: ${name}`);\n    }\n    return val.trim();\n}\nexports.getInput = getInput;\n/**\n * Sets the value of an output.\n *\n * @param     name     name of the output to set\n * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify\n */\n// eslint-disable-next-line @typescript-eslint/no-explicit-any\nfunction setOutput(name, value) {\n    command_1.issueCommand('set-output', { name }, value);\n}\nexports.setOutput = setOutput;\n/**\n * Enables or disables the echoing of commands into stdout for the rest of the step.\n * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.\n *\n */\nfunction setCommandEcho(enabled) {\n    command_1.issue('echo', enabled ? 'on' : 'off');\n}\nexports.setCommandEcho = setCommandEcho;\n//-----------------------------------------------------------------------\n// Results\n//-----------------------------------------------------------------------\n/**\n * Sets the action status to failed.\n * When the action exits it will be with an exit code of 1\n * @param message add error issue message\n */\nfunction setFailed(message) {\n    process.exitCode = ExitCode.Failure;\n    error(message);\n}\nexports.setFailed = setFailed;\n//-----------------------------------------------------------------------\n// Logging Commands\n//-----------------------------------------------------------------------\n/**\n * Gets whether Actions Step Debug is on or not\n */\nfunction isDebug() {\n    return process.env['RUNNER_DEBUG'] === '1';\n}\nexports.isDebug = isDebug;\n/**\n * Writes debug message to user log\n * @param message debug message\n */\nfunction debug(message) {\n    command_1.issueCommand('debug', {}, message);\n}\nexports.debug = debug;\n/**\n * Adds an error issue\n * @param message error issue message. Errors will be converted to string via toString()\n */\nfunction error(message) {\n    command_1.issue('error', message instanceof Error ? message.toString() : message);\n}\nexports.error = error;\n/**\n * Adds an warning issue\n * @param message warning issue message. Errors will be converted to string via toString()\n */\nfunction warning(message) {\n    command_1.issue('warning', message instanceof Error ? message.toString() : message);\n}\nexports.warning = warning;\n/**\n * Writes info to log with console.log.\n * @param message info message\n */\nfunction info(message) {\n    process.stdout.write(message + os.EOL);\n}\nexports.info = info;\n/**\n * Begin an output group.\n *\n * Output until the next `groupEnd` will be foldable in this group\n *\n * @param name The name of the output group\n */\nfunction startGroup(name) {\n    command_1.issue('group', name);\n}\nexports.startGroup = startGroup;\n/**\n * End an output group.\n */\nfunction endGroup() {\n    command_1.issue('endgroup');\n}\nexports.endGroup = endGroup;\n/**\n * Wrap an asynchronous function call in a group.\n *\n * Returns the same type as the function itself.\n *\n * @param name The name of the group\n * @param fn The function to wrap in the group\n */\nfunction group(name, fn) {\n    return __awaiter(this, void 0, void 0, function* () {\n        startGroup(name);\n        let result;\n        try {\n            result = yield fn();\n        }\n        finally {\n            endGroup();\n        }\n        return result;\n    });\n}\nexports.group = group;\n//-----------------------------------------------------------------------\n// Wrapper action state\n//-----------------------------------------------------------------------\n/**\n * Saves state for current action, the state can only be retrieved by this action's post job execution.\n *\n * @param     name     name of the state to store\n * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify\n */\n// eslint-disable-next-line @typescript-eslint/no-explicit-any\nfunction saveState(name, value) {\n    command_1.issueCommand('save-state', { name }, value);\n}\nexports.saveState = saveState;\n/**\n * Gets the value of an state set by this action's main execution.\n *\n * @param     name     name of the state to get\n * @returns   string\n */\nfunction getState(name) {\n    return process.env[`STATE_${name}`] || '';\n}\nexports.getState = getState;\n//# sourceMappingURL=core.js.map\n\n//# sourceURL=webpack:///./node_modules/@actions/core/lib/core.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const core = __webpack_require__(/*! @actions/core */ \"./node_modules/@actions/core/lib/core.js\");\n\nconst run = () => {\n  const variableName = core.getInput(\"name\", {\n    required: true,\n  });\n\n  const rawBranchName = process.env.GITHUB_REF;\n\n  if (!rawBranchName) {\n    throw new Error(\"Was not able to get branchName\");\n  }\n\n  const branchName = rawBranchName.replace(\"refs/heads/\", \"\").toUpperCase();\n\n  core.exportVariable(variableName, process.env[`${branchName}_${variableName}`]);\n};\n\nrun();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
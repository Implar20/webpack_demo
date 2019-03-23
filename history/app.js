(function (modules) {
	var installedModules = {};									// 创建一个缓存对象
	// key : {}
	function __webpack_require__(moduleId) {					// 实现了一个可以在浏览器中运行的 require 方法
		if (installedModules[moduleId]) {						// 检查模块是否在缓存中
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = {				// 创建一个新模块(并将其放入缓存中)
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function								执行模块函数
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded								将模块标记为已加载							
		module.l = true;
		// Return the exports of the module							返回模块的导出
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)				公开模块对象(webpack模块)
	__webpack_require__.m = modules;
	// expose the module cache										公开模块缓存
	__webpack_require__.c = installedModules;
	// define getter function for harmony exports					为和谐模块导出定义getter函数
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// define __esModule on exports									导出 定义 __esModule
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// create a fake namespace object								创建一个伪名称空间对象
	// mode & 1: value is a module id, require it					模式 & 1: value 是一个模块 id，引用它
	// mode & 2: merge all properties of value into the ns			模式 & 2: 将值的所有属性合并到 ns 中
	// mode & 4: return value when already ns object				模式 & 4: 当已经是 ns 对象时返回值
	// mode & 8|1: behave like require								模式 & 8|1: 像引用一样运转
	__webpack_require__.t = function (value, mode) {
		if (mode & 1) value = __webpack_require__(value);
		if (mode & 8) return value;
		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
		return ns;
	};
	// getDefaultExport function for compatibility with non-harmony modules		getDefaultExport函数，用于兼容非和谐模块
	__webpack_require__.n = function (module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__													webpack 公共路径
	__webpack_require__.p = "";
	// Load entry module and return exports										加载输入模块并返回导出
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
	({
		"./src/a.js":							// key   -> 模块的路径
			(function (module, exports) {		// value -> 函数
				eval("module.exports = 'csq'\n\n//# sourceURL=webpack:///./src/a.js?");
			}),
		"./src/index.js":
			(function (module, exports, __webpack_require__) {
				eval("let str = __webpack_require__(\"./src/a.js\")\r\n\r\nconsole.log(str)\r\nconsole.log(123)\n\n//# sourceURL=webpack:///./src/index.js?");
			})

	});
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import warning from 'warning';

var PATH_REGEXP = /\]\.|\]\[|\.|\[|\]/g;
var Root = isUndefined(window) ? global : window;

export function isUndefined(arg) {
    return typeof arg === 'undefined';
}

export function isFunction(arg) {
    return typeof arg === 'function';
}

export function isEmpty(arg) {
    return isUndefined(arg) || arg === null || arg + '' === '';
}

export function isPromise(promise) {
    return !!promise && isFunction(promise.then);
}

export var runCallback = function runCallback(callback) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (isFunction(callback)) {
        callback.apply(undefined, args);
    }

    return args[0];
};

export function createHOC(withHOC) {
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (isFunction(args[0])) {
            return withHOC.apply(undefined, args);
        }

        return function (WrappedComponent) {
            return withHOC(WrappedComponent, args[0]);
        };
    };
}

var VALID_PROPS = ['minlength', 'maxlength', 'max', 'min', 'required', 'pattern', 'step'];
export function isValidProp(prop) {
    return VALID_PROPS.indexOf(prop.toLowerCase()) > -1;
}

/* eslint-disable */
var executeWord = function executeWord(word) {
    try {
        var exec = new Function('origin', 'global', 'return typeof ' + word + ' === \'number\' || (typeof ' + word + ' !== \'undefined\' && !(origin in global)) ? ' + word + ' : origin');
        return exec(word, Root);
    } catch (err) {
        return word;
    }
};

/**
 * @desc 解析表达式中赋值深路径对象
 *
 * @param {Object} target 要赋值的对象
 * @param {String} path 赋值路径，eg：list[0].title
 * @param {Any} [value] 要赋过去的值，如过不传，则返回解析路径后的值
 *
 * 使用示例：parsePath({}, 'list[0].authors[1].name', 'Lucy');
 */
export var parsePath = function parsePath() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    var target = args[0],
        path = args[1],
        value = args[2];


    warning(typeof path === 'string', 'The second parameter(' + JSON.stringify(path) + ') of parsePath() must be a string.');

    var pathSymbols = path.match(PATH_REGEXP) || [];
    var pathWords = path.split(PATH_REGEXP).filter(function (item) {
        return item !== '';
    });
    var scope = target;

    try {
        if (args.length < 3) {
            for (var index = 0, len = pathWords.length; index < len; index++) {
                var word = pathWords[index];
                var symbol = pathSymbols[index];

                word = executeWord(word);

                if (index + 1 === len) {
                    return scope[word];
                }

                if (isUndefined(scope[word])) {
                    break;
                }

                scope = scope[word];
            }
        } else {
            pathWords.forEach(function (word, index) {
                var nextWord = pathWords[index + 1];
                var symbol = pathSymbols[index];

                word = executeWord(word);

                switch (symbol) {
                    case '].':
                    case '.':
                        scope = isUndefined(scope[word]) ? scope[word] = {} : scope[word];
                        break;

                    case '][':
                    case '[':
                        var nextVarWord = executeWord(nextWord);
                        scope = isUndefined(scope[word]) ? scope[word] = typeof nextVarWord === 'number' && nextVarWord >= 0 ? [] : {} : scope[word];
                        break;

                    case ']':
                    default:
                        scope[word] = value;
                }
            });
        }
    } catch (error) {
        warning(false, 'The name \'%s\' of Field seems is not a legal expression.', path);
    }

    if (args.length > 2) {
        return target;
    }
};

export var arrayFind = function arrayFind(array, process) {
    for (var i = 0, j = array.length; i < j; i++) {
        if (process(array[i]) === true) {
            return array[i];
        }
    }
};

export var objectMap = function objectMap(obj, handler) {
    return Object.keys(obj).reduce(function (newObj, key) {
        newObj[key] = handler(obj[key], key, obj);
        return newObj;
    }, {});
};

export var objectEach = function objectEach(obj, handler) {
    return Object.keys(obj).forEach(function (key) {
        return handler(obj[key], key, obj);
    });
};

export var toObject = function toObject(arr, handler) {
    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return arr.reduce(function () {
        handler.apply(undefined, arguments);

        return arguments.length <= 0 ? undefined : arguments[0];
    }, obj);
};

var TODO_DELETE = '__REACT_FORMUTIL_TODO_DELETE__' + +new Date();
var CLEAR = function CLEAR(obj, pkey, pobj) {
    objectEach(obj, function (value, key) {
        if (value === TODO_DELETE) {
            if (Array.isArray(obj)) {
                obj.splice(key, 1);
            } else {
                delete obj[key];
            }
        } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            CLEAR(value, key, obj);
        }
    });

    if (pobj && Object.keys(obj).length === 0) {
        pobj[pkey] = TODO_DELETE;
        CLEAR(pobj);
    }
};
export var objectClear = function objectClear(obj, name) {
    if (typeof parsePath(obj, name) !== 'undefined') {
        CLEAR(parsePath(obj, name, TODO_DELETE));
    }
};
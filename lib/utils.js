var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var PATH_REGEXP = /\]\.|\]\[|\.|\[|\]/g;

function isUndefined(arg) {
    return typeof arg === 'undefined';
}

/**
 * @desc 解析表达式中赋值深路径对象
 *
 * @param {Object} target 要赋值的对象
 * @param {String} path 赋值路径，eg：list[0].title
 * @param {Any} [value] 要赋过去的值，如过不传，则返回解析路径后的值
 *
 * 使用示例：parsePath({}, 'list[0].authors[1].name', 'Lucy');
 */
/* eslint-disable */
export var parsePath = function parsePath() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var target = args[0],
        path = args[1],
        value = args[2];

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
                var executeWord = new Function('sub', 'return typeof ' + word + ' === \'undefined\' ? sub : ' + word);

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
                var executeWord = new Function('sub', 'return typeof ' + word + ' === \'undefined\' ? sub : ' + word);
                var executeNextword = new Function('sub', 'return typeof ' + nextWord + ' === \'undefined\' ? sub : ' + nextWord);

                word = executeWord(word);

                switch (symbol) {
                    case '].':
                    case '.':
                        scope = isUndefined(scope[word]) ? scope[word] = {} : scope[word];
                        break;

                    case '][':
                    case '[':
                        var nextVarWord = executeNextword(nextWord);
                        scope = isUndefined(scope[word]) ? scope[word] = typeof nextVarWord === 'number' && nextVarWord >= 0 ? [] : {} : scope[word];
                        break;

                    case ']':
                    default:
                        scope[word] = value;
                }
            });
        }
    } catch (error) {
        console.warn('react-formutil: It seems \'' + path + '\' is not a legal expression.');
    }

    if (args.length > 2) {
        return target;
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
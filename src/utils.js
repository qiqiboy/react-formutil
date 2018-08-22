const PATH_REGEXP = /\]\.|\]\[|\.|\[|\]/g;

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

const VALID_PROPS = ['minlength', 'maxlength', 'max', 'min', 'required', 'pattern', 'step'];
export function isValidProp(prop) {
    return VALID_PROPS.indexOf(prop.toLowerCase()) > -1;
}

/* eslint-disable */
const executeWord = function(word) {
    try {
        const exec = new Function(
            'origin',
            `return typeof ${word} !== 'undefined' && !(origin in window ) ? ${word} : origin`
        );
        return exec(word);
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
export const parsePath = (...args) => {
    const [target, path, value] = args;
    const pathSymbols = path.match(PATH_REGEXP) || [];
    const pathWords = path.split(PATH_REGEXP).filter(item => item !== '');
    let scope = target;

    try {
        if (args.length < 3) {
            for (let index = 0, len = pathWords.length; index < len; index++) {
                let word = pathWords[index];
                const symbol = pathSymbols[index];

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
            pathWords.forEach((word, index) => {
                const nextWord = pathWords[index + 1];
                const symbol = pathSymbols[index];

                word = executeWord(word);

                switch (symbol) {
                    case '].':
                    case '.':
                        scope = isUndefined(scope[word]) ? (scope[word] = {}) : scope[word];
                        break;

                    case '][':
                    case '[':
                        const nextVarWord = executeWord(nextWord);
                        scope = isUndefined(scope[word])
                            ? (scope[word] = typeof nextVarWord === 'number' && nextVarWord >= 0 ? [] : {})
                            : scope[word];
                        break;

                    case ']':
                    default:
                        scope[word] = value;
                }
            });
        }
    } catch (error) {
        console.warn(`react-formutil: It seems '${path}' is not a legal expression.`);
    }

    if (args.length > 2) {
        return target;
    }
};

export const arrayFind = (array, process) => {
    for (let i = 0, j = array.length; i < j; i++) {
        if (process(array[i]) === true) {
            return array[i];
        }
    }
};

export const objectMap = (obj, handler) =>
    Object.keys(obj).reduce((newObj, key) => {
        newObj[key] = handler(obj[key], key, obj);
        return newObj;
    }, {});

export const objectEach = (obj, handler) => Object.keys(obj).forEach(key => handler(obj[key], key, obj));

export const toObject = (arr, handler, obj = {}) =>
    arr.reduce((...args) => {
        handler(...args);

        return args[0];
    }, obj);

const TODO_DELETE = '__REACT_FORMUTIL_TODO_DELETE__' + +new Date();
const CLEAR = (obj, pkey, pobj) => {
    objectEach(obj, (value, key) => {
        if (value === TODO_DELETE) {
            if (Array.isArray(obj)) {
                obj.splice(key, 1);
            } else {
                delete obj[key];
            }
        } else if (value && typeof value === 'object') {
            CLEAR(value, key, obj);
        }
    });

    if (pobj && Object.keys(obj).length === 0) {
        pobj[pkey] = TODO_DELETE;
        CLEAR(pobj);
    }
};
export const objectClear = (obj, name) => {
    if (typeof parsePath(obj, name) !== 'undefined') {
        CLEAR(parsePath(obj, name, TODO_DELETE));
    }
};

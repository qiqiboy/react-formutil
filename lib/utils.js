var PATH_REGEXP = /\]\.|\]\[|\.|\[|\]/g;

function isUndefined(arg) {
    return typeof arg === 'undefined';
}

/**
 * @desc 解析表达式中赋值深路径对象
 *
 * @param {Object} target 要赋值的对象
 * @param {String} path 赋值路径，eg：list[0].title
 * @param {Any} value 要赋过去的值
 *
 * 使用示例：parsePath({}, 'list[0].authors[1].name', 'Lucy');
 */
/* eslint-disable */
export var parsePath = function parsePath(target, path, value) {
    var pathSymbols = path.match(PATH_REGEXP) || [];
    var pathWords = path.split(PATH_REGEXP).filter(function (item) {
        return item !== '';
    });
    var scope = target;

    try {
        pathWords.forEach(function (word, index) {
            var nextWord = pathWords[index + 1];
            var symbol = pathSymbols[index];
            var executeWord = new Function('return ' + word);
            var executeNextword = new Function('return ' + nextWord);

            switch (symbol) {
                case '].':
                    word = executeWord();
                case '.':
                    scope = isUndefined(scope[word]) ? scope[word] = {} : scope[word];
                    break;

                case '][':
                    word = executeWord();
                case '[':
                    var nextVarWord = executeNextword();
                    scope = isUndefined(scope[word]) ? scope[word] = typeof nextVarWord === 'number' ? [] : {} : scope[word];
                    break;

                case ']':
                    word = executeWord();
                default:
                    scope[word] = value;
            }
        });
    } catch (error) {
        console.warn('react-formutil: It seems \'' + path + '\' is not a legal expression.');
    }

    return target;
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
const PATH_REGEXP = /\]\.|\]\[|\.|\[|\]/g;

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
export const parsePath = (...args) => {
    const [target, path, value] = args;

    if (args.length < 3) {
        const execute = new Function(
            'obj',
            `try {
                return obj.${path}
            } catch(error) {}`
        );

        return execute(target);
    }

    const pathSymbols = path.match(PATH_REGEXP) || [];
    const pathWords = path.split(PATH_REGEXP).filter(item => item !== '');
    let scope = target;

    try {
        pathWords.forEach((word, index) => {
            const nextWord = pathWords[index + 1];
            const symbol = pathSymbols[index];
            const executeWord = new Function(`return ${word}`);
            const executeNextword = new Function(`return ${nextWord}`);

            switch (symbol) {
                case '].':
                    word = executeWord();
                case '.':
                    scope = isUndefined(scope[word]) ? (scope[word] = {}) : scope[word];
                    break;

                case '][':
                    word = executeWord();
                case '[':
                    const nextVarWord = executeNextword();
                    scope = isUndefined(scope[word])
                        ? (scope[word] = typeof nextVarWord === 'number' ? [] : {})
                        : scope[word];
                    break;

                case ']':
                    word = executeWord();
                default:
                    scope[word] = value;
            }
        });
    } catch (error) {
        console.warn(`react-formutil: It seems '${path}' is not a legal expression.`);
    }

    return target;
};

export const objectMap = (obj, handler) =>
    Object.keys(obj).reduce((newObj, key) => {
        newObj[key] = handler(obj[key], key, obj);
        return newObj;
    }, {});

export const objectEach = (obj, handler) => Object.keys(obj).forEach(key => handler(obj[key], key, obj));

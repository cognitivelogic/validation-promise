"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const float = (value, row, msg, arg) => {
    if (typeof value !== 'string') {
        return Promise.reject('Value must be a string');
    }
    if (typeof arg === 'function') {
        arg = arg(value, row);
    }
    const float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
    if (arg !== null && arg !== undefined) {
        if ((arg.min !== undefined && Number(value) < Number(arg.min))) {
            return Promise.reject(msg(value, row, arg));
        }
        if ((arg.max && Number(value) > Number(arg.max))) {
            return Promise.reject(msg(value, row, arg));
        }
    }
    if (float.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(msg(value, row, arg));
};
exports.default = float;

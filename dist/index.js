"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_update_1 = __importDefault(require("lodash.update"));
const after_1 = __importDefault(require("./rules/after"));
exports.after = after_1.default;
const before_1 = __importDefault(require("./rules/before"));
exports.before = before_1.default;
const blacklist_1 = __importDefault(require("./rules/blacklist"));
exports.blacklist = blacklist_1.default;
const email_1 = __importDefault(require("./rules/email"));
exports.email = email_1.default;
const equals_1 = __importDefault(require("./rules/equals"));
exports.equals = equals_1.default;
const equalto_1 = __importDefault(require("./rules/equalto"));
exports.equalto = equalto_1.default;
const float_1 = __importDefault(require("./rules/float"));
exports.float = float_1.default;
const greaterthan_1 = __importDefault(require("./rules/greaterthan"));
exports.greaterthan = greaterthan_1.default;
const int_1 = __importDefault(require("./rules/int"));
exports.int = int_1.default;
const lessthan_1 = __importDefault(require("./rules/lessthan"));
exports.lessthan = lessthan_1.default;
const notEquals_1 = __importDefault(require("./rules/notEquals"));
exports.notEquals = notEquals_1.default;
const regex_1 = __importDefault(require("./rules/regex"));
exports.regex = regex_1.default;
const required_1 = __importDefault(require("./rules/required"));
exports.required = required_1.default;
const whitelist_1 = __importDefault(require("./rules/whitelist"));
exports.whitelist = whitelist_1.default;
;
const setNestedValue = (object, propPath, value) => {
    return lodash_update_1.default(object, propPath, (arr) => arr ? [...arr, value] : [value]);
};
const hashSettled = (promises) => {
    return Promise.all(promises.map(({ propPath, rule }) => Promise.resolve(rule)
        .then((value) => {
        let r = {
            state: 'fulfilled',
            propPath,
            value,
        };
        return r;
    }, (reason) => {
        let r = {
            state: 'rejected',
            propPath,
            reason,
        };
        return r;
    })));
}, validate = (contract, data) => {
    let promises = [];
    contract.forEach((validation) => {
        const propPath = Array.isArray(validation.key) ? validation.key : [validation.key];
        const value = lodash_get_1.default(data, propPath.join('.'));
        promises = promises.concat(validation.promises.map((p) => ({
            propPath,
            rule: p.rule(value, data, (p.msg || validation.msg), p.arg === undefined ? null : p.arg),
        })));
    });
    return new Promise((resolve, reject) => {
        hashSettled(promises)
            .then((res) => {
            const errors = res.filter((r) => r.state === 'rejected');
            let ret = {};
            errors.forEach(({ propPath, reason }) => {
                ret = setNestedValue(ret, propPath, reason);
            });
            if (errors.length === 0) {
                resolve(true);
            }
            reject(ret);
        });
    });
};
exports.default = validate;

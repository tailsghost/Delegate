class Delegate {
    /**
     * @param expectedArgCount — ожидаемое число аргументов в TArgs
     */
    constructor(expectedArgCount) {
        this.funcs = [];
        if (typeof expectedArgCount !== "number") {
            throw new TypeError("expectedArgCount должен быть числом");
        }
        this.argCount = expectedArgCount;
    }
    Add(func) {
        if (this.argCount !== func.length) {
            throw new RangeError("Неверное число параметров");
        }
        this.funcs.push(func);
    }
    Delete(func) {
        if (this.argCount !== func.length) {
            throw new RangeError("Неверное число параметров");
        }
        this.funcs.filter((f) => f != func);
    }
    GetFuncs() {
        return this.funcs;
    }
}
class Action extends Delegate {
    constructor(argCount) {
        super(argCount);
    }
    Invoke(...args) {
        for (const fn of this.GetFuncs()) {
            fn(...args);
        }
    }
}
class Func extends Delegate {
    constructor(argCount) {
        super(argCount);
    }
    Add(func) {
        super.Add(func);
    }
    Invoke(...args) {
        let lastResult;
        if (this.GetFuncs().length === 0) {
            return undefined;
        }
        for (const fn of this.GetFuncs()) {
            lastResult = fn(...args);
        }
        return lastResult;
    }
}
export const DelegateRepository = { Action, Func };
//# sourceMappingURL=Delegate.js.map
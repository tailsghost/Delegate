declare class Delegate<TArgs extends any[]> {
    private funcs;
    private readonly argCount;
    /**
     * @param expectedArgCount — ожидаемое число аргументов в TArgs
     */
    constructor(expectedArgCount: number);
    Add(func: (...args: TArgs) => any): void;
    Delete(func: (...args: TArgs) => any): void;
    protected GetFuncs(): Array<(...args: TArgs) => any>;
}
declare class Action<TArgs extends any[]> extends Delegate<TArgs> {
    constructor(argCount: number);
    Invoke(...args: TArgs): void;
}
declare class Func<TArgs extends any[], TResult> extends Delegate<TArgs> {
    constructor(argCount: number);
    Add(func: (...args: TArgs) => TResult): void;
    Invoke(...args: TArgs): TResult | undefined;
}
export declare const DelegateRepository: {
    Action: typeof Action;
    Func: typeof Func;
};
export {};

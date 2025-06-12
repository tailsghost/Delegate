class Delegate<TArgs extends any[]> {
  private funcs: Array<(...args: TArgs) => any> = [];
  private readonly argCount: number;

  /**
   * @param expectedArgCount — ожидаемое число аргументов в TArgs
   */
  constructor(expectedArgCount: number) {
    if (typeof expectedArgCount !== "number") {
      throw new TypeError("expectedArgCount должен быть числом");
    }
    this.argCount = expectedArgCount;
  }

  Add(func: (...args: TArgs) => any): void {
    if (this.argCount !== (func as any).length) {
      throw new RangeError("Неверное число параметров");
    }
    this.funcs.push(func);
  }

  Delete(func: (...args: TArgs) => any): void {
    if (this.argCount !== (func as any).length) {
      throw new RangeError("Неверное число параметров");
    }
   this.funcs = this.funcs.filter((f) => f != func);
  }

  protected GetFuncs(): Array<(...args: TArgs) => any> {
    return this.funcs;
  }
}

class Action<TArgs extends any[]> extends Delegate<TArgs> {
  constructor(argCount: number) {
    super(argCount);
  }

  Invoke(...args: TArgs): void {
    for (const fn of this.GetFuncs() as Array<(...args: TArgs) => void>) {
      fn(...args);
    }
  }
}

class Func<TArgs extends any[], TResult> extends Delegate<TArgs> {
  constructor(argCount: number) {
    super(argCount);
  }

    Add(func: (...args: TArgs) => TResult): void {
    
    super.Add(func)
  }

  Invoke(...args: TArgs): TResult | undefined {
    let lastResult: TResult | undefined;

    if (this.GetFuncs().length === 0) {
      return undefined;
    }

    for (const fn of this.GetFuncs() as Array<(...args: TArgs) => TResult>) {
      lastResult = fn(...args);
    }

    return lastResult;
  }
}

export const  DelegateRepository = {Action,Func}

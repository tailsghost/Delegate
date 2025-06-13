class Delegate<TArgs extends any[]> {
  private funcs: Array<(...args: TArgs) => any> = [];
  protected readonly argCount: number;

  constructor(argCount: number = 0) {
    if (typeof argCount !== "number") {
      throw new TypeError("expectedArgCount должен быть числом");
    }
    this.argCount = argCount;
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

export class Action<TArgs extends any[]> extends Delegate<TArgs> {
  constructor(argCount: number = 0) {
    super(argCount);
  }

  Add(func: (...args: TArgs) => void): void {
    super.Add(func);
  }

  Invoke(...args: TArgs): void {
    for (const fn of this.GetFuncs() as Array<(...args: TArgs) => void>) {
      fn(...args);
    }
  }
}

export class Func<TArgs extends any[], TResult> extends Delegate<TArgs> {
  constructor(argCount: number = 0) {
    super(argCount);
  }

  Add(func: (...args: TArgs) => TResult): void {
    super.Add(func);
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

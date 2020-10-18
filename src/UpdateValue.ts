export class UpdateValue<TValue> {

  private _value: TValue;

  private _counter: number = 0;

  public get value(): TValue {
    return this._value;
  }

  public set value(newValue: TValue) {
    this._counter++;
    this._value = newValue;
  }

  public get counter(): number {
    return this._counter;
  }

}

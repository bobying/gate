import { ControlValueAccessor } from '@angular/forms';

export class BaseFormField<T> implements ControlValueAccessor {
    private innerValue: T;
    protected disabled: boolean;

    private changed = new Array<(value: T) => void>();
    private touched = new Array<() => void>();

    public getValue(): T {
        return this.innerValue;
    }

    setValue(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach((f) => f(value));
        }
    }

    forceOnChange() {
        this.changed.forEach((f) => f(this.innerValue));
    }

    touch() {
        this.touched.forEach((f) => f());
    }

    writeValue(value: T) {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: T) => void) {
        this.changed.push(fn);
    }

    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
}

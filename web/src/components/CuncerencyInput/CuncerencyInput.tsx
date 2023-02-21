import React, { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';

export interface ICuncerencyInput {
  value?: string;
  onChange?: (_value: string) => void;
  disabled?: boolean;
  className?: string;
}

const NumberOnlyPattern = /[0-9]+$/;
const subject$ = new Subject<string>();

/**
 * This component should be used for typing money in VND.
 * It accepts positive numbers only. Ex: 1500000
 *
 * It was applied the deboucing to reduce re-rendering of its Parent
 *
 */
function CuncerencyInput({ value, disabled, className, onChange }: ICuncerencyInput) {
  const [inpValue, setInpValue] = useState(value ?? '');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (NumberOnlyPattern.test(value) || value === '') {
      setInpValue(value);
      // Emit
      subject$.next(value);
    }
  }, []);

  const handleBlur = useCallback(() => {
    if (inpValue.length === 0) {
      setInpValue('0');
      // Emit
      subject$.next('0');
    }
  }, [inpValue]);

  // Whenever `value` props change, update `inpValue` state.
  useEffect(() => {
    if (
      value !== undefined &&
      value !== inpValue &&
      (NumberOnlyPattern.test(value) || value === '')
    ) {
      setInpValue(value);
      console.log('re-set value', value, inpValue);
    }
  }, [value]);

  // Subscribe `Subject` when mounting
  useEffect(() => {
    const subscription = subject$
      .pipe(distinctUntilChanged(), debounceTime(400), tap(console.log))
      .subscribe((value) => onChange?.(value));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <input
      className={`
        block w-full border rounded-md px-2 py-1
        ${className ?? ''}
      `}
      value={inpValue}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
    />
  );
}

export default CuncerencyInput;

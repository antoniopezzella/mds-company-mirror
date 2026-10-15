import { useState, useCallback } from 'react';
import { sanitizeInput, validateEmail } from '../utils/security/sanitizer';

/**
 * Hook for managing sanitized form input
 */
export const useSanitizedInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((newValue: string) => {
    const sanitized = sanitizeInput(newValue);
    setValue(sanitized);
    setError(null);
  }, []);

  const validate = useCallback((validator?: (value: string) => boolean | string) => {
    if (!validator) return true;
    
    const result = validator(value);
    if (typeof result === 'string') {
      setError(result);
      return false;
    }
    
    if (!result) {
      setError('Invalid input');
      return false;
    }
    
    setError(null);
    return true;
  }, [value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  return {
    value,
    error,
    handleChange,
    validate,
    reset,
    setValue,
  };
};

/**
 * Hook for managing sanitized email input with validation
 */
export const useSanitizedEmail = (initialValue: string = '') => {
  const { value, error, handleChange, validate, reset, setValue } = useSanitizedInput(initialValue);

  const validateEmailInput = useCallback(() => {
    return validate((val) => {
      if (!val) return 'Email is required';
      if (!validateEmail(val)) return 'Invalid email format';
      return true;
    });
  }, [validate]);

  return {
    value,
    error,
    handleChange,
    validate: validateEmailInput,
    reset,
    setValue,
  };
};

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// This adds the expect method from vitest to the global scope
import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Runs a cleanup after each test case to ensure a clean environment
afterEach(() => {
  cleanup();
});

// Suppress React key warnings during tests
beforeAll(() => {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' && 
      (args[0].includes('Each child in a list should have a unique "key" prop') ||
       args[0].includes('Warning:'))
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});

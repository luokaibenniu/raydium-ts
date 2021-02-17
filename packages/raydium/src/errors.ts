export function throwIfUndefined<T>(
  value: T | undefined,
  message = 'Not found',
): T {
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
}

export function throwIfNull<T>(value: T | null, message = 'Not found'): T {
  if (value === null) {
    throw new Error(message);
  }
  return value;
}

export function minLengthMessage(label: string, minLength: number): string {
  return (minLength === 1)
    ? `${label} is required.`
    : `${label} must be at least ${minLength} characters long.`;
}

export function maxLengthMessage(label: string, maxLength: number): string {
  return `${label} must be less than ${maxLength} characters long.`;
}

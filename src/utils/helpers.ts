export function getRandomInt() {
  const min = Math.ceil(100000);
  const max = Math.floor(999999);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function validateId(id: string): void {
  if (!id) {
    throw new Error("ID must be provided");
  }

  if (typeof id === "number") { // Shouldn't use toString() because Number.MAX_SAFE_INTEGER < ID
    throw new Error("ID must be of type string");
  }
}

export function requireTrue(value: boolean): asserts value is true {
  if (value !== true) {
    throw new Error("Value must be true");
  }
}

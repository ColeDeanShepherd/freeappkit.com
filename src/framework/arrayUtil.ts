export function arrayShuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function arrayExcept<T>(array: T[], valuesToExclude: T[]): T[] {
  return array.filter(item => !valuesToExclude.includes(item));
}

export function arrayLast<T>(arr: T[]) {
  if (arr.length === 0) {
    return undefined;
  } else {
    return arr[arr.length - 1];
  }
}

declare global {
  interface Array<T> {
    last(): T | undefined;
    except(valuesToExclude: T[]): T[];
    shuffle(): T[];
  }
}

Array.prototype.last = function() {
  return arrayLast(this);
};

Array.prototype.except = function(valuesToExclude) {
  return arrayExcept(this, valuesToExclude);
};

Array.prototype.shuffle = function() {
  return arrayShuffle(this);
};

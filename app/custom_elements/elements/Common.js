function setAttribute(key, value, object) {
  if (key.includes(".")) {
    const keys = key.split(".");
    object[keys[0]][keys[1]] = value;
  } else {
    object[key] = value;
  }
}

export const init = (object, props) => {
  for (const key in props) {
    setAttribute(key, props[key], object)
  }
}

export const update = (object, key, value) => setAttribute(key, value, object)

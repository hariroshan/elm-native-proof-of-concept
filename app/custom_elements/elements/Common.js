function setAttribute(key, value, object) {
  if (key.includes(".")) {
    const keys = key.split(".");
    assign_deep(object, keys, 0, value);
  } else {
    object[key] = value;
  }
}

function assign_deep(object, keys, i, value) {
  object[keys[i]] = (keys.length - 1 === i) ? value : assign_deep(object[keys[i]], keys, i + 1, value)
  return object
}

export const init = (object, props) => {
  for (const key in props) {
    setAttribute(key, props[key], object)
  }
}

export const update = (object, key, value) => setAttribute(key, value, object)

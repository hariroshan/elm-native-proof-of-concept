export const init = (object, props)  => {
  for (const key in props) {
    object[key] = props[key];
    // if (Object.hasOwnProperty.call(props, key)) {
    // }
  }
}

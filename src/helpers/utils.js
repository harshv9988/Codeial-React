export function getFormBody(params) {
  let result = [];

  for (let property in params) {
    let key = encodeURIComponent(property);
    let value = encodeURIComponent(params[property]);

    result(key + "=" + value);
  }

  return result.join("&");
}

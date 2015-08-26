export default function scanAPI(apiObject) {
  var result = {}

  Object.keys(apiObject).forEach(function (key) {
    var value = apiObject[key];
    var type = typeof value;
    type = (value === null || value === undefined) ? "null" : type;
    type = (type !== "null") && Array.isArray(value) ? "array" : type;
    type = key.match(/^on\w*$/) ? "EventSink" : type;

    switch (type) {
    case "object":
      result[key] = scanAPI(value);
      break;
    case "array":
      result[key] = [];
      value.forEach(function (element) {
        result[key].push(scanAPI(element));
      })
    default:
      result[key] = type;
    }
  });

  return result;
}

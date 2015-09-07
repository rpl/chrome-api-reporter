export default function scanAPI(apiObject) {
  var result = {}

  Object.getOwnPropertyNames(apiObject).forEach(function (key) {
    var value = apiObject[key];
    var type = typeof value;
    type = (value === null || value === undefined) ? "null" : type;
    type = (type !== "null") && Array.isArray(value) ? "array" : type;
    type = key.match(/^on\w*$/) ? "EventSink" : type;

    switch (type) {
    case "object":
      result[key] = scanAPI(value);
      let proto = Object.getPrototypeOf(value);
      // NOTE: skip the Object properties
      if (proto && Object.getPrototypeOf(proto)) {
        let props = scanAPI(proto);
        if (Object.keys(props).length > 0) {
          result["prototype"] = props;
        }
      }
      break;
    case "array":
      result[key] = [];
      value.forEach(function (element) {
        result[key].push(scanAPI(element));
      });
      break;
    case "function":
      if (key[0].match(/[A-Z]/)) {
        result[key] = "constructor";
      } else if (value.length == 0) {
        result[key] = "function() { ... }";
      } else {
        let fnStr = value.toString();
        result[key] = fnStr.slice(0, fnStr.indexOf('{')).split('\n')[0] + "...";
      }
      break;
    case "string":
      result[key] = "string: " + '"' + value + '"';
      break;
    default:
      result[key] = type;
    }
  });

  return result;
}

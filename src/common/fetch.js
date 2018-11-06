// 封装一个原生的ajax
const ASYNC = true;
const PORT = "http://localhost:3000";

function $ajax(url, data, method = "post") {
  return new Promise((resolve, reject) => {
    let xhr = createXHR();
    xhr.open(method, PORT + url, ASYNC);
    xhr.timout = 5000;
    xhr.ontimeout = () => {
      console.log("Request did not return in a second.");
    };
    // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          const result = xhr.responseText;
          resolve(result);
        }
      }
    };
    xhr.onerror = err => {
      reject(err);
    };
    xhr.send(data);
  });
}

function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else {
    throw new Error("No XHR object available.");
  }
}

// function formateData(data) {
//   return Object.keys(data)
//     .map(k => `${k}=${data[k]}`)
//     .join(";");
// }

export default $ajax;

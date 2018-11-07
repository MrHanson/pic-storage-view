// 工具方法集合

/*
  通过navigator.appVersion判断移动设备的版本号
*/
function isLowerAndroid8Version() {
  console.log(navigator.appVersion);
  const AndroidVersion = /Android\s\d/.exec(navigator.appVersion);
  if (AndroidVersion) {
    const version = Number(AndroidVersion[0].substr(7));
    if (version < 8) {
      return true;
    }
  }
  return false;
}

export { isLowerAndroid8Version };

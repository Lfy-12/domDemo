// 生成随机字符串
function randomString() {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 10; i > 0; --i) 
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}

// 根据id查找数组对象
function getObj(arr,_id){
  return arr.find( item => item.id ===  _id)
}

// 深拷贝
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key]!==null) {
        result[key] = deepCopy(obj[key]);   //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
const searchBoxInput = document.getElementById('searchBox');
const currentWeather = document.getElementById('currentWeather');
const selectSearchEngineInput = document.getElementById('selectSearchEngine');

function hideElement(elementName) {
  elementName.style.display = 'none';
}

function showElement(elementName) {
  elementName.style.display = 'block';
}

function getValueOfSelectedSearchEngine() {
  return selectSearchEngineInput.value;
}

function handleEnterKey(event) {
  let searchEngine = getValueOfSelectedSearchEngine();
  // console.log(searchEngine);

  if (event.key === 'Enter') {
    switch (searchEngine) {
      case 'baidu':
        window.open(`https://www.baidu.com/s?ie=utf-8&word=` + searchBoxInput.value, '_blank');
        break;
      case 'google':
        window.open(`https://www.google.com/search?q=` + searchBoxInput.value, '_blank');
        break;
      case 'bing':
        window.open(`https://www.bing.com/search?q=` + searchBoxInput.value, '_blank');
        break;
      default:
        break;
    }
  }
}

searchBoxInput.addEventListener('focus', function () {
  hideElement(currentWeather);
});
searchBoxInput.addEventListener('blur', function () {
  showElement(currentWeather);
});
selectSearchEngineInput.addEventListener('focus', function () {
  hideElement(currentWeather);
});
selectSearchEngineInput.addEventListener('blur', function () {
  showElement(currentWeather);
});
searchBoxInput.addEventListener('keydown', handleEnterKey);
// searchBoxInput.addEventListener('mouseenter', function () {
//   this.setAttribute('placeholder', 'Hover Placeholder');
// });
// searchBoxInput.addEventListener('mouseleave', function () {
//   this.setAttribute('placeholder', 'Default Placeholder');
// });

function showTime() {
  let now = new Date(); // 获取当前时间
  let hours = now.getHours(); // 获取小时
  let minutes = now.getMinutes(); // 获取分钟

  // 格式化时间，确保总是显示两位数字
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let timeString = hours + ':' + minutes; // 拼接时间字符串

  // 将时间字符串显示在网页上
  document.getElementById('clock').textContent = timeString;
}

// 每1000毫秒（1秒）更新时间
setInterval(showTime, 1000);

/**
 * 获取各大搜索引擎的关键字列表
 */

/** 获取随机小写字母 */
function getRandomLetters(number) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let value = '';
  for (let i = 0; i < number; i++) {
    value = value + alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return value;
}
/** 获取百度关键词列表 */
let dataMap = {};  //缓存列表
function getBaiDuSug(searchValue){
  return new Promise((r)=>{
    if(dataMap[searchValue]){
      r(dataMap[searchValue]);
      return;
    }
    /** 创建一个唯一标识用于接受数据，防止数据对应不齐 */
    let sign = `sug_sign_${getRandomLetters(3)}_${new Date().getTime()}`;
    window[sign] = (data)=>{
      setTimeout(()=>{sug.remove();},1000);  //删除元素
      let list = data.s || [];
      dataMap[searchValue] = list;
      r(list);
    }
    let sug = document.createElement('script');
    sug.src = `https://suggestion.baidu.com/su?wd=${encodeURIComponent(searchValue || '')}&cb=window.${sign}`;
    document.getElementsByTagName('body')[0].appendChild(sug);
  });
}
/** 获取bing关键词列表 */
let dataMap_1 = {};  //缓存列表
function getBingSug(searchValue){
  return new Promise((r)=>{
    if(dataMap_1[searchValue]){
      r(dataMap_1[searchValue]);
      return;
    }
    /** 创建一个唯一标识用于接受数据，防止数据对应不齐 */
    let sign = `sug_sign_${getRandomLetters(3)}_${new Date().getTime()}`;
    window[sign] = (data)=>{
      setTimeout(()=>{sug.remove();},1000);  //删除元素
      let list = [];
      let list_1 = data.AS.Results || [];
      list_1.forEach(item=>{
        list.push(...item.Suggests.map(item_=>{
          return item_.Txt;
        }));
      });
      dataMap_1[searchValue] = list;
      r(list);
    }
    let sug = document.createElement('script');
    sug.src = `https://api.bing.com/qsonhs.aspx?type=cb&q=${encodeURIComponent(searchValue || '')}&cb=window.${sign}`;
    document.getElementsByTagName('body')[0].appendChild(sug);
  });
}
/** 获取360关键词列表 */
let dataMap_2 = {};  //缓存列表
function get360Sug(searchValue){
  return new Promise((r)=>{
    if(dataMap_2[searchValue]){
      r(dataMap_2[searchValue]);
      return;
    }
    /** 创建一个唯一标识用于接受数据，防止数据对应不齐 */
    let sign = `sug_sign_${getRandomLetters(3)}_${new Date().getTime()}`;
    window[sign] = (data)=>{
      setTimeout(()=>{sug.remove();},1000);  //删除元素
      let list = [];
      let list_1 = data.result || [];
      list_1.forEach(item=>{
        list.push(item.word || '');
      });
      dataMap_2[searchValue] = list;
      r(list);
    }
    let sug = document.createElement('script');
    sug.src = `https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json&word=${encodeURIComponent(searchValue || '')}&callback=window.${sign}`;
    document.getElementsByTagName('body')[0].appendChild(sug);
  });
}
/** 获取淘宝关键词列表 */
let dataMap_3 = {};  //缓存列表
function getTaoBaoSug(searchValue){
  return new Promise((r)=>{
    if(dataMap_3[searchValue]){
      r(dataMap_3[searchValue]);
      return;
    }
    /** 创建一个唯一标识用于接受数据，防止数据对应不齐 */
    let sign = `sug_sign_${getRandomLetters(3)}_${new Date().getTime()}`;
    window[sign] = (data)=>{
      setTimeout(()=>{sug.remove();},1000);  //删除元素
      let list = [];
      let list_1 = data.result || [];
      list_1.forEach(item=>{
        list.push(item[0] || '');
      });
      dataMap_3[searchValue] = list;
      r(list);
    }
    let sug = document.createElement('script');
    sug.src = `https://suggest.taobao.com/sug?code=utf-8&q=${encodeURIComponent(searchValue || '')}&callback=window.${sign}`;
    document.getElementsByTagName('body')[0].appendChild(sug);
  });
}

getBingSug('怎么').then(e=>{
  console.log(e);
})
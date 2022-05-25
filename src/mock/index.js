const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；  下面的userInfo是指mock目录下的json目录下的userInfo.json文件
Mock.mock('/explain/waterStage', 'get', require('./json/waterStage'));
Mock.mock('/explain/waterQuality', 'get', require('./json/waterQuality'));
Mock.mock('/explain/osmoticPressure', 'get', require('./json/osmoticPressure'));

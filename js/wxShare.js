var timestamp = Date.parse(new Date()) / 1000
var nonceStr = 'mmb'
var url = location.href
function GetRequest2(key) {
   var url = decodeURI(location.href);
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.split('?')[1];
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	var value = theRequest[key];
	return value;
}

function getAppId(callBack) {
	$.ajax({
		type: 'GET',
		url: 'http://wechat.mumbang.cn/mmb/public/wxConfig',
		data: {
			time: new Date().getTime()
		},
		dataType: 'json',
		timeout: 3000,
		success: function(data) {
			callBack(data)
			// wxConfig(data)
		},
		error: function(xhr, type) {
			console.info(xhr)
		}
	})
}
function wxConfig(config, fjr, sjr, zfy) {
	var appId = config.appId
	var dataStr = `jsapi_ticket=${config.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
	var signature = sha1(dataStr)
	
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appId, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature, // 必填，签名
		jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
	});
	wx.ready(function() {
		this.wxConfigReady = true
		var linkU = 'http://wechat.mumbang.cn/mmb/blessing/' + encodeURI('?fjr=' + fjr + '&sjr=' + sjr + '&zfy=' + zfy);
		wx.onMenuShareAppMessage({
			title: '上海银行2020新春贺卡', // 分享标题
			desc: '上海银行2020新春贺卡', // 分享描述
			link: linkU, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578938314144&di=728c2874a26097beddca917bd1971c0f&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180910%2F08db07ba22fb4c88a362ff929b55658f.jpeg`, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				this.popupVisible = false
			}
		});

		wx.onMenuShareTimeline({
			title: '上海银行2020新春贺卡', // 分享标题
			link: linkU,
			imgUrl: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578938314144&di=728c2874a26097beddca917bd1971c0f&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180910%2F08db07ba22fb4c88a362ff929b55658f.jpeg`, // 分享图标
			success: function() {
				this.popupVisible = false
			}
		})
	});
	wx.error(function(res) {
	});
}

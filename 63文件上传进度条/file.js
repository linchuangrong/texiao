;
(function(window, document) {
	var myUpload = function(option) {
		var file,
			fd = new FormData(),
			xhr = new XMLHttpRequest(),
			loaded, tot, per, uploadUrl, input;

		input = document.createElement("input");
		input.setAttribute('id', "myUpload-input");
		input.setAttribute('type', "file");
		input.setAttribute('name', "files");

		input.click();

		uploadUrl = option.uploadUrl;
		callback = option.callback;
		uploading = option.uploading;
		beforeSend = option.beforeSend;

		input.onchange = function() {
			file = input.files[0];
			if (beforeSend instanceof Function) {
				if (beforeSend(file) === false) {
					return false;
				}
			}

			fd.append("files", file);

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					if (callback instanceof Function) {
						callback(xhr.responseText);
					}
				}
			}

			//侦查当前附件上传情况
			xhr.upload.onprogress = function(evt) {
				loaded = evt.loaded;
				tot = evt.total;
				per = Math.floor(100 * loaded / tot); //已经上传的百分比
				if (uploading instanceof Function) {
					uploading(per);
				}
			};

			xhr.open("post", uploadUrl);
			xhr.send(fd);
		}
	};

	window.myUpload = myUpload;
})(window, document);

//用法
//触发文件上传事件
myUpload({
	//上传文件接收地址
	uploadUrl: "/async/myUpload.php",
	//选择文件后，发送文件前自定义事件
	//file为上传的文件信息，可在此处做文件检测、初始化进度条等动作
	beforeSend: function(file) {

	},
	//文件上传完成后回调函数
	//res为文件上传信息
	callback: function(res) {

	},
	//返回上传过程中包括上传进度的相关信息
	//详细请看res,可在此加入进度条相关代码
	uploading: function(res) {

	}
});
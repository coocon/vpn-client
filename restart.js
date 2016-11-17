var http = require('http');


// Create an HTTP server
 var srv = http.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     //res.end('okay');
     restart(res);
 });
function restart(res) {
	var spawn = require('child_process').spawn;
	free = spawn('ipsec', ['restart']); 

	// 捕获标准输出并将其打印到控制台 
	 free.stdout.on('data', function (data) { 
		console.log('standard output:\n' + data); 
		res.write('standard output:\n' + data)
	 }); 
	//
	// // 捕获标准错误输出并将其打印到控制台 
	 free.stderr.on('data', function (data) { 
		console.log('standard error output:\n' + data); 

		res.write('output:\n' + data)
	 }); 
	//
	// // 注册子进程关闭事件 
	 free.on('exit', function (code, signal) { 
		console.log('child process eixt ,exit:' + code); 
		res.end('good luck, ipsec restart success!!');
	 });

}
srv.listen(8000);


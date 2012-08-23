//获取方法名称


//参数是测试方法的数组
var thunder=function (){
	/**
	* run a array of test method
	*/
	this.runtests=function(testMethods){
		var tests=Object.keys(testMethods);
		console.log("startting test ...");
		console.log("total "+tests.length+" methods to run.");
		
		var i=0;	
		//调用下一个测试方法
		function testCaller(){
			if(i<tests.length) {
				console.log('-----------------------------------------------');//换行
				console.log('Function '+i+ ' '+ ': '+tests[i]);//(tests[i].toString()).match(/function\s*([^(]*)\(/)[1]+' ...');
				testMethods[tests[i++]](testCaller);
			}else{
				console.log('-----------------------------------------------');
				console.log('all test finished!');
				return;
			}
		}
	
		testCaller();
	}	
	
	/**
	* find all test method name testXXX() , invoke mothod array of  [setup, testMethod1,...，testMethodn, clean]
	*/
	this.run=function(){
		var methods=Object.getOwnPropertyNames(this);
		var tests=new Array();
		tests['setup']=this.setup;
		var n=1;
		for(var i=0;i<methods.length;i++){
			if(methods[i].substring(0,4)=='test'){
				tests[methods[i]]=this[methods[i]];
			}
		}
		tests['clean']=this.clean;
		this.runtests(tests);
	}
}
thunder.prototype.setup=function(callback){
	console.log('setup() is undefined in this test!');
	callback();
};
thunder.prototype.clean=function(){
	console.log('clean is undefined in this test!');
};


thunder.prototype.assert=function(flag,message){
	if(!flag){
		console.log("Assert faild: "+message);
		process.exit();
	}
}


function assertEquals(arg1,arg2,errorMessage){
	if(arg1===arg2){
		//passed
	}
	else{
		console.log( "Test failed, expect "+arg1+" but "+arg2);
		console.log("Message: "+errorMessage);
	}
	process.exit();
}

function assert(result,errorMessage){
	console.log( "Test failed!")
	console.log("Message: "+errorMessage);
	process.exit();
}

exports.thunder=thunder;
exports.assert=assert;
exports.assertEquals=assertEquals;


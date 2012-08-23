// JavaScrit
var Thunder=require('../index').thunder;



Thunder.prototype.testFunc2=function(callback){
	console.log('testing testFunc2');
	callback();
}

var t=new Thunder();

t.testFunc1=function(callback){
	console.log('testing testFunc1');
	callback();
}

for(var obj in t.prototype){
	console.log(obj);
}

t.run();
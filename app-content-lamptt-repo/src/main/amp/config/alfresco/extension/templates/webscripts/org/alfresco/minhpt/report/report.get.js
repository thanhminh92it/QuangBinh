<import resource="classpath:alfresco/module/app-content-lamptt-repo/scripts/minhpt.lib.js">
function main() {
	logger.log("Inside");
	process();
}
function process(){
//set('2017','1212','123213213');
	//delALL();
	var dem = 0;
	var rcu1s = companyhome.childAssocs["sla:rcu1s"];
	if(rcu1s == null)
	{
	}
	else
	{	
		var rcu1sInfo = new Array();
		for(var i = 0; i < rcu1s.length; i++)
		{
			var lg = 0;
			if(rcu1s[i].children != null)
				lg = rcu1s[i].children.length;
			var folderrcu1 = getPath(rcu1s[i].properties["sla:rcu1p2"]);
			
			var rcu1 = new rcu1sEntry(rcu1s[i], lg, rcu1s[i].children, folderrcu1);
			rcu1sInfo[i] = rcu1;
			
		}
		dem = rcu1s.length;		
		model.rcu1s = rcu1sInfo;
		
	}
	model.f = companyhome;
	model.countrcu1s = dem;
	return model;
}
function rcu1sEntry(rcu1, lengthrcu2s, rcu2s, folderrcu1)
{
	this.rcu1 = rcu1;
	this.lengthrcu2s = lengthrcu2s;
	this.rcu2s = rcu2s;
	this.folderrcu1 = folderrcu1;
}
main();
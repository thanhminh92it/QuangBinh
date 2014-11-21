<import resource="classpath:alfresco/module/app-content-lamptt-repo/scripts/minhpt.lib.js">
function main() {
	logger.log("Inside");
	process();
}
function process(){
//set('2017','1212','123213213');
	//delALL();
	var rcu1s = companyhome.childAssocs["sla:rcu1s"];
	if(rcu1s == null)
	{
		logger.log("No rcu1s found");
	    status.code = 404;
	    status.message = "No rcu1s found";
	    status.redirect = true;
	}
	else
	{	
		var rcu1sInfo = new Array();
		for(var i = 0; i < rcu1s.length; i++)
		{	
			var Folder = getPath(rcu1s[i].properties["sla:rcu1p2"]).substring(14);
			var nodefolder = companyhome.childByNamePath(Folder);
			var rcu1 = new rcu1sEntry(nodefolder, rcu1s[i].properties["sla:rcu1p0"]);
			rcu1sInfo[i] = rcu1;
		}
		model.rcu1s = rcu1sInfo;
		return model;
	}
}
function rcu1sEntry(rcu1, year)
{
	this.rcu1 = rcu1;
	this.year = year;
}
main();
<import resource="classpath:alfresco/module/app-content-lamptt-repo/scripts/minhpt.lib.js">
function main() {
	logger.log("Inside");
	process();
}
function process(){
	var rcu1 = get("rcu1p0", args.year, companyhome); 
	var rcu2s = rcu1[0].children;
	if(rcu2s == null)
	{
	    status.code = 404;
	    status.message = "No rcu2s found";
	    status.redirect = true;
	}
	else
	{	
		var rcu2sInfo = new Array();
		for(var i = 0; i < rcu2s.length; i++)
		{	
			var numberpage = 0, totalfile = 0, FileNULL = 0;
			var idFolder = rcu2s[i].properties["sla:rcu2p2"];
			//idFolder += ",";
			var res = idFolder.split(",");
			for(var j = 0; j < res.length; j++)
			{
				var Folder = getPath(res[j]).substring(14);
				var nodefolder = companyhome.childByNamePath(Folder);
				if(nodefolder.properties["sla:f2"] != null)
					numberpage += nodefolder.properties["sla:f2"];
				if(nodefolder.properties["sla:f4"] != null)
					totalfile += nodefolder.properties["sla:f4"];
				if(nodefolder.properties["sla:f5"] != null)
					totalfile += nodefolder.properties["sla:f5"];
				var nodeInFolder = nodefolder.children;
				for(var k = 0; k < nodeInFolder.length; k++)
				{
					var getType = nodeInFolder[k].typeShort;
					var t="";//1 la co gia tri
					if (getType == "la:t1")
						t = "la:t1p1,la:t1p2,la:t1p3,la:t1p4,la:t1p5,la:t1p6,la:t1p7,la:t1p8,la:t1p36,la:t1p10,cm:description,cm:name,la:t1p15,la:t1p16,la:t1p17,la:t1p18";
					if (getType == "la:t2") 
						t = "la:t2p1,la:t2p2,la:t2p3,la:t2p4,la:t2p5,cm:name,cm:description,la:t2p36,la:t2p37,la:t2p8,la:t2p11,la:t2p12,la:t2p15,la:t2p16,la:t2p17";
					var a = t.split(',');
					if(getType == "la:t1" || getType == "la:t2")
					{
						for ( var l in a) {
							if (nodeInFolder[k].properties[a[l]] == null
									|| nodeInFolder[k].properties[a[l]] == ""){
								FileNULL++;
								break;
								}
							}
					}
				}		
				//numberpage = node.properties["sla:f1"];
				//totalfile = node.properties["sla:f4"] + node.properties["sla:f5"];
				//totalfile =  nodefolder.properties["sla:f1"];
				//FileNULL += nodeInFolder.length;
			}
			var rcu2 = new rcu2sEntry(rcu2s[i], numberpage, totalfile, FileNULL);
			rcu2sInfo[i] = rcu2;
		}
		model.rcu2s = rcu2sInfo;
		return model;
	}
	
}
function rcu2sEntry(rcu2, numberpage, totalfile, filenull)
{
	this.rcu2 = rcu2;
	this.numberpage = numberpage;
	this.totalfile = totalfile;
	this.filenull = filenull;
}
main();
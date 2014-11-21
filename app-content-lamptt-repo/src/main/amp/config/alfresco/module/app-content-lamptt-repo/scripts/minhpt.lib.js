<import resource="classpath:/alfresco/extension/templates/webscripts/org/alfresco/slingshot/searchreport/search.lib.js">

/**
 * param: doituong String
 * 
 * 
 * @return
 */
function get(pro, item, nodeItem){
	var value = nodeItem.childrenByXPath("*//.[@sla:"+ pro +"='"+ item +"']");
	return value;
}

function set(year, username, idFolder){
	addAspect();
	var p;
	var rcu1p0 = get("rcu1p0", year, companyhome);
	if(rcu1p0.length != 0){
		p = new Array();
		p['sla:rcu2p0'] = username;
		p['sla:rcu2p2'] = idFolder;
		var node = rcu1p0[0].createNode(username, "sla:rcu2", p, "sla:rcu2s");
		node.save();
	}
	else {
		//add vao
		p = new Array();
		p['sla:rcu1p0'] = year;
		p['sla:rcu1p2'] = idFolder;
		var node = companyhome.createNode(year, "sla:rcu1", p, "sla:rcu1s");
		node.save();
	} 
}
function del(pro, objectItem, nodeItem){
	var item = get(pro, objectItem, nodeItem);
	if(item.length != 0)
		item[0].remove(); 
}
function delALL(){
	if(companyhome.hasAspect("sla:countreport"))
		companyhome.removeAspect("sla:countreport")
}
function addAspect()
{	
	if(!companyhome.hasAspect("sla:countreport"))
		companyhome.addAspect("sla:countreport");
}

function getPath(idPath){
	var rootNodetemp = resolveRootNode(idPath);
	return rootNodetemp.displayPath + "/" + rootNodetemp.name;
}
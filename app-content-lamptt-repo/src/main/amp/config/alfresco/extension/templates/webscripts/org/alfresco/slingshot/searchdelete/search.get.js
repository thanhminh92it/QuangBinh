<import resource="classpath:alfresco/module/app-content-lamptt-repo/scripts/minhpt.lib.js">

function main()
{
	//lay du lieu
	var params =
	   {
	      query: (args.query !== null) ? args.query : null
	   };
	//tinh toan
	var formData = params.query;
	var formJson = jsonUtils.toObject(formData);
	if(formJson.username == "nlll")
		del("rcu1p0", formJson.year, companyhome);
	else
	{
		var node = get("rcu1p0",formJson.year, companyhome);
		del("rcu2p0", formJson.username, node[0]);
	}
	//xuat ket qua
	model.data = "true";
}

main();
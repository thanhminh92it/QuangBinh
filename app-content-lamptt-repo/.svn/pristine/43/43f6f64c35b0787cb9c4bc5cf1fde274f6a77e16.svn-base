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
	if (formJson.datatype == "la:t3"){
		//day la username
		set(formJson.datayear, formJson.username, formJson.folders_added)
	}
	else{
		//day la yeaer
		set(formJson.username, '' , formJson.folders_added)
	}
	
	//xuat ket qua
	model.data = "true";
}

main();
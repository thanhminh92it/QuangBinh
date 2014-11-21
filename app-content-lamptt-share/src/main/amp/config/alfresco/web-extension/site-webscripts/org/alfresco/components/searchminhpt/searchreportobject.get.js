/**
 * Advanced Search component GET method
 */

function main() {
	var year = (page.url.args["year"] != null) ? page.url.args["year"] : "";
	var result = remote.connect("alfresco").get("/zalu/usernamebyyear?year="+ year +"");
	if (result.status == 200) {
		var data = eval('(' + result + ')');
		model.data = data;
		var key, count = 0;
		for (key in data.rcu2s) {
			if (data.rcu2s.hasOwnProperty(key)) {
				count++;
			}
		}
		model.count = count;
	} else
		model.count = 0;

}

main();

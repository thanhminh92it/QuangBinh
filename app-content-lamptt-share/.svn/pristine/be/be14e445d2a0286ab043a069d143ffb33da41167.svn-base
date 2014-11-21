/**
 * Advanced Search component GET method
 */

function main() {
	var result = remote.connect("alfresco").get("/zalu/allyear");
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

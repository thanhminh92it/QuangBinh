function main() {
	logger.log("Inside vbhc.get.js");
	process();
}
function process(){
		//var f= companyhome.childByNamePath("A/A1");
		var f = companyhome;
		var c1 = f.childAssocs["sla:c1s"];
		
		model.n1 = c1.length;
		model.f = f;
		model.c1 = c1;
		var whitepaperInfo1 = new Array();
		for(i = 0; i < c1.length; i++)
		{
			var whitepaper1 = new whitepaperEntry1(c1[i])
			whitepaperInfo1[i] = whitepaper1;
			var c2 = c1[i].childAssocs["sla:c2s"];
			
			var whitepaperInfo = new Array();
			for (j = 0; j < c2.length; j++) {
				var whitepaper = new whitepaperEntry(c2[j]);
				whitepaperInfo[j] = whitepaper;
			}
			model.whitepapers = whitepaperInfo;
		}
		model.whitepapers1 = whitepaperInfo1;
		return model;	
}
function whitepaperEntry(whitepaper) {
    this.whitepaper = whitepaper;
}
function whitepaperEntry1(whitepaper1) {
    this.whitepaper1 = whitepaper1;
}
main();
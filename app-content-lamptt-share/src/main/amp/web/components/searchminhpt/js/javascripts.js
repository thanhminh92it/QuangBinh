if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName, data, ten, loai) {
            //alert("Name 0: " + data.items[0].name);

            data.items.sort(function(a, b){
        			    return a.path > b.path ? 1 : -1;
        		 });

            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function() {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            var images = Array();
            var img = markup.find('img');
            for (var i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                $('<canvas>').attr("id", "jQuery-Word-export_img_" + i).width(w).height(h).insertAfter(img[i]);
                var canvas = document.getElementById("jQuery-Word-export_img_" + i);
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL();
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
                // Remove canvas now that we no longer need it
                canvas.parentNode.removeChild(canvas);
            }

            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].contentLocation + "\n";
                mhtmlBottom += "Content-Type: " + images[i].contentType + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].contentEncoding + "\n\n";
                mhtmlBottom += images[i].contentData + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            var styles = "";
            var chuoi = "";
            var stylesheet = "border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var stylesheet2 = "border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var a = "padding:.75pt .75pt .75pt .75pt";
            var b = "align=center style='text-align:center";
            for(i = 0; i<data.items.length; i++)
        	{
            	var stt = i+1;
            	var x = "", y="";
            	if(data.items[i].pro == "1")
            		x="x";
            	else
            		y="x";
        		chuoi += "<tr style='mso-yfti-irow:2'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+stt+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt'>"+data.items[i].description+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+data.items[i].path+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ x +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p>"+ y +"</p></td></tr> ";
        	}
            var booksToRead =
                "<table style='width: 100%'>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>UBND TỈNH QUẢNG NINH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>VĂN PHÒNG</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Ninh, ngày ... tháng ... năm 20...  </td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>KẾT QUẢ XỬ LÝ CÔNG VIỆC</b></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>Người xử lý: "+ten+"</b></td></tr>" +
                    "</table>" +"<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>(Tên thông tin cần tìm: "+ loai +")</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table border='0' cellspacing=0 cellpadding = 0  style='width: 100%; text-align: center; border: 0 solid #000000; mso-cellspacing:0in;border-top:solid windowtext 1.0pt; border-left:solid windowtext 1.0pt;border-bottom:none;border-right:none;mso-border-top-alt:solid windowtext .75pt;mso-border-left-alt:solid windowtext .75pt;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<thead>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td  rowspan=2 style='width:5%;" + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>TT<o:p></o:p></b></p></td><td rowspan='2' style='width: 40%; border-left: 1; " + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Nội dung văn bản (kèm đường link nếu là view Web)<o:p></o:p></b></p><td rowspan=2 style='width: 15%; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Thư mục<o:p></o:p></b></p></td><td colspan=2 style='width: 40%;" + stylesheet2 + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Tình trạng xử lý<o:p></o:p></b></p></td>" +
                    "<tr style='mso-yfti-irow:1'><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Đã cập nhật xong<o:p></o:p></b></p></td><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Chưa cập nhật xong<o:p></o:p></b></p></td></tr>" +
                    "</thead>" +
                    chuoi +
                    
                    //day la thang tong
                    " <tr style='mso-yfti-irow:7;mso-yfti-lastrow:yes'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><b style='mso-bidi-font-weight:normal'>Tổng cộng<o:p></o:p></b></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ data.NodeNotNULL +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ data.NodeNULL +"</p></td></tr>" +

                    "</table>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100.0%;mso-cellspacing:0in;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:70.0%;padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p><p class=MsoNormal>&nbsp;</p><p class=MsoNormal>&nbsp;</p></td><td style='width:25.0%;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>NGƯỜI TỔNG HỢP<o:p></o:p></b></p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td></tr><tr style='mso-yfti-irow:1'><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td></tr><tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'>Nguyễn Tấn Dũng</td></tr>" +
                    "</table>" ;
            // Aggregate parts of the file together 
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", booksToRead)) + mhtmlBottom;

            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    };
}

// Báo cáo tong hop theo nguoi dung
if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExportBaoCaoChiTiet = function(fileName, data, ten, loai) {
            //alert("Name 0: " + data.items[0].name);


            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function() {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            var images = Array();
            var img = markup.find('img');
            for (var i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                $('<canvas>').attr("id", "jQuery-Word-export_img_" + i).width(w).height(h).insertAfter(img[i]);
                var canvas = document.getElementById("jQuery-Word-export_img_" + i);
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL();
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
                // Remove canvas now that we no longer need it
                canvas.parentNode.removeChild(canvas);
            }

            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].contentLocation + "\n";
                mhtmlBottom += "Content-Type: " + images[i].contentType + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].contentEncoding + "\n\n";
                mhtmlBottom += images[i].contentData + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            var styles = "";
            var chuoi = "";
            var stylesheet = "border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var stylesheet2 = "border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var a = "padding:.75pt .75pt .75pt .75pt";
            var b = "align=center style='text-align:center";
            var totalsotrang = 0, totalsofile = 0, totalchuanhap = 0, totaldaydu = 0, stt = 0;
            for(i = 0; i<data.rcu2s.length; i++)
        	{	
            	var object = "";
            	var sotrang = 0, sofile = 0, chuanhap = 0, daydu = 0;	
				stt ++;
				sofile = data.rcu2s[i].totalfile;
				totalsotrang += data.rcu2s[i].numberpage;
				totalsofile += sofile;
				totalchuanhap += data.rcu2s[i].filenull;
				totaldaydu += sofile - data.rcu2s[i].filenull;
				chuoi += "<tr style='mso-yfti-irow:2'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+stt+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt'>"+ data.rcu2s[i].rcu2p0 +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+data.rcu2s[i].numberpage+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+sofile+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ (data.rcu2s[i].totalfile - data.rcu2s[i].filenull) +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p>"+ data.rcu2s[i].filenull +"</p></td></tr> ";
        	}
            var booksToRead =
                "<table style='width: 100%'>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>UBND TỈNH QUẢNG NINH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>VĂN PHÒNG</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Ninh, ngày ... tháng ... năm 20...  </td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>KẾT QUẢ XỬ LÝ CÔNG VIỆC</b></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>"+ten+"</b></td></tr>" +
                    "</table>" +"<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>(Tên thông tin cần tìm: "+ loai +")</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table border='0' cellspacing=0 cellpadding = 0  style='width: 100%; text-align: center; border: 0 solid #000000; mso-cellspacing:0in;border-top:solid windowtext 1.0pt; border-left:solid windowtext 1.0pt;border-bottom:none;border-right:none;mso-border-top-alt:solid windowtext .75pt;mso-border-left-alt:solid windowtext .75pt;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<thead>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td  rowspan=2 style='width:5%;" + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>TT<o:p></o:p></b></p></td><td rowspan='2' style='width: 30%; border-left: 1; " + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Người dùng/Năm<o:p></o:p></b></p><td rowspan=2 style='width: 15%; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Số Trang<o:p></o:p></b></p></td><td rowspan=2 style='width: 15%; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Số File<o:p></o:p></b></p></td><td colspan=2 style='width: 40%;" + stylesheet2 + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Tình trạng xử lý<o:p></o:p></b></p></td>" +
                    "<tr style='mso-yfti-irow:1'><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Đã cập nhật xong<o:p></o:p></b></p></td><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center;width: 20%'><b>Chưa cập nhật xong<o:p></o:p></b></p></td></tr>" +
                    "</thead>" +
                    chuoi +
                    
                    //day la thang tong
                    " <tr style='mso-yfti-irow:7;mso-yfti-lastrow:yes'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><b style='mso-bidi-font-weight:normal'>Tổng cộng<o:p></o:p></b></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p>"+ totalsotrang +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p>"+ totalsofile +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ totaldaydu +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ totalchuanhap +"</p></td></tr>" +

                    "</table>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100.0%;mso-cellspacing:0in;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:70.0%;padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p><p class=MsoNormal>&nbsp;</p><p class=MsoNormal>&nbsp;</p></td><td style='width:25.0%;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>NGƯỜI TỔNG HỢP<o:p></o:p></b></p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td></tr><tr style='mso-yfti-irow:1'><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td></tr><tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'>Nguyễn Tấn Dũng</td></tr>" +
                    "</table>" ;
            // Aggregate parts of the file together 
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", booksToRead)) + mhtmlBottom;

            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    };
}
//Bao cao tong hop theo nam

if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExportBaoCaoTheoNam = function(fileName, data, ten, loai) {
            //alert("Name 0: " + data.items[0].name);


            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function() {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            var images = Array();
            var img = markup.find('img');
            for (var i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                $('<canvas>').attr("id", "jQuery-Word-export_img_" + i).width(w).height(h).insertAfter(img[i]);
                var canvas = document.getElementById("jQuery-Word-export_img_" + i);
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL();
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
                // Remove canvas now that we no longer need it
                canvas.parentNode.removeChild(canvas);
            }

            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].contentLocation + "\n";
                mhtmlBottom += "Content-Type: " + images[i].contentType + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].contentEncoding + "\n\n";
                mhtmlBottom += images[i].contentData + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            var styles = "";
            var chuoi = "";
            var stylesheet = "border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var stylesheet2 = "border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var a = "padding:.75pt .75pt .75pt .75pt";
            var b = "align=center style='text-align:center";
            var totalsotrang = 0, totalsofile = 0, totalchuanhap = 0, totaldaydu = 0, stt = 0;
            for(i = 0; i<data.rcu2s.length; i++)
        	{	
            	var object = "";
            	var sotrang = 0, sofile = 0, chuanhap = 0, daydu = 0;	
				stt ++;
				sofile = data.rcu2s[i].f4 + data.rcu2s[i].f5;
				totalsotrang += data.rcu2s[i].f2;
				totalsofile += sofile;
				totalchuanhap += data.rcu2s[i].f5;
				totaldaydu += data.rcu2s[i].f4;
				chuoi += "<tr style='mso-yfti-irow:2'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+stt+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt'>"+ data.rcu2s[i].year +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+data.rcu2s[i].f2+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+sofile+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ data.rcu2s[i].f4 +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ data.rcu2s[i].f5 +"</p></td></tr> ";
        	}
            var booksToRead =
                "<table style='width: 100%'>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>UBND TỈNH QUẢNG NINH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>VĂN PHÒNG</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Ninh, ngày ... tháng ... năm 20...  </td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>KẾT QUẢ XỬ LÝ CÔNG VIỆC</b></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>"+ten+"</b></td></tr>" +
                    "</table>" +"<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>(Tên thông tin cần tìm: "+ loai +")</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table border='0' cellspacing=0 cellpadding = 0  style='width: 100%; text-align: center; border: 0 solid #000000; mso-cellspacing:0in;border-top:solid windowtext 1.0pt; border-left:solid windowtext 1.0pt;border-bottom:none;border-right:none;mso-border-top-alt:solid windowtext .75pt;mso-border-left-alt:solid windowtext .75pt;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<thead>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td  rowspan=2 style='width:5%;" + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>TT<o:p></o:p></b></p></td><td rowspan='2' style='width: 30%; border-left: 1; " + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Người dùng/Năm<o:p></o:p></b></p><td rowspan=2 style='width: 15%; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Số Trang<o:p></o:p></b></p></td><td rowspan=2 style='width: 15%; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Số File<o:p></o:p></b></p></td><td colspan=2 style='width: 40%;" + stylesheet2 + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Số file các loại<o:p></o:p></b></p></td>" +
                    "<tr style='mso-yfti-irow:1'><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Loại công văn<o:p></o:p></b></p></td><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center;width: 20%'><b>Loại hồ sơ<o:p></o:p></b></p></td></tr>" +
                    "</thead>" +
                    chuoi +
                    
                    //day la thang tong
                    " <tr style='mso-yfti-irow:7;mso-yfti-lastrow:yes'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><b style='mso-bidi-font-weight:normal'>Tổng cộng<o:p></o:p></b></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p>"+ totalsotrang +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ totalsofile +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ totaldaydu +"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+ totalchuanhap +"</p></td></tr>" +

                    "</table>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100.0%;mso-cellspacing:0in;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:70.0%;padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p><p class=MsoNormal>&nbsp;</p><p class=MsoNormal>&nbsp;</p></td><td style='width:25.0%;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>NGƯỜI TỔNG HỢP<o:p></o:p></b></p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td></tr><tr style='mso-yfti-irow:1'><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td></tr><tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'><td style='padding:0in 0in 0in 0in'><p class=MsoNormal>&nbsp;</p></td><td style='padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'>Nguyễn Tấn Dũng</td></tr>" +
                    "</table>" ;
            // Aggregate parts of the file together 
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", booksToRead)) + mhtmlBottom;

            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    };
}


$(".detaill").click(function(){
	var loai="0", chuanhap = 0, xuat=false, ten="";
	var a = "";
	if ($('.checkboxbttNULL').is(":checked"))
	{
	  chuanhap=1;
	}
	if ($('.checkboxbttHTML').is(":checked"))
	{
	  xuat=true;
	}
	if ($('.radiobtt1').is(":checked"))
	{
	  loai="1";
	}
	if ($('.radiobtt2').is(":checked"))
	{
	  loai="2";
	}
	var str = $(this).attr('id');
	var res = str.split(" ");
	ten = res[0] + " - Năm được phân công: "+ res[2] +"";
	var text = '{"typeNode":"'+ loai +'","information":'+ chuanhap +',"folderPath":"'+ res[1] +'"}';
	var formData = jQuery.parseJSON(text);
	if(xuat)
	{
		var url = YAHOO.lang.substitute(Alfresco.constants.URL_PAGECONTEXT + "{site}output?t={terms}&q={query}&r={repo}",
         {
			site: "",
            terms: "",//encodeURIComponent(Dom.get(this.id + "-search-text").value),
            query: encodeURIComponent(YAHOO.lang.JSON.stringify(formData)),
            repo: ""
         });
         
         window.location.href = url;
	}
	else
	{
		var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "slingshot/searchreport?query={query}",
             {
                query: encodeURIComponent(YAHOO.lang.JSON.stringify(formData))
             });
        	 $.get(url, function(data){
        		  //alert("Data: " + data);
        		  //alert("Name 0: " + data.items[0].name);
        		 	var tenloai = "Công văn, Hồ sơ";
        		 		if(loai == "1") tenloai = "Công văn";
        		 		if(loai == "2") tenloai = "Hồ sơ";
        		  $("#page-content").wordExport("BaoCaoChiTiet", data, ten, tenloai);
        		  //$("#page-content").wordExportBaoCaoChiTiet("BaoCaoChiTiet", data, ten, tenloai);
        		});
	}
	
	//alert(chuanhap + ":" + xuat + ":" + loai + ":" + $(this).attr('id') + ":" + $(this).val());
});
$(".dell").click(function(){
		//Logic to delete the item
		var str = $(this).attr('id');
		var res = str.split(" ");
		var text = "";
		if(res.length == 1)	
			text = '{"year":"'+ res[0] +'", "username":"nlll"}';
		else
			text = '{"year":"'+ res[1] +'", "username":"'+ res[0] +'"}'
		var formData = jQuery.parseJSON(text);
		var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "slingshot/searchdelete?query={query}",
		 {
			query: encodeURIComponent(YAHOO.lang.JSON.stringify(formData))
		 });
		var result = confirm("Bạn thực sự muốn xóa "+ res[0] +"?");
		if (result==true) {
		 $.get(url, function(o){
				//alert('Yes1');
				if (o==true) {
					//alert('Yes2');
					//new Messi(messidmktc , {title: messidmktctt});
					window.location.href='/share/page/report';
				}
				else {
					alert('Loi Yes3');
				}
				
			}, 'json')
			.fail(function(err) 
			{ 	
				alert( "Loi NO ");
			});
		}
});
$(".clickreportusername").click(function(){
	var nam = $(this).attr('id');
	if ($('.checkboxbttHTML').is(":checked"))
	{
		var win = window.open('/share/page/reportusername?year='+ $(this).attr('id') +'', '_blank');
		win.focus();
	}
	else
	{	
		var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/usernamebyyear?year="+ $(this).attr('id') +"");
		 $.get(url, function(data){
			  if(data == null)
					alert("Chưa có dữ liệu để báo cáo");
				else
				$("#page-content").wordExportBaoCaoChiTiet("BaoCaoTongHopTheoNguoiDung", data, "Báo cáo tổng hợp theo người dùng năm " + nam, "Công văn, Hồ sơ");
			});
	}
});
$(".clickreportyear").click(function(){
	
	if ($('.checkboxbttHTML').is(":checked"))
	{
		var win = window.open('/share/page/reportyear', '_blank');
		win.focus();
	}
	else
	{	
		var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/allyear");
		 $.get(url, function(data){
			  $("#page-content").wordExportBaoCaoTheoNam("BaoCaoTongHopTheoNam", data, "Báo cáo tổng hợp theo năm", "Công văn, Hồ sơ");
			});
	}
});






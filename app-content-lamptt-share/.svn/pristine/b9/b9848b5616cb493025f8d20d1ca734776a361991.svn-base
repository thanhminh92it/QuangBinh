
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
        		chuoi += "<tr style='mso-yfti-irow:2'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+stt+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt'>"+data.items[i].description+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>"+data.items[i].path+"</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>x</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td></tr> ";
        	}
            var booksToRead =
                "<table style='width: 100%'>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>UBND TỈNH QUẢNG NINH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>VĂN PHÒNG</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Ninh, ngày 17 tháng 09 năm 2014</td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>KẾT QUẢ XỬ LÝ CÔNG VIỆC</b></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>Người xử lý: "+ten+"</b></td></tr>" +
                    "</table>" +"<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><b>(Tên thông tin cần tìm: "+(loai=="la:t3"?"Công Văn":"Hồ Sơ")+")</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table border='0' cellspacing=0 cellpadding = 0  style='width: 100%; text-align: center; border: 0 solid #000000; mso-cellspacing:0in;border-top:solid windowtext 1.0pt; border-left:solid windowtext 1.0pt;border-bottom:none;border-right:none;mso-border-top-alt:solid windowtext .75pt;mso-border-left-alt:solid windowtext .75pt;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<thead>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td  rowspan=2 style='width:5%;" + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>TT<o:p></o:p></b></p></td><td rowspan='2' style='width: 40%; border-left: 1; " + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Nội dung văn bản (kèm đường link nếu là view Web)<o:p></o:p></b></p><td rowspan=2 style='width: 15%; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Thư mục<o:p></o:p></b></p></td><td colspan=2 style='width: 40%;" + stylesheet2 + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Tình trạng xử lý<o:p></o:p></b></p></td>" +
                    "<tr style='mso-yfti-irow:1'><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Đã cập nhật xong<o:p></o:p></b></p></td><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Chưa cập nhật xong<o:p></o:p></b></p></td></tr>" +
                    "</thead>" +
                    chuoi +
                    
                    //day la thang tong
                    " <tr style='mso-yfti-irow:7;mso-yfti-lastrow:yes'><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><b style='mso-bidi-font-weight:normal'>Tổng cộng<o:p></o:p></b></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'><o:p>&nbsp;</o:p></p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>5</p></td><td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>0</p></td></tr>" +

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


/**
 * Advanced Search component.
 * 
 * @namespace Alfresco
 * @class Alfresco.AdvancedSearch
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
       Event = YAHOO.util.Event,
       Bubbling = YAHOO.Bubbling;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML;

   /**
    * Advanced Search constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Alfresco.AdvancedSearch} The new AdvancedSearch instance
    * @constructor
    */
   Alfresco.AdvancedSearch = function(htmlId)
   {
      Alfresco.AdvancedSearch.superclass.constructor.call(this, "Alfresco.AdvancedSearch", htmlId, ["button", "container"]);
      
      Bubbling.on("beforeFormRuntimeInit", this.onBeforeFormRuntimeInit, this);
      Bubbling.on("afterFormRuntimeInit", this.onAfterFormRuntimeInit, this);
      
      return this;
   };
   
   YAHOO.extend(Alfresco.AdvancedSearch, Alfresco.component.Base,
   {
      /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
         /**
          * Current siteId
          * 
          * @property siteId
          * @type string
          */
         siteId: "",
         
         /**
          * Search Form objects, for example:
          * {
          *    id: "advanced-search",
          *    type: "cm:content",
          *    label: "Content",
          *    description: "All types of content"
          * }
          * 
          * @property searchForms
          * @type Array
          */
         searchForms: [],
         
         /**
          * Previously saved query, if any
          * 
          * @property savedQuery
          * @type string
          */
         savedQuery: "",
         
         /**
          * It is possible to disable searching entire repo via config
          * 
          * @property searchRepo
          * @type boolean
          */
         searchRepo: true
      },
      
      /**
       * Currently visible Search Form object
       */
      currentForm: null,
      
      /**
       * Fired by YUI when parent element is available for scripting.
       * Component initialisation, including instantiation of YUI widgets and event listener binding.
       *
       * @method onReady
       */
      onReady: function ADVSearch_onReady()
      {
         var me = this,
            domId = this.id + "-form-list",
            elList = Dom.get(domId);
         
         // see if a saved query json string is provided
         var defaultForm = this.options.searchForms[0];
         if (this.options.savedQuery.length !== 0)
         {
            var savedQuery = YAHOO.lang.JSON.parse(this.options.savedQuery);
            if (savedQuery.datatype)
            {
               for (var f in this.options.searchForms)
               {
                  var form = this.options.searchForms[f];
                  if (form.type === savedQuery.datatype)
                  {
                     // found previous form datatype - use as first form to display
                     defaultForm = form;
                     break;
                  }
               }
            }
         }
         
         // search YUI button and menus
         this.widgets.searchButton1 = Alfresco.util.createYUIButton(this, "search-button-1", this.onSearchClick);
         this.widgets.searchButton2 = Alfresco.util.createYUIButton(this, "search-button-2", this.onSearchClick);

         this.widgets.formButton = Alfresco.util.createYUIButton(this, "selected-form-button", function(p_sType, p_aArgs)
         {
            // update selected item menu button label
            var form = this.options.searchForms[p_aArgs[1].index];
            this.widgets.formButton.set("label", form.label);
            this.widgets.formButton.set("title", form.description);

            // render the appropriate form template
            this.renderFormTemplate(form);
         },
         {
            label: defaultForm.label,
            title: defaultForm.description,
            type: "menu",
            menu: "selected-form-list"
         });

         // render initial form template
         this.renderFormTemplate(defaultForm, true);
         
         // register the "enter" event on the search text field
         var queryInput = "";//Dom.get(this.id + "-search-text");
         this.widgets.enterListener = new YAHOO.util.KeyListener(queryInput, 
         {
            keys: YAHOO.util.KeyListener.KEY.ENTER
         }, 
         {
            fn: me._searchEnterHandler,
            scope: this,
            correctScope: true
         }, "keydown").enable();
         
         // Finally show the component body here to prevent UI artifacts on YUI button decoration
         Dom.setStyle(this.id + "-body", "visibility", "visible");
      },

      /**
       * DEFAULT ACTION EVENT HANDLERS
       * Handlers for standard events fired from YUI widgets, e.g. "click"
       */
      
      /**
       * Loads or retrieves from cache the Form template for a given content type
       * 
       * @method renderFormTemplate
       * @param form {Object} Form descriptor to render template for
       * @param repopulate {boolean} If true, repopulate form instance based on supplied data
       */
      renderFormTemplate: function ADVSearch_renderFormTemplate(form, repopulate)
      {
         // update current form state
         this.currentForm = form;
         this.currentForm.repopulate = repopulate;
         
         var containerDiv = Dom.get(this.id + "-forms");
         
         var visibleFormFn = function()
         {
            // hide visible form if any
            for (var i=0, c=containerDiv.children; i<c.length; i++)
            {
               if (!Dom.hasClass(c[i], "hidden"))
               {
                  Dom.addClass(c[i], "hidden");
                  break;
               }
            }
            
            // display cached form element
            Dom.removeClass(form.htmlid, "hidden");
            
            // reset focus to search input textbox
            //Dom.get(this.id + "-search-text").focus();
         };
         
         if (!form.htmlid)
         {
            // generate child container div for this form
            var htmlid = this.id + "_" + containerDiv.children.length;
            var formDiv = document.createElement("div");
            formDiv.id = htmlid;
            Dom.addClass(formDiv, "hidden");
            Dom.addClass(formDiv, "share-form");
            
            // cache htmlid so we know the form is present on the form
            form.htmlid = htmlid;
            
            // load the form component for the appropriate type
            var formUrl = YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT + "components/form?itemKind=type&itemId={itemId}&formId={formId}&mode=edit&showSubmitButton=false&showCancelButton=false",
            {
               itemId: form.type,
               formId: form.id
            });
            var formData =
            {
               htmlid: htmlid
            };
            Alfresco.util.Ajax.request(
            {
               url: formUrl,
               dataObj: formData,
               successCallback:
               {
                  fn: function ADVSearch_onFormTemplateLoaded(response)
                  {
                     // Inject the template from the XHR request into the child container div
                     formDiv.innerHTML = response.serverResponse.responseText;
                     containerDiv.appendChild(formDiv);
                     
                     visibleFormFn.call(this);
                  },
                  scope: this
               },
               failureMessage: "Could not load form component '" + formUrl + "'.",
               scope: this,
               execScripts: true
            });
         }
         else
         {
            visibleFormFn.call(this);
         }
      },
      
      /**
       * Repopulate currently displayed Form fields based on saved query data
       *
       * @method repopulateCurrentForm
       */
      repopulateCurrentForm: function ADVSearch_repopulateCurrentForm()
      {
         if (this.options.savedQuery.length !== 0)
         {
            var savedQuery = YAHOO.lang.JSON.parse(this.options.savedQuery);
            var elForm = Dom.get(this.currentForm.runtime.formId);
            
            for (var i = 0, j = elForm.elements.length; i < j; i++)
            {
               var element = elForm.elements[i];
               var name = element.name;
               if (name != undefined && name !== "-")
               {
                  var savedValue = savedQuery[name];
                  if (savedValue !== undefined)
                  {
                     if (element.type === "checkbox" || element.type === "radio")
                     {
                        element.checked = (savedValue === "true");
                     }
                     else
                     {
                        element.value = savedValue;
                     }
                     
                     // reverse value setting doesn't work with checkboxes because of the 
                     // hidden field used to store the underlying field value
                     if (element.type === "hidden")
                     {
                     	// hidden fields could be a part of a checkbox in the Forms runtime
                     	// so look if there is a checkbox attached this hidden field and set the value
                     	var chk = Dom.get(element.id + "-entry");
                     	if (chk && chk.type === "checkbox")
                     	{
                     	   chk.checked = (savedValue === "true");
                     	}
                     }
                  }
               }
            }
            
            Bubbling.fire("formContentsUpdated");
         }
      },
      
      /**
       * Event handler that gets fired when user clicks the Search button.
       *
       * @method onSearchClick
       * @param e {object} DomEvent
       * @param obj {object} Object passed back from addListener method
       */
      onSearchClick: function ADVSearch_onSearchClick(e, obj)
      {
         // retrieve form data structure directly from the runtime
         var formData = this.currentForm.runtime.getFormData();
         
         // add DD type to form data structure
         formData.datatype = this.currentForm.type;
         // xoa removed
         delete formData.folders_removed;
         
         if (formData.export == "false"){
        	 var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "slingshot/searchreport?query={query}",
             {
                query: encodeURIComponent(YAHOO.lang.JSON.stringify(formData))
             });
        	 $.get(url, function(data){
        		  //alert("Data: " + data);
        		  //alert("Name 0: " + data.items[0].name);
        		 
        		  $("#page-content").wordExport("BaoCaoChiTiet", data, formData.username, formData.datatype);
        		});
        	 
         }
         else{
        	// build and execute url for search page
             var url = YAHOO.lang.substitute(Alfresco.constants.URL_PAGECONTEXT + "{site}output?t={terms}&q={query}&r={repo}",
             {
                site: (this.options.siteId.length !== 0 ? ("site/" + this.options.siteId + "/") : ""),
                terms: "",//encodeURIComponent(Dom.get(this.id + "-search-text").value),
                query: encodeURIComponent(YAHOO.lang.JSON.stringify(formData)),
                repo: this.options.searchRepo.toString()
             });
             
             window.location.href = url;
         }
         
         
         
      },
      
      /**
       * Event handler called when the "beforeFormRuntimeInit" event is received
       */
      onBeforeFormRuntimeInit: function ADVSearch_onBeforeFormRuntimeInit(layer, args)
      {
         // extract the current form runtime - so we can reference it later
         this.currentForm.runtime = args[1].runtime;
         
         // Repopulate current form from url query data?
         if (this.currentForm.repopulate)
         {
            this.currentForm.repopulate = false;
            this.repopulateCurrentForm();
         }
      },

      /**
       * Event handler called when the "afterFormRuntimeInit" event is received
       */
      onAfterFormRuntimeInit: function ADVSearch_onAfterFormRuntimeInit(layer, args)
      {
         // extract the current form runtime - so we can reference it later
         this.currentForm.runtime = args[1].runtime;
         var form = (Dom.get(this.currentForm.runtime.formId));
         Event.removeListener(form, "submit");
         form.setAttribute("onsubmit", "return false;");
      },

      /**
       * Search text box ENTER key event handler
       * 
       * @method _searchEnterHandler
       */
      _searchEnterHandler: function ADVSearch__searchEnterHandler(e, args)
      {
         this.onSearchClick(e, args);
      }
   });
})();
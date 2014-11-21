/**
 * Copyright (C) 2005-2012 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Search component.
 * 
 * @namespace Alfresco
 * @class Alfresco.Search
 */

jQuery(document).ready(function ($) {
            $("a.word-export").click(function (event) {
                $("#page-content").wordExport();
            });
        });

if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName) {
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
            var stylesheet2 = "border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var stylesheet = "border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in";
            var styles = "";
            var a = "hello";
            var Stringdemo = [["1", "Anuba'rak","2001","40","7","4","3"],
                ["2", "SandKing","2010","33","102","3","14"],
                ["3", "Weaver","2014","23","111","32","12"]];
            var b = "";
            for(i = 0;i<Stringdemo.length;i++)
            {
                b += "<tr style='mso-yfti-irow:1'><td style=' " + stylesheet + "'>"+ Stringdemo[i][0] +"</td><td style='" + stylesheet + "'>"+ Stringdemo[i][1] +"</td><td style='" + stylesheet + "'>"+ Stringdemo[i][2] +"</td><td style='" + stylesheet + "'>"+ Stringdemo[i][3] +"</td><td style='" + stylesheet + "'>"+ Stringdemo[i][4] +"</td><td style='" + stylesheet + "'>"+ Stringdemo[i][5] +"</td><td style='" + stylesheet + "'>"+ Stringdemo[i][6] +"</td></tr>";
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
                    "<tr style='width: 100%; text-align: center'><td><b>(Tên thông tin cần tìm:…….)</b></td></tr>" +
                "</table>" +
                "<br/>" +
                "<table border='0' cellspacing=0 cellpadding = 0  style='width: 100%; text-align: center; border: 0 solid #000000; mso-cellspacing:0in;border-top:solid windowtext 1.0pt; border-left:solid windowtext 1.0pt;border-bottom:none;border-right:none;mso-border-top-alt:solid windowtext .75pt;mso-border-left-alt:solid windowtext .75pt;mso-padding-alt:0in 0in 0in 0in'>" +
                    "<thead>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td  rowspan=2 style='width:5%;" + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>TT<o:p></o:p></b></p></td><td rowspan='2' style='width: 25%; " + stylesheet + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Họ và tên<o:p></o:p></b></p><td valign=top  style='width: 10%; border:none;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b><o:p>&nbsp;</o:p></b></p></td><td rowspan=2 style='width: 10%; border:none;border-bottom:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align:center'><b>Tổng số trang<o:p></o:p></b></p></td><td rowspan='2' style='width: 10%;" + stylesheet2 + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Tổng số file<o:p></o:p></b></p></td><td colspan=3 style='width: 40%;" + stylesheet2 + "'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Tình trạng xử lý<o:p></o:p></b></p></td>" +
                    "<tr style='mso-yfti-irow:1'><td valign=top style='width:10%;border:none;border-bottom:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='text-align: center;'><b>Năm<o:p></o:p></b></p></td><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Đã cập nhật xong<o:p></o:p></b></p></td><td style='width:20%;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin:0in;margin-bottom:.0001pt;text-align:center'><b>Chưa cập nhật xong<o:p></o:p></b></p></td></tr>" +
                    "</thead>" +
                    "<tbody>" +
                        b +
                        "<tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'><td colspan=3 style='width:40%;border:solid windowtext 1.0pt;border-left:none;mso-border-top-alt:solid windowtext .75pt;mso-border-bottom-alt:solid windowtext .75pt;mso-border-right-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'><p class=MsoNormal align=center style='margin-top:1.5pt;margin-right:1.5pt;margin-bottom:1.5pt;margin-left:2.0pt;text-align:center'>TỔNG CỘNG</p></td><td valign=top style='width:10%;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'></td><td style='width:10%;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'></td><td style='width:10%;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'></td><td style='width:15%;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'></td><td style='width:15%;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .75pt;padding:0in 0in 0in 0in'></td></tr>" +
                    "</tbody>" +
                "</table>" +
                "<br/><br/>" +
                "<table style='width: 100%'>" +
                    "<tr><td style='text-align: right; margin-right: 200px'><b>NGƯỜI TỔNG HỢP<b/></td></tr>" +
                "</table>" +
                "<table style='width: 100%'>" +
                    "<tr><td style='text-align: right; margin-right: 220px'>Nguyễn Tấn Dũng</td></tr>" +
                "</table>";

            // Aggregate parts of the file together 
            var fileContent = static.mhtml.top.replace("_html_",static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_",booksToRead)) + mhtmlBottom;

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


(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
       Event = YAHOO.util.Event;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML;

   /**
    * Search constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Alfresco.Search} The new Search instance
    * @constructor
    */
   Alfresco.Search = function(htmlId)
   {
      Alfresco.Search.superclass.constructor.call(this, "Alfresco.Search", htmlId, ["button", "container", "datasource", "datatable", "paginator", "json"]);
      
      // Decoupled event listeners
      YAHOO.Bubbling.on("onSearch", this.onSearch, this);
      
      return this;
   };
   
   YAHOO.extend(Alfresco.Search, Alfresco.component.SearchBase,
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
          * Current site title
          * 
          * @property siteTitle
          * @type string
          */
         siteTitle: "",
         
         /**
          * Maximum number of results displayed.
          * 
          * @property maxSearchResults
          * @type int
          * @default 250
          */
         maxSearchResults: 250,
         
         /**
          * Results page size.
          * 
          * @property pageSize
          * @type int
          * @default 50
          */
         pageSize: 50,
         
         /**
          * Search term to use for the initial search
          * @property initialSearchTerm
          * @type string
          * @default ""
          */
         initialSearchTerm: "",
         
         /**
          * Search tag to use for the initial search
          * @property initialSearchTag
          * @type string
          * @default ""
          */
         initialSearchTag: "",
         
         /**
          * States whether all sites should be searched.
          * 
          * @property initialSearchAllSites
          * @type boolean
          */
         initialSearchAllSites: true,
         
         /**
          * States whether repository should be searched.
          * This is in preference to current or all sites.
          * 
          * @property initialSearchRepository
          * @type boolean
          */
         initialSearchRepository: false,
         
         /**
          * Sort property to use for the initial search.
          * Empty default value will use score relevance default.
          * @property initialSort
          * @type string
          * @default ""
          */
         initialSort: "",
         
         /**
          * Advanced Search query - forms data json format based search.
          * @property searchQuery
          * @type string
          * @default ""
          */
         searchQuery: "",
         
         /**
          * Search root node.
          * @property searchRootNode
          * @type string
          * @default ""
          */
         searchRootNode: "",
         
         /**
          * Number of characters required for a search.
          *
          * @property minSearchTermLength
          * @type int
          * @default 1
          */
         minSearchTermLength: 1
      },
      
      /**
       * Search term used for the last search.
       */
      searchTerm: "",
      
      /**
       * Search tag used for the last search.
       */
      searchTag: "",
      
      /**
       * Whether the search was over all sites or just the current one
       */
      searchAllSites: true,
      
      /**
       * Whether the search is over the entire repository - in preference to site or all sites
       */
      searchRepository: false,
      
      /**
       * Search sort used for the last search.
       */
      searchSort: "",
      
      /**
       * Number of search results.
       */
      resultsCount: 0,
      
      /**
       * Current visible page index - counts from 1
       */
      currentPage: 1,
      
      /**
       * True if there are more results than the ones listed in the table.
       */
      hasMoreResults: false,
      
      /**
       * Fired by YUI when parent element is available for scripting.
       * Component initialisation, including instantiation of YUI widgets and event listener binding.
       *
       * @method onReady
       */
      onReady: function Search_onReady()
      {
         var me = this;
         
         // DataSource definition
         var uriSearchResults = Alfresco.constants.PROXY_URI_RELATIVE + "slingshot/searchreport?";
         this.widgets.dataSource = new YAHOO.util.DataSource(uriSearchResults,
         {
            responseType: YAHOO.util.DataSource.TYPE_JSON,
            connXhrMode: "queueRequests",
            responseSchema:
            {
                resultsList: "items"
            }
         });
         
         // YUI Paginator definition
         var handlePagination = function Search_handlePagination(state, me)
         {
            me.currentPage = state.page;
            me.widgets.paginator.setState(state);
         };
         this.widgets.paginator = new YAHOO.widget.Paginator(
         {
            containers: [this.id + "-paginator-top", this.id + "-paginator-bottom"],
            rowsPerPage: this.options.pageSize,
            initialPage: 1,
            template: this.msg("pagination.template"),
            pageReportTemplate: this.msg("pagination.template.page-report"),
            previousPageLinkLabel: this.msg("pagination.previousPageLinkLabel"),
            nextPageLinkLabel: this.msg("pagination.nextPageLinkLabel")
         });
         this.widgets.paginator.subscribe("changeRequest", handlePagination, this);
         
         // setup of the datatable.
         this._setupDataTable();
         
         // set initial value and register the "enter" event on the search text field
         var queryInput = Dom.get(this.id + "-search-text");
         queryInput.value = this.options.initialSearchTerm;
         
         this.widgets.enterListener = new YAHOO.util.KeyListener(queryInput, 
         {
            keys: YAHOO.util.KeyListener.KEY.ENTER
         }, 
         {
            fn: me._searchEnterHandler,
            scope: this,
            correctScope: true
         }, "keydown").enable();
         
         // trigger the initial search
         YAHOO.Bubbling.fire("onSearch",
         {
            searchTerm: this.options.initialSearchTerm,
            searchTag: this.options.initialSearchTag,
            searchSort: this.options.initialSort,
            searchAllSites: this.options.initialSearchAllSites,
            searchRepository: this.options.initialSearchRepository
         });
         
         // toggle site scope links
         var toggleLink = Dom.get(this.id + "-site-link");
         Event.addListener(toggleLink, "click", this.onSiteSearch, this, true);
         toggleLink = Dom.get(this.id + "-all-sites-link");
         Event.addListener(toggleLink, "click", this.onAllSiteSearch, this, true);
         toggleLink = Dom.get(this.id + "-repo-link");
         Event.addListener(toggleLink, "click", this.onRepositorySearch, this, true);
         
         // search YUI button
         this.widgets.searchButton = Alfresco.util.createYUIButton(this, "search-button", this.onSearchClick);
         
         // menu button for sort options
         this.widgets.sortButton = new YAHOO.widget.Button(this.id + "-sort-menubutton",
         {
            type: "menu", 
            menu: this.id + "-sort-menu",
            menualignment: ["tr", "br"],
            lazyloadmenu: false
         });
         // set initially selected sort button label
         var menuItems = this.widgets.sortButton.getMenu().getItems();
         for (var m in menuItems)
         {
            if (menuItems[m].value === this.options.initialSort)
            {
               this.widgets.sortButton.set("label", this.msg("label.sortby", menuItems[m].cfg.getProperty("text")));
               break;
            }
         }
         // event handler for sort menu
         this.widgets.sortButton.getMenu().subscribe("click", function(p_sType, p_aArgs)
         {
            var menuItem = p_aArgs[1];
            if (menuItem)
            {
               me.refreshSearch(
               {
                  searchSort: menuItem.value
               });
            }
         });
         
         // Hook action events
         var fnActionHandler = function Search_fnActionHandler(layer, args)
         {
            var owner = YAHOO.Bubbling.getOwnerByTagName(args[1].anchor, "span");
            if (owner !== null)
            {
               if (typeof me[owner.className] == "function")
               {
                  args[1].stop = true;
                  var tagId = owner.id.substring(me.id.length + 1);
                  me[owner.className].call(me, tagId);
               }
            }
            return true;
         };
         YAHOO.Bubbling.addDefaultAction("search-tag", fnActionHandler);
         
         // Finally show the component body here to prevent UI artifacts on YUI button decoration
         Dom.setStyle(this.id + "-body", "visibility", "visible");
      },
      
      _setupDataTable: function Search_setupDataTable()
      {
         /**
          * DataTable Cell Renderers
          *
          * Each cell has a custom renderer defined as a custom function. See YUI documentation for details.
          * These MUST be inline in order to have access to the Alfresco.Search class (via the "me" variable).
          */
         var me = this;
         
         /**
          * Thumbnail custom datacell formatter
          *
          * @method renderCellThumbnail
          * @param elCell {object}
          * @param oRecord {object}
          * @param oColumn {object}
          * @param oData {object|string}
          */
         renderCellThumbnail = function Search_renderCellThumbnail(elCell, oRecord, oColumn, oData)
         {
            oColumn.width = 100;
            Dom.setStyle(elCell.parentNode, "width", oColumn.width + "px");
            Dom.setStyle(elCell.parentNode, "background-color", "#f4f4f4");
            Dom.addClass(elCell, "thumbnail-cell");
            if (oRecord.getData("type") === "document")
            {
               Dom.addClass(elCell, "thumbnail");
            }
            
            elCell.innerHTML = me.buildThumbnailHtml(oRecord);
         };

         /**
          * Description/detail custom cell formatter
          *
          * @method renderCellDescription
          * @param elCell {object}
          * @param oRecord {object}
          * @param oColumn {object}
          * @param oData {object|string}
          */
         renderCellDescription = function Search_renderCellDescription(elCell, oRecord, oColumn, oData)
         {
            // apply class to the appropriate TD cell
            Dom.addClass(elCell.parentNode, "description");
            
            // site and repository items render with different information available
            var site = oRecord.getData("site");
            var url = me._getBrowseUrlForRecord(oRecord);
            
            // displayname and link to details page
            var displayName = oRecord.getData("displayName");
            var desc = '<h3 class="itemname"><a href="' + url + '" class="theme-color-1">' + $html(displayName) + '</a>';
            // add title (if any) to displayname area
            var title = oRecord.getData("title");
            if (title && title !== displayName)
            {
               desc += '<span class="title">(' + $html(title) + ')</span>';
            }
            desc += '</h3>';
            
            // description (if any)
            var txt = oRecord.getData("description");
            if (txt)
            {
               desc += '<div class="details meta">' + $html(txt) + '</div>';
            }
            
            // detailed information, includes site etc. type specific
            desc += '<div class="details">';
            var type = oRecord.getData("type");
            desc += me.buildTextForType(type);
            
            // link to the site and other meta-data details
            if (site)
            {
               desc += ' ' + me.msg("message.insite");
               desc += ' <a href="' + Alfresco.constants.URL_PAGECONTEXT + 'site/' + $html(site.shortName) + '/dashboard">' + $html(site.title) + '</a>';
            }
            if (oRecord.getData("size") !== -1)
            {
               desc += ' ' + me.msg("message.ofsize");
               desc += ' <span class="meta">' + Alfresco.util.formatFileSize(oRecord.getData("size")) + '</span>';
            }
            if (oRecord.getData("modifiedBy"))
            {
               desc += ' ' + me.msg("message.modifiedby");
               desc += ' <a href="' + Alfresco.constants.URL_PAGECONTEXT + 'user/' + encodeURI(oRecord.getData("modifiedByUser")) + '/profile">' + $html(oRecord.getData("modifiedBy")) + '</a>';
            }
            desc += ' ' + me.msg("message.modifiedon") + ' <span class="meta">' + Alfresco.util.formatDate(oRecord.getData("modifiedOn")) + '</span>';
            desc += '</div>';
            
            // folder path (if any)
            var path = oRecord.getData("path");
            desc += me.buildPath(type, path, site);
            
            // tags (if any)
            var tags = oRecord.getData("tags");
            if (tags.length !== 0)
            {
               var i, j;
               desc += '<div class="details"><span class="tags">' + me.msg("label.tags") + ': ';
               for (i = 0, j = tags.length; i < j; i++)
               {
                   desc += '<span id="' + me.id + '-' + $html(tags[i]) + '" class="searchByTag"><a class="search-tag" href="#">' + $html(tags[i]) + '</a> </span>';
               }
               desc += '</span></div>';
            }
            
            elCell.innerHTML = desc;
         };

         // DataTable column defintions
         var columnDefinitions = [
         {
            key: "image", label: me.msg("message.preview"), sortable: false, formatter: renderCellThumbnail, width: 100
         },
         {
            key: "summary", label: me.msg("label.description"), sortable: false, formatter: renderCellDescription
         }];

         // DataTable definition
         this.widgets.dataTable = new YAHOO.widget.DataTable(this.id + "-results", columnDefinitions, this.widgets.dataSource,
         {
            renderLoopSize: Alfresco.util.RENDERLOOPSIZE,
            initialLoad: false,
            paginator: this.widgets.paginator,
            MSG_LOADING: ""
         });

         // show initial message
         this._setDefaultDataTableErrors(this.widgets.dataTable);
         if (this.options.initialSearchTerm.length === 0 && this.options.initialSearchTag.length === 0)
         {
            this.widgets.dataTable.set("MSG_EMPTY", "");
         }
         
         // Override abstract function within DataTable to set custom error message
         this.widgets.dataTable.doBeforeLoadData = function Search_doBeforeLoadData(sRequest, oResponse, oPayload)
         {
            if (oResponse.error)
            {
               try
               {
                  var response = YAHOO.lang.JSON.parse(oResponse.responseText);
                  me.widgets.dataTable.set("MSG_ERROR", response.message);
               }
               catch(e)
               {
                  me._setDefaultDataTableErrors(me.widgets.dataTable);
               }
            }
            else if (oResponse.results)
            {
               // clear the empty error message
               me.widgets.dataTable.set("MSG_EMPTY", "");
               
               // update the results count, update hasMoreResults.
               me.hasMoreResults = (oResponse.results.length > me.options.maxSearchResults);
               if (me.hasMoreResults)
               {
                  oResponse.results = oResponse.results.slice(0, me.options.maxSearchResults);
                  me.resultsCount = me.options.maxSearchResults;
               }
               else
               {
                  me.resultsCount = oResponse.results.length;
               }
               
               if (me.resultsCount > me.options.pageSize)
               {
                  Dom.removeClass(me.id + "-paginator-top", "hidden");
                  Dom.removeClass(me.id + "-search-bar-bottom", "hidden");
               }
               
               // display help text if no results were found
               if (me.resultsCount === 0)
               {
                  Dom.removeClass(me.id + "-help", "hidden");
               }
            }
            // Must return true to have the "Loading..." message replaced by the error message
            return true;
         };
         
         // Rendering complete event handler
         me.widgets.dataTable.subscribe("renderEvent", function()
         {
            // Update the paginator
            me.widgets.paginator.setState(
            {
               page: me.currentPage,
               totalRecords: me.resultsCount
            });
            me.widgets.paginator.render();
         });
      },

      /**
       * Constructs the completed browse url for a record.
       * @param record {string} the record
       */
      _getBrowseUrlForRecord: function Search__getBrowseUrlForRecord(record)
      {
        return this.getBrowseUrlForRecord(record);
      },
      
      /**
       * Constructs the folder url for a record.
       * @param path {string} folder path
       *        For a site relative item this can be empty (root of doclib) or any path - without a leading slash
       *        For a repository item, this can never be empty - but will contain leading slash and Company Home root
       */
      _getBrowseUrlForFolderPath: function Search__getBrowseUrlForFolderPath(path, site)
      {
        return this.getBrowseUrlForFolderPath(path, site);
      },
      
      _buildSpaceNamePath: function Search__buildSpaceNamePath(pathParts, name)
      {
        return this.buildSpaceNamePath(pathParts, name);
      },

      /**
       * DEFAULT ACTION EVENT HANDLERS
       * Handlers for standard events fired from YUI widgets, e.g. "click"
       */

      /**
       * Perform a search for a given tag
       * The tag is simply handled as search term
       */
      searchByTag: function Search_searchTag(param)
      {
         this.refreshSearch(
         {
            searchTag: param,
            searchTerm: "",
            searchQuery: ""
         });
      },
      
      /**
       * Refresh the search page by full URL refresh
       *
       * @method refreshSearch
       * @param args {object} search args
       */
      refreshSearch: function Search_refreshSearch(args)
      {
         var searchTerm = this.searchTerm;
         if (args.searchTerm !== undefined)
         {
            searchTerm = args.searchTerm;
         }
         var searchTag = this.searchTag;
         if (args.searchTag !== undefined)
         {
            searchTag = args.searchTag;
         }
         var searchAllSites = this.searchAllSites;
         if (args.searchAllSites !== undefined)
         {
            searchAllSites = args.searchAllSites;
         }
         var searchRepository = this.searchRepository;
         if (args.searchRepository !== undefined)
         {
            searchRepository = args.searchRepository;
         }
         var searchSort = this.searchSort;
         if (args.searchSort !== undefined)
         {
            searchSort = args.searchSort;
         }
         var searchQuery = this.options.searchQuery;
         if (args.searchQuery !== undefined)
         {
            searchQuery = args.searchQuery;
         }
         
         // redirect back to the search page - with appropriate site context
         var url = Alfresco.constants.URL_PAGECONTEXT;
         if (this.options.siteId.length !== 0)
         {
            url += "site/" + this.options.siteId + "/";
         }
         
         // add search data webscript arguments
         url += "search?t=" + encodeURIComponent(searchTerm);
         if (searchSort.length !== 0)
         {
            url += "&s=" + searchSort;
         }
         if (searchQuery.length !== 0)
         {
            // if we have a query (already encoded), then apply it
            // most other options such as tag, terms are trumped
            url += "&q=" + searchQuery;
         }
         else if (searchTag.length !== 0)
         {
            url += "&tag=" + encodeURIComponent(searchTag);
         }
         url += "&a=" + searchAllSites + "&r=" + searchRepository;
         window.location = url;
      },

      /**
       * BUBBLING LIBRARY EVENT HANDLERS FOR PAGE EVENTS
       * Disconnected event handlers for inter-component event notification
       */

      /**
       * Execute Search event handler
       *
       * @method onSearch
       * @param layer {object} Event fired
       * @param args {array} Event parameters (depends on event type)
       */
      onSearch: function Search_onSearch(layer, args)
      {
         var obj = args[1];
         if (obj !== null)
         {
            var searchTerm = this.searchTerm;
            if (obj.searchTerm !== undefined)
            {
               searchTerm = obj.searchTerm;
            }
            var searchTag = this.searchTag;
            if (obj.searchTag !== undefined)
            {
               searchTag = obj.searchTag;
            }
            var searchAllSites = this.searchAllSites;
            if (obj.searchAllSites !== undefined)
            {
               searchAllSites = obj.searchAllSites;
            }
            var searchRepository = this.searchRepository;
            if (obj.searchRepository !== undefined)
            {
               searchRepository = obj.searchRepository;
            }
            var searchSort = this.searchSort;
            if (obj.searchSort !== undefined)
            {
               searchSort = obj.searchSort;
            }
            this._performSearch(
            {
               searchTerm: searchTerm,
               searchTag: searchTag,
               searchAllSites: searchAllSites,
               searchRepository: searchRepository,
               searchSort: searchSort
            });
         }
      },
      
      /**
       * Event handler that gets fired when user clicks the Search button.
       *
       * @method onSearchClick
       * @param e {object} DomEvent
       * @param obj {object} Object passed back from addListener method
       */
      onSearchClick: function Search_onSearchClick(e, obj)
      {
         this.refreshSearch(
         {
            searchTag: "",
            searchTerm: YAHOO.lang.trim(Dom.get(this.id + "-search-text").value),
            searchQuery: ""
         });
      },
      
      /**
       * Click event for Current Site search link
       * 
       * @method onSiteSearch
       */
      onSiteSearch: function Search_onSiteSearch(e, args)
      {
         this.refreshSearch(
         {
            searchAllSites: false,
            searchRepository: false
         });
      },
      
      /**
       * Click event for All Sites search link
       * 
       * @method onAllSiteSearch
       */
      onAllSiteSearch: function Search_onAllSiteSearch(e, args)
      {
         this.refreshSearch(
         {
            searchAllSites: true,
            searchRepository: false
         });
      },
      
      /**
       * Click event for Repository search link
       * 
       * @method onRepositorySearch
       */
      onRepositorySearch: function Search_onRepositorySearch(e, args)
      {
         this.refreshSearch(
         {
            searchRepository: true
         });
      },

      /**
       * Search text box ENTER key event handler
       * 
       * @method _searchEnterHandler
       */
      _searchEnterHandler: function Search__searchEnterHandler(e, args)
      {
         this.refreshSearch(
         {
            searchTag: "",
            searchTerm: YAHOO.lang.trim(Dom.get(this.id + "-search-text").value),
            searchQuery: ""
         });
      },
      
      /**
       * Updates search results list by calling data webscript with current site and query term
       *
       * @method _performSearch
       * @param args {object} search args
       */
      _performSearch: function Search__performSearch(args)
      {
         var searchTerm = YAHOO.lang.trim(args.searchTerm),
             searchTag = YAHOO.lang.trim(args.searchTag),
             searchAllSites = args.searchAllSites,
             searchRepository = args.searchRepository,
             searchSort = args.searchSort;
         
         if (this.options.searchQuery.length === 0 &&
             searchTag.length === 0 &&
             searchTerm.replace(/\*/g, "").length < this.options.minSearchTermLength)
         {
            Alfresco.util.PopupManager.displayMessage(
            {
               text: this.msg("message.minimum-length", this.options.minSearchTermLength)
            });
            return;
         }
         
         // empty results table
         this.widgets.dataTable.deleteRows(0, this.widgets.dataTable.getRecordSet().getLength());
         
         // update the ui to show that a search is on-going
         this.widgets.dataTable.set("MSG_EMPTY", "");
         this.widgets.dataTable.render();
         
         // Success handler
         function successHandler(sRequest, oResponse, oPayload)
         {
            // update current state on success
            this.searchTerm = searchTerm;
            this.searchTag = searchTag;
            this.searchAllSites = searchAllSites;
            this.searchRepository = searchRepository;
            this.searchSort = searchSort;
            
            this.widgets.dataTable.onDataReturnInitializeTable.call(this.widgets.dataTable, sRequest, oResponse, oPayload);
            
            // update the results info text
            this._updateResultsInfo();
            
            // set focus to search input textbox
            Dom.get(this.id + "-search-text").focus();
         }
         
         // Failure handler
         function failureHandler(sRequest, oResponse)
         {
            switch (oResponse.status)
            {
               case 401:
                  // Session has likely timed-out, so refresh to display login page
                  window.location.reload();
                  break;
               case 408:
                  // Timeout waiting on Alfresco server - probably due to heavy load
                  Dom.get(this.id + '-search-info').innerHTML = this.msg("message.timeout");
                  break;
               default:
                  // General server error code
                  if (oResponse.responseText)
                  {
                     var response = YAHOO.lang.JSON.parse(oResponse.responseText);
                     Dom.get(this.id + '-search-info').innerHTML = response.message;
                  }
                  else
                  {
                     Dom.get(this.id + '-search-info').innerHTML = oResponse.statusText;
                  }
                  break;
            }
         }
         
         this.widgets.dataSource.sendRequest(this._buildSearchParams(searchRepository, searchAllSites, searchTerm, searchTag, searchSort),
         {
            success: successHandler,
            failure: failureHandler,
            scope: this
         });
      },
      
      /**
       * Updates the results info text.
       * 
       * @method _updateResultsInfo
       */
      _updateResultsInfo: function Search__updateResultsInfo()
      {
         // update the search results field
         var text;
         var resultsCount = "" + this.resultsCount;
         if (this.hasMoreResults)
         {
            text = this.msg("search.info.resultinfomore", resultsCount);
         }
         else
         {
            text = this.msg("search.info.resultinfo", resultsCount);
         }
         
         // apply the context
         if (this.searchRepository || this.options.searchQuery.length !== 0)
         {
            text += ' ' + this.msg("search.info.foundinrepository");
         }
         else if (this.searchAllSites)
         {
            text += ' ' + this.msg("search.info.foundinallsite");
         }
         else
         {
            text += ' ' + this.msg("search.info.foundinsite", $html(this.options.siteTitle));
         }
         
         // set the text
         Dom.get(this.id + '-search-info').innerHTML = text;
      },

      /**
       * Build URI parameter string for search JSON data webscript
       *
       * @method _buildSearchParams
       */
      _buildSearchParams: function Search__buildSearchParams(searchRepository, searchAllSites, searchTerm, searchTag, searchSort)
      {
         var site = searchAllSites ? "" : this.options.siteId;
         var params = YAHOO.lang.substitute("site={site}&term={term}&tag={tag}&maxResults={maxResults}&sort={sort}&query={query}&repo={repo}&rootNode={rootNode}",
         {
            site: encodeURIComponent(site),
            repo: searchRepository.toString(),
            term: encodeURIComponent(searchTerm),
            tag: encodeURIComponent(searchTag),
            sort: encodeURIComponent(searchSort),
            query: encodeURIComponent(this.options.searchQuery),
            rootNode: encodeURIComponent(this.options.searchRootNode),
            maxResults: this.options.maxSearchResults + 1 // to calculate whether more results were available
         });
         
         return params;
      },
      
      /**
       * Resets the YUI DataTable errors to our custom messages
       * NOTE: Scope could be YAHOO.widget.DataTable, so can't use "this"
       *
       * @method _setDefaultDataTableErrors
       * @param dataTable {object} Instance of the DataTable
       */
      _setDefaultDataTableErrors: function Search__setDefaultDataTableErrors(dataTable)
      {
         var msg = Alfresco.util.message;
         dataTable.set("MSG_EMPTY", msg("message.empty", "Alfresco.Search"));
         dataTable.set("MSG_ERROR", msg("message.error", "Alfresco.Search"));
      }
   });
})();
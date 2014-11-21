/**
 * Copyright (C) 2013-2014 Lamptt Software Limited.
 *
 * This file is part of Lamptt
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
	  
	  // Decoupled event listeners
      Bubbling.on("onSearch", this.onSearch, this);
      
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
          * Current t
          * 
          * @property t
          * @type string
          */
         searchTerm: "",
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
		 formData.datayear = this.options.searchTerm;
         // xoa removed
         delete formData.folders_removed;
         
    	// build and execute url for search page
         var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "slingshot/searchadd?query={query}",
         {
            query: encodeURIComponent(YAHOO.lang.JSON.stringify(formData))
         });
         
    
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
         
      },
	  
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
         
         
         // Success handler
         function successHandler(sRequest, oResponse, oPayload)
         {
            // update current state on success
            this.searchTerm = searchTerm;
            this.searchTag = searchTag;
            this.searchAllSites = searchAllSites;
            this.searchRepository = searchRepository;
            this.searchSort = searchSort;
            
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
      },
	  
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
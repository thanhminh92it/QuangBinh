/**
 * Advanced Search component GET method
 */

function main()
{
   // fetch the request params required by the advanced search component template
   var siteId = (page.url.templateArgs["site"] != null) ? page.url.templateArgs["site"] : "";
   
   var searchTerm = (page.url.args["t"] != null) ? page.url.args["t"] : "";
   
   // get the search forms from the config
   var formsElements = config.scoped["Lamptt"]["advanced-search"].getChildren("forms");
   var searchForms = [];
   
   for (var x = 0, forms; x < formsElements.size(); x++)
   {
      forms = formsElements.get(x).childrenMap["form"];
      
      for (var i = 0, form, formId, label, desc; i < forms.size(); i++)
      {
         form = forms.get(i);
         
         // get optional attributes and resolve label/description text
         formId = form.attributes["id"];
         
         label = form.attributes["label"];
         if (label == null)
         {
            label = form.attributes["labelId"];
            if (label != null)
            {
               label = msg.get(label);
            }
         }
         
         desc = form.attributes["description"];
         if (desc == null)
         {
            desc = form.attributes["descriptionId"];
            if (desc != null)
            {
               desc = msg.get(desc);
            }
         }
         
         // create the model object to represent the form definition
         searchForms.push(
         {
            id: formId ? formId : "search",
            type: form.value,
            label: label ? label : form.value,
            description: desc ? desc : ""
         });
      }
   }
   
   // Prepare the model
   var repoconfig = config.scoped['Search']['search'].getChildValue('repository-search');
   // config override can force repository search on/off
   model.searchRepo = (repoconfig != "none");
   model.siteId = siteId;
   model.searchForms = searchForms;
   model.searchTerm = searchTerm;
   
   // Widget instantiation metadata...
   var advancedSearch = {
      id : "AdvancedSearch", 
      name : "Alfresco.AdvancedSearch",
	  options : {
         siteId : model.siteId,
         savedQuery : (page.url.args.sq != null) ? page.url.args.sq : "",
         searchRepo : model.searchRepo,
         searchForms : model.searchForms,
		 searchTerm : model.searchTerm
      }
   };
   model.widgets = [advancedSearch];
}

main();


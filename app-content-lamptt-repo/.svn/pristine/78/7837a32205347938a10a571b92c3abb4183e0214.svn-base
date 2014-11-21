package zalu.vn.forms;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.alfresco.repo.forms.AssociationFieldDefinition;
import org.alfresco.repo.forms.Field;
import org.alfresco.repo.forms.Form;
import org.alfresco.repo.forms.FormData;
import org.alfresco.repo.forms.processor.AbstractFilter;
import org.alfresco.repo.forms.processor.node.ContentModelField;
import org.alfresco.service.cmr.repository.NodeRef;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class SearchInFolderFilter extends AbstractFilter<Object, NodeRef> {
	  private static final Log logger = LogFactory.getLog(SearchInFolderFilter.class);
	  
	  @Override
	  public void beforeGenerate(Object item, List<String> fieldStringList, 
	      List<String> forcedFieldStringList, Form form, 
	      Map<String, Object> contextMap) {
	    logger.debug("beforeGenerate");
	  }
	 
	  @Override
	  public void afterGenerate(Object item, List<String> fieldStringList, 
	      List<String> forcedFieldStringList, Form form, 
	      Map<String, Object> contextMap) {
	    logger.debug("afterGenerate");
	    try {
	      if (fieldStringList.contains("searchInFolder")) {
	        AssociationFieldDefinition associationFieldDefinition = new AssociationFieldDefinition("searchInFolder", "cm:folder", AssociationFieldDefinition.Direction.TARGET);
	        associationFieldDefinition.setDataKeyName("searchInFolder");
	        associationFieldDefinition.setLabel("searchInFolder");
	        Field field = new ContentModelField(associationFieldDefinition, Collections.EMPTY_LIST);
	        form.addField(field);
	      }
	    } catch (Exception e) {
	      logger.error("There was a problem creating the searchInFolder field", e);
	    }
	 
	  }
	 
	  @Override
	  public void beforePersist(Object item, FormData formData) {
	    logger.debug("beforePersist");
	  }
	 
	  @Override
	  public void afterPersist(Object item, FormData formData, 
	      NodeRef persistedObjectNodeRef) {
	    logger.debug("afterPersist");
	  }
	 
	}
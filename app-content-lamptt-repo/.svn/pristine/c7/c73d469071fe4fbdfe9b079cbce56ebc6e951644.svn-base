package zalu.vn.action.executer;

import java.util.List;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;

import zalu.vn.model.LampttModel;

public class EditTitle extends ActionExecuterAbstractBase{
	
	public static final String NAME = "EditTitle";
	
	private NodeService nodeService;
	public NodeService getNodeService() {
		return nodeService;
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	@Override
	protected void executeImpl(Action action, NodeRef nodeRef) {
		// TODO Auto-generated method stub
		if (nodeService.exists(nodeRef)){
			boolean ktra = false;
			QName[] type = new QName[3];
			type[0] = nodeService.getType(nodeRef);
			for (int i = 1; i < 3; i++) {
				type[i] = QName.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL,
						"t" + i);
				if (type[0].isMatch(type[i]))
					ktra = true;
			}
			if (ktra){
				
				String titlehosocu = "Thời gian: * - *";
				String titlecongvancu = "số * ngày *";
				String title = (String) nodeService.getProperty(nodeRef, ContentModel.PROP_TITLE);
				if (title.equals(titlehosocu)){
					nodeService.setProperty(nodeRef, ContentModel.PROP_TITLE, "Thời gian: ... - ...");
				}
				
				if (title.equals(titlecongvancu)){
					nodeService.setProperty(nodeRef, ContentModel.PROP_TITLE, "số ... ngày ...");
				}
			}
			
		}
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> arg0) {
		// TODO Auto-generated method stub
		
	}

}

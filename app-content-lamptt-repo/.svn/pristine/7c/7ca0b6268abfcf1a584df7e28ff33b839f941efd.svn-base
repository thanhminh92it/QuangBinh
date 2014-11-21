package zalu.vn.behavior;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.node.NodeServicePolicies;
import org.alfresco.repo.policy.Behaviour;
import org.alfresco.repo.policy.Behaviour.NotificationFrequency;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;
import org.apache.log4j.Logger;

import zalu.vn.model.LampttCountModel;

public class CountDate implements NodeServicePolicies.OnCreateNodePolicy{
	// behavior
	private Behaviour onCreateNode;

	// log
	private Logger logger = Logger.getLogger(Count.class);

	// dependencies
	private NodeService nodeService;
	private PolicyComponent policyComponent;

	
	public NodeService getNodeService() {
		return nodeService;
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	public PolicyComponent getPolicyComponent() {
		return policyComponent;
	}

	public void setPolicyComponent(PolicyComponent policyComponent) {
		this.policyComponent = policyComponent;
	}

	public void init() {
		logger.debug("Initializing Count behaviors");
		// create behaviour

		this.onCreateNode = new JavaBehaviour(this, "onCreateNode",
				NotificationFrequency.TRANSACTION_COMMIT);


		// Bin behaviour
		this.policyComponent.bindClassBehaviour(
				NodeServicePolicies.OnCreateNodePolicy.QNAME,
				ContentModel.TYPE_CONTENT, this.onCreateNode);

		
	}

	@Override
	public void onCreateNode(ChildAssociationRef childAssociationRef) {
		// TODO Auto-generated method stub

		NodeRef nodeRef = childAssociationRef.getChildRef();
		if (nodeService.exists(nodeRef)) {
			QName type = nodeService.getType(nodeRef);
			if (type.isMatch(ContentModel.TYPE_FOLDER)) {
				if (nodeService.hasAspect(nodeRef, QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASPECT_COUNTFOLDER))) {
					logger.debug("Doument already has aspect");
				} else {
					logger.debug("Adding SizeFolder aspect");
					nodeService.addAspect(nodeRef, QName.createQName(
							LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
							LampttCountModel.ASPECT_COUNTFOLDER), null);
				}
			} 
		}
	}
}
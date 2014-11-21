package zalu.vn.scripts;

import java.util.HashMap;
import java.util.Map;

import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;
import org.apache.log4j.Logger;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import zalu.vn.beans.CountBean;
import zalu.vn.model.LampttCountModel;
import zalu.vn.model.LampttModel;

public class InstallCount extends DeclarativeWebScript {

    Logger logger = Logger.getLogger(InstallCount.class);

    private CountBean countBean;
    private NodeService nodeService;

    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest req,
            Status status) {
    	String pass = req.getParameter("pass");
    	Map<String, Object> model = new HashMap<String, Object>();
    	if (pass.equalsIgnoreCase("remove")){
    		NodeRef nodeRef = countBean.getCompanyHome();
			countBean.RemoveAsForCountDate(nodeRef);
			countBean.Removecount(nodeRef);
			model.put("test", "done --> finish aspect");
    	}
    	else {
    		if (pass.equalsIgnoreCase("lamptt1")){
    			NodeRef nodeRef = countBean.getCompanyHome();
    			countBean.SetAsForCountDate(nodeRef);
    			countBean.count(nodeRef);
    			model.put("test", "done --> finish aspect");
    		}
    		else{
    			model.put("test", "false");
    		}
    	}
        return model;
    }
    
    public void setincProperties(NodeRef nodeRef, String pro, long value) {
		QName qname = QName.createQName(
				LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, pro);
		nodeService.setProperty(nodeRef, qname, value);

	}

    public NodeService getNodeService() {
        return nodeService;
    }

    public void setNodeService(NodeService nodeService) {
        this.nodeService = nodeService;
    }

	public CountBean getCountBean() {
		return countBean;
	}

	public void setCountBean(CountBean countBean) {
		this.countBean = countBean;
	}
}

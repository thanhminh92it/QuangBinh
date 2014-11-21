package zalu.vn.beans;

import java.io.Serializable;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.nodelocator.NodeLocatorService;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.ContentData;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;
import org.apache.log4j.Logger;

import zalu.vn.model.LampttCountModel;
import zalu.vn.model.LampttModel;

public class CountBean {

	// Dependencies
	private NodeService nodeService;
	private NodeLocatorService nodeLocatorService;

	private Logger logger = Logger.getLogger(CountBean.class);

	/**
	 * Returns the NodeRef of "Company Home"
	 * 
	 * @return
	 */
	public NodeRef getCompanyHome()

	{
		return nodeLocatorService.getNode("companyhome", null, null);
	}

	/**
	 * Returns a propertie
	 * 
	 * @return
	 */
	public long getPropertiesForCountLong(NodeRef nodeRef, String pro) {
		QName qname = QName.createQName(
				LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, pro);
		Long value = (Long) nodeService.getProperty(nodeRef, qname);
		if (value == null) {
			value = new Long(0);
		}
		return value;
	}

	public int getPropertiesSoTrang(NodeRef nodeRef) {
		QName qname = QName.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL,
				LampttModel.PROP_NUMBEROFPAGE);
		Integer value = (Integer) nodeService.getProperty(nodeRef, qname);

		if (value == null) {
			value = new Integer(0);
		}
		return value;
	}

	public long getPropertiesLong(Map<QName, Serializable> properties,
			String pro) {
		QName qname = QName
				.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL, pro);
		Long value = (Long) properties.get(qname);
		if (value == null) {
			value = new Long(0);
		}
		return value;
	}

	public int getPropertiesInt(Map<QName, Serializable> properties, String pro) {
		QName qname = QName
				.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL, pro);
		Integer value = (Integer) properties.get(qname);
		if (value == null) {
			value = new Integer(0);
		}
		return value;
	}

	/**
	 * Set a propertie
	 * 
	 * @return
	 */
	public void setincPropertiesForCount(NodeRef nodeRef, String pro, long value) {
		QName qname = QName.createQName(
				LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, pro);
		nodeService.setProperty(nodeRef, qname, value
				+ getPropertiesForCountLong(nodeRef, pro));

	}

	/**
	 * get the size content
	 * 
	 * @return
	 */
	public long getSize(NodeRef nodeRef) {
		ContentData contentRef = (ContentData) nodeService.getProperty(nodeRef,
				ContentModel.PROP_CONTENT);
		Long value = contentRef.getSize();
		if (value == null) {
			value = new Long(0);
		}
		return value;
	}

	public long getSize(String content) {
		ContentData contentRef = ContentData.createContentProperty(content);
		Long value = contentRef.getSize();
		if (value == null) {
			value = new Long(0);
		}
		return value;
	}

	public void SetAsForCountDate(NodeRef nodeRef) {
		// ktra count date
		if (nodeService.hasAspect(nodeRef, QName.createQName(
				LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
				LampttCountModel.ASPECT_COUNTDATE))) {
			logger.debug("Doument already has aspect");
		} else {
			logger.debug("Adding SizeFolder aspect");
			nodeService.addAspect(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASPECT_COUNTDATE), null);
		}
	}
	public void RemoveAsForCountDate(NodeRef nodeRef) {
		// ktra count date
		if (nodeService.hasAspect(nodeRef, QName.createQName(
				LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
				LampttCountModel.ASPECT_COUNTDATE))) {
			logger.debug("Doument already has aspect -- remove");
			
			nodeService.removeAspect(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASPECT_COUNTDATE));
		} 
	}

	// thiet lap khay luc trien khai he thong de set aspect
	public void count(NodeRef nodeRef) {
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

		List<ChildAssociationRef> listchild = nodeService
				.getChildAssocs(nodeRef);
		for (int i = 0; i < listchild.size(); i++) {

			ChildAssociationRef child = listchild.get(i);
			NodeRef node = child.getChildRef();
			QName qname = nodeService.getType(child.getChildRef());

			if (qname.isMatch(ContentModel.TYPE_CONTENT)) {
				// 0. thiet lap cac gi tri date file size
				Date date = (Date) nodeService.getProperty(node,
						ContentModel.PROP_CREATED);
				long file = 1;
				long size = getSize(node);
				int n = 3, ns = 1;

				InsertDate(getCompanyHome(), date, 1L);

				NodeRef nodetg = nodeRef;
				while (true) {
					updatevt(nodetg, date, "admin", file, size, "" + n, "" + ns);

					if (nodetg.equals(getCompanyHome()))
						break;
					else
						nodetg = nodeService.getPrimaryParent(nodetg)
								.getParentRef();
					logger.debug("_____ content");
				}

			}

			if (qname.isMatch(ContentModel.TYPE_FOLDER)) {
				// add(child.getChildRef());
				count(node);
			}
		}

	}
	public void Removecount(NodeRef nodeRef) {
		if (nodeService.hasAspect(nodeRef, QName.createQName(
				LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
				LampttCountModel.ASPECT_COUNTFOLDER))) {
			logger.debug("Doument already has aspect--> remove");
			
			nodeService.removeAspect(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASPECT_COUNTFOLDER));
		} 

		List<ChildAssociationRef> listchild = nodeService
				.getChildAssocs(nodeRef);
		for (int i = 0; i < listchild.size(); i++) {

			ChildAssociationRef child = listchild.get(i);
			NodeRef node = child.getChildRef();
			QName qname = nodeService.getType(child.getChildRef());


			if (qname.isMatch(ContentModel.TYPE_FOLDER)) {
				// add(child.getChildRef());
				Removecount(node);
			}
		}

	}

	/**
	 * Thiet lap dem date tao cay date
	 * 
	 * 
	 * @return
	 */
	public void InsertDate(NodeRef nodeRef, Date date, Long value) {
		long y = date.getYear(), m = date.getMonth();
		// 1.aspect
		setincPropertiesForCount(nodeRef, LampttCountModel.PROP_D1, value);

		// 2.child1
		List<ChildAssociationRef> listchild1 = nodeService.getChildAssocs(
				nodeRef, QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_YS),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "" + y));

		// khoi tao child1
		ChildAssociationRef child1 = null;

		if (listchild1.size() > 0) {
			// 2.1 neu co thang admin thi chi can update lai properties
			child1 = listchild1.get(0);
			NodeRef nodechild1 = child1.getChildRef();
			setincPropertiesForCount(nodechild1, LampttCountModel.PROP_Y1,
					value);
		} else {
			// 2.2 neu ko co thi create node
			Map<QName, Serializable> props1 = new HashMap<QName, Serializable>();
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.PROP_Y1), value);
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.PROP_Y2), y);

			child1 = nodeService.createNode(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_YS), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "" + y),
					QName.createQName(
							LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
							LampttCountModel.TYPE_Y), props1);
		}

		// 3.child2
		List<ChildAssociationRef> listchild2 = nodeService.getChildAssocs(
				child1.getChildRef(), QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_MS),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "" + m));
		if (listchild2.size() > 0) {
			// 3.1 da co child2
			NodeRef nodechild2 = listchild2.get(0).getChildRef();
			setincPropertiesForCount(nodechild2, LampttCountModel.PROP_M1,
					value);
		} else {
			// 3.2 khong co
			Map<QName, Serializable> props2 = new HashMap<QName, Serializable>();
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.PROP_M1), value);
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.PROP_M2), m);

			nodeService.createNode(child1.getChildRef(), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_MS), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "" + m),
					QName.createQName(
							LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
							LampttCountModel.TYPE_M), props2);
		}

		logger.debug("content");

	}

	/**
	 * set Thiet lap thong tin cua dem size file so trang (vidu n=4: 1234 loai 5
	 * content 6 file 7 sotrang)
	 * 
	 * @return
	 */
	public void updatevt(NodeRef nodeRef, Date date, String user, long value,
			String vt) {

		// 1.aspect
		setincPropertiesForCount(nodeRef, "f" + vt, value);

		// 2.child1
		List<ChildAssociationRef> listchild1 = nodeService.getChildAssocs(
				nodeRef, QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_C1S),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, user));

		// khoi tao child1
		ChildAssociationRef child1 = null;

		if (listchild1.size() > 0) {
			// 2.1 neu co thang admin thi chi can update lai properties
			child1 = listchild1.get(0);
			NodeRef nodechild1 = child1.getChildRef();
			setincPropertiesForCount(nodechild1, "c1" + vt, value);
		} else {
			// 2.2 neu ko co thi create node
			Map<QName, Serializable> props1 = new HashMap<QName, Serializable>();
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c1" + vt),
					value);

			child1 = nodeService.createNode(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_C1S), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, user), QName
					.createQName(LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
							LampttCountModel.TYPE_C1), props1);
		}

		// 3.child2
		GregorianCalendar a = new GregorianCalendar(date.getYear(),
				date.getMonth(), date.getDate());
		List<ChildAssociationRef> listchild2 = nodeService.getChildAssocs(
				child1.getChildRef(), QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_C2S),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						"" + a.getTimeInMillis()));
		if (listchild2.size() > 0) {
			// 3.1 da co child2
			NodeRef nodechild2 = listchild2.get(0).getChildRef();
			setincPropertiesForCount(nodechild2, "c2" + vt, value);
		} else {
			// 3.2 khong co
			Map<QName, Serializable> props2 = new HashMap<QName, Serializable>();
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c2" + vt),
					value);

			nodeService.createNode(child1.getChildRef(), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_C2S), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					"" + a.getTimeInMillis()), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.TYPE_C2), props2);
		}

		logger.debug("content");

	}

	public void updatevt(NodeRef nodeRef, Date date, String user, long value1,
			long value2, String vt1, String vt2) {

		// 1.aspect
		setincPropertiesForCount(nodeRef, "f" + vt1, value1);
		setincPropertiesForCount(nodeRef, "f" + vt2, value2);

		// 2.child1
		List<ChildAssociationRef> listchild1 = nodeService.getChildAssocs(
				nodeRef, QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_C1S),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, user));

		// khoi tao child1
		ChildAssociationRef child1 = null;

		if (listchild1.size() > 0) {
			// 2.1 neu co thang admin thi chi can update lai properties
			child1 = listchild1.get(0);
			NodeRef nodechild1 = child1.getChildRef();
			setincPropertiesForCount(nodechild1, "c1" + vt1, value1);
			setincPropertiesForCount(nodechild1, "c1" + vt2, value2);
		} else {
			// 2.2 neu ko co thi create node
			Map<QName, Serializable> props1 = new HashMap<QName, Serializable>();
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c1" + vt1),
					value1);
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c1" + vt2),
					value2);

			child1 = nodeService.createNode(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_C1S), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, user), QName
					.createQName(LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
							LampttCountModel.TYPE_C1), props1);
		}

		// 3.child2
		GregorianCalendar a = new GregorianCalendar(date.getYear(),
				date.getMonth(), date.getDate());
		List<ChildAssociationRef> listchild2 = nodeService.getChildAssocs(
				child1.getChildRef(), QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_C2S),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						"" + a.getTimeInMillis()));
		if (listchild2.size() > 0) {
			// 3.1 da co child2
			NodeRef nodechild2 = listchild2.get(0).getChildRef();
			setincPropertiesForCount(nodechild2, "c2" + vt1, value1);
			setincPropertiesForCount(nodechild2, "c2" + vt2, value2);
		} else {
			// 3.2 khong co
			Map<QName, Serializable> props2 = new HashMap<QName, Serializable>();
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c2" + vt1),
					value1);
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c2" + vt2),
					value2);

			nodeService.createNode(child1.getChildRef(), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_C2S), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					"" + a.getTimeInMillis()), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.TYPE_C2), props2);
		}

		logger.debug("content");

	}

	public void updatevt(NodeRef nodeRef, Date date, String user, long value1,
			long value2, long value3, String vt1, String vt2, String vt3) {

		// 1.aspect
		setincPropertiesForCount(nodeRef, "f" + vt1, value1);
		setincPropertiesForCount(nodeRef, "f" + vt2, value2);
		setincPropertiesForCount(nodeRef, "f" + vt3, value3);

		// 2.child1
		List<ChildAssociationRef> listchild1 = nodeService.getChildAssocs(
				nodeRef, QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_C1S),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, user));

		// khoi tao child1
		ChildAssociationRef child1 = null;

		if (listchild1.size() > 0) {
			// 2.1 neu co thang admin thi chi can update lai properties
			child1 = listchild1.get(0);
			NodeRef nodechild1 = child1.getChildRef();
			setincPropertiesForCount(nodechild1, "c1" + vt1, value1);
			setincPropertiesForCount(nodechild1, "c1" + vt2, value2);
			setincPropertiesForCount(nodechild1, "c1" + vt3, value3);
		} else {
			// 2.2 neu ko co thi create node
			Map<QName, Serializable> props1 = new HashMap<QName, Serializable>();
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c1" + vt1),
					value1);
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c1" + vt2),
					value2);
			props1.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c1" + vt3),
					value3);

			child1 = nodeService.createNode(nodeRef, QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_C1S), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, user), QName
					.createQName(LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
							LampttCountModel.TYPE_C1), props1);
		}

		// 3.child2
		GregorianCalendar a = new GregorianCalendar(date.getYear(),
				date.getMonth(), date.getDate());
		List<ChildAssociationRef> listchild2 = nodeService.getChildAssocs(
				child1.getChildRef(), QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						LampttCountModel.ASS_C2S),
				// cai duy nhat gion voi thang child1
				QName.createQName(
						LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
						"" + a.getTimeInMillis()));
		if (listchild2.size() > 0) {
			// 3.1 da co child2
			NodeRef nodechild2 = listchild2.get(0).getChildRef();
			setincPropertiesForCount(nodechild2, "c2" + vt1, value1);
			setincPropertiesForCount(nodechild2, "c2" + vt2, value2);
			setincPropertiesForCount(nodechild2, "c2" + vt3, value3);
		} else {
			// 3.2 khong co
			Map<QName, Serializable> props2 = new HashMap<QName, Serializable>();
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c2" + vt1),
					value1);
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c2" + vt2),
					value2);
			props2.put(QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL, "c2" + vt3),
					value3);

			nodeService.createNode(child1.getChildRef(), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.ASS_C2S), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					"" + a.getTimeInMillis()), QName.createQName(
					LampttCountModel.NAMESPACE_LAMPTT_COUNT_MODEL,
					LampttCountModel.TYPE_C2), props2);
		}

		logger.debug("content");

	}

	public NodeService getNodeService() {
		return nodeService;
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	public void setNodeLocatorService(NodeLocatorService nodeLocatorService) {
		this.nodeLocatorService = nodeLocatorService;
	}
}
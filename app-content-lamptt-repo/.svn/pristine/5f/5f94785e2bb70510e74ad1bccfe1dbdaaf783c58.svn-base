package zalu.vn.behavior;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.content.filestore.FileContentWriter;
import org.alfresco.repo.content.transform.ContentTransformer;
import org.alfresco.repo.node.NodeServicePolicies;
import org.alfresco.repo.policy.Behaviour;
import org.alfresco.repo.policy.Behaviour.NotificationFrequency;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.repo.security.authentication.AuthenticationUtil;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.ContentData;
import org.alfresco.service.cmr.repository.ContentIOException;
import org.alfresco.service.cmr.repository.ContentReader;
import org.alfresco.service.cmr.repository.ContentService;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;
import org.alfresco.util.TempFileProvider;
import org.apache.log4j.Logger;
import org.apache.pdfbox.pdmodel.PDDocument;

import zalu.vn.beans.CountBean;
import zalu.vn.config.Const;
import zalu.vn.model.LampttModel;

public class Count implements NodeServicePolicies.OnCreateNodePolicy,
		NodeServicePolicies.BeforeDeleteNodePolicy,
		NodeServicePolicies.OnUpdatePropertiesPolicy,
		NodeServicePolicies.OnUpdateNodePolicy,
		NodeServicePolicies.OnMoveNodePolicy {
	// behavior
	private Behaviour onCreateNode;
	private Behaviour onUpdateProperties;
	private Behaviour beforeDeleteNode;
	private Behaviour onUpdateNode;
	private Behaviour onMoveNode;

	// log
	private Logger logger = Logger.getLogger(Count.class);

	// dependencies
	private CountBean countBean;
	private NodeService nodeService;
	private PolicyComponent policyComponent;
	private ServiceRegistry serviceRegistry;
	private ContentService contentService;

	public ContentService getContentService() {
		return contentService;
	}

	public void setContentService(ContentService contentService) {
		this.contentService = contentService;
	}

	public ServiceRegistry getServiceRegistry() {
		return serviceRegistry;
	}

	public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
	}

	public CountBean getCountBean() {
		return countBean;
	}

	public void setCountBean(CountBean countBean) {
		this.countBean = countBean;
	}

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
		logger.debug("Initializing SizeFolder behaviors");
		// create behaviour

		this.onCreateNode = new JavaBehaviour(this, "onCreateNode",
				NotificationFrequency.TRANSACTION_COMMIT);

		this.onUpdateProperties = new JavaBehaviour(this, "onUpdateProperties",
				NotificationFrequency.TRANSACTION_COMMIT);

		this.onUpdateNode = new JavaBehaviour(this, "onUpdateNode",
				NotificationFrequency.TRANSACTION_COMMIT);

		this.beforeDeleteNode = new JavaBehaviour(this, "beforeDeleteNode",
				NotificationFrequency.FIRST_EVENT);

		this.onMoveNode = new JavaBehaviour(this, "onMoveNode",
				NotificationFrequency.TRANSACTION_COMMIT);

		// Bin behaviour
		this.policyComponent.bindClassBehaviour(
				NodeServicePolicies.OnCreateNodePolicy.QNAME,
				ContentModel.TYPE_CONTENT, this.onCreateNode);

		this.policyComponent.bindClassBehaviour(
				NodeServicePolicies.OnUpdatePropertiesPolicy.QNAME,
				ContentModel.TYPE_CONTENT, this.onUpdateProperties);

		this.policyComponent.bindClassBehaviour(
				NodeServicePolicies.OnUpdateNodePolicy.QNAME,
				ContentModel.TYPE_CONTENT, this.onUpdateNode);

		this.policyComponent.bindClassBehaviour(
				NodeServicePolicies.BeforeDeleteNodePolicy.QNAME,
				ContentModel.TYPE_CONTENT, this.beforeDeleteNode);

		this.policyComponent.bindClassBehaviour(
				NodeServicePolicies.OnMoveNodePolicy.QNAME,
				ContentModel.TYPE_CONTENT, this.onMoveNode);
	}

	// +3
	@Override
	public void onCreateNode(ChildAssociationRef childAssociationRef) {
		// TODO Auto-generated method stub

		String currentUser = AuthenticationUtil.getRunAsUser();
		AuthenticationUtil.setRunAsUser(AuthenticationUtil.getAdminUserName());
		AuthenticationUtil.setFullyAuthenticatedUser(AuthenticationUtil
				.getAdminUserName());

		NodeRef nodeRef = childAssociationRef.getChildRef();
		if (nodeService.exists(nodeRef)) {

			// xet su ton tai 1 trong n loai
			QName[] type;
			int n = Const.Type + 1;
			type = new QName[n];
			type[0] = nodeService.getType(nodeRef);

			// so sanh voi TYPE_CONTENT
			if (type[0].isMatch(ContentModel.TYPE_CONTENT)) {

				logger.debug("onCreateNode Loai cua no: " + type[0]);

				NodeRef parent = childAssociationRef.getParentRef();

				Date date = (Date) nodeService.getProperty(nodeRef,
						ContentModel.PROP_CREATED);
				String user = (String) nodeService.getProperty(nodeRef,
						ContentModel.PROP_CREATOR);
				long file = 1;

				// count date --> tree
				countBean.InsertDate(countBean.getCompanyHome(), date, 1L);

				// count
				NodeRef nodetg = parent;
				while (true) {
					countBean.updatevt(nodetg, date, user, file, "3");
					if (nodetg.equals(countBean.getCompanyHome()))
						break;
					else
						nodetg = nodeService.getPrimaryParent(nodetg)
								.getParentRef();
					logger.debug("onCreateNode content");
				}
			} else {
				for (int i = 1; i < n; i++) {

					type[i] = QName.createQName(
							LampttModel.NAMESPACE_LAMPTT_MODEL, "t" + i);
					if (type[0].isMatch(type[i])) {
						logger.debug("onCreateNode Loai cua no: " + type[0]);

						NodeRef parent = childAssociationRef.getParentRef();

						Date date = (Date) nodeService.getProperty(nodeRef,
								ContentModel.PROP_CREATED);
						String user = (String) nodeService.getProperty(nodeRef,
								ContentModel.PROP_CREATOR);
						long file = 1;

						// count date --> tree
						countBean.InsertDate(countBean.getCompanyHome(), date,
								1L);

						// count
						int vt = 3 + i;
						NodeRef nodetg = parent;
						while (true) {
							countBean.updatevt(nodetg, date, user, file, ""
									+ vt);
							if (nodetg.equals(countBean.getCompanyHome()))
								break;
							else
								nodetg = nodeService.getPrimaryParent(nodetg)
										.getParentRef();
							logger.debug("onCreateNode content");
						}
						break;
					}
				}
			}

		}

		// Create some directories
		AuthenticationUtil.setRunAsUser(currentUser);
		AuthenticationUtil.setFullyAuthenticatedUser(currentUser);
		// or AuthenticationUtil.clearCurrentSecurityContext();?
	}

	// 1++ 2++
	@Override
	public void onUpdateProperties(NodeRef nodeRef,
			Map<QName, Serializable> properties1,
			Map<QName, Serializable> properties2) {

		// TODO Auto-generated method stub
		String currentUser = AuthenticationUtil.getRunAsUser();
		AuthenticationUtil.setRunAsUser(AuthenticationUtil.getAdminUserName());
		AuthenticationUtil.setFullyAuthenticatedUser(AuthenticationUtil
				.getAdminUserName());

		// chi can xet su ton tai cua node
		if (nodeService.exists(nodeRef)) {
			logger.debug("onUpdateProperties Loai cua no: "
					+ nodeService.getType(nodeRef));

			// xet su ton tai 1 trong n loai
			QName[] type;
			int n = Const.Type + 1;
			boolean ktra = false;
			type = new QName[n];
			type[0] = nodeService.getType(nodeRef);
			if (type[0].isMatch(ContentModel.TYPE_CONTENT))
				ktra = true;

			for (int i = 1; i < n; i++) {
				type[i] = QName.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL,
						"t" + i);
				if (type[0].isMatch(type[i]))
					ktra = true;
			}

			if (ktra) {
				long size1 = 0L, size2 = 0L;
				int sotrang1 = 0, sotrang2 = 0, ns = 1, np = 2;

				if (!properties1.isEmpty() && properties1 != null
						&& properties1.size() > 0) {
					
					logger.debug("lamptt pro1: " + properties1);
					logger.debug("Toan Map1: ");
					for(QName key: properties1.keySet())
						logger.debug(key + " ------------- " + properties1.get(key));
					
					if (properties1.get(ContentModel.PROP_CONTENT) != null){
						String cont = properties1.get(ContentModel.PROP_CONTENT)
								.toString();
						size1 = countBean.getSize(cont);
					}
					
					// so trang trong properties cua file la int nen cho nay
					// sai
					sotrang1 = countBean.getPropertiesInt(properties1,
							LampttModel.PROP_NUMBEROFPAGE);
				}

				if (!properties2.isEmpty() && properties2 != null
						&& properties2.size() > 0) {
					logger.debug("lamptt pro2: " + properties2);
					logger.debug("Toan Map2: ");
					for(QName key: properties2.keySet())
						logger.debug(key + " ------------- " + properties2.get(key));

					if (properties2.get(ContentModel.PROP_CONTENT) != null){
						String cont = properties2.get(ContentModel.PROP_CONTENT)
								.toString();
						size2 = countBean.getSize(cont);
					}
					
					// so trang trong properties cua file la int nen cho nay sai
					sotrang2 = countBean.getPropertiesInt(properties2,
							LampttModel.PROP_NUMBEROFPAGE);
				}

				long size = size2 - size1, sotrang = sotrang2 - sotrang1;

				if ((size != 0) && (sotrang != 0)) {
					// 1.up 2 thang
					ChildAssociationRef child = nodeService
							.getPrimaryParent(nodeRef);
					NodeRef parent = child.getParentRef();

					Date date = (Date) nodeService.getProperty(nodeRef,
							ContentModel.PROP_CREATED);
					String user = (String) nodeService.getProperty(nodeRef,
							ContentModel.PROP_CREATOR);

					NodeRef nodetg = parent;
					while (true) {
						countBean.updatevt(nodetg, date, user, size, sotrang,
								"" + ns, "" + np);
						if (nodetg.equals(countBean.getCompanyHome()))
							break;
						else
							nodetg = nodeService.getPrimaryParent(nodetg)
									.getParentRef();
						logger.debug("onUpdateProperties content two");
					}
				} else {
					// 2.up tung thang
					// 2.1 upsize
					if (size != 0) {
						ChildAssociationRef child = nodeService
								.getPrimaryParent(nodeRef);
						NodeRef parent = child.getParentRef();

						Date date = (Date) nodeService.getProperty(nodeRef,
								ContentModel.PROP_CREATED);
						String user = (String) nodeService.getProperty(nodeRef,
								ContentModel.PROP_CREATOR);

						NodeRef nodetg = parent;
						while (true) {
							countBean.updatevt(nodetg, date, user, size, ""
									+ ns);
							if (nodetg.equals(countBean.getCompanyHome()))
								break;
							else
								nodetg = nodeService.getPrimaryParent(nodetg)
										.getParentRef();
							logger.debug("onUpdateProperties content only size");
						}
					}
					// 2.2 upsotrang
					if (sotrang != 0) {
						ChildAssociationRef child = nodeService
								.getPrimaryParent(nodeRef);
						NodeRef parent = child.getParentRef();

						Date date = (Date) nodeService.getProperty(nodeRef,
								ContentModel.PROP_CREATED);
						String user = (String) nodeService.getProperty(nodeRef,
								ContentModel.PROP_CREATOR);

						NodeRef nodetg = parent;
						while (true) {
							countBean.updatevt(nodetg, date, user, sotrang, ""
									+ np);
							if (nodetg.equals(countBean.getCompanyHome()))
								break;
							else
								nodetg = nodeService.getPrimaryParent(nodetg)
										.getParentRef();
							logger.debug("onUpdateProperties content only sotrang");
						}
					}
				}
			}
		}
		AuthenticationUtil.setRunAsUser(currentUser);
		AuthenticationUtil.setFullyAuthenticatedUser(currentUser);
	}

	// 1-- 2-- 3--
	@Override
	public void beforeDeleteNode(NodeRef nodeRef) {
		// TODO Auto-generated method stub
		String currentUser = AuthenticationUtil.getRunAsUser();
		AuthenticationUtil.setRunAsUser(AuthenticationUtil.getAdminUserName());
		AuthenticationUtil.setFullyAuthenticatedUser(AuthenticationUtil
				.getAdminUserName());

		if (nodeService.exists(nodeRef)) {
			logger.debug("beforeDeleteNode Loai cua no: "
					+ nodeService.getType(nodeRef));

			ChildAssociationRef child = nodeService.getPrimaryParent(nodeRef);
			NodeRef parent = child.getParentRef();

			Date date = (Date) nodeService.getProperty(nodeRef,
					ContentModel.PROP_CREATED);
			String user = (String) nodeService.getProperty(nodeRef,
					ContentModel.PROP_CREATOR);
			long file = 1;
			long size = countBean.getSize(nodeRef);
			int sotrang = countBean.getPropertiesSoTrang(nodeRef);

			QName[] type;
			int n = 3, ns = 1, np = 2;
			type = new QName[n];
			type[0] = nodeService.getType(nodeRef);
			if (type[0].isMatch(ContentModel.TYPE_CONTENT)) {
				// vua del content

				// count date --> tree
				countBean.InsertDate(countBean.getCompanyHome(), date, -1L);

				// count
				NodeRef nodetg = parent;
				while (true) {
					countBean.updatevt(nodetg, date, user, -file, -size,
							-sotrang, "" + n, "" + ns, "" + np);
					if (nodetg.equals(countBean.getCompanyHome()))
						break;
					else
						nodetg = nodeService.getPrimaryParent(nodetg)
								.getParentRef();
					logger.debug("beforeDeleteNode content");
				}
			} else {
				for (int i = 1; i < n; i++) {
					type[i] = QName.createQName(
							LampttModel.NAMESPACE_LAMPTT_MODEL, "t" + i);

					if (type[0].isMatch(type[i])) {
						// vua del 1 loai thuoc n

						// count date --> tree
						countBean.InsertDate(countBean.getCompanyHome(), date,
								-1L);

						// count
						int vt = 3 + i;
						NodeRef nodetg = parent;
						while (true) {
							countBean.updatevt(nodetg, date, user, -file,
									-size, -sotrang, "" + vt, "" + ns, "" + np);
							if (nodetg.equals(countBean.getCompanyHome()))
								break;
							else
								nodetg = nodeService.getPrimaryParent(nodetg)
										.getParentRef();
							logger.debug("beforeDeleteNode bienlai");
						}
					}
				}

			}

		}

		AuthenticationUtil.setRunAsUser(currentUser);
		AuthenticationUtil.setFullyAuthenticatedUser(currentUser);

	}

	@Override
	public void onMoveNode(ChildAssociationRef oldChildAssocRef,
			ChildAssociationRef newChildAssocRef) {
		// TODO Auto-generated method stub
		String currentUser = AuthenticationUtil.getRunAsUser();
		AuthenticationUtil.setRunAsUser(AuthenticationUtil.getAdminUserName());
		AuthenticationUtil.setFullyAuthenticatedUser(AuthenticationUtil
				.getAdminUserName());

		NodeRef nodeRef = oldChildAssocRef.getChildRef();
		if (nodeService.exists(nodeRef)) {
			logger.debug("onMoveNode Loai cua no: "
					+ nodeService.getType(nodeRef));

			// xet su ton tai 1 trong 5 loai
			QName[] type;
			int n = 3, ns = 1, np = 2;
			boolean ktra = false;
			type = new QName[n];
			type[0] = nodeService.getType(nodeRef);
			for (int i = 1; i < n; i++) {
				type[i] = QName.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL,
						"t" + i);
				if (type[0].isMatch(type[i]))
					ktra = true;
			}

			if (type[0].isMatch(ContentModel.TYPE_CONTENT) || ktra) {
				// phan than thuc hien
				NodeRef parent = oldChildAssocRef.getParentRef();

				Date date = (Date) nodeService.getProperty(nodeRef,
						ContentModel.PROP_CREATED);
				String user = (String) nodeService.getProperty(nodeRef,
						ContentModel.PROP_CREATOR);
				long file = 1;
				long size = countBean.getSize(nodeRef);
				int sotrang = countBean.getPropertiesSoTrang(nodeRef);

				// 1.old
				if (type[0].isMatch(ContentModel.TYPE_CONTENT)) {
					// vua del content

					// count date --> tree
					countBean.InsertDate(countBean.getCompanyHome(), date, -1L);

					// count
					NodeRef nodetg = parent;
					while (true) {
						countBean.updatevt(nodetg, date, user, -file, -size,
								-sotrang, "" + n, "" + ns, "" + np);
						if (nodetg.equals(countBean.getCompanyHome()))
							break;
						else
							nodetg = nodeService.getPrimaryParent(nodetg)
									.getParentRef();
						logger.debug("beforeDeleteNode content");
					}
				} else {
					for (int i = 1; i < n; i++)
						if (type[0].isMatch(type[i])) {
							// vua del content vbhc

							// count date --> tree
							countBean.InsertDate(countBean.getCompanyHome(),
									date, -1L);

							// count
							int vt = 3 + i;
							NodeRef nodetg = parent;
							while (true) {
								countBean.updatevt(nodetg, date, user, -file,
										-size, -sotrang, "" + vt, "" + ns, ""
												+ np);
								if (nodetg.equals(countBean.getCompanyHome()))
									break;
								else
									nodetg = nodeService.getPrimaryParent(
											nodetg).getParentRef();
								logger.debug("beforeDeleteNode vbhc");
							}
							break;
						}
				}

				// 2.new
				nodeRef = newChildAssocRef.getChildRef();
				parent = newChildAssocRef.getParentRef();
				if (type[0].isMatch(ContentModel.TYPE_CONTENT)) {
					// vua add content

					// count date --> tree
					countBean.InsertDate(countBean.getCompanyHome(), date, 1L);

					// count
					NodeRef nodetg = parent;
					while (true) {
						countBean.updatevt(nodetg, date, user, file, size,
								sotrang, "" + n, "" + ns, "" + np);
						if (nodetg.equals(countBean.getCompanyHome()))
							break;
						else
							nodetg = nodeService.getPrimaryParent(nodetg)
									.getParentRef();
						logger.debug("beforeDeleteNode content");
					}
				} else {
					for (int i = 1; i < n; i++)
						if (type[0].isMatch(type[i])) {
							// vua add content vbhc

							// count date --> tree
							countBean.InsertDate(countBean.getCompanyHome(),
									date, 1L);

							// count
							int vt = 3 + i;
							NodeRef nodetg = parent;
							while (true) {
								countBean.updatevt(nodetg, date, user, file,
										size, sotrang, "" + vt, "" + ns, ""
												+ np);
								if (nodetg.equals(countBean.getCompanyHome()))
									break;
								else
									nodetg = nodeService.getPrimaryParent(
											nodetg).getParentRef();
								logger.debug("beforeDeleteNode vbhc");
							}
							break;
						}
				}

			}
		}
		AuthenticationUtil.setRunAsUser(currentUser);
		AuthenticationUtil.setFullyAuthenticatedUser(currentUser);

	}

	// 2++ 3++ x--
	@Override
	public void onUpdateNode(NodeRef nodeRef) {
		// TODO Auto-generated method stub
		

		if (nodeService.exists(nodeRef)) {
			logger.debug("onMoveNode Loai cua no: "
					+ nodeService.getType(nodeRef));
			QName[] type;
			int n = 3, np = 2;
			boolean ktra = false;
			type = new QName[n];
			type[0] = nodeService.getType(nodeRef);
			for (int i = 1; i < n; i++) {
				type[i] = QName.createQName(LampttModel.NAMESPACE_LAMPTT_MODEL,
						"t" + i);
				if (type[0].isMatch(type[i]))
					ktra = true;
			}

			if (ktra) {

				if (nodeService.hasAspect(nodeRef, QName.createQName(
						LampttModel.NAMESPACE_LAMPTT_MODEL,
						LampttModel.ASPECT_LA_PAGES))) {
					// thang nay cu roi

				} else {

					// 2. add aspect
					nodeService.addAspect(nodeRef, QName.createQName(
							LampttModel.NAMESPACE_LAMPTT_MODEL,
							LampttModel.ASPECT_LA_PAGES), null);
					nodeService.setProperty(nodeRef, QName.createQName(
							LampttModel.NAMESPACE_LAMPTT_MODEL,
							LampttModel.PROP_NUMBEROFPAGE), 0);

					ContentReader reader = serviceRegistry.getContentService()
							.getReader(nodeRef, ContentModel.PROP_CONTENT);
					ContentData contentData = (ContentData) nodeService
							.getProperty(nodeRef, ContentModel.TYPE_CONTENT);

					if (contentData.getMimetype().equalsIgnoreCase(
							MimetypeMap.MIMETYPE_PDF)) {
						try {
							PDDocument pdf = PDDocument.load(reader
									.getContentInputStream());
							nodeService.setProperty(nodeRef, QName.createQName(
									LampttModel.NAMESPACE_LAMPTT_MODEL,
									LampttModel.PROP_NUMBEROFPAGE), pdf
									.getNumberOfPages());
							pdf.close();
						} catch (ContentIOException e) {
							// TODO Auto-generated catch block
							logger.debug("Da xay ra loi PDF1");
							e.printStackTrace();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							logger.debug("Da xay ra loi PDF1");
							e.printStackTrace();
						}
					} else {
						if (contentData.getMimetype().equalsIgnoreCase(
								MimetypeMap.PREFIX_TEXT)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_TEXT_PLAIN)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_TEXT_MEDIAWIKI)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_TEXT_CSS)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_TEXT_CSV)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_TEXT_JAVASCRIPT)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_XML)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_HTML)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_XHTML)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_JSON)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_WORD)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_EXCEL)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_PPT)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_OPENDOCUMENT_TEXT)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENDOCUMENT_TEXT_TEMPLATE)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENDOCUMENT_TEXT_MASTER)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENDOCUMENT_TEXT_WEB)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENOFFICE1_WRITER)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_OPENOFFICE1_CALC)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENXML_WORDPROCESSING)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENXML_SPREADSHEET)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_OPENXML_PRESENTATION)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_STAROFFICE5_CALC)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_STAROFFICE5_WRITER)
								|| contentData
										.getMimetype()
										.equalsIgnoreCase(
												MimetypeMap.MIMETYPE_STAROFFICE5_WRITER_GLOBAL)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_IWORK_KEYNOTE)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_IWORK_NUMBERS)
								|| contentData.getMimetype().equalsIgnoreCase(
										MimetypeMap.MIMETYPE_IWORK_PAGES)) {
							ContentWriter writer = null;
							File tempFile = null;
							tempFile = TempFileProvider.createTempFile("temp",
									".pdf");
							writer = new FileContentWriter(tempFile);

							writer.setMimetype(MimetypeMap.MIMETYPE_PDF);

							ContentTransformer transformer = contentService
									.getTransformer(contentData.getMimetype(),
											MimetypeMap.MIMETYPE_PDF);

							transformer.transform(reader, writer);

							try {
								PDDocument pdf = PDDocument.load(writer
										.getReader().getContentInputStream());

								nodeService
										.setProperty(
												nodeRef,
												QName.createQName(
														LampttModel.NAMESPACE_LAMPTT_MODEL,
														LampttModel.PROP_NUMBEROFPAGE),
												pdf.getNumberOfPages());

								pdf.close();

							} catch (ContentIOException e) {
								logger.debug("Da xay ra loi No PDF1");
								e.printStackTrace();
							} catch (IOException e) {
								logger.debug("Da xay ra loi NO PDF2");
								e.printStackTrace();
							}
							tempFile.delete();
						} else {
							nodeService.setProperty(nodeRef, QName.createQName(
									LampttModel.NAMESPACE_LAMPTT_MODEL,
									LampttModel.PROP_NUMBEROFPAGE), 1);
						}

					}

					logger.debug("So Trang = "
							+ nodeService.getProperty(nodeRef, QName
									.createQName(
											LampttModel.NAMESPACE_LAMPTT_MODEL,
											LampttModel.PROP_NUMBEROFPAGE)));

					// thang nay vua moi tao ra can tinh toan
					logger.debug("Dung hien lan 2 nha" + type);
					// 1. 1++ 5--
					NodeRef parent = nodeService.getPrimaryParent(nodeRef)
							.getParentRef();

					Date date = (Date) nodeService.getProperty(nodeRef,
							ContentModel.PROP_CREATED);
					String user = (String) nodeService.getProperty(nodeRef,
							ContentModel.PROP_CREATOR);
					long file = 1;
					int sotrang = countBean.getPropertiesSoTrang(nodeRef);
					
					
					String currentUser = AuthenticationUtil.getRunAsUser();
					AuthenticationUtil.setRunAsUser(AuthenticationUtil.getAdminUserName());
					AuthenticationUtil.setFullyAuthenticatedUser(AuthenticationUtil
							.getAdminUserName());
					for (int i = 1; i < n; i++)
						if (type[0].isMatch(type[i])) {
							int vt = 3 + i;
							NodeRef nodetg = parent;
							while (true) {
								countBean.updatevt(nodetg, date, user, file,
										-file, sotrang, "" + vt, "" + n, ""
												+ np);
								if (nodetg.equals(countBean.getCompanyHome()))
									break;
								else
									nodetg = nodeService.getPrimaryParent(
											nodetg).getParentRef();
								logger.debug("beforeDeleteNode vbhc");
							}
							break;
						}
					AuthenticationUtil.setRunAsUser(currentUser);
					AuthenticationUtil.setFullyAuthenticatedUser(currentUser);
				}
			}
		}

		
	}

}

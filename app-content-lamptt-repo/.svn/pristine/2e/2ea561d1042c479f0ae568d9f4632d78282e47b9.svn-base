package zalu.vn.action.executer;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.action.executer.ActionExecuterAbstractBase;
import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.content.filestore.FileContentWriter;
import org.alfresco.repo.content.transform.ContentTransformer;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
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

import com.itextpdf.text.pdf.PdfReader;

import zalu.vn.model.LampttModel;

public class CountPages extends ActionExecuterAbstractBase{

	public static final String NAME = "CountPages";
	
	private Logger logger = Logger.getLogger(CountPages.class);
	
	private NodeService nodeService;
	private ServiceRegistry serviceRegistry;
	private ContentService contentService;
	
	public NodeService getNodeService() {
		return nodeService;
	}

	public void setNodeService(NodeService nodeService) {
		this.nodeService = nodeService;
	}

	public ServiceRegistry getServiceRegistry() {
		return serviceRegistry;
	}

	public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
	}

	public ContentService getContentService() {
		return contentService;
	}

	public void setContentService(ContentService contentService) {
		this.contentService = contentService;
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
			
			if (ktra) {

				if (nodeService.hasAspect(nodeRef, QName.createQName(
						LampttModel.NAMESPACE_LAMPTT_MODEL,
						LampttModel.ASPECT_LA_PAGES))) {
					Integer a = (Integer) nodeService.getProperty(nodeRef, QName
							.createQName(
									LampttModel.NAMESPACE_LAMPTT_MODEL,
									LampttModel.PROP_NUMBEROFPAGE));
				
					if (a == null || a==0){
						ContentReader reader = serviceRegistry.getContentService()
								.getReader(nodeRef, ContentModel.PROP_CONTENT);
						ContentData contentData = (ContentData) nodeService
								.getProperty(nodeRef, ContentModel.TYPE_CONTENT);

						if (contentData.getMimetype().equalsIgnoreCase(
								MimetypeMap.MIMETYPE_PDF)) {
							try {
								PdfReader document = new PdfReader(reader
										.getContentInputStream());
								nodeService.setProperty(nodeRef, QName.createQName(
										LampttModel.NAMESPACE_LAMPTT_MODEL,
										LampttModel.PROP_NUMBEROFPAGE), document.getNumberOfPages());
								document.close();
								
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
								logger.debug("Da xay ra loi ra...pdf");
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
					}
					
				} 
			}
		}
		
		
	}

	@Override
	protected void addParameterDefinitions(List<ParameterDefinition> arg0) {
		// TODO Auto-generated method stub
		
	}

}

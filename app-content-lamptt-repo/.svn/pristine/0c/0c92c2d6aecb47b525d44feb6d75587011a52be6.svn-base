package zalu.vn.constraints;

import java.io.Serializable;

import java.util.ArrayList;

import java.util.List;

 

import org.alfresco.repo.dictionary.constraint.ListOfValuesConstraint;

import org.alfresco.service.cmr.search.SearchService;

import org.apache.commons.logging.Log;

import org.apache.commons.logging.LogFactory;

 

// Retreive list of customers via lucene query

public class ListOfCustomersQueryConstraint extends ListOfValuesConstraint

		implements Serializable {

 

	private static final long serialVersionUID = 1L;

	private static Log logger = LogFactory

			.getLog(ListOfCustomersQueryConstraint.class);

 

	private SearchService searchService;

	public void setSearchService(SearchService searchService) {

		this.searchService = searchService;

	}

 

	@Override

	public void initialize() {

		loadDB();

	}

 

	@Override

	public List<String> getAllowedValues() {

		super.setAllowedValues(loadDB());

		return super.getAllowedValues();

	}

 

	@Override

	public void setAllowedValues(List allowedValues) {

	}

 

	protected List<String> loadDB() {

		ArrayList<String> allowedValues = new ArrayList<String>();

		try {

			// do search here

			//searchService.query(searchParameters);

		} catch (Exception e) {

			logger.error("Error on enumerating values of customers");

		} finally {

		}

		return allowedValues;

	}

}
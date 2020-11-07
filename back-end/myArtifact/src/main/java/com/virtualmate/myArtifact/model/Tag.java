package com.virtualmate.myArtifact.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Tag {
	
	private String tagName;
	private String tagId;
	private List<String> relatedCardsId;
	
	public Tag(@JsonProperty("tagName") String tagName) {
		super();
		this.tagName = tagName;
		this.tagId = UUID.randomUUID().toString();
		this.relatedCardsId = new ArrayList<String>();
	}
	
	public Tag() {
		
	}
	
	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getTagId() {
		return tagId;
	}

	public void setTagId(String tagId) {
		this.tagId = tagId;
	}

	public List<String> getRelatedCardsId() {
		return relatedCardsId;
	}

	public void setRelatedCardsId(List<String> relatedCardsId) {
		this.relatedCardsId = relatedCardsId;
	}

	@Override
	public String toString() {
		return "Tag [tagName=" + tagName + ", tagId=" + tagId + "]";
	}

}

package com.virtualmate.myArtifact.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Tag {
	
	private String tagName;
	private UUID tagId;
	private List<UUID> relatedCardsId;
	
	public Tag(String tagName) {
		super();
		this.tagName = tagName;
		this.tagId = UUID.randomUUID();
		this.relatedCardsId = new ArrayList<UUID>();
	}
	
	public Tag() {
		
	}
	
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public UUID getTagId() {
		return tagId;
	}
	public void setTagId(UUID tagId) {
		this.tagId = tagId;
	}
	public List<UUID> getCardIds() {
		return relatedCardsId;
	}
	public void setCardIds(List<UUID> cardIds) {
		this.relatedCardsId = cardIds;
	}

}

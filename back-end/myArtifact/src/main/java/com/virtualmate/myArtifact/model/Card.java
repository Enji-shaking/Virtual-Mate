package com.virtualmate.myArtifact.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Card {

	private String activityName;
	private String activityImageId;
	private String cardId;
	private List<String> relatedTagsId;
	private	List<String> finishedUsersId;
	
	public Card(@JsonProperty("cardName") String cardName, 
				@JsonProperty("imageId") String imageId) {
		super();
		this.activityName = cardName;
		this.activityImageId = imageId;
		this.cardId = UUID.randomUUID().toString();
		this.relatedTagsId = new ArrayList<String>();
		this.finishedUsersId = new ArrayList<String>();
	}
	
	public Card() {
		
	}
	
	@Override
	public String toString() {
		return "Card [activityName=" + activityName + ", activityImageId=" + activityImageId + ", cardId=" + cardId + "]";
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public String getActivityImageId() {
		return activityImageId;
	}

	public void setActivityImageId(String activityImageId) {
		this.activityImageId = activityImageId;
	}

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public List<String> getRelatedTagsId() {
		return relatedTagsId;
	}

	public void setRelatedTagsId(List<String> relatedTagsId) {
		this.relatedTagsId = relatedTagsId;
	}

	public List<String> getFinishedUsersId() {
		return finishedUsersId;
	}

	public void setFinishedUsersId(List<String> finishedUsersId) {
		this.finishedUsersId = finishedUsersId;
	}
}

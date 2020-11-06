package com.virtualmate.myArtifact.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class Card {

	private String activityName;
	private Image activityImage;
	private UUID cardId;
	private List<UUID> relatedTagsId;
	private	List<UUID> finishedUsersId;
	
	public Card(String cardName, Image image) {
		super();
		this.activityName = cardName;
		this.activityImage = image;
		this.cardId = UUID.randomUUID();
		this.relatedTagsId = new ArrayList<UUID>();
		this.finishedUsersId = new ArrayList<UUID>();
	}
	
	public Card() {
		
	}
	
	
	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public Image getActivityImage() {
		return activityImage;
	}

	public void setActivityImage(Image activityImage) {
		this.activityImage = activityImage;
	}

	public UUID getCardId() {
		return cardId;
	}

	public void setCardId(UUID cardId) {
		this.cardId = cardId;
	}

	public List<UUID> getRelatedTagsId() {
		return relatedTagsId;
	}

	public void setRelatedTagsId(List<UUID> relatedTagsId) {
		this.relatedTagsId = relatedTagsId;
	}

	public List<UUID> getFinishedUsersId() {
		return finishedUsersId;
	}

	public void setFinishedUsersId(List<UUID> finishedUsersId) {
		this.finishedUsersId = finishedUsersId;
	}
}

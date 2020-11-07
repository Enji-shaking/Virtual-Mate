package com.virtualmate.myArtifact.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
public class Image {
	
	private String imageUrl;
	private String imageId; 
	
	public Image(@JsonProperty("imageUrl") String imageUrl) {
		super();
		this.imageUrl = imageUrl;
		this.imageId = UUID.randomUUID().toString();
	}
	
	public Image() {

	}

	@Override
	public String toString() {
		return "Image [imageUrl=" + imageUrl + ", imageId=" + imageId + "]";
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	

}

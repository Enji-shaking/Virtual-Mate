package com.virtualmate.myArtifact.model;

import java.util.UUID;
public class Image {
	
	private String imageurl;
	private UUID imageId; 
	
	public Image(String imageurl) {
		super();
		this.imageurl = imageurl;
		this.imageId = UUID.randomUUID();
	}
	
	public Image() {

	}
	
	public String getImageurl() {
		return imageurl;
	}
	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}
	public UUID getImageId() {
		return imageId;
	}
	public void setImageId(UUID imageId) {
		this.imageId = imageId;
	}
}

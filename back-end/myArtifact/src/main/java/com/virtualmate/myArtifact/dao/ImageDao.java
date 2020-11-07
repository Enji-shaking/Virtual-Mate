package com.virtualmate.myArtifact.dao;

import java.util.List;
import com.virtualmate.myArtifact.model.Image;
public interface ImageDao {
	
	int setImage(Image image);

	Image getImageById(String imageId);
	
	List<Image> getImageList();
	
}

package com.virtualmate.myArtifact.service;

import com.virtualmate.myArtifact.dao.ImageDao;
import com.virtualmate.myArtifact.model.Image;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final ImageDao imageDao;

    public ImageService(@Qualifier("fbDaoImage") ImageDao imageDao){
        this.imageDao = imageDao;
    }
    public Image getImageById(String imageId){
        return imageDao.getImageById(imageId);
    }
    public Image addImage(Image image){
        if(image==null) return null;
        if(imageDao.setImage(image)==1){
            return image;
        }
        return null;
    }
}

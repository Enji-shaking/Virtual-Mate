package com.virtualmate.myArtifact.api;

import com.virtualmate.myArtifact.model.Image;

import com.virtualmate.myArtifact.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/image")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class imageController {
    public final ImageService imageService;
    @Autowired
	public imageController(ImageService imageService) {
		this.imageService = imageService;
    }
    
    @GetMapping("{imageId}")
    public Image getImageById(@PathVariable String imageId) {
		return imageService.getImageById(imageId);
    }
    /*
        imageUrl: "xxxx.xxxx.jpg"
    */
    @PostMapping("create")
    public Image createImage(@RequestBody Image image){
        imageService.addImage(image);
        return image;
    }

}

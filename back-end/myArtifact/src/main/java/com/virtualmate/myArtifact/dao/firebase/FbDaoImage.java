package com.virtualmate.myArtifact.dao.firebase;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.ImageDao;
import com.virtualmate.myArtifact.model.Image;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("fbDaoImage") //let sb to know to inject this later
public class FbDaoImage implements ImageDao {
	
	@Autowired
	FirebaseInitializer dbInitializer;

	@Override
	public int setImage(Image image) {
		Firestore db = dbInitializer.getFirebase();
		
		Image precedence = null;
		precedence = getImageByUrl(image.getImageUrl());
		if(precedence!=null) {
			image.setImageId(precedence.getImageId());
		}
		
		ApiFuture<WriteResult> future = db.collection("Images").document(image.getImageId()).set(image);
		
		try {
			System.out.println("Update time : " + future.get().getUpdateTime() + " " + image.toString() + " created!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return 1;
	}

	@Override
	public Image getImageById(String imageId) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<DocumentSnapshot> future = db.collection("Images").document(imageId).get();
		Image myImage = null;
		try {
			myImage = future.get().toObject(Image.class);
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		if (myImage!=null) {
			System.out.println(myImage.toString());
		}
		return myImage;
	}
	
	
	
	@Override
	public Image getImageByUrl(String imageUrl) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<QuerySnapshot> future = db.collection("Images").whereEqualTo("imageUrl",imageUrl).get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		if (documents.size()==0) {
			return null;
		}
		else if (documents.size()>1) {
			System.out.println("Oh fk, your database is Jammed!");
		}
		
		Image myImage = documents.get(0).toObject(Image.class);
		System.out.println(myImage.toString());
		return myImage;
	}

	@Override
	public List<Image> getImageList() {
		Firestore db = dbInitializer.getFirebase();
		List<Image> imageList = new ArrayList<Image>();
		
		ApiFuture<QuerySnapshot> future = db.collection("Images").get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		
		if (documents==null) {
			System.out.println("get imageList failed!");
			return imageList;
		}
		
		for (DocumentSnapshot document : documents) {
			imageList.add(document.toObject(Image.class));
		}
		
		try {
			System.out.println("Update time : " + future.get().getReadTime() + " imageList " + "returned!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return imageList;
	}	
	

}

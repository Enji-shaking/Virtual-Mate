package com.virtualmate.myArtifact.dao.dummy;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.ImageDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.Image;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("dummyDaoImage") //let sb to know to inject this later
public class DummyDaoImage implements ImageDao {
	
	private List<Image> db = new ArrayList<>();

	@Override
	public int setImage(Image image) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Image getImageById(String imageId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image getImageByUrl(String imageUrl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Image> getImageList() {
		// TODO Auto-generated method stub
		return null;
	}
	

}

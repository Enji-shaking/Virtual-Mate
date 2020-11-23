package com.virtualmate.myArtifact.dao.firebase;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.TagDao;
import com.virtualmate.myArtifact.model.Tag;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("fbDaoTag") //let sb to know to inject this later
public class FbDaoTag implements TagDao {
	
	@Autowired
	FirebaseInitializer dbInitializer;

	@Override
	public int setTag(Tag tag) {
		Firestore db = dbInitializer.getFirebase();
		
		Tag precedence = null;
		precedence = getTagByName(tag.getTagName());
		if(precedence!=null) {
			tag.setTagId(precedence.getTagId());
		}
		
		ApiFuture<WriteResult> future = db.collection("Tags").document(tag.getTagId()).set(tag);
		
		try {
			System.out.println("Update time : " + future.get().getUpdateTime() + tag.toString() + " created!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return 1;
	}

	@Override
	public Tag getTagById(String tagId) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<DocumentSnapshot> future = db.collection("Tags").document(tagId).get();
		Tag myTag = null;
		try {
			myTag = future.get().toObject(Tag.class);
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		if (myTag!=null) {
			System.out.println(myTag.toString());
		}
		return myTag;
	}
	
	@Override
	public Tag getTagByName(String tagName) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<QuerySnapshot> future = db.collection("Tags").whereEqualTo("tagName",tagName).get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		if (documents == null || documents.size() == 0) {
			return null;
		}
		else if (documents.size()>1) {
			System.out.println("Oh fk, your database is Jammed!");
		}
		
		Tag myTag = documents.get(0).toObject(Tag.class);
		System.out.println(myTag.toString());
		return myTag;
	}

	@Override
	public List<Tag> getTagList() {
		Firestore db = dbInitializer.getFirebase();
		List<Tag> tagList = new ArrayList<Tag>();
		
		ApiFuture<QuerySnapshot> future = db.collection("Tags").get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		
		if (documents==null) {
			System.out.println("get tagList failed!");
			return tagList;
		}
		
		for (DocumentSnapshot document : documents) {
			tagList.add(document.toObject(Tag.class));
		}
		
		try {
			System.out.println("Update time : " + future.get().getReadTime() + " tagList " + "returned!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return tagList;
	}


}

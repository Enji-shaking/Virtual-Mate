package com.virtualmate.myArtifact.dao.dummy;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.TagDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.Tag;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("dummyDaoTag") //let sb to know to inject this later
public class DummyDaoTag implements TagDao {
	
	private List<Tag> db = new ArrayList<>();

	@Override
	public int setTag(Tag tag) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Tag getTagById(String tagId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Tag getTagByName(String tagName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Tag> getTagList() {
		// TODO Auto-generated method stub
		return null;
	}
	

}

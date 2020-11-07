package com.virtualmate.myArtifact.dao.dummy;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.Chat;
import com.virtualmate.myArtifact.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("dummyDaoChat") //let sb to know to inject this later
public class DummyDaoChat implements ChatDao {
	
	private List<Chat> db = new ArrayList<>();

	@Override
	public int setChat(Chat chat) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Chat getChatById(String charId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Chat> getChatList() {
		// TODO Auto-generated method stub
		return null;
	}
	

}

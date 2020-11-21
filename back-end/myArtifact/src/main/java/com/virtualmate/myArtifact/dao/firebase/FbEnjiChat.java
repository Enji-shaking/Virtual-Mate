package com.virtualmate.myArtifact.dao.firebase;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.model.Chat;
import com.virtualmate.myArtifact.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("fbEnjiChat")
public class FbEnjiChat implements ChatDao {
    @Autowired
    FirebaseInitializer dbInitializer;
    
    @Override
	public int setChat(Chat chat) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<WriteResult> future = db.collection("myChats").document(chat.getChatId()).set(chat);
		try {
			System.out.println("Update time : " + future.get().getUpdateTime() + chat.toString() + " created!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return 1;
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

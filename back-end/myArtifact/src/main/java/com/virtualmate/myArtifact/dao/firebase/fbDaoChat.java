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

@Repository("fbDaoChat") //let sb to know to inject this later
public class fbDaoChat implements ChatDao {
	
	@Autowired
	FirebaseInitializer dbInitializer;

	@Override
	public int setChat(Chat chat) {
		Firestore db = dbInitializer.getFirebase();
		
//		Chat precedence = null;
//		precedence = getChatByUsers(chat.getUsers().get(0),chat.getUsers().get(1));
//		if(precedence!=null) {
//			chat.setChatId(precedence.getChatId());
//		}
		
		ApiFuture<WriteResult> future = db.collection("Chats").document(chat.getChatId()).set(chat);
		
		try {
			System.out.println("Update time : " + future.get().getUpdateTime() + chat.toString() + " created!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return 1;
	}

	@Override
	public Chat getChatById(String chatId) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<DocumentSnapshot> future = db.collection("Chats").document(chatId).get();
		Chat myChat = null;
		try {
			myChat = future.get().toObject(Chat.class);
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		if (myChat!=null) {
			System.out.println(myChat.toString());
		}
		return myChat;
	}
	
//	@Override
//	public Chat getChatByUsers(String userA, String userB) {
//		Firestore db = dbInitializer.getFirebase();
//		
//		a = db.collection("Chats")
//		
//		ApiFuture<DocumentSnapshot> future1 = db.collection("Users").document(userA).get();
//		ApiFuture<DocumentSnapshot> future2 = db.collection("Users").document(userA).get();
//
//		try {
//			User usrA = future1.get().toObject(User.class);
//			User usrB = future1.get().toObject(User.class);
//			if (usrA==null || usrB==null) {
//				System.out.println("Oh fk, your database is Jammed!");
//				throw new Exception("incorrect input, users does not exists");
//			}
//			HashSet<String> s1 = new HashSet<String>(usrA.getChats());
//			HashSet<String> s2 = new HashSet<String>(usrB.getChats());
//			System.out.println(s1);
//			System.out.println(s2);
//			
//			s1.retainAll(s2);
//			ArrayList<String> result = new ArrayList<>(s1);
//			if (result.size()>1) {
//				System.out.println("Oh fk, your database is Jammed!");
//			}
//			if (result.size()==0) {
//				return null;
//			} else {
//				Chat myChat = db.collection("Chats").document(result.get(0)).get().get().toObject(Chat.class);
//				System.out.println(myChat.toString());
//				return myChat;
//			}
//			
//		} catch (Exception e1) {
//			e1.printStackTrace();
//			System.out.println("Errrooooooor!");
//		}
//		return null;
//	}

	@Override
	public List<Chat> getChatList() {
		Firestore db = dbInitializer.getFirebase();
		List<Chat> chatList = new ArrayList<Chat>();
		
		ApiFuture<QuerySnapshot> future = db.collection("Chats").get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		
		if (documents==null) {
			System.out.println("get chatList failed!");
			return chatList;
		}
		
		for (DocumentSnapshot document : documents) {
			chatList.add(document.toObject(Chat.class));
		}
		
		try {
			System.out.println("Update time : " + future.get().getReadTime() + " chatList " + "returned!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return chatList;
	}	
	

}

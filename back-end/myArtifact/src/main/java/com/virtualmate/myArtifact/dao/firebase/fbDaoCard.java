package com.virtualmate.myArtifact.dao.firebase;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.model.Card;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("fbDaoCard") //let sb to know to inject this later
public class fbDaoCard implements CardDao {
	
	@Autowired
	FirebaseInitializer dbInitializer;

	@Override
	public int setCard(Card card) {
		Firestore db = dbInitializer.getFirebase();
		
		Card precedence = null;
		precedence = getCardByName(card.getActivityName());
		if(precedence!=null) {
			card.setCardId(precedence.getCardId());
		}
		
		ApiFuture<WriteResult> future = db.collection("Cards").document(card.getCardId()).set(card);
		
		try {
			System.out.println("Update time : " + future.get().getUpdateTime() + card.toString() + " created!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return 1;
	}

	@Override
	public Card getCardById(String cardId) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<DocumentSnapshot> future = db.collection("Cards").document(cardId).get();
		Card myCard = null;
		try {
			myCard = future.get().toObject(Card.class);
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		if (myCard!=null) {
			System.out.println(myCard.toString());
		}
		return myCard;
	}
	
	@Override
	public Card getCardByName(String activityName) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<QuerySnapshot> future = db.collection("Cards").whereEqualTo("activityName",activityName).get();
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
		
		Card myCard = documents.get(0).toObject(Card.class);
		System.out.println(myCard.toString());
		return myCard;
	}

	@Override
	public List<Card> getCardList() {
		Firestore db = dbInitializer.getFirebase();
		List<Card> cardList = new ArrayList<Card>();
		
		ApiFuture<QuerySnapshot> future = db.collection("Cards").get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		
		if (documents==null) {
			System.out.println("get cardList failed!");
			return cardList;
		}
		
		for (DocumentSnapshot document : documents) {
			cardList.add(document.toObject(Card.class));
		}
		
		try {
			System.out.println("Update time : " + future.get().getReadTime() + " cardList " + "returned!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return cardList;
	}	
	

}

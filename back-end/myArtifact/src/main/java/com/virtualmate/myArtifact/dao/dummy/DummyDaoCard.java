package com.virtualmate.myArtifact.dao.dummy;

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

@Repository("dummyDaoCard") //let sb to know to inject this later
public class DummyDaoCard implements CardDao {
	
	private List<Card> db = new ArrayList<>();

	@Override
	public int setCard(Card card) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Card getCardById(String cardId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Card getCardByName(String cardName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Card> getCardList() {
		// TODO Auto-generated method stub
		return null;
	}
	
}

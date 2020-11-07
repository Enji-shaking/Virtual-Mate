package com.virtualmate.myArtifact.dao;

import java.util.List;
import com.virtualmate.myArtifact.model.Card;
public interface CardDao {
	
	int setCard(Card card);

	Card getCardById(String cardId);
	
	Card getCardByName(String cardName);
	
	List<Card> getCardList();
	
}

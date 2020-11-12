package com.virtualmate.myArtifact.service;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.TagDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.Tag;
import com.virtualmate.myArtifact.model.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CardService {
    private final CardDao cardDao;
    private final UserDao userDao;
    private final TagDao tagDao;
    public CardService(@Qualifier("dummyDaoCard") CardDao cardDao, @Qualifier("dummyDaoUser") UserDao userDao, @Qualifier("dummyDaoTag") TagDao tagDao) {
        this.cardDao = cardDao;
        this.userDao = userDao;
        this.tagDao = tagDao;
    }

    public List<Card> createCard(UUID userId, String password, Card card, List<String> tags){
        List<Card> list = new ArrayList<Card>();
        //validate the user
        if(userDao.getUserById(userId.toString())==null){
            return null;
        }
        //get the list of tags id rather than the list of tags
        List<String> tagIds = new ArrayList<String>();
        //iterate over the tags to create not existed tag
        for (String s:tags) {
            if(tagDao.getTagByName(s)==null){
                tagDao.setTag(new Tag(s));
            }
            tagIds.add(tagDao.getTagByName(s).getTagId());
        }
        //set the tags to the card, since they are read separately
        card.setRelatedTagsId(tagIds);
        //create the card with cardDao
        cardDao.setCard(card);
        return list;
    }
    public List<Card> getCardsByTag(String tagName){
        List<String> cardId = tagDao.getTagByName(tagName).getRelatedCardsId();
        List<Card> cards = new ArrayList<Card>();
        for(String s:cardId){
            cards.add(cardDao.getCardById(s));
        }
        return cards;
    }
    public List<User> getUsersByCardId(String cardId){
        List<String> userIds = cardDao.getCardById(cardId).getFinishedUsersId();
        List<User> users = new ArrayList<User>();
        for(String s : userIds){
            users.add(userDao.getUserById(s));
        }
        return users;
    }
}
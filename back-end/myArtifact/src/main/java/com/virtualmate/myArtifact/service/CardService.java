package com.virtualmate.myArtifact.service;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.TagDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.Tag;
import com.virtualmate.myArtifact.model.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CardService {
    private final CardDao cardDao;
    private final UserDao userDao;
    private final TagDao tagDao;
    public CardService(@Qualifier("fbDaoCard") CardDao cardDao, @Qualifier("fbDaoUser") UserDao userDao, @Qualifier("fbDaoTag") TagDao tagDao) {
        this.cardDao = cardDao;
        this.userDao = userDao;
        this.tagDao = tagDao;
    }

    public Card createCard(String userId, String password, Card card, List<String> tags){
        //validate the user
        if(userDao.getUserById(userId)==null){
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
            //add the card in the tags
            Tag tag = tagDao.getTagByName(s);
            List<String> cardInTag = tag.getRelatedCardsId();
            cardInTag.add(card.getCardId());
            tag.setRelatedCardsId(cardInTag);
            tagDao.setTag(tag);
        }
        //set the tags to the card, since they are read separately
        card.setRelatedTagsId(tagIds);
        //create the card with cardDao
        cardDao.setCard(card);
        return card;
    }
    public List<Card> getCardsByTag(String tagName){
        Tag tag = tagDao.getTagByName(tagName);
        List<Card> cards = new ArrayList<Card>();
        if(tag == null){
            return cards;
        }
        List<String> cardId = tag.getRelatedCardsId();
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
    public List<Card> getAllCards(){
        return cardDao.getCardList();
    }
    public Tag getTagById(String tagId){
        return tagDao.getTagById(tagId);
    }
    public Card getCardById(String cardId){
        return cardDao.getCardById(cardId);
    }
}

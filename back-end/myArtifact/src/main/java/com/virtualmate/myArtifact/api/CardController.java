package com.virtualmate.myArtifact.api;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.CardService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/card")
@RestController
public class CardController {
    public final CardService cardService;
    @Autowired
	public CardController(CardService cardService) {
		this.cardService = cardService;
    }

    public static class CardWrapper{
        public UserCredentials userCredentials;
        public Card myCard;
        public List<String> tagNames;
        public CardWrapper(@JsonProperty("userCred") UserCredentials userCredentials, @JsonProperty("card") Card myCard, @JsonProperty("tags") List<String> tagNames) {
			this.userCredentials = userCredentials;
			this.myCard = myCard;
			this.tagNames = tagNames;
		}
    }
    /*
    {
        userCred{
            "userId": "fe96f7ec-7e8a-431f-9a3c-3298cd55238b",
			"password": "xxx"
        },
        card:{
            cardName: xxx,
            imageId: xxx
        },
        tags:{
            tagName
        }
    }
    */
    @PostMapping("create")
    public Card createCard(@RequestBody CardWrapper cardWrapper){
        //The reason I incorporate user credential here is to make sure that only admins could create cards

        return cardService.createCard(cardWrapper.userCredentials.getUserId(), cardWrapper.userCredentials.getPassword(),
            cardWrapper.myCard,
            cardWrapper.tagNames
        );
        //to service guy, remember to check user, then only pass the card object to dao
        //tagNames here incorporate all the tag names the frontend passed. The reason why I use tagname if to let the clients easily create new tags. 
        //So what the service guy needs to do here is to iterate through the tagNames and check if there's a tag exist. If not, create a new one and insert to the database
    }

    
    //Given tag names, display all matching cards in the gallery. Given an empty tag name, display all cards.
    /*
        { tagName: xxx }
    */
    @GetMapping("list")
    public List<Card> getCardsByTag(@JsonProperty("tagName") String tagName){
        return cardService.getCardsByTag("tagName");
        // To service guy, go get the Tag object first, then grab the "relatedCardsId" arraylist and then grab all the related cards in a loop
    }

    @GetMapping("{cardId}/users")
    public List<User> getUsersByCardId(@PathVariable String cardId){
        return cardService.getUsersByCardId(cardId);
        // To service guy, grab the card object first, then iterate the "finishedUsersId"
    
    }
    @GetMapping("all")
    public List<User> getAllCards(){
        return cardService.getAllCards();
    }


}

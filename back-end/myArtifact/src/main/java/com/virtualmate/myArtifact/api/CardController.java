package com.virtualmate.myArtifact.api;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.service.CardService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
        public CardWrapper(@JsonProperty("userCred") UserCredentials userCredentials,@JsonProperty("card") Card myCard) {
			this.userCredentials = userCredentials;
			this.myCard = myCard;
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
        }    
    }
    */
    @PostMapping("create")
    public List<Card> createCard(@RequestBody CardWrapper cardWrapper){
        return cardService.createCard(cardWrapper.userCredentials.getUserId(), cardWrapper.userCredentials.getPassword(),
            cardWrapper.myCard
        );
        //to service guy, remember to check user, then only pass the card object to dao
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

    

}

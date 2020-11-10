import java.util.*;

public class Main {

	public boolean Register(String username, String password, String email)
	{
		// Call User constructor
		
		// Success
		return true;
	}
	
	public String Login(String identifier, String password) // identifier can be either username or email as its value
	{
		String userId = null;
		// Fetch the user with corresponding identifier
		
		// Confirm password
		
		// Call setOnline() for this user
		
		// Success
		return userId;
	}
	
	
	public boolean Logout(String userId, String userHashedPass)
	{
		
		// Success
		return true;
	}	
	
	public int CreateCard(String cardName, Image image, List<String> Tags)
	{
		int cardId;
		// call Card constructor
		
		// Success
		return cardId;
	}
		
	public List<Card> ListCards(String tag)
	{
		
		// return the list of cards that will be displayed in Gallery
	}
	
	public void AddCardtoUser(int user_id, int card_id)
	{
		// Fetch the User
		
		// Fetch the Card
		
		// user.Cards_Planned.add(card);
	}
	
	public Set<Card> SearchTag (String tag_name)
	{
		// Fetch the Tag
		
		// return tag.Related_Cards
	}
	
	public static void main(String[] args) {

	}

}

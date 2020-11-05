import java.util.*;

public class Main {

	public boolean Register(int user_id, String password)
	{
		// Call User constructor
		
		// Success
		return true;
	}
	
	public boolean Login(int user_id, String password)
	{
		// Fetch the user with corresponding User_ID
		
		// Confirm password
		
		// Call set_Online() for this user
		
		// Success
		return true;
	}
	
	public Set<Card> SearchTag (String tag_name)
	{
		// Fetch the Tag
		
		// return tag.Related_Cards
	}
		
	public List<Card> ListCards()
	{
		// depends on the implementation of database
		
		// return the list of cards that will be displayed in Gallery
	}
	
	public void AddCardtoUser(int user_id, int card_id)
	{
		// Fetch the User
		
		// Fetch the Card
		
		// user.Cards_Planned.add(card);
	}
	
	public static void main(String[] args) {

	}

}

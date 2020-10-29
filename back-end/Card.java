import java.util.*;

public class Card {
	public int Card_ID;
	public String Activity_Name;
	public Image Activity_Image;
	public Set<Tag> Related_Tags;
	public List<User> Accomplished_Users;
	
	public Card() {
		
	}

	// Convert Card to a User_Card
	public User_Card To_UserCard(int user_id)
	{
		User_Card user_card = new User_Card(user_id, Card_ID, Activity_Name);
		return user_card;
	}
}

import java.util.*;

public class User {

	public String User_Name;
	public int User_ID;
	private String password;
	boolean Is_Online;
	public List<User_Card> Cards_Planned;
	private List<User_Card> Cards_Accomplished;
	private List<Image> User_Images;
	private List<Chat> Kept_Chats;
	
	
	public User() {
		
	}
	
	private void set_Online()
	{
		this.Is_Online = true;
	}
	
	private void Remove_Card(User_Card to_remove)
	{
		// Search the list Cards_Planned
		
		// Remove this card from Cards_Planned
	}
	
	private void Complete_Card(User_Card to_complete)
	{
		to_complete.set_Complete();
		Remove_Card(to_complete);
		Cards_Accomplished.add(to_complete);
		Card completed_card = to_complete.to_Card();
		completed_card.Accomplished_Users.add(this);
	}
	

}

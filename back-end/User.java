import java.util.*;

public class User {

	public String User_Name;
	public int User_ID;
	public String Email;
	private String password;
	public boolean Is_Online;
	public List<User_Card> Cards_Planned;
	private List<User_Card> Cards_Accomplished;
	private List<Image> User_Images;
	private List<Chat> Kept_Chats;
	
	
	public User() {
		
	}
	
	public void set_Online()
	{
		this.Is_Online = true;
	}
	
	public void Remove_Card(User_Card to_remove)
	{
		// Search the list Cards_Planned
		
		// Remove this card from Cards_Planned
	}
	
	public void Complete_Card(User_Card to_complete)
	{
		to_complete.set_Complete();
		Remove_Card(to_complete);
		Cards_Accomplished.add(to_complete);
		Card completed_card = to_complete.to_Card();
		completed_card.getAccomplished_Users().add(this);
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Image> getUser_Images() {
		return User_Images;
	}

	public void setUser_Images(List<Image> user_Images) {
		User_Images = user_Images;
	}

	public List<Chat> getKept_Chats() {
		return Kept_Chats;
	}

	public void setKept_Chats(List<Chat> kept_Chats) {
		Kept_Chats = kept_Chats;
	}
	

}

import java.util.*;

public class Card {
	public int Card_ID;
	public String Activity_Name;
	public Image Activity_Image;
	public Set<Tag> Related_Tags;
	private List<User> Accomplished_Users;
	
	public Card() {
		
	}

	public List<User> getAccomplished_Users() {
		return Accomplished_Users;
	}

	public void setAccomplished_Users(List<User> accomplished_Users) {
		Accomplished_Users = accomplished_Users;
	}
}

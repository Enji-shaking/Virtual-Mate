import java.util.*;

public class User {

	public String User_Name;
	public int User_ID;
	private String password;
	boolean Is_Online;
	private List<User_Card> Cards_Planned;
	private List<User_Card> Cards_Accomplished;
	private List<Image> User_Images;
	private List<Chat> Kept_Chats;
	
	
	public User() {
		
	}
	
	private void set_Online()
	{
		this.Is_Online = true;
	}
	

}

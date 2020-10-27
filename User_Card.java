
public class User_Card {

	private int User_ID;
	public int Card_ID;
	String Activity_Name;
	private boolean Is_Complete;
	
	public User_Card(int user_id, int card_id, String activity_name) {
		this.User_ID = user_id;
		this.Card_ID = card_id;
		this.Activity_Name = activity_name;
		this.Is_Complete = false;
	}
	
	private void set_Complete()
	{
		this.Is_Complete = true;
	}

}

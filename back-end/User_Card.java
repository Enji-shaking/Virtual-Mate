
public class User_Card extends Card{

	private boolean Is_Complete;
	
	public User_Card() {
		super();
		this.Is_Complete = false;
	}
	
	public void set_Complete()
	{
		this.Is_Complete = true;
	}
	
	public Card to_Card()
	{
		// Fetch the Card with matching Card_ID
	}

}

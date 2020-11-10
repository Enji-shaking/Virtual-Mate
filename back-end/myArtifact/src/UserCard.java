import java.time.LocalDateTime;

public class UserCard extends Card{

	private boolean isComplete;
	private LocalDateTime completeTime;
	
	public UserCard() {
		super();
		this.isComplete = false;
	}
	
	public void setComplete()
	{
		this.isComplete = true;
	}
	
	public Card toCard()
	{
		// Fetch the Card with matching Card_ID
	}

	public boolean isComplete() {
		return isComplete;
	}

	public void setComplete(boolean isComplete) {
		this.isComplete = isComplete;
	}

	public LocalDateTime getCompleteTime() {
		return completeTime;
	}

	public void setCompleteTime(LocalDateTime completeTime) {
		this.completeTime = completeTime;
	}



}

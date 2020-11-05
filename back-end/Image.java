
public class Image {

	private int imageID;
	private String imageUrl;
	private int userId;
	private int userIdTo;
	
	// Image Collection?
	
	public Image() {
		
	}

	public int getImageID() {
		return imageID;
	}

	public void setImageID(int imageID) {
		this.imageID = imageID;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getUserIdTo() {
		return userIdTo;
	}

	public void setUserIdTo(int userIdTo) {
		this.userIdTo = userIdTo;
	}


}

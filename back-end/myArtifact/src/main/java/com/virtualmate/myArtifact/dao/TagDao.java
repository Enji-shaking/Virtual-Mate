package com.virtualmate.myArtifact.dao;

import java.util.List;
import com.virtualmate.myArtifact.model.Tag;
public interface TagDao {
	
	int setTag(Tag tag);

	Tag getTagById(String tagId);
	
	Tag getTagByName(String tagName);
	
	List<Tag> getTagList();
	
}

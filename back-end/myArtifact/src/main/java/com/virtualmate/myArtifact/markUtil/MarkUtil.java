package com.virtualmate.myArtifact.markUtil;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

public class MarkUtil {
	public static <T> Map<UUID,T> mstr2muuid (Map<String,T> mstr){
		Map<UUID, T> muuid = mstr.entrySet().stream()
					.collect(Collectors.toMap(e -> UUID.fromString(e.getKey()), Map.Entry::getValue));
		return muuid;
	}
	
	public static <T> Map<String,T> muuid2mstr (Map<UUID,T> muuid){
		Map<String, T> mstr = muuid.entrySet().stream()
					.collect(Collectors.toMap(e -> e.getKey().toString(), Map.Entry::getValue));
		return mstr;
	}
	
	public static List<UUID> lstr2luuid (List<String> lstr){
		List<UUID> luuid = lstr.stream()
					.map(e -> UUID.fromString(e))
					.collect(Collectors.toList());
		return luuid;
	}
	
	public static List<String> luuid2lstr (List<UUID> luuid){
		List<String> lstr = luuid.stream()
					.map(e -> e.toString())
					.collect(Collectors.toList());
		return lstr;
	}
}

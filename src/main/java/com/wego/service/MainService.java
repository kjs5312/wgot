package com.wego.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.wego.vo.PlaceVO;

public interface MainService {
	public List<Map<String, Object>> tripInfo(Map<String, Object> requestParam) throws IOException;
	public Map<String, Object> tripUpdateInfo(Map<String, Object> requestParam) throws IOException;
	public Map<String, Object> getTripInfo(Map<String, Object> requestParam) throws IOException;
	public List<Map<String, Object>> getPlaceList(Map<String, Object> requestParam) throws IOException;
	public Map<String, Object> insertPlaceInfo(List<PlaceVO> placeList) throws IOException;
	public Map<String, Object> deleteTrip(String tripUuid) throws IOException;
}

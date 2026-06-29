package com.wego.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wego.service.MainService;
import com.wego.vo.PlaceVO;

@Service
public class MainServiceImpl implements MainService {
	@Autowired
	private MainDAO mainDAO;
	
	public List<Map<String, Object>> tripInfo(Map<String, Object> requestParam) throws IOException{
		
		return mainDAO.placeInsert(requestParam); 
	}
	
	public Map<String, Object> getTripInfo(Map<String, Object> requestParam) throws IOException{
		
		return mainDAO.getTripInfo(requestParam); 
	}
	public Map<String, Object> tripUpdateInfo(Map<String, Object> requestParam) throws IOException{
		Map<String, Object> result = new HashMap<>();
		
		int res  =mainDAO.tripUpdateInfo(requestParam); 
		
		if(res >= 1) {
			result.put("result", "success");
			result.put("msg", "수정에 성공했습니다.");
		} else {
			result.put("result", "fail");
			result.put("msg", "수정에 실패했습니다.");
		}
		return result; 
	}
	
	public List<Map<String, Object>> getPlaceList(Map<String, Object> requestParam) throws IOException{
		
		return mainDAO.getPlaceList(requestParam); 
	}
	
	public Map<String, Object> insertPlaceInfo(List<PlaceVO> placeList) throws IOException{
		
		return mainDAO.insertPlaceInfo(placeList); 
	}
	
	
	@Transactional
	public Map<String, Object> deleteTrip(String tripUuid) throws IOException{
		
		Map<String, Object> result = new HashMap<>(); 
		
		try {
			int trip_id = mainDAO.getTripId(tripUuid);
			mainDAO.deletePlace(trip_id);
			mainDAO.deleteTrip(tripUuid);
			result.put("result", "success");
			result.put("msg", "삭제 성공하셨습니다.");
		} catch(Exception e) {
			result.put("msg", "삭제 실패하셨습니다.");
			result.put("result", "fail");
		}

		
		
		
		return result; 
	}
}

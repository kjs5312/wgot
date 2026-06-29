package com.wego.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wego.vo.PlaceVO;

@Repository
public class MainDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public Map<String, Object> getTripInfo(Map<String,Object> requestParam) throws IOException{
		return sqlSession.selectOne("main.getTripInfo",requestParam);
	}
	
	public int tripUpdateInfo(Map<String,Object> requestParam) throws IOException{
		return sqlSession.update("main.tripUpdateInfo",requestParam);
	}
	
	public List<Map<String, Object>> getPlaceList(Map<String,Object> requestParam) throws IOException{
		
		int trip_id = sqlSession.selectOne("main.getTripId",requestParam.get("tripUuid"));
		
		return sqlSession.selectList("main.getPlaceList",trip_id);
	}
	
	
	public List<Map<String,Object>> placeInsert(Map<String, Object> requestParam) throws IOException{
		
		return sqlSession.selectList("main.tripInfo",requestParam);
	}
	
	
	
	public int getPlaceState(Map<String,Object> requestParam) throws IOException{
		
		return sqlSession.selectOne("main.getPlaceState",requestParam);
	}
	
	
	
	@Transactional
	public Map<String,Object> insertPlaceInfo(List<PlaceVO> placeList) throws IOException{
		
		int trip_id = sqlSession.selectOne("main.getTripId",placeList.get(0).getUuid());
		
		for(PlaceVO place : placeList){
		    place.setTrip_id(trip_id);
		}
		
		sqlSession.delete("main.deletePlaceInfo", trip_id);
		
		int res = sqlSession.insert("main.insertPlaceInfo",placeList);
		
		Map<String, Object> msg = new HashMap<>(); 
		
		if(res > 0) {
			msg.put("msg", "저장 성공하셨습니다.");
			msg.put("res", "success");
		}else {
			msg.put("msg", "저장 실패하셨습니다. 잠시후에 재시도 부탁드리겠습니다.");
			msg.put("res", "fail");
		}
		
		return msg;
	}
	
	
	
	public int getTripId(String uuid) {
		return sqlSession.selectOne("main.getTripId",uuid);
	}
	
	public int deletePlace(int trip_id) {
		return sqlSession.delete("main.deletePlaceInfo",trip_id);
	}
	
	public int deleteTrip(String uuid){
		
		return sqlSession.delete("main.deleteTrip",uuid);
	}
}

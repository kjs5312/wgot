package com.wego.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wego.service.TripRegistService;

@Service
public class TripRegistServiceImpl implements TripRegistService{
	@Autowired
	private TripRegistDAO tripRegistDAO;
	
	public Map<String, Object> placeInsert(Map<String, Object> requestParam) throws IOException{
		
		
		Map<String, Object> msg = new HashMap<>();
		
		
		try {
			String uuid = tripRegistDAO.placeInsert(requestParam);
			msg.put("result", "success");
			msg.put("msg", "저장에 성공하셨습니다.");
			msg.put("uuid", uuid);
		} catch(Exception e) {
			msg.put("result", "fail");
			msg.put("msg", "저장에 실패하셨습니다. 동일한 문제가 지속적으로 발생시 문의하여주세요");
		}
		
		
//		if(res > 0) {
//			msg.put("result", "success");
//			msg.put("msg", "저장에 성공하셨습니다.");
//		} else {
//			msg.put("result", "fail");
//			msg.put("msg", "저장에 실패하셨습니다. 동일한 문제가 지속적으로 발생시 문의하여주세요");
//		}
		
		return msg;
	}
}

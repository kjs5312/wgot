package com.wego.service.impl;

import java.io.IOException;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository 
public class TripRegistDAO {
	
	@Autowired
//	@Qualifier("sqlSession")
	private SqlSessionTemplate sqlSession;
	
	public String placeInsert(Map<String, Object> requestParam) throws IOException{
		
		String res = sqlSession.selectOne("regist.placeInsert", requestParam);
		
		return res;
	}
}

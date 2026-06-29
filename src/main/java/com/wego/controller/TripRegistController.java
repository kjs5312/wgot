package com.wego.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wego.service.TripRegistService;

@Controller
@RequestMapping("/regist")
public class TripRegistController {
	
	@Autowired
	private TripRegistService tripRegistService;
	
	@RequestMapping("/trip")
	public String registOpen() throws IOException{
		return "regist/trip";
	}
	
	@RequestMapping("/tripInsert")
	@ResponseBody
	public Map<String, Object> placeInsert(@RequestBody Map<String, Object> map) throws IOException{
		Map<String, Object> res = new HashMap<>();
		
		res = tripRegistService.placeInsert(map);
		
		return res;
	}
}

package com.wego.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.service.MainService;
import com.wego.vo.PlaceVO;
import com.wego.vo.RouteVO;

@Controller
public class MainController {
	@Autowired
	MainService mainService;
	
	@RequestMapping("/")
	public String main() {
		return "trip/main";
	}
	
	@RequestMapping("/trip/tripInfo")
	@ResponseBody
	public List<Map<String,Object>> tripInfo(@RequestBody Map<String, Object> map) throws IOException{
		
		return mainService.tripInfo(map);
	}
	
	@RequestMapping("/tripUpdate")
	public String registUpdateOpen(@RequestParam(required = false) String trip_uuid, Model model ) throws IOException{
		model.addAttribute("trip_uuid",trip_uuid);
		return "regist/trip";
	}
	
	
	@RequestMapping("/trip/getTripInfo")
	@ResponseBody
	public Map<String,Object> getTripInfo(@RequestBody Map<String, Object> map) throws IOException{
		
		return mainService.getTripInfo(map);
	}
	
	@RequestMapping("/trip/tripUpdateInfo")
	@ResponseBody
	public Map<String,Object> tripUpdateInfo(@RequestBody Map<String, Object> map) throws IOException{
		return mainService.tripUpdateInfo(map);
	}
	
	
	@RequestMapping("/place/{tripUuid}")
	public String place(@PathVariable String tripUuid, Model model) {
		model.addAttribute("tripUuid", tripUuid);
		return "trip/place";
	}
	
	@RequestMapping("/place/getPlaceList")
	@ResponseBody
	public List<Map<String,Object>> getPlaceList(@RequestBody Map<String, Object> map) throws IOException{
		
		return mainService.getPlaceList(map);
	}
	
	@RequestMapping("/place/getRoute")
	@ResponseBody
	public Object getRoute(@RequestBody RouteVO requestVO) {
		
		List<PlaceVO> placeList = requestVO.getPlaceList();
		
		
		List<Map<String, Object>> routeList = new ArrayList<>();
		
		for(int x = 0; x < placeList.size() - 1; x++) {
			Map<String, Object> routeMap = new HashMap<>();
			List<Map<String, Object>> routePath = new ArrayList<>();
			String origin = placeList.get(x).getPlace_lng() + "," +placeList.get(x).getPlace_lat();
			String destination = placeList.get(x+1).getPlace_lng() + "," +placeList.get(x+1).getPlace_lat();
			
			String apiUrl = "https://apis-navi.kakaomobility.com/v1/directions"
					+ "?origin=" + origin
					+ "&destination=" + destination;
		
			try {
				URL url = new URL(apiUrl);
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				
				conn.setRequestProperty(
						"Authorization",
						"KakaoAK " + "5cdc0b3e1760e5705bbfa2d83da07893"
						);
				
				conn.setRequestProperty("Content-Type",	"application/json");
				
				BufferedReader br =
						new BufferedReader(
								new InputStreamReader(
										conn.getInputStream(),
										"UTF-8"
										)
								);
				
				StringBuilder sb = new StringBuilder();
				
				String line;
				
				while((line = br.readLine()) != null){
					sb.append(line);
				}
				
				br.close();
				
				String result = sb.toString();
				
				ObjectMapper mapper = new ObjectMapper();
	
				JsonNode root = mapper.readTree(result);
				JsonNode section = root.path("routes").get(0).path("sections").get(0);
				
				JsonNode roads = section.path("roads");
				
				
				for(JsonNode road : roads){
	
				    JsonNode vertexes = road.path("vertexes");
	
				    for(int i = 0; i < vertexes.size(); i += 2){
				    	Map<String, Object> point = new HashMap<>();
				        point.put("lng", vertexes.get(i).asDouble());
				        point.put("lat", vertexes.get(i + 1).asDouble());
				        routePath.add(point);
				    }
				}
				routeMap.put("index",x);
				routeMap.put("path", routePath);
				
				routeList.add(routeMap);
			} catch (Exception e){
				e.printStackTrace();
			}
		}
		return routeList;
	}
	
	
	@RequestMapping("/trip/insertPlaceInfo")
	@ResponseBody
	public Map<String,Object> insertPlaceInfo(@RequestBody List<PlaceVO> placeList) throws IOException{
		
		return mainService.insertPlaceInfo(placeList);
	}
	
	@RequestMapping("/trip/deleteTrip")
	@ResponseBody
	public Map<String,Object> deleteTrip(@RequestBody String uuid) throws IOException{
		
		return mainService.deleteTrip(uuid);
	}
	
}

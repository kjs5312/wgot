package com.wego.service;

import java.io.IOException;
import java.util.Map;

public interface TripRegistService {
	public Map<String, Object> placeInsert(Map<String, Object> requestParam) throws IOException;
}

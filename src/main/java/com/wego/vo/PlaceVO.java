package com.wego.vo;

public class PlaceVO {
	
	private int trip_id;

	private String place_name;

	private String category_name;

    private Double place_lat;

    private Double place_lng;

    private String place_address;

    private String place_memo;

    private String place_url;

    private String order_no;
    
    private String uuid;

    public int getTrip_id() {
        return trip_id;
    }

    public void setTrip_id(int trip_id) {
        this.trip_id = trip_id;
    }

    public String getPlace_name() {
    	return place_name;
    }
    
    public void setPlace_name(String place_name) {
    	this.place_name = place_name;
    }
    
    public String getCategory_name() {
    	return category_name;
    }
    
    public void setCategory_name(String category_name) {
    	this.category_name = category_name;
    }

    public String getPlace_address() {
        return place_address;
    }

    public void setPlace_address(String place_address) {
        this.place_address = place_address;
    }

    public Double getPlace_lat() {
        return place_lat;
    }

    public void setPlace_lat(Double place_lat) {
        this.place_lat = place_lat;
    }

    public Double getPlace_lng() {
        return place_lng;
    }

    public void setPlace_lng(Double place_lng) {
        this.place_lng = place_lng;
    }

    public String getPlace_memo() {
        return place_memo;
    }

    public void setPlace_memo(String place_memo) {
        this.place_memo = place_memo;
    }

    public String getPlace_url() {
        return place_url;
    }

    public void setPlace_url(String place_url) {
        this.place_url = place_url;
    }
    
    public String getOrder_no() {
    	return order_no;
    }
    
    public void setOrder_no(String order_no) {
    	this.order_no = order_no;
    }
    
    public String getUuid() {
    	return uuid;
    }
    
    public void setUuid(String uuid) {
    	this.uuid = uuid;
    }
    
}

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<div class="trip-search-wrap">
    <button type="button"
            class="trip-search-toggle">
        🔍 여행 검색
    </button>
    <div class="trip-search-box">
        <input type="text" id="searchKeyword" class="trip-search-input" placeholder="여행명을 입력하세요">
        
        <div class="trip-date-wrap">

	        <input type="date" id="searchStartDate" class="trip-date-input" placeholder="시작일">
	
	        <span class="trip-date-separator">~</span>
	
	        <input type="date" id="searchEndDate" class="trip-date-input" placeholder="종료일">

    	</div>
        
        <button type="button" id="searchBtn" class="trip-search-btn">
            검색
        </button>
    </div>
</div>


<div class="trip-tab-wrap">
    <button type="button"
            class="trip-tab active"
            data-tab="upcoming">
        예정된 여행
    </button>

    <button type="button"
            class="trip-tab"
            data-tab="past">
        지난 여행
    </button>
</div>


<div class="card-container" id="card-container">
</div>
	
<div class="button-container">
	<button type="button" class="add-trip-btn" onclick="location.href='/regist/trip'">
	    + 여행 추가하기
	</button>
</div>

<script src="/resources/js/main.js"> </script> 
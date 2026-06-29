<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<link rel="stylesheet" href="/resources/css/place.css">
<script>
	window.tripUuid = '${tripUuid}';
</script>


<div class="place-wrap">
	<div class="logo-section">
    	<img src="${path}/resources/img/mainLogo.png" style="width:30%; height:auto; cursor:pointer;" onclick="location.href='/'">
    </div>
	
	
	<div class="trip-info-wrap">
	
	    <div class="trip-info-left">
	
	        <div class="trip-title" id="tripNm">
	        </div>
	
	        <div class="trip-date" id="tripDate">
	        </div>
	
	    </div>
	
	    <button class="trip-edit-btn" onclick="tripUpdate()">
	        여행 수정
	    </button>
	
	</div>


    <div class="place-map-wrap">
		<div class="place-search">
	        <div class="place-search-wrap">
	            <input type="text" id="placeSearch" class="place-search-input" placeholder="방문지를 검색해보세요">
	            <img src="/resources/img/icon/search.png" id="placeSearchBtn" class="place-search-icon">
	        </div>
	    </div>
	    
	    <div class="place-search-result">
    	</div>
    	
        <div id="map"></div>
	</div>

    <div class="place-card-container" id="placeContainer">
    </div>

    <!-- 버튼 -->
    <div class="place-btn-wrap">
<!--         <button type="button" class="place-add-btn" id="place-add-btn" onclick="addPlace()"> -->
<!--             + 목적지 추가 -->
<!--         </button> -->
<!--         <button type="button" class="place-save-btn" id="place-save-btn" onclick="savePlace()"> -->
<!--             저장하기 -->
<!--         </button> -->
<!--         <button type="button" class="place-edit-btn" id="place-edit-btn" onclick="editPlace()"> -->
<!--             수정하기 -->
<!--         </button> -->
    </div>
</div>




<script src="/resources/js/place.js"> </script> 
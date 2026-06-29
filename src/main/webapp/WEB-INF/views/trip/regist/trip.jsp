<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<script>
	window.tripUuid = '${trip_uuid}';
</script>

<div class="trip-form-card">
	<form id="placeInfo" method="post">
		<h2 class="form-title">여행 등록</h2>
	
		<!-- 여행 제목 -->
		<div class="form-group">
	
			<label>여행 제목</label> 
			<input type="text" class="form-input" id="tripName" name="tripName" placeholder="여행 제목을 입력하세요">
		</div>
	
		<!-- 여행 지역 -->
		<div class="form-group">
			<label>여행 지역</label> 
			<input type="text" id="tripLocation" name="tripLocation" class="form-input" placeholder="예: 제주, 부산">
		</div>
	
		<!-- 날짜 -->
		<div class="date-row">
	
			<div class="form-group">
				<label>출발일</label> 
				<input type="date" class="form-input" id="startDate" name="startDate" min="2000-01-01" max="2100-12-31">
			</div>
	
			<div class="form-group">
				<label>도착일</label>
				<input type="date" class="form-input" id="endDate" name="endDate" min="2000-01-01" max="2100-12-31">
			</div>
	
		</div>
	
		<!-- 인원 -->
		<div class="form-group">
	
			<label>여행 인원</label> 
			<input type="number" min="1" max="99" class="form-input" id="memberCnt" name="memberCnt" placeholder="인원 수 입력">
	
		</div>
	
		<!-- 설명 -->
		<div class="form-group">
	
			<label>여행 설명</label>
			<textarea class="form-input form-textarea" id="tripMemo" name="tripMemo" placeholder="여행에 대한 간단한 설명을 입력해보세요"></textarea>
	
		</div>
	
		<!-- 공개 여부 -->
		<div class="toggle-row">
	
			<span>공개 여부</span> 
			<label class="toggle-switch"> 
				<input type="checkbox" id="tripType" name="tripType"> 
				<span class="slider"></span>
			</label>
	
		</div>
	
		<!-- 버튼 -->
		<button class="submit-btn" type="button" onclick="tripInsert()">여행 만들기</button>
	
	</form>
</div>


<script src="/resources/js/trip.js"> </script> 
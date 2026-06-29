const tripUuid = window.tripUuid;

let mode = "create";

window.onload = function(){
	console.log(window.tripUuid,"??")
	if(tripUuid && tripUuid.trim() !== '') {
		mode = "update";
		$(".form-title").text("여행 수정");
		getTripInfo(tripUuid);
		$(".submit-btn").text("여행 수정");
		$(".submit-btn").attr("onclick","tripUpdate()");
	}
	
};

function getTripInfo(uuid){
	$.ajax({
	        url: '/trip/getTripInfo',
	        method: 'POST',
	        dataType: 'json',
			contentType: 'application/json',
			data:JSON.stringify({
				
				"uuid":uuid
				
			}),
	        success: function(response) {
				
				$("#tripName").val(response.trip_nm);
				$("#tripLocation").val(response.trip_location);
				$("#startDate").val(response.start_date);
				$("#endDate").val(response.end_date);
				$("#memberCnt").val(response.member_cnt);
				$("#tripMemo").val(response.trip_memo);
				$("#tripType").prop(
				    "checked",
				    response.trip_type === "PUBLIC"
				);
	        },
	        error: function(xhr, status, error) {
	            console.error("데이터 로드 실패:", status, error);
				console.error("HTTP 상태 코드:", xhr.status);
				console.error("HTTP 상태 텍스트:", xhr.statusText);
	        }
	    });
}


const peopleInput = document.getElementById("memberCnt");

peopleInput.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, '');

    if(this.value > 99 || this.value.length > 2){
		alert("인원수는 최소 1명이상 99명까지 입력 가능합니다");
		return;
    }
});


const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");

function validateDate(){

    const startDate = startInput.value;
    const endDate = endInput.value;

    if(startDate && endDate){

        if(startDate > endDate){

            alert("종료일은 출발일보다 빠를 수 없습니다.");

            endInput.value = "";
        }
    }
}

startInput.addEventListener("change", validateDate);
endInput.addEventListener("change", validateDate);

function tripInsert(){
	let formData = getFormData("#placeInfo",{});
	
	const tripType = $("#tripType").is(":checked")
	    ? "PUBLIC"
	    : "PRIVATE";
	
	$.ajax({
			        url: '/regist/tripInsert',
			        method: 'POST',
			        dataType: 'json',
					contentType: 'application/json',
					data:JSON.stringify({
						
						'trip_nm' : formData.tripName,
						'trip_location' : formData.tripLocation,
						'start_date' : formData.startDate,
						'end_date' : formData.endDate,
						'member_cnt' : formData.memberCnt,
						'trip_memo' : formData.tripMemo,
						'trip_type' : tripType,
						
					}),
			        success: function(response) {
						console.log("res >>> "+response)
						if(response.result === 'success'){
							if(confirm("여행이 등록되었습니다. \n목적지를 등록하시겠습니까?")){
								sessionStorage.setItem("trip_nm", formData.tripName);
								sessionStorage.setItem("start_date", formData.startDate);
								sessionStorage.setItem("end_date", formData.endDate);
								location.href="/place/"+ response.uuid;
							}
						} else {
							alert("저장에 실패했습니다.");
						}
						
						
			        },
			        error: function(xhr, status, error) {
			            console.error("데이터 로드 실패:", status, error);
						console.error("HTTP 상태 코드:", xhr.status);
						console.error("HTTP 상태 텍스트:", xhr.statusText);
			        }
			    });
}

function tripUpdate(){
	let formData = getFormData("#placeInfo",{});
		
		const tripType = $("#tripType").is(":checked")
		    ? "PUBLIC"
		    : "PRIVATE";
		
		$.ajax({
		        url: '/trip/tripUpdateInfo',
		        method: 'POST',
		        dataType: 'json',
				contentType: 'application/json',
				data:JSON.stringify({
					
					'trip_nm' : formData.tripName,
					'trip_location' : formData.tripLocation,
					'start_date' : formData.startDate,
					'end_date' : formData.endDate,
					'member_cnt' : formData.memberCnt,
					'trip_memo' : formData.tripMemo,
					'trip_type' : tripType,
					'uuid':tripUuid,
					
				}),
		        success: function(response) {
					console.log("res >>> "+response)
					if(response.result === 'success'){
						sessionStorage.setItem("trip_nm", formData.tripName);
						sessionStorage.setItem("start_date", formData.startDate);
						sessionStorage.setItem("end_date", formData.endDate);
						alert("수정완료");
						location.href="/place/"+tripUuid;
					} else {
						alert("저장에 실패했습니다.");
					}
		        },
		        error: function(xhr, status, error) {
		            console.error("데이터 로드 실패:", status, error);
					console.error("HTTP 상태 코드:", xhr.status);
					console.error("HTTP 상태 텍스트:", xhr.statusText);
		        }
		    });
	
}
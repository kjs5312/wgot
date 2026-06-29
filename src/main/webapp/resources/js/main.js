let tripMode = "upcoming";

const upcomingList = [];
const pastList = [];

const today = new Date();
today.setHours(0,0,0,0);


window.onload = function(){
    tripInfo();
}

function tripInfo(){
	$.ajax({
	        url: '/trip/tripInfo',
	        method: 'POST',
	        dataType: 'json',
			contentType: 'application/json',
			data:JSON.stringify({
				/*이것도 수정해야함....*/
				'trip_nm' : "test",
				
			}),
	        success: function(response) {
				response.forEach(function(trip){
					const endDate = new Date(trip.end_date);
					
					if(endDate >= today){
						upcomingList.push(trip);
					}else{
						pastList.push(trip);
					}
				});
				
				cardListRender();
	        },
	        error: function(xhr, status, error) {
	            console.error("데이터 로드 실패:", status, error);
				console.error("HTTP 상태 코드:", xhr.status);
				console.error("HTTP 상태 텍스트:", xhr.statusText);
	        }
	    });
}


function getDday(startDate){

    const today = new Date();

    const start = new Date(startDate);

    today.setHours(0,0,0,0);
    start.setHours(0,0,0,0);

    const diffTime = start - today;

    const diffDay = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
    );

    if(diffDay > 0){
        return 'D-' + diffDay;
    }

    if(diffDay === 0){
        return 'D-Day';
    }

    return 'D+' + Math.abs(diffDay);
}


function placeInfo(uuid,tripNm,startdate,enddate){
	location.href = '/place/' + uuid;
	sessionStorage.setItem("trip_nm", tripNm);
	sessionStorage.setItem("start_date", startdate);
	sessionStorage.setItem("end_date", enddate);
}


$(".trip-tab").on("click", function(){

    $(".trip-tab").removeClass("active");

    $(this).addClass("active");

    tripMode = $(this).data("tab");
	
	cardListRender(tripMode);
});



function cardListRender(){
	$('#card-container').empty();
	
	let renderList = tripMode === "upcoming" ? upcomingList : pastList;
	
	const keyword = $("#searchKeyword").val().trim().toLowerCase();
	const startDate = $("#searchStartDate").val();
	const endDate = $("#searchEndDate").val();
	
	if(keyword !== ""){
	    renderList = renderList.filter(function(item){
	        return item.trip_nm.toLowerCase().includes(keyword);
	    });
	}
	
	if(startDate !== ""){
	    renderList = renderList.filter(function(item){
	        return item.start_date >= startDate;
	    });
	}
	
	if(endDate !== ""){
	    renderList = renderList.filter(function(item){
	        return item.start_date <= endDate;
	    });
	}

	let html='';
	
	if(renderList.length > 0){
		renderList.forEach(function(item){
			html += '<div class="ticket-card" onclick="placeInfo(\''+item.trip_uuid+'\', \''+item.trip_nm+'\',\''+item.start_date+'\',\''+item.end_date+' \')">';
			html += '	<div class="ticket-hole left"></div>';
			html += '	<div class="ticket-hole right"></div>';
			html += '	<h3 class="tripNm">'+item.trip_nm+'</h3>';
			html += '	<p class="date_ticket">'+item.start_date + ' ~ ' + item.end_date + '</p>';
			html += '	<div class="ticket-side">';
			html += '		<span class="ticket-dday">'+getDday(item.start_date)+'</span>';
			html += '		<span class="ticket-location">✈ '+item.trip_location+'</span>';
			html += '		<span class="ticket-count">'+item.member_cnt+'명</span>';
			html += '	</div>';
			html += '</div>';
		});
	} else {
			html += '<div class="empty-trip">';
		    html += '✈ 여행이 없습니다.';
			html += '</div>';
	}
	
	
	$('#card-container').append(html);
}

$("#searchBtn").on("click", function(){
    cardListRender();
	$(".trip-search-box").removeClass("active");
});

$("#searchKeyword").on("keydown", function(e){
    if(e.key === "Enter"){
        cardListRender();
		$(".trip-search-box").removeClass("active");
    }
});

$(".trip-search-toggle").on("click", function(){

    $(".trip-search-box").toggleClass("active");

});

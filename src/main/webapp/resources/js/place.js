let map;

let mode='';

const tripUuid = window.tripUuid;
let placeData=[];


let placeList = [];
let overlays = [];

let polyline = null;
let sortable = null;
//let routePolyLine = null;
let routePolyLines = [];

let activePlaceIdx=0;

const routeColors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#22c55e', // green
    '#a855f7', // purple
    '#f59e0b', // orange
    '#06b6d4', // cyan
    '#ec4899', // pink
    '#84cc16', // lime
    '#8b5cf6', // violet
    '#14b8a6'  // teal
];

window.onload = function(){
	let lat=36.3504119;
	let lng=127.3845475;
	
	const container = document.getElementById('map');
	
	const options = {
		    center: new kakao.maps.LatLng(
		        lat,
		        lng
		    ),
		    level: 3
		};
		
	map = new kakao.maps.Map(
	    container,
	    options
	);
	
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {

	        lat = position.coords.latitude;
	        lng = position.coords.longitude;
			
	        const moveLatLng = new kakao.maps.LatLng(lat, lng);
			if(mode != 'view'){
	        	map.setCenter(moveLatLng);
			}
	    });
	}
	getPlaceList();
	
	$('#tripNm').text(sessionStorage.getItem('trip_nm'));

	$('#tripDate').text(sessionStorage.getItem('start_date')
	    + ' ~ ' + sessionStorage.getItem('end_date'));
		
	const endDate = new Date(sessionStorage.getItem('end_date'));
	const today = new Date();
	
	today.setHours(0, 0, 0, 0);
	endDate.setHours(0, 0, 0, 0);
	
	if (endDate < today) {
		$(".trip-edit-btn").hide();
		$(".place-edit-btn").hide();
	}	
//		if(sessionStorage.getItem.('end_date') > now ){
//			
//		}
}

function getPlaceList(){
	$.ajax({
	        url: '/place/getPlaceList',
	        method: 'POST',
	        dataType: 'json',
			contentType: 'application/json',
			data:JSON.stringify({
				
				'tripUuid' : tripUuid,
				
			}),
	        success: function(response) {
				
				if(response.length > 0){
					mode = 'view';
					placeList = response;
					renderPlaceList();
					renderOverlay();
					getRoute();
//					map.setCenter(
//				        new kakao.maps.LatLng(
//				            placeList[0].place_lat,
//				            placeList[0].place_lng
//				        )
//				    );
				} else {
					mode = 'create';
					initPlace();
				}
				
				initBtn();
	        },
	        error: function(xhr, status, error) {
	            console.error("데이터 로드 실패:", status, error);
				console.error("HTTP 상태 코드:", xhr.status);
				console.error("HTTP 상태 텍스트:", xhr.statusText);
	        }
	    });
}

function initBtn(){
	$(".place-btn-wrap").empty();
	
	let html = '';
	
	if(mode  === 'view'){
		html += '<button type="button" class="place-edit-btn" id="place-edit-btn" onclick="editPlace()">';
		html += '수정하기';
		html += '</button>';
		html += '<button type="button" class="trip-delete-btn" id="place-delete-btn" onclick="deleteTrip()">';
		html += '여행 삭제하기';
		html += '</button>';
		$(".place-search").hide();
	} else {
		html += '<button type="button" class="place-add-btn" id="place-add-btn" onclick="addPlace()">';
		html += '+ 목적지 추가';
		html += '</button>';
		html += '<button type="button" class="place-save-btn" id="place-save-btn" onclick="savePlace()">';
		html += '저장하기';
		html += '</button>';
		html += '<button type="button" class="trip-delete-btn" id="place-delete-btn" onclick="deleteTrip()">';
		html += '여행 삭제하기';
		html += '</button>';
		$(".place-search").show();
	}
	
	$(".place-btn-wrap").append(html);
}

const ps = new kakao.maps.services.Places();
const searchInput = document.getElementById('placeSearch');
const searchBtn = document.getElementById('placeSearchBtn');

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
		let inputVal = searchInput.value;
		ps.keywordSearch(inputVal, placesSearch);
    }
});

searchBtn.addEventListener('click', function() {
    placesSearch();
});



let searchData = [];

function placesSearch(data, status, pagination) {

    if(status === kakao.maps.services.Status.OK){

		searchData = data;
		
		let html = '';
		data.forEach(function(item, index){
		    html += '<div class="place-search-item" data-index="'+ index +'">';
		    html += '   <div class="place-search-name">';
		    html +=         item.place_name;
		    html += '   </div>';
		    html += '   <div class="place-search-address">';
		    html +=         item.address_name;
		    html += '   </div>';
		    html += '</div>';
		});

		$('.place-search-result').html(html);
    }

}

$(document).on('click','.place-search-item', function(){

		const index = $(this).data('index');
		const place = searchData[index];
		const moveLatLng = new kakao.maps.LatLng(place.y, place.x);

		map.setCenter(moveLatLng);
		
		if(overlays[activePlaceIdx]){
		    overlays[activePlaceIdx].setMap(null);
		}
		
		$('.place-search-result').empty();
		
		placeList[activePlaceIdx].uuid = tripUuid;
		placeList[activePlaceIdx].place_name = place.place_name;
		placeList[activePlaceIdx].category_name = place.category_name;
		placeList[activePlaceIdx].place_lng = place.x;
		placeList[activePlaceIdx].place_lat = place.y;
		placeList[activePlaceIdx].place_address = place.address_name;
		placeList[activePlaceIdx].place_url = place.place_url;
		
		renderPlaceList();
		renderOverlay();
		getRoute();
});


function createEmptyPlace(){

    return {
        place_name : '',
        place_address : '',
        place_lat : 0,
        place_lng : 0,
        place_memo : '',
        place_url : ''
    };
}


function initPlace(){
    placeList.push(
        createEmptyPlace()
    );
    renderPlaceList();
}


function addPlace(){
	if(placeList.length < 10){
	    placeList.push(
	        createEmptyPlace()
	    );
	    activePlaceIdx = placeList.length - 1;
	    renderPlaceList();
	} else {
		alert("목적지는 10개까지만 추가 가능합니다.");
	}
}


function renderPlaceList(){
	
	let html='';
	
	placeList.forEach(function(item, index){
		html+='<div class="place-card '+(activePlaceIdx === index ? 'active':"") +'" data-index="'+index+'">';
		html+='    <div class="place-header">';
		html+='        <div class="place-title">';
		html+='            목적지'+(index+1);
		html+='        </div>';
		html+='        <div class="place-action">';
		html+='            <div class="place-order">';
		html+=			       (index+1);
		html+='            </div>';
		
		if(mode !=="view"){
			html+='            <button type="button" class="place-delete-btn" data-index="'+index+'">';
			html+='                <img src="/resources/img/icon/delete.png">';
			html+='            </button>';
		}
		
		html+='        </div>';
		html+='    </div>';
		html+='    <div class="place-body">';
		html+='        <input type="text" class="place-input" placeholder="방문지 이름" value="'+ (item.place_name||'') +'" readonly>';
		html+='        <input type="text" class="place-input" placeholder="주소" value="'+(item.place_address||'')+'" readonly>';
		html+='        <input type="hidden" class="place-input" value="'+(item.place_url||'')+'">';
		html+='        <textarea class="place-textarea" ';
				if(mode === 'view' ){
					html += 'readonly';
				}else {
					html += 'placeholder="메모를 입력하세요"'
				}
		html+='			>';
//						placeholder="메모를 입력하세요"'+(mode === 'view' ? 'readonly' : '')+'>';
		html+=         (item.place_memo || '')+'</textarea>';
		html+='    </div>';
		html+='</div>';
	});	

	$('#placeContainer').html(html);
	
	if(mode !== 'view'){
		initSortable();
	};
}


$(document).on(
    'click',
    '.place-card',
    function(){

		$('.place-card').removeClass('active');
		$(this).addClass('active');
		
        activePlaceIdx = $(this).data('index');
		let lat = placeList[activePlaceIdx].place_lat;
		let lng = placeList[activePlaceIdx].place_lng;

		if(lat !== 0 && lng !==0){
			let moveLatLng = new kakao.maps.LatLng(lat, lng);
			map.setCenter(moveLatLng);
		}
    }
);

$(document).on(
    'input',
    '.place-textarea',
    function(){
        const index = $(this).closest('.place-card').data('index');

        placeList[index].place_memo = $(this).val();
    }
);

$(document).on(
    'click',
    '.place-delete-btn',
    function(e){

        e.stopPropagation();

        const deleteIdx = $(this).data('index');

        if(placeList.length === 1){
            alert('최소 1개의 목적지는 필요합니다.');
            return;
        }

		if(overlays[deleteIdx]){
		    overlays[deleteIdx].setMap(null);
		}
		
		overlays.splice(deleteIdx, 1);
        placeList.splice(deleteIdx, 1);
		
        if(deleteIdx < activePlaceIdx){

            activePlaceIdx--;

        }else if(deleteIdx === activePlaceIdx){

            if(activePlaceIdx >= placeList.length){
                activePlaceIdx = placeList.length - 1;
            }
        }
        renderPlaceList();
		renderOverlay();
		getRoute();
    }
);


function renderOverlay(){
	overlays.forEach(function(item){
	        if(item){
	            item.setMap(null);
	        }
	    });

    overlays = [];
	
	const bounds = new kakao.maps.LatLngBounds();
	
	
	
    placeList.forEach(function(place,index){
        if(!place.place_lat || !place.place_lng){
            return;
        }

        const overlay =
            new kakao.maps.CustomOverlay({

                position :
                    new kakao.maps.LatLng(
                        place.place_lat,
                        place.place_lng
                    ),

                content :
                    '<div class="marker-number">'
                    	+(index+1)+
                    '</div>'
            });

        overlay.setMap(map);
        overlays.push(overlay);
		bounds.extend(
			new kakao.maps.LatLng(
				Number(place.place_lat),
                Number(place.place_lng)
			)
		);
    });
	map.setBounds(bounds);
};



function initSortable(){
    const container = document.getElementById('placeContainer');

    if(!container){
        return;
    }
	
	if(sortable){
        sortable.destroy();
    }
	
    sortable = new Sortable(container, {
        animation: 150,
        handle: '.place-header',
        onEnd: function(evt){

            const movedPlace = placeList.splice(evt.oldIndex, 1)[0];

            placeList.splice(evt.newIndex, 0, movedPlace);

            activePlaceIdx = evt.newIndex;

            renderOverlay();
            renderPlaceList();
			getRoute();
        }
    });
}

function getRoute(){
	const validPlaceList =
	    placeList.filter(function(place){
	        return place.place_lat !== 0 && place.place_lng !== 0;
	    });

	if(validPlaceList.length >= 2){
		$.ajax({
		        url: '/place/getRoute',
		        method: 'POST',
		        dataType: 'json',
				contentType: 'application/json',
				data:JSON.stringify({
					
					'placeList' : validPlaceList,
					
				}),
		        success: function(response) {
					if(response){
					    if(routePolyLines){
					        routePolyLines.forEach(function(line){
					            line.setMap(null);
					        });
					        routePolyLines = [];
					    }
					    response.forEach(function(route){
					        let path = [];
					        route.path.forEach(function(point){
					            path.push(
					                new kakao.maps.LatLng(
					                    point.lat,
					                    point.lng
					                )
					            );
					        });
					        const routePolyLine =
					            new kakao.maps.Polyline({
					                path : path,
					                strokeColor : routeColors[route.index],
					                strokeWeight : 6,
					                strokeOpacity : 0.9,
					                strokeStyle : 'solid'
					            });
							
					        routePolyLine.setMap(map);
					        routePolyLines.push(routePolyLine);
					    });
					}else{
					}
		        },
		        error: function(xhr, status, error) {
		            console.error("데이터 로드 실패:", status, error);
					console.error("HTTP 상태 코드:", xhr.status);
					console.error("HTTP 상태 텍스트:", xhr.statusText);
		        }
		    });
		}
}


function savePlace(){
	
	for(let i=0; i < placeList.length; i++){
		if(placeList[i].place_name === ''){
			alert("목적지"+(i+1)+" 비어있습니다. 채워넣거나 삭제해주세요");
			return;
		}
		
		placeList[i].order_no = i;
		placeList[i].place_memo = $('.place-card[data-index="'+i+'"]')
					        .find('.place-textarea')
					        .val();;
	}
	
	
	$.ajax({
		        url: '/trip/insertPlaceInfo',
		        method: 'POST',
		        dataType: 'json',
				contentType: 'application/json',
				data:JSON.stringify(placeList),
		        success: function(response) {
					
					if(response.res === "success"){
						alert(response.msg);
						location.reload();
					} else {
						alert(response.msg);
					}
					
		        },
		        error: function(xhr, status, error) {
		            console.error("데이터 로드 실패:", status, error);
					console.error("HTTP 상태 코드:", xhr.status);
					console.error("HTTP 상태 텍스트:", xhr.statusText);
		        }
		    });
}


function editPlace(){
	mode = "create";
	renderPlaceList();
	initBtn();
}

function deleteTrip(){
	
	if(confirm("정말 여행을 삭제하시겠습니까??")){
		$.ajax({
			        url: '/trip/deleteTrip',
			        method: 'POST',
			        dataType: 'json',
					contentType: 'application/json',
					data:tripUuid,
			        success: function(response) {
						
						if(response.result === "success"){
							alert(response.msg);
							location.href="/";
						} else {
							alert(response.msg);
						}
						
			        },
			        error: function(xhr, status, error) {
			            console.error("데이터 로드 실패:", status, error);
						console.error("HTTP 상태 코드:", xhr.status);
						console.error("HTTP 상태 텍스트:", xhr.statusText);
			        }
			    });
	}
}


function tripUpdate(){
	location.href="/tripUpdate?trip_uuid="+tripUuid;
}
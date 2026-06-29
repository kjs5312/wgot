function getFormData(form, data) {
    const unindexed_array = $(form).serializeArray();
    const indexed_array = {};

    $.map(unindexed_array, function (n) {
        indexed_array[n['name']] = n['value'].trim();
    });

    $.extend(indexed_array, data);
    return indexed_array;
};

const REGEX = {
    /* 소문자 + 숫자 5자 이상 15자 이하로 제한*/
    userId: /^[a-z0-9]{5,15}$/, 
	
	/* 알파벳 소문자 or 대문자, 숫자, 특수문자 포함 8자 이상*/
    userPw: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
	 
    /*이름 (한글 2~4자, 공백 불가)*/
    userName: /^[가-힣]{2,4}$/, 
    
    /*이메일 (일반적인 이메일 형식)*/
    userEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    
    /*핸드폰 번호*/
    userPhone: /^01[016789][ -]?\d{3,4}[ -]?\d{4}$/,
};


function validationChk(data,type){
	switch(type){
		case "userId":
			return REGEX.userId.test(data);
		
		case "userPw":
			return REGEX.userPw.test(data);
		
		case "userName":
			return REGEX.userName.test(data);
		
		case "userEmail":
			return REGEX.userEmail.test(data);
			
		case "userPhone":
			console.log(data);
			return REGEX.userPhone.test(data);
			
		case "userAddr":
			if(!data || data.trim().length === 0){
				return false;
			}
			
		return true;
	}
}


function getAccessToken(){
	return localStorage.getItem("accessToken");
}

//$(document).ready(function(){
//	$.ajaxSetup({
//		beforeSend : function(xhr){
//			const token = getAccessToken();
//			console.log("js token >>> ",token)
//			if(token){
//				xhr.setRequestHeader("Authorization", "Bearer " + token);
//			}
//		}
//	})
//})
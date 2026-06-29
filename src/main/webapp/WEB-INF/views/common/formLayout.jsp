<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/> 

<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6c706c585dc201965cc72be0f94826f1&libraries=services">
</script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<link rel="stylesheet" href="/resources/css/common.css">



<body class="bg-background index-page">
	<div class="app-container">
	
	    <tiles:insertAttribute name="body"/>
	
	    <tiles:insertAttribute name="footer"/>
	</div>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
<script src="/resources/js/common.js"> </script> 
</body>




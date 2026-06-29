<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/> 
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script> -->
<!-- <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"> -->
<link rel="stylesheet" href="/resources/css/common.css">


<body class="bg-background index-page">
	<div class="app-container">
	    <tiles:insertAttribute name="header"/>
	
	    <tiles:insertAttribute name="body"/>
	
	    <tiles:insertAttribute name="footer"/>
	</div>
</body>


<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
<script src="/resources/js/common.js" defer> </script> 

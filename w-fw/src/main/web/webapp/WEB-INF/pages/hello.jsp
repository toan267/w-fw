<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<h1>test load</h1>
<div class="login-form">
    <label for="jid">JID</label><input type="text" id="jid"/>
    <label for="pwd">PWD</label><input type="password" id="pwd"/>
    <button>login</button>
</div>
<div id="list-id"></div>
<!-- /.login-form -->
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="<c:url value="/resources/js/strophe.js" />"></script>
<script src="<c:url value="/resources/js/main.js" />"></script>
</body>
</html>
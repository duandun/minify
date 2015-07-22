<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>会员中心</title>
<%@include file="/WEB-INF/jsp/public/publicImport.jsp"%>

<style>
     path {
      fill-rule: evenodd;
      stroke: #333;
      stroke-width: 2px;
      fill: #9ecae1;
    }
    #right .desc {
      margin-top: 10px;
      margin-left: 12px;
    }
  </style>

</head>
<body class="page-mcenter">
<%@include file="/WEB-INF/jsp/public/publicHeader.jsp"%>
<%@include file="/WEB-INF/jsp/public/publicSearch.jsp"%>
<!--member-center-->
<div class="member-center warp">
  <div class="left">
    <%@include file="/WEB-INF/jsp/public/publicMenu.jsp"%></div>
  <div class="right" id="right">
    <h2>用户中心</h2>
    <!--page-welcome-->
    <div class="page-welcome">
      <h1> <i class="icon-big-ok"></i>
        恭喜您，登录成功！
      </h1>
      <h3>
        尊敬的
        <span id="userCenterLoginName"></span>
        您好，欢迎来到爱信诺用户中心!
        <br />
      </div>
      <!--/page-welcome--> </div>
  </div>
  <!--/member-center-->
  <!--footer-->
  <%@include file="/WEB-INF/jsp/public/publicFooter.jsp"%>
  <!--/footer-->

  <script type="text/javascript">
    var name="<%=userLoginName %>";
    $("#userCenterLoginName").html("&nbsp;&nbsp;&nbsp;" + name + "&nbsp;&nbsp;&nbsp;");
  </script>
</body>
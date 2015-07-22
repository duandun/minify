<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="zh-CN">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>登录</title>
	<%@include file="/WEB-INF/jsp/public/publicImport.jsp"%>

	<link type="text/css" rel="stylesheet" href="<%=path %>
	js/jquery/validation/css/validate.css">
	<script type="text/javascript" src="<%=path %>js/jquery/validation/jquery.validate.min.js"></script>
	<script type="text/javascript" src="<%=path %>js/jquery/validation/additional-methods.js"></script>
	<script type="text/javascript" src="<%=path %>js/jquery/validation/jquery.validate.unobtrusive.js"></script>
	<script type="text/javascript" src="<%=path %>js/jquery/validation/localization/messages_zh.js"></script>

	<script type="text/javascript" src="<%=path%>js/aisinozx/user/login.js"></script>
	<style>

	.form .form-item input[type="button"] {
	  width: 330px;
	  height: 43px;
	  line-height: 43px;
	  font-size: 18px;
	  text-align: center;
	  border: 0;
	  background: #1369c0;
	  color: #ffffff;
	  display: block;
	  -webkit-border-radius: 2px;
	  -moz-border-radius: 2px;
	  border-radius: 2px;
	}
	.form .form-item input[type="button"]:hover {
	  background: #115ca9;
	}
	</style>

</head>
<body class="page-sub">
	<%@include file="/WEB-INF/jsp/public/publicHeader.jsp"%>

	<!--login-panel-->
	<div class="login-panel panel warp">
		<div class="panel-title">
			<h4>用户登录</h4>
			<span class="more">
				还没账号，
				<a href="<%=path%>base/user/register">马上注册</a>
			</span>
		</div>
		<div class="panel-body">
			<div class="tabcontrol login">
				<div class="tabcontrol-titles">
					<a class="tab on">企业登录</a>
				</div>
				<div class="tabcontrol-contents">
					<div class="tabcontrol-content" style="display:block">
						<form id="loginForm" action="" method="post">
							<div class="form form-login">
								<div class="form-item"> <i class="icon-user"></i>
									<label class="item-title">用户名：</label>
									<input id="loginName" name="loginName" type="text" placeholder="企业用户名"
	                                	data-val="true" data-val-required="用户名不可为空。" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="loginName" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item"> <i class="icon-pass"></i>
									<label class="item-title">密　码：</label>
									<input id="password" name="password" type="password" placeholder="请输入密码"
	                                	data-val="true" data-val-required="密码不可为空。" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="password" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item">
									<label class="item-title">验证码：</label>
									<input id="captcha" name="captcha" class="code" type="text" placeholder="请输入验证码"
	                                	data-val-required="验证码不可为空。" data-val="true" 
	                                	data-val-remote="验证码错误" data-val-remote-additionalfields="*.captcha" 
	                                	data-val-remote-url="<%=path %>
									user/captchaCheck" onkeydown="login.keyDown();" />
									<img id="captchaImg" class="codeimg" src="<c:url value="/"/>
									util/captcha" width="122" height="42" />
									<br/>
									<br/>
									<br/>
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="captcha" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item links">
									<label class="remeber">
										<input type="checkbox" />
										记住密码
									</label>
									<a class="forget" href="#">忘记密码？</a>
								</div>
								<div class="form-item">
									<input type="button" value="立即登录" onclick="login.userLogin();" />
								</div>
								<p class="link-para">
									还没账号，马上
									<a href="<%=path%>base/user/register">注册</a>
								</p>
								<c:if test="${error != null}">${error }</c:if>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--/login-panel-->

	<!--footer-->
	<%@include file="/WEB-INF/jsp/public/publicFooter.jsp"%>
	<!--/footer-->
</body>
</html>
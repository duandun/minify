<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="zh-CN">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>注册</title>
	<%@include file="/WEB-INF/jsp/public/publicImport.jsp"%>

	<link type="text/css" rel="stylesheet" href="<%=path %>
	js/jquery/validation/css/validate.css">
	<script type="text/javascript" src="<%=path %>js/jquery/validation/jquery.validate.min.js"></script>
	<script type="text/javascript" src="<%=path %>js/jquery/validation/additional-methods.js"></script>
	<script type="text/javascript" src="<%=path %>js/jquery/validation/jquery.validate.unobtrusive.js"></script>
	<script type="text/javascript" src="<%=path %>js/jquery/validation/localization/messages_zh.js"></script>

	<script type="text/javascript" src="<%=path%>js/aisinozx/user/register.js"></script>

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
			<h4>用户注册</h4>
			<span class="more">
				已有账号，
				<a href="<%=path%>base/user/login">马上登录</a>
			</span>
		</div>
		<div class="panel-body">
			<div class="tabcontrol login reg">
				<div class="tabcontrol-titles">
					<a class="tab on">企业实名注册</a>
				</div>
				<div class="tabcontrol-contents">
					<div class="tabcontrol-content" style="display:block">
						<form id="registerForm" action="" method="post">
							<div class="form form-login">
								<div class="form-item"> <i class="icon-user"></i>
									<label class="item-title">企业用户名：</label>
									<input id="loginName" name="loginName" type="text" placeholder="企业用户名"
	                                	data-val="true" data-val-required="用户名不可为空。"
	                                	data-val-regex-pattern="(?!^\d[A-Za-z0-9]*$)^[A-Za-z0-9_-]{6,25}$" 
	                                	data-val-regex="用户名只允许字母、数字、下划线、横线组成，首位只能为字母，且至少需要 6 个字符，小于25个字符。"
	                                	data-val-remote="该用户已注册。" data-val-remote-additionalfields="*.loginName" 
	                                	data-val-remote-url="<%=path %>
									user/checkLoginName" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="loginName" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item"> <i class="icon-pass"></i>
									<label class="item-title">纳税人识别号：</label>
									<input id="sh" name="sh" type="text" placeholder="纳税人识别号"
	                                	data-val="true" data-val-required="纳税人识别号不可为空。" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="sh" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item">
									<i class="icon-pass"></i>
									<label class="item-title">金税盘验证码：</label>
									<input id="yzm" name="yzm" type="text" placeholder="金税盘验证码"
	                                	data-val="true" data-val-required="金税盘验证码不可为空。"
	                                	data-val-remote="金税盘验证码和税号不匹配或已过期" data-val-remote-additionalfields="*.sh,*.yzm" 
	                                	data-val-remote-url="<%=path %>
									user/validateYzm" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="yzm" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item">
									<i class="icon-pass"></i>
									<label class="item-title">密码：</label>
									<input id="password" name="password" type="password" placeholder="密码"
	                                	data-val-required="请填写密码。" data-val-length-min="6" 
	                                	data-val-length-max="32" data-val-length="登录密码必须由6-32位字符组成。" data-val="true" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="password" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item">
									<i class="icon-pass"></i>
									<label class="item-title">确认密码：</label>
									<input id="rePassword" name="rePassword" type="password" placeholder="确认密码"
	                                	data-val-required="请填写重复密码。" data-val-equalto-other="*.password" data-val-equalto="两次输入的密码不一致。"  
	                                	data-val-length-min="6" data-val-length-max="32" data-val-length="登录密码必须由6-32位字符组成。" data-val="true" />
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="rePassword" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item">
									<label class="item-title">验证码：</label>
									<input id="captcha" name="captcha" class="code" type="text" placeholder="请输入验证码"
	                                	data-val-required="验证码不可为空。" data-val="true" 
	                                	data-val-remote="验证码错误" data-val-remote-additionalfields="*.captcha" 
	                                	data-val-remote-url="<%=path %>
									user/captchaCheck" onkeydown="register.keyDown();" />
									<img id="captchaImg" class="codeimg" src="<c:url value="/"/>
									util/captcha" width="122" height="42" />
									<br/>
									<br/>
									<br/>
									<span class="">
										<span data-valmsg-replace="true" data-valmsg-for="captcha" class="field-validation-valid"></span>
									</span>
								</div>
								<div class="form-item">
									<input type="button" value="立即注册" onclick="register.register();" />
								</div>
								<p class="link-para">
									<label class="protocol">
										<input id="agreement" type="checkbox" onkeydown="register.keyDown();" />
										<a href="<c:url value="/"/>
										uploadfiles/registerAgreement.doc">《企业用户注册协议》
									</a>
								</label>
								<span class="link">
									已有账号，
									<a href="<%=path%>base/user/login">马上登录</a>
								</span>
							</p>
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
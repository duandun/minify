(function($){
	window.login = $.fn.login = {
		/**
		 * 登录
		 */
		userLogin : function() {
			if($("#loginForm").valid()) {
				$("#loginForm").attr('action', basePath + "user/userLogin?" + new Date().getTime());
				$("#loginForm").submit();
			}
		},
		
		keyDown : function(){
		    if (event.keyCode == 13)
		    {
		        event.returnValue=false;
		        event.cancel = true;
		        login.userLogin();
		    }
		}
		
	};
})(jQuery);

jQuery(document).ready(function($) {
	$("#captchaImg").click(function() {
		$("#captchaImg").attr("src", basePath + "util/captcha?timestamp=" + new Date().getTime());
	});
});


(function($){
	window.register = $.fn.register = {
		/**
		 * 快速注册
		 */
		register : function() {
			if($("#registerForm").valid()) {
				if(!$("#agreement").is(':checked')) {
					alert("请同意注册协议");
					return;
				}
				$("#registerForm").attr('action', basePath + "user/registerUser?" + new Date().getTime());
				$("#registerForm").submit();
			}
		},
		
		keyDown : function(){
		    if (event.keyCode == 13)
		    {
		        event.returnValue=false;
		        event.cancel = true;
		        register.register();
		    }
		}
		
	};
})(jQuery);

jQuery(document).ready(function($) {
	$("#captchaImg").click(function() {
		$("#captchaImg").attr("src", basePath + "util/captcha?timestamp=" + new Date().getTime());
	});
});


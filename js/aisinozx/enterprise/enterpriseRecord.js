(function($) {
	window.enterpriseRecord = $.fn.enterpriseRecord = {
		queryData : function(pageNum) {
			$.jBox.tip("请求正在处理!请稍后......", 'loading');
			if (undefined == pageNum || null == pageNum) {
				pageNum = 1;
				}
			$("#pageNum")[0].value = pageNum;
//			if(($("#inputValue").val() == null || $("#inputValue").val() == "") 
//					&& ($("#queryValueSpan").val() != null || $("#queryValueSpan").val() != "")){
//				$("#inputValue").val($("#queryValueSpan").html());
//			}
			$("#queryValue").val($("#inputValue").val());
			$("#queryForm").attr("action", basePath + "enterprise/findEnterpriseRecord");
			$("#queryForm").submit();
		},
		
		keyDown : function(){
		    if (event.keyCode == 13)
		    {
		        event.returnValue=false;
		        event.cancel = true;
		        enterpriseRecord.queryData();
		    }
		},
		
		captchaKeyDown : function(){
		    if (event.keyCode == 13)
		    {
		        event.returnValue=false;
		        event.cancel = true;
		        enterpriseRecord.showEnterpriseDetail();
		    }
		},
		
		showEnterpriseDetail : function(){
			if($("#captchaForm").valid()) {
				$("#captchaForm").attr('action', basePath + "enterprise/showEnterpriseDetail/" + $("#tempEnterprise").val());
				$("#captchaForm").submit();
			}
		},
		
		captchaModal : function(enterpriseId){
			$("#captcha").removeClass("input-validation-error");
			$('#captchaForm')[0].reset();
			$("#tempEnterprise").val(enterpriseId);
			$('#captchaModal').modal({
				backdrop : 'static',
				keyboard : true,
				show : true
			});
			$('#captchaModal').css({
			    'overflow-y': 'auto'
			});
		}
	};
})(jQuery);
jQuery(document).ready(function($) {
	
	$("#captchaImg").click(function() {
		$("#captchaImg").attr("src", basePath + "util/captcha?timestamp=" + new Date().getTime());
	});
	
	if (0 != totalPageNo) {
		if (parseInt(totalPageNo) > 0) {
			$("#pagination").bootpag( {
				total : parseInt(totalPageNo),
				page : pageNum,
				maxVisible : 10,
				leaps: true
			}).on("page", function(event, goPageNum) {
				enterpriseRecord.queryData(goPageNum);
			});
		}
	}
});
(function($) {
	window.newsList = $.fn.newsList = {
		queryData : function(pageNum) {
			$.jBox.tip("请求正在处理!请稍后......", 'loading');
			if (undefined == pageNum || null == pageNum) {
				pageNum = 1;
			}
			$("#pageNum")[0].value = pageNum;
			$("#queryForm").attr("action", basePath + "news/list.do");
			$("#queryForm").submit();
		},
		
		keyDown : function(){
		    if (event.keyCode == 13)
		    {
		        event.returnValue=false;
		        event.cancel = true;
		        newsList.queryData();
		    }
		}
	};
})(jQuery);
jQuery(document).ready(function($) {
	if (0 != totalPageNo) {
		if (parseInt(totalPageNo) > 0) {
			$("#pagination").bootpag( {
				total : parseInt(totalPageNo),
				page : pageNum,
				maxVisible : 10,
				leaps: true
			}).on("page", function(event, goPageNum) {
				newsList.queryData(goPageNum);
			});
		}
	}
});
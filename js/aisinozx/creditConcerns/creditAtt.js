(function($) {
	window.creditAtt = $.fn.creditAtt = {
		queryData : function(pageNum) {
			if (undefined == pageNum || null == pageNum) {
				pageNum = 1;
				}
			$("#pageNum")[0].value = pageNum;
			$("#query").attr("action", basePath + "creditConcerns/selectCreditAtt");
			$("#query").submit();
		}
	};
})(jQuery);
jQuery(document).ready(function($) {
	if (0 != totalPageNo) {
		if (parseInt(totalPageNo) > 0) {
			$("#pagination").bootpag( {
				total : parseInt(totalPageNo),
				page : pageNum,
				maxVisible : 5,
				leaps: true
			}).on("page", function(event, goPageNum) {
				creditAtt.queryData(goPageNum);
			});
		}
	} else {
		if (0 == pageNum) {
			creditAtt.queryData();
		}
	}
});
(function($) {
	window.creditReportRead = $.fn.creditReportRead = {
		queryData : function(pageNum) {
			if (undefined == pageNum || null == pageNum) {
				pageNum = 1;
				}
			$("#selectPageNum")[0].value = pageNum;
			$("#query").attr("action", basePath + "creditConcerns/selectReportRead");
			$("#query").submit();
		}
	};
})(jQuery);
jQuery(document).ready(function($) {
	if (0 != totalPageNo) {
		if (parseInt(totalPageNo) > 0) {
			$("#selectPagination").bootpag( {
				total : parseInt(totalPageNo),
				page : pageNum,
				maxVisible : 5,
				leaps: true
			}).on("page", function(event, goPageNum) {
				creditReportRead.queryData(goPageNum);
			});
		}
	}
});
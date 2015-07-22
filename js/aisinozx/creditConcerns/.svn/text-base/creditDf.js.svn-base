(function($) {
	window.creditDf = $.fn.creditDf = {
	saveData : function() {
		if($("#saveForm").valid()) {
			$("#saveForm").attr('action', basePath + "creditConcerns/saveCreditDf");
			$("#saveForm").submit();
		}
	},
	myalert:function (message) {
		if (dialog == undefined) {
			alert("dialog module not loaded")
			return;
		}
		var d = dialog({
			content: "<p class='cus-tip'><i class='icon-bigok'></i>"+message+"</p>",
			title: "",
			width: 350,
			height: 80,
			skin: "save-user",
			button: [
                      {
                          id: "ok",
                          value: '确定',
                          callback: function () {}
                      },
                      {
                          id: "cancel",
                          value: '取消'
                      }
                  ]
		});
		d.showModal();
	}
	};
})(jQuery);
jQuery(document).ready(function($) {
/*	$("#btn-submit").click(function() {
		creditDf.saveData();
		creditDf.myalert("提交成功");
	});*/
	var project = $("#project").val()	,
    content = $("#content").val(),
    comm=$("#comm").val();
	var ajax_option={

			 url: basePath + "creditConcerns/saveCreditDf", // 需要提交的 url
			 data: {
	                "project": project,
	                "content": content,
	                "comm":comm
	            },
			 success:function(data){
				 creditDf.myalert("提交成功");
			}

			};

	
	$("#btn-submit").click(function(){
		$('#saveForm').ajaxSubmit(ajax_option);
	});
	$("#btn-cancel").click(function(){
		$('#saveForm').resetForm();
	});
	 
	/*$("#btn-submit").on("click", function() {
	    $("#saveForm").on("submit", function() {
	        var project = $("#project").val(),
            content = $("#content").val(),
            comm=$("#comm").val();
	        alert(project);

        $(this).ajaxSubmit({
            type: "post", // 提交方式 get/post
            url: basePath + "creditConcerns/saveCreditDf", // 需要提交的 url
            data: {
                "project": project,
                "content": content,
                "comm":comm
            },
            success: function(data) {
                alert("提交成功！");
            }
          
        });
       
        return false; // 阻止表单自动提交事件
    });
	});*/
});
(function($) {
	window.creditComm = $.fn.creditComm = {
			
		showAdd:	function() {
				$("#addComm").css('display',''); 
			},
		removeAdd: function() {
				 $("#addComm").css('display','none')
				},
		save: function() {
					if($("#saveCreditComm").valid()) {
						var uri=basePath + "creditConcerns/saveCreditComm";
						$("#saveCreditComm").attr('action', uri);
						$("#saveCreditComm").submit();
						return true;
					}else{
						return false;
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
	//隐藏添加表格
	creditComm.removeAdd(); 
	$(".add-user").click(function() {
	    	if(creditComm.save()){
	    		 creditComm.myalert("提交成功！！！");
	    	}
	});
/*	$(".add-user").click(function(){
		     var name = $("#name").val()	;
		    var phone = $("#phone").val();
		    var mail=$("#mail").val();
		    alert(mail);
			var option={
					 url: basePath + "creditConcerns/saveCreditComm", // 需要提交的 url
					 data: {
			                "name": name,
			                "phone": phone,
			                "mail":mail
			            },
					 success:function(data){
						 creditComm.myalert("提交成功！！！");
					}
					};
		$('#saveCreditComm').ajaxSubmit(option);
	});*/
});



	
 


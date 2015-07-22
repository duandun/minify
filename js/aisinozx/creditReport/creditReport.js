(function($) {
	var pageSize = 10;// 限定每页数据条数
	window.creditReport = $.fn.creditReport = {
		formatMoney : function(s,n){
			n = n > 0 && n <= 20 ? n : 2;
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			return t.split("").reverse().join("") + "." + r;
		},
		findEtrRelationship : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findEtrRelationship?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					etrRelationList = data.etrRelationList;
					var etrRealtionshipTbHtml = "";
					
					if(etrRelationList.length == 0) {
						etrRealtionshipTbHtml += "<tr><td colspan='3'>无</td> </tr>";
					} else {
						for(var temp in etrRelationList){
							etrRealtionshipTbHtml += "<tr>"
								+ "<td>" + etrRelationList[temp].relationType  + "</td>"
								+ "<td>" + etrRelationList[temp].relationEnterpriseName  + "</td>"
								+ "<td>" + etrRelationList[temp].city  + "</td>"
								+ "</tr>";
						}
					}
					
					
					$("#etrRelationshipTb").html(etrRealtionshipTbHtml);
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findEtrCapital : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findEtrCapital?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					etrCapitalList = data.etrCapitalList;
					var etrCaptialTbHtml = "";
					
					
					if(etrCapitalList.length == 0) {
						etrCaptialTbHtml += "<tr><td colspan='8'>无</td> </tr>";
					} else {
						for(var temp in etrCapitalList){
						
							var createTime;
							if(etrCapitalList[temp].createTime != null) {
								var date = new Date(etrCapitalList[temp].createTime);
								createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
							} else {
								createTime = '--';
							}
							
							if(etrCapitalList[temp].amount!=null) {
								amount = creditReport.formatMoney(etrCapitalList[temp].amount, 2);
							} else {
								amount = '--';
							}
	//						amount = creditReport.formatMoney(100000, 2);
							etrCaptialTbHtml += "<tr>"
								+ "<td>" + (etrCapitalList[temp].investor!=null?etrCapitalList[temp].investor:'--')  + "</td>"
								+ "<td>" + (etrCapitalList[temp].taxNo!=null?etrCapitalList[temp].taxNo:'--')  + "</td>"
								+ "<td>" + (etrCapitalList[temp].investorType!=null?etrCapitalList[temp].investorType:'--')  + "</td>"
								+ "<td>" + (etrCapitalList[temp].zjlx!=null?etrCapitalList[temp].zjlx:'--')  + "</td>"
								+ "<td>" + (etrCapitalList[temp].zjhm!=null?etrCapitalList[temp].zjhm:'--')  + "</td>"
								+ "<td>" + (etrCapitalList[temp].currency!=null?etrCapitalList[temp].currency:'--')  + "</td>"
								+ "<td>" + amount  + "</td>"
								+ "<td>" + createTime  + "</td>"
								+ "</tr>";
						}
					}
					
					
					$("#etrCaptialTb").html(etrCaptialTbHtml);
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findEtrSaleBuy : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findEtrSaleBuy?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					etrSaleList = data.etrSaleList;
					etrBuyList = data.etrBuyList;
					
					//上年度销项情况汇总：发票份数
					var saleFpfsHtml = "";
					//上年度销项情况汇总：发票金额
					var saleAmountHtml = "";
					for(var temp in etrSaleList){
						var amount;
						if(etrSaleList[temp].amount!=null) {
							amount = creditReport.formatMoney(etrSaleList[temp].amount, 2);
						} else {
							amount = '--';
						}
						
						saleFpfsHtml += "<td>" + etrSaleList[temp].fpfs  + "</td>";
						saleAmountHtml += "<td>" + amount  + "</td>";
					}
					for(var i = etrSaleList.length; i < 12; i++) {
						saleFpfsHtml += "<td>--</td>";
						saleAmountHtml += "<td>--</td>"
					}
					
					$("#saleFpfs").after(saleFpfsHtml);
					$("#saleAmount").after(saleAmountHtml);
					
					//上年度进项情况汇总：发票份数
					var buyFpfsHtml = "";
					//上年度进项情况汇总：发票金额
					var buyAmountHtml = "";
					for(var temp in etrBuyList){
						
						var amount;
						if(etrBuyList[temp].amount!=null) {
							amount = creditReport.formatMoney(etrBuyList[temp].amount, 2);
						} else {
							amount = '--';
						}
						
						buyFpfsHtml += "<td>" + etrBuyList[temp].fpfs  + "</td>";
						buyAmountHtml += "<td>" + amount  + "</td>";
					}
					for(var i = etrBuyList.length; i < 12; i++) {
						buyFpfsHtml += "<td>--</td>";
						buyAmountHtml += "<td>--</td>"
					}
					$("#buyFpfs").after(buyFpfsHtml);
					$("#buyAmount").after(buyAmountHtml);
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findEtrSaleBuyTradingPartners : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findEtrSaleBuyTradingPartners?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					etrSaleTradingPartnerList = data.etrSaleTradingPartnerList;
					etrBuyTradingPartnerList = data.etrBuyTradingPartnerList;
					
					//上年度销项交易对手情况
					var saleTradingPartnerHtml = "";
					for(var temp in etrSaleTradingPartnerList){
						
						var amount;
						if(etrSaleTradingPartnerList[temp].amount!=null) {
							amount = creditReport.formatMoney(etrSaleTradingPartnerList[temp].amount, 2);
						} else {
							amount = '--';
						}
						
						saleTradingPartnerHtml += "<tr>"
							+ "<td>" + etrSaleTradingPartnerList[temp].enterpriseName  + "</td>"
							+ "<td>" + etrSaleTradingPartnerList[temp].fpfs  + "</td>"
							+ "<td>" + amount  + "</td>"
							+ "</tr>";
							
					}
					
					$("#etrSaleTradingPartnerTb").html(saleTradingPartnerHtml);
					
					//上年度进项交易对手情况
					var buyTradingPartnerHtml = "";
					for(var temp in etrBuyTradingPartnerList){
						
						var amount;
						if(etrBuyTradingPartnerList[temp].amount!=null) {
							amount = creditReport.formatMoney(etrBuyTradingPartnerList[temp].amount, 2);
						} else {
							amount = '--';
						}
						
						buyTradingPartnerHtml += "<tr>"
							+ "<td>" + etrBuyTradingPartnerList[temp].enterpriseName  + "</td>"
							+ "<td>" + etrBuyTradingPartnerList[temp].fpfs  + "</td>"
							+ "<td>" + amount  + "</td>"
							+ "</tr>";
							
					}
					
					$("#etrBuyTradingPartnerTb").html(buyTradingPartnerHtml);
					
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findDeepEtrBusCir : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findDeepEtrBusCir?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
				
					deepEtrBusCirBuyList = data.deepEtrBusCirBuyList;
					deepEtrBusCirSaleList = data.deepEtrBusCirSaleList;
					deepEtrBusCirFpjeList = data.deepEtrBusCirFpjeList;
					
					deepEtrBusCirBuyResult = data.deepEtrBusCirBuyResult;
					deepEtrBusCirSaleResult = data.deepEtrBusCirSaleResult;
					deepEtrBusCirFpjeResult = data.deepEtrBusCirFpjeResult;
					
					//进项金额
					var deepEtrBusCirBuyAmountHtml = "";
					//进项同比
					var deepEtrBusCirBuyTbHtml = "";
					//进项环比
					var deepEtrBusCirBuyHbHtml = "";
					
					//图表使用：本年度进项 金额
					var buyThisYearData = deepEtrBusCirBuyResult.thisYearAmount;
					//图表使用：上年度进项金额
					var buyLastYearData = deepEtrBusCirBuyResult.lastYearAmount;
					
					for(var temp in deepEtrBusCirBuyList){
						
						var amount;
						if(deepEtrBusCirBuyList[temp].amount!=null) {
							amount = creditReport.formatMoney(deepEtrBusCirBuyList[temp].amount, 2);
						} else {
							amount = '--';
						}
						
						deepEtrBusCirBuyAmountHtml += "<td>" + amount  + "</td>";
						deepEtrBusCirBuyTbHtml += "<td>" + deepEtrBusCirBuyList[temp].tb  + "%</td>";
						deepEtrBusCirBuyHbHtml += "<td>" + deepEtrBusCirBuyList[temp].hb  + "%</td>";
					}
					for(var i = deepEtrBusCirBuyList.length; i < 12; i++) {
						deepEtrBusCirBuyAmountHtml += "<td>--</td>";
						deepEtrBusCirBuyTbHtml += "<td>--</td>"
						deepEtrBusCirBuyHbHtml += "<td>--</td>"
					}
					$("#deepEtrBusCirBuyAmount").after(deepEtrBusCirBuyAmountHtml);
					$("#deepEtrBusCirBuyTb").after(deepEtrBusCirBuyTbHtml);
					$("#deepEtrBusCirBuyHb").after(deepEtrBusCirBuyHbHtml);
					
//					var myChart = ec.init(document.getElementById('deepEtrBusCirBuyChart'));
					var deepEtrBusCirBuyChart = echarts.init(document.getElementById('deepEtrBusCirBuyChart'));
					
					var deepEtrBusCirBuyOption = {
					    title : {
					        text: '企业经营情况分析',
					        subtext: '本年度与上年度进项金额折线图'
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    legend: {
					        data:['本年度','上年度']
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : ['01','02','03','04','05','06','07','08','09','10','11','12']
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value}'
					            }
					        }
					    ],
					    series : [
					        {
					            name:'本年度',
					            type:'line',
					            data:buyThisYearData,
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },
					            markLine : {
					                data : [
					                    {type : 'average', name: '平均值'}
					                ]
					            }
					        },
					        {
					            name:'上年度',
					            type:'line',
					            data: buyLastYearData,
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },
					            markLine : {
					                data : [
					                    {type : 'average', name : '平均值'}
					                ]
					            }
					        }
					    ]
					};
			
					// 为echarts对象加载数据 
					deepEtrBusCirBuyChart.setOption(deepEtrBusCirBuyOption);
					
					//销项金额
					var deepEtrBusCirSaleAmountHtml = "";
					//销项同比
					var deepEtrBusCirSaleTbHtml = "";
					//销项环比
					var deepEtrBusCirSaleHbHtml = "";
					
					//图表使用：本年度销项金额
					var saleThisYearData = deepEtrBusCirSaleResult.thisYearAmount;
					//图表使用：上年度销项金额
					var saleLastYearData = deepEtrBusCirSaleResult.lastYearAmount;
					
					for(var temp in deepEtrBusCirSaleList){
						
						var amount;
						if(deepEtrBusCirSaleList[temp].amount!=null) {
							amount = creditReport.formatMoney(deepEtrBusCirSaleList[temp].amount, 2);
						} else {
							amount = '--';
						}
						
						deepEtrBusCirSaleAmountHtml += "<td>" + amount  + "</td>";
						deepEtrBusCirSaleTbHtml += "<td>" + deepEtrBusCirSaleList[temp].tb  + "%</td>";
						deepEtrBusCirSaleHbHtml += "<td>" + deepEtrBusCirSaleList[temp].hb  + "%</td>";
						
					}
					for(var i = deepEtrBusCirBuyList.length; i < 12; i++) {
						deepEtrBusCirSaleAmountHtml += "<td>--</td>";
						deepEtrBusCirSaleTbHtml += "<td>--</td>"
						deepEtrBusCirSaleHbHtml += "<td>--</td>"
					}
					
					$("#deepEtrBusCirSaleAmount").after(deepEtrBusCirSaleAmountHtml);
					$("#deepEtrBusCirSaleTb").after(deepEtrBusCirSaleTbHtml);
					$("#deepEtrBusCirSaleHb").after(deepEtrBusCirSaleHbHtml);
					
					
					var deepEtrBusCirSaleChart = echarts.init(document.getElementById('deepEtrBusCirSaleChart'));
					
					var deepEtrBusCirSaleOption = {
					    title : {
					        text: '企业经营情况分析',
					        subtext: '本年度与上年度销项金额折线图'
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    legend: {
					        data:['本年度','上年度']
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : ['01','02','03','04','05','06','07','08','09','10','11','12']
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value}'
					            }
					        }
					    ],
					    series : [
					        {
					            name:'本年度',
					            type:'line',
					            data:saleThisYearData,
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },
					            markLine : {
					                data : [
					                    {type : 'average', name: '平均值'}
					                ]
					            }
					        },
					        {
					            name:'上年度',
					            type:'line',
					            data: saleLastYearData,
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },
					            markLine : {
					                data : [
					                    {type : 'average', name : '平均值'}
					                ]
					            }
					        }
					    ]
					};
			
					// 为echarts对象加载数据 
					deepEtrBusCirSaleChart.setOption(deepEtrBusCirSaleOption);
//					
					
					/**
					//发票金额
					var deepEtrBusCirFpAmountHtml = "";
					//发票同比
					var deepEtrBusCirFpTbHtml = "";
					//发票环比
					var deepEtrBusCirFpHbHtml = "";
					
					//图表使用：发票同比数据
					var fpTbData = deepEtrBusCirFpjeResult.tbList;
					//图表使用：发票环比数据
					var fpHbData = deepEtrBusCirFpjeResult.hbList;
					for(var temp in deepEtrBusCirFpjeList){
						deepEtrBusCirFpAmountHtml += "<td>" + deepEtrBusCirFpjeList[temp].amount  + "</td>";
						deepEtrBusCirFpTbHtml += "<td>" + deepEtrBusCirFpjeList[temp].tb  + "</td>";
						deepEtrBusCirFpHbHtml += "<td>" + deepEtrBusCirFpjeList[temp].hb  + "</td>";
						
					}
					for(var i = deepEtrBusCirFpjeList.length; i < 12; i++) {
						deepEtrBusCirFpAmountHtml += "<td>--</td>";
						deepEtrBusCirFpTbHtml += "<td>--</td>"
						deepEtrBusCirFpHbHtml += "<td>--</td>"
					}
					
					$("#deepEtrBusCirFpAmount").after(deepEtrBusCirFpAmountHtml);
					$("#deepEtrBusCirFpTb").after(deepEtrBusCirFpTbHtml);
					$("#deepEtrBusCirFpHb").after(deepEtrBusCirFpHbHtml);
					
					var deepEtrBusCirFpChart = ec.init(document.getElementById('deepEtrBusCirFpChart'));
					
					var option = {
					    title : {
					        text: '企业经营情况分析--发票的分析',
					        subtext: '发票金额折线图'
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    legend: {
					        data:['本年度','上年度']
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType : {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : ['01','02','03','04','05','06','07','08','09','10','11','12']
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value} %'
					            }
					        }
					    ],
					    series : [
					        {
					            name:'本年度',
					            type:'line',
					            data:fpTbData,
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },
					            markLine : {
					                data : [
					                    {type : 'average', name: '平均值'}
					                ]
					            }
					        },
					        {
					            name:'上年度',
					            type:'line',
					            data: fpHbData,
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },
					            markLine : {
					                data : [
					                    {type : 'average', name : '平均值'}
					                ]
					            }
					        }
					    ]
					};
			
					// 为echarts对象加载数据 
					deepEtrBusCirFpChart.setOption(option);
					* 
					* 
					*/
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findDeepEtrCustomerSupplier : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findDeepEtrCustomerSupplier?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					deepEtrCustomerList = data.deepEtrCustomerList;
					deepEtrSupplierList = data.deepEtrSupplierList;
					
					//主要客户稳定性分析
					var deepEtrCustomerHtml = "";
					for(var i = 0; i < 5; i++){
						deepEtrCustomerHtml += "<tr>"
							+ "<td>" + (i + 1)  + "</td>"
							+ "<td>" + deepEtrCustomerList[i]  + "</td>"
							+ "<td>" + deepEtrCustomerList[i + 5]  + "</td>"
							+ "<td>" + deepEtrCustomerList[i + 10]  + "</td>"
							+ "<td>" + deepEtrCustomerList[i + 15]  + "</td>"
							+ "</tr>";
							
					}
					
					$("#deepEtrCustomerTb").html(deepEtrCustomerHtml);
					
					//主要客户稳定性分析
					var deepEtrSupplierHtml = "";
					for(var i = 0; i < 5; i++){
						deepEtrSupplierHtml += "<tr>"
							+ "<td>" + (i + 1)  + "</td>"
							+ "<td>" + deepEtrSupplierList[i]  + "</td>"
							+ "<td>" + deepEtrSupplierList[i + 5]  + "</td>"
							+ "<td>" + deepEtrSupplierList[i + 10]  + "</td>"
							+ "<td>" + deepEtrSupplierList[i + 15]  + "</td>"
							+ "</tr>";
							
					}
					
					$("#deepEtrSupplierTb").html(deepEtrSupplierHtml);
					
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findDeepEtrSaleBuyProduct : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findDeepEtrSaleBuyProduct?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					deepEtrSaleProductList = data.deepEtrSaleProductList;
					deepEtrBuyProductList = data.deepEtrBuyProductList;
					
					//主要采购商品分析
					var deepEtrBuyProductHtml = "";
					for(var i = 0; i < 5; i++){
						deepEtrBuyProductHtml += "<tr>"
							+ "<td>" + (i + 1)  + "</td>"
							+ "<td>" + deepEtrBuyProductList[i]  + "</td>"
							+ "<td>" + deepEtrBuyProductList[i + 5]  + "</td>"
							+ "<td>" + deepEtrBuyProductList[i + 10]  + "</td>"
							+ "<td>" + deepEtrBuyProductList[i + 15]  + "</td>"
							+ "</tr>";
							
					}
					
					$("#deepEtrBuyProductTb").html(deepEtrBuyProductHtml);
					
					//主要销售商品分析
					var deepEtrSaleProductHtml = "";
					for(var i = 0; i < 5; i++){
						deepEtrSaleProductHtml += "<tr>"
							+ "<td>" + (i + 1)  + "</td>"
							+ "<td>" + deepEtrSaleProductList[i]  + "</td>"
							+ "<td>" + deepEtrSaleProductList[i + 5]  + "</td>"
							+ "<td>" + deepEtrSaleProductList[i + 10]  + "</td>"
							+ "<td>" + deepEtrSaleProductList[i + 15]  + "</td>"
							+ "</tr>";
							
					}
					
					$("#deepEtrSaleProductTb").html(deepEtrSaleProductHtml);
					
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findDeepEtrIndustryProduct : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findDeepEtrIndustryProduct?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					deepEtrIndustryProductList = data.deepEtrIndustryProductList;
					
					//各行业产品比例
					var deepEtrIndustryProductHtml = "";
					for(var i = 0; i < 5; i++){
						deepEtrIndustryProductHtml += "<tr>"
							+ "<td>" + (i + 1)  + "</td>"
							+ "<td>" + deepEtrIndustryProductList[i]  + "</td>"
							+ "<td>" + deepEtrIndustryProductList[i + 5]  + "</td>"
							+ "<td>" + deepEtrIndustryProductList[i + 10]  + "</td>"
							+ "<td>" + deepEtrIndustryProductList[i + 15]  + "</td>"
							+ "</tr>";
							
					}
					
					$("#deepEtrIndustryProductTb").html(deepEtrIndustryProductHtml);
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findDeepEtrProfit : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findDeepEtrProfit?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					deepEtrProfitList = data.deepEtrProfitList;
					
					//各行业产品比例
					var deepEtrProfitHtml = "";
						deepEtrProfitHtml += "<tr>"
							+ "<td>毛利率分档</td>"
							+ "<td>" + deepEtrProfitList[0]  + "</td>"
							+ "<td>" + deepEtrProfitList[1]  + "</td>"
							+ "<td>" + deepEtrProfitList[2]  + "</td>"
							+ "<td>" + deepEtrProfitList[3]  + "</td>"
							+ "</tr>";
					
					$("#deepEtrProfitTb").html(deepEtrProfitHtml);
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		},
		findEtrTrialJudgement : function(){
			$.ajax({
				url : basePath + "etrCreditReport/findEtrTrialJudgement?" + new Date().getTime(),
				type : "post",
				dataType : "json",
				data : {
					otherEtrId :　$("#otherEtrId").val()
				},
				async : false,
				success : function(data) {
					etrTrialList = data.etrTrialList;
					etrJudgementList = data.etrJudgementList;
					//诉讼信息
					var etrTrialHtml = "";
					if(etrTrialList.length ==0 ) {
						etrTrialHtml += "<tr><td colspan='8'>无</td> </tr>";
					} else {
						for(var temp in etrTrialList){
							etrTrialHtml += "<tr>"
								+ "<td>" + etrTrialList[temp].prosecutor  + "</td>"
								+ "<td>" + etrTrialList[temp].enterpriseName  + "</td>"
								+ "<td>" + etrTrialList[temp].thirdParty  + "</td>"
								+ "<td>" + etrTrialList[temp].court  + "</td>"
								+ "<td>" + etrTrialList[temp].caseNo  + "</td>"
								+ "<td>" + etrTrialList[temp].trialAmount  + "</td>"
								+ "<td>" + etrTrialList[temp].amount  + "</td>"
								+ "<td>" + etrTrialList[temp].createTime  + "</td>"
								+ "</tr>";
						}
					}
					
					
					
					$("#etrTrialTb").html(etrTrialHtml);
					
					//执行信息
					var etrJudgementHtml = "";
					if(etrJudgementList.length == 0) {
						etrJudgementHtml += "<tr><td colspan='6'>无</td> </tr>";
					} else {
						for(var temp in etrJudgementList){
							etrJudgementHtml += "<tr>"
								+ "<td>" + etrJudgementList[temp].court  + "</td>"
								+ "<td>" + etrJudgementList[temp].caseNo  + "</td>"
								+ "<td>" + etrJudgementList[temp].amount  + "</td>"
								+ "<td>" + etrJudgementList[temp].payment  + "</td>"
								+ "<td>" + etrJudgementList[temp].caseStatus  + "</td>"
								+ "<td>" + etrJudgementList[temp].createTime  + "</td>"
								+ "</tr>";
						}
					}
					
					$("#etrJudgementTb").html(etrJudgementHtml);
				},
				error : function(data) {
					//这两个参数分别是，参数1：与服务器通信失败！请稍后重试；参数2：提示信息
					$.jBox.error("\u4e0e\u670d\u52a1\u5668\u901a\u4fe1\u5931\u8d25\uff01\u8bf7\u7a0d\u540e\u91cd\u8bd5", "\u63d0\u793a\u4fe1\u606f");
					checkResult = false;
				}
			});
		}
		
	};
})(jQuery);
jQuery(document).ready(function($) {
	creditReport.findEtrRelationship();
	creditReport.findEtrCapital();
	creditReport.findEtrSaleBuy();
	creditReport.findEtrSaleBuyTradingPartners();
	creditReport.findDeepEtrBusCir();
	creditReport.findDeepEtrCustomerSupplier();
	creditReport.findDeepEtrSaleBuyProduct();
	creditReport.findDeepEtrIndustryProduct();
	creditReport.findDeepEtrProfit();
	creditReport.findEtrTrialJudgement();
	
});

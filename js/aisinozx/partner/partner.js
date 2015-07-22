(function($) {
	
	window.partner = $.fn.partner = {
		
		changeBuyFpfsOrder : function(){
			if($("#csBuyHidden")[0].value == "" || $("#csBuyHidden")[0].value == "order_desc"){
				$("#csBuyHidden")[0].value = "order_asc";
			} else if($("#csBuyHidden")[0].value == "order_asc"){
				$("#csBuyHidden")[0].value = "order_desc";
			}
		},
		
		changeBuyAmountOrder : function(){
			if($("#jeBuyHidden")[0].value == "" || $("#jeBuyHidden")[0].value == "order_desc"){
				$("#jeBuyHidden")[0].value = "order_asc";
			} else if($("#jeBuyHidden")[0].value == "order_asc"){
				$("#jeBuyHidden")[0].value = "order_desc";
			}
		},
		
		changeSaleFpfsOrder : function(){
			if($("#csSaleHidden")[0].value == "" || $("#csSaleHidden")[0].value == "order_desc"){
				$("#csSaleHidden")[0].value = "order_asc";
			} else if($("#csSaleHidden")[0].value == "order_asc"){
				$("#csSaleHidden")[0].value = "order_desc";
			}
		},
		
		changeSaleAmountOrder : function(){
			if($("#jeSaleHidden")[0].value == "" || $("#jeSaleHidden")[0].value == "order_desc"){
				$("#jeSaleHidden")[0].value = "order_asc";
			} else if($("#jeSaleHidden")[0].value == "order_asc"){
				$("#jeSaleHidden")[0].value = "order_desc";
			}
		},
		
		querySaleData : function(salePageNum) {
			
			$.jBox.tip("请求正在处理!请稍后......", 'loading');
		
			if($("#buyReportFlag").is(':checked')){
				$("#buyReportFlagHidden")[0].value = "1";
			}
			
			if (undefined == salePageNum || null == salePageNum) {
				salePageNum = 1;
				}
			$("#salePageNum")[0].value = salePageNum;
			$("#saleForm").attr("action", basePath + "enterprise/findEnterprisePartner");
			$("#saleForm").submit();
		},
		
		queryBuyData : function(buyPageNum) {
			
			$.jBox.tip("请求正在处理!请稍后......", 'loading');
			
			if($("#saleReportFlag").is(':checked')){
				$("#saleReportFlagHidden")[0].value = "1";
			}
			
			if (undefined == buyPageNum || null == buyPageNum) {
				buyPageNum = 1;
				}
			$("#buyPageNum")[0].value = buyPageNum;
			$("#buyForm").attr("action", basePath + "enterprise/findEnterprisePartner");
			$("#buyForm").submit();
		},
		
		displayGraph: function(data) {
		    $('[data-toggle="popover"]').popover();
		    var width = 800, height = 300, format = d3.format(",d");
		    var color = d3.scale.category20();

//		    var force = d3.layout.force()
//		        .charge(function(d) {
//		          if (d.group == 4) {
//		            return -1500;
//		          } else {
//		            return -1500;
//		          }
//		        })
//		        .linkDistance(100)
//		        // .alpha(0)
//		        .size([width, height]);

		    var svg = d3.select("#graphDisplay").append("svg")
		        .attr("width", width)
		        .attr("height", height);
		    
		    
		    var graph = data;
		 //   d3.json("/miserable.json", function(error, graph) {
		     // if (error) throw error;
		    //  var root = graph[0];
		      var root = {};
		      root.fixed = true;
		      root.x = width/2;
		      root.y = height/2;
		      root.r = 50;
		      root.group = 1;
		      root.enterpriseName = typeof(enterpriseName)!= "undefined" ? enterpriseName:"";
		      graph.push(root);
		      var forSale = 0, forBuy = 0, others = 0;

		      //按照金额对数据进行排序
		      graph.sort(function(a,b) {
		    	  return a.amount>b.amount?1:-1;
		      });
		 //     console.log(graph);
		      graph.forEach(function(item, index){
		        if(item != root) {
		          // 设置评级
		        	if(item.grade) {
		        		item.group = item.grade.split('A').length - 2;
		        	} else {
		        		item.group = 3;
		        		item.grade = "暂无评级";
		        	}
		          
		        			       
		          // 设置气泡的大小
		          item.r = 20;
		          if(item.flag == "sale") {
		            // item.index 表示节点在该组中的顺序位置           
		            forSale++;
		            item.index = forSale;
		          } else if(item.flag == "buy") {           
		            forBuy++;
		            item.index = forBuy;
		          } else if(item.flag == "both") {           
		            others++;
		            item.index = others;
		          }
		        }
		      });
		      
		      var sale = 0, buy = 0, other = 0;
		      if(forSale != 0) {
		    	  sale = Math.floor(110/forSale);
		      }
		      if(forBuy != 0) {
		    	  buy = Math.floor(110/forBuy);
		      }
		      if(others != 0) {
		    	  other = Math.floor(80/others);
		      }
		      
		      graph.forEach(function(item, index) {
		        if(item != root) {
		          var devide = 1;
		          var rad = 130;
		          if(item.flag == "buy") {
		            var hudu = -35 + buy*item.index;
		         //   console.log(hudu);
		         //   var hudu = Math.floor(Math.random()*120 - 45);
		            item.x = root.x + Math.sin((2*Math.PI / 360) *hudu) * rad;
		            item.y = root.y - Math.cos((2*Math.PI / 360) *hudu) * (rad-20);
		          } else if(item.flag == "sale") {
		            var hudu = 90 + sale*item.index;
		            item.x = root.x + Math.sin((2*Math.PI / 360) *hudu) * rad;
		            item.y = root.y - Math.cos((2*Math.PI / 360) *hudu) * (rad-20);
		          } else if(item.flag == "both") {
		            var hudu = 225 + other*item.index;
		            item.x = root.x + Math.sin((2*Math.PI / 360) *hudu) * (rad+18);
		            item.y = root.y - Math.cos((2*Math.PI / 360) *hudu) * (rad+18);      
		          }		          
		        }
		      });
		      
//		      force
//		          .nodes(graph)
//		          //.links(graph.links)
//		          .start();

		      var color2 = ["#FFCC00", "#FF9900", "#FF6600","#CCFFCC"];
		      var colorName = ["A", "AA", "AAA", "暂无评级"];
		      var legend = svg.selectAll(".legend")
		                      .data(color2)
		                      .enter().append("g")
		                      .attr("class", "legend")
		                      .attr("transform", function(d, i) { return "translate(10,"+(i+1) * 20 + ")";});

		      legend.append("rect")
		            .attr("x", 78)
		            .attr("width", 18)
		            .attr("height", 18)
		            .on("mouseover", function(d, i) {
		              svg.selectAll(".node")
		                .style("opacity", 0.1);
		              svg.selectAll(".link")
		                .style("opacity", 0.1);
		              svg.selectAll(".node")
		                .filter(function(node) {
		                  if(node.group == 1) return node;
		                })
		                .style("opacity", 1);
		              svg.selectAll(".node")
		                .filter(function(node) {
		                  if (node.group == i) return node;
		                })
		                .style("opacity", 1);
		              svg.selectAll(".link")
		                .filter(function(link) {
		                  if (link.source == i) return link;
		                })
		                .style("opacity", 1);
		            })
		            .on("mouseout", function() {
		              svg.selectAll(".node")
		                .style("opacity", 1);
		              svg.selectAll(".link")
		                .style("opacity", 1);
		            })
		            .style("fill", function(d, i) { return d;});

		      legend.append("text")
		            .data(colorName)
		            .attr("x", 60)
		            .attr("y", 9)
		            .attr("dy", ".35em")
		            .style("text-anchor", "end")
		            .text(function(d) { return d; });

		      var sepLine1 = svg.append("line")
		                      .attr("x1", root.x)
		                      .attr("y1", root.y)
		                      .attr("x2", function() {
		                        return root.x + Math.sin((2*Math.PI/360) * (-45)) * 200;
		                      })
		                      .attr("y2", function() {
		                        return root.y - Math.cos((2*Math.PI/360) * (-45)) * 200;
		                      })
		                      .attr("stroke-width", 3)
		                      .attr("stroke", "#C9E6E3");

		      var sepLine2 = svg.append("line")
		                      .attr("x1", root.x)
		                      .attr("y1", root.y)
		                      .attr("x2", function() {
		                        return root.x + Math.sin((2*Math.PI/360) * (-45)) * 200;
		                      })
		                      .attr("y2", function() {
		                        return root.y + Math.cos((2*Math.PI/360) * (-45)) * 200;
		                      })
		                      .attr("stroke-width", 3)
		                      .attr("stroke", "#C9E6E3");

		      var link = svg.selectAll(".link")
		          .data(graph)
		        //.data(links)
		        .enter().append("line")
		          .attr("class", "link")
		          .attr("x1", function(d) { return root.x; })
		          .attr("y1", function(d) { return root.y; })
		          .attr("x2", function(d) { return d.x; })
		          .attr("y2", function(d) { return d.y ; })
		          .style("stroke-width", function(d, i) { /*return Math.sqrt(d.value);*/ return i+2;})
		          .style("stroke", function(d) { return "#22BDAF"; });

		      var node = svg.selectAll(".node")
		          .data(graph)
		      // .data(nodes)
		        .enter().append("g")
		        .on("mouseenter", function(d) {
		            d3.select(this).select("circle").transition()
		                                          .duration(400)
		                                          .attr("r", d.r+2);
		            var $circle = $(this).find("circle");
		             $circle.popover('show');
		             setTimeout(function() {
		               $(".popover").on("mouseleave", function() {
		                      $circle.popover('hide');
		                });
		             }, 100);
		            
		        })
		        .on("mouseleave", function(d) {
		            d3.select(this).select("circle").transition()
		                                          .duration(400)
		                                          .attr("r", d.r);
		            var $circle = $(this).find("circle");
		            setTimeout(function () {
		                if (!$(".popover:hover").length) {
		                    $circle.popover("hide");
		                }
		            }, 100);
		        })
		        // .on("click", function(d) {
		        //   $(this).find("circle").popover('show');
		        // })
		     //   .call(force.drag)
		        .attr("class", "node");

		        var hudu = (2*Math.PI / 360) * 30;

		  //      var X = a + Math.sin(hudu) * r;
		        node.append("circle")
		            .attr("r", function(d) { 
		              if (d.r) {
		                return d.r;
		              } 
		              return 30;
		            })
		            .attr("cx", function(d, i){ 
		              if(d == root) {
		                return root.x;
		              }
		              return d.x; })
		            .attr("cy", function(d, i){ 
		              if(d == root) {
		                return root.y;
		              }
		              return d.y; })
		            .style("fill", function(d) { 
		            	if (d == root) {
		            		return "#99CCFF";
		            	}
		            	return color2[d.group]; 
		            })
		            .attr("data-toggle", "popover")
		            .attr("data-content", function(d) {
		              if (d.content) {
		                return d.content;
		              }
		              if (d == root) {
		            	  return "公司名称：" + d.enterpriseName + "<br/>";
		              }
		              return "公司名称：" + d.enterpriseName + "<br/>综合评级：" + d.grade + "<br/>税号：" + d.taxNo + "<br/>发票金额：" + d.amount.formatMoney(2, '￥ ');
		            })
		            .attr("data-html", true)
		            .attr("data-container", "body");

		        node.append("text")
		        	.filter(function(d) {
		        		if(d != root)
		        			{
		        				return d;
		        			}
		        		else {
		        			var rootNode = this.parentNode;
		        		//	var rootNode = $(this).parent();
		        			// 加入中心圆圈文字
		    		        appendMultiText(d3.select(rootNode),root.enterpriseName, root.x,root.y,80,16,"simsun");
		        		}
		        	})
		            .attr("x", function(d, i){ 
		              if(d == root) {
		                return root.x;
		              }
		              return d.x; })
		            .attr("y", function(d, i){ 
		              if(d == root) {
		                return root.y;
		              }
		              return d.y; })
		            .style("text-anchor", "middle")
		            .text(function(d) {
		            	if(d == root) {
		            		return root.enterpriseName;
		            	} else if (d.grade === "暂无评级") {
		            		appendMultiText(d3.select(this.parentNode), d.grade, d.x, d.y, 25, 12, "simsun");
		            	} else {
		            		return d.grade;
		            	}
		              
		            })
		            .style("font-size", 7)
		            .attr("dy", ".5em");
		        
		        
		     
		        
		      var dashline = svg.append("line")
		                      .attr("x1", root.x+50)
		                      .attr("y1", root.y)
		                      .attr("x2", root.x+260)
		                      .attr("y2", root.y)
		                      .style("stroke-dasharray", 4)
		                      .attr("stroke-width", 3)
		                      .attr("stroke", "#C9E6E3");
		      
		      var ex = svg.append("text")
		      			.attr("x", root.x+240)
		      			.attr("y", root.y-20)
		      			.text("采购");
		      var ex1 = svg.append("text")
					      .attr("x", root.x+240)
					      .attr("y", root.y+30)
					      .text("销售");
		      var ex01 = svg.append("text")
		      				.attr("x", root.x-220)
		      				.attr("y", root.y-100)
		      				.text("进销方");
//		      force.on("tick", function(d) {
//		        // link.attr("x1", function(d) { return d.source.x; })
//		        //     .attr("y1", function(d) { return d.source.y; })
//		        //     .attr("x2", function(d) { return d.target.x; })
//		        //     .attr("y2", function(d) { return d.target.y; });
//
//		        // node.selectAll("circle").attr("cx", function(d) { return d.x; })
//		        //     .attr("cy", function(d) { return d.y; });
//		        // node.selectAll("text").attr("x", function(d){ return d.x; })
//		        //                     .attr("y", function(d){ return d.y; })
//		        //                     .style("text-anchor", "middle")
//		        //                     .attr("dy", ".3em");
//		      });

	//	    });
		}
		
	};
})(jQuery);
jQuery(document).ready(function($) {
	
	var saleA = $("#saleA").attr("class");
	var buyA = $("#buyA").attr("class");
	
	
	if ("tab on" == saleA && "tab" == buyA) {
		partner.querySaleData();
	}
	
	if(buyReportFlag == "1"){
		$("#buyReportFlag").attr("checked", "checked");
	}
	if(saleReportFlag == "1"){
		$("#saleReportFlag").attr("checked", "checked");
	}
	
	if (0 != saleTotalPages) {
		if (parseInt(saleTotalPages) > 0) {
			$("#salePagination").bootpag( {
				total : parseInt(saleTotalPages),
				page : salePageNum,
				maxVisible : 10,
				leaps: true
			}).on("page", function(event, goPageNum) {
				partner.querySaleData(goPageNum);
			});
		}
	}
	
	if (0 != buyTotalPages) {
		if (parseInt(buyTotalPages) > 0) {
			$("#buyPagination").bootpag( {
				total : parseInt(buyTotalPages),
				page : buyPageNum,
				maxVisible : 10,
				leaps: true
			}).on("page", function(event, goPageNum) {
				partner.queryBuyData(goPageNum);
			});
		}
	}
	
	 partner.displayGraph(list);
	
});
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="zh-CN">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>关于我们</title>
    <%@include file="/WEB-INF/jsp/public/publicImport.jsp"%>

    <link type="text/css" rel="stylesheet" href="<%=path%>
    js/plugin/jBox/css/jbox.css">
    <script type="text/javascript" src="<%=path%>js/plugin/jBox/js/jquery.jBox-2.3.min.js"></script>
    <script type="text/javascript" src="<%=path%>js/plugin/jBox/js/jquery.jBox-zh-CN.js"></script>
    <script type="text/javascript" src="<%=path%>js/aisinozx/index/index.js"></script>
    <script data-main="<%=path%>js/main.js" src="<%=path%>js/require.js"></script>

</head>
<body>
    <%@include file="/WEB-INF/jsp/public/publicHeader.jsp"%>
    <!--search-container-->
    <div class="search-container member bigwarp">
        <div class="warp">
            <h4>
                全国 <b>1000万+</b>
                企业信用档案库！
            </h4>
            <div class="search-box">
                <input type="text" placeholder="北京千晨科技有限公司" />
                <input type="submit" value="搜索信用档案" />
            </div>
        </div>
    </div>
    <!--/search-container-->

    <!--member-center-->
    <div class="member-center warp">
        <div class="left">
            <%@include file="/WEB-INF/jsp/public/publicMenu.jsp"%></div>
        <div class="right">
            <h2>我的关注</h2>

            <!--message-list-->
            <div class="table-title small">我的消息</div>
            <ul class="message-list">
                <li class="unread"> <i class="icon-message"></i> <i class="readed">已读</i>
                    <div class="msg-info">
                        <h4>
                            <a class="msg-title" href="javascript:;">系统消息</a> <em>2015-07-01  12:34</em>
                        </h4>
                        <div class="msg-content">
                            2015年7月，贵公司“航天信息股份有限公司”的信用报告共被查看25次。其中普通用户查看8次，企业用户查看10次
                            第三方机构查看7次...
                        </div>
                    </div>
                </li>
                <li class="readed">
                    <i class="icon-message"></i>
                    <i class="readed">已读</i>
                    <div class="msg-info">
                        <h4>
                            <a class="msg-title" href="javascript:;">系统消息</a> <em>2015-07-01  12:34</em>
                        </h4>
                        <div class="msg-content">
                            2015年7月，贵公司“航天信息股份有限公司”的信用报告共被查看25次。其中普通用户查看8次，企业用户查看10次
                            第三方机构查看7次...
                        </div>
                    </div>
                </li>
                <li class="readed">
                    <i class="icon-message"></i>
                    <i class="readed">已读</i>
                    <div class="msg-info">
                        <h4>
                            <a class="msg-title" href="javascript:;">系统消息</a>
                            <em>2015-07-01  12:34</em>
                        </h4>
                        <div class="msg-content">
                            2015年7月，贵公司“航天信息股份有限公司”的信用报告共被查看25次。其中普通用户查看8次，企业用户查看10次
                            第三方机构查看7次航天信息股份有限公司（以下简称航天信息）中标全国居民身份证挂失申报系统项目近年来，居民
                            身份证丢失或遭窃后被不法分子冒用的案件时有发生。不法分子冒用他人身份登记住宿、注册公司、办理银行卡和电话
                            卡恶意透支、从事赌博等各种违法犯罪活动，不但给公民合法权益造成不同程度的损害，而且极大地扰乱了社会秩序。
                        </div>
                    </div>
                </li>
                <li class="unread">
                    <i class="icon-message"></i>
                    <i class="readed">已读</i>
                    <div class="msg-info">
                        <h4>
                            <a class="msg-title" href="javascript:;">系统消息</a>
                            <em>2015-07-01  12:34</em>
                        </h4>
                        <div class="msg-content">
                            2015年7月，贵公司“航天信息股份有限公司”的信用报告共被查看25次。其中普通用户查看8次，企业用户查看10次
                            第三方机构查看7次...
                        </div>
                    </div>
                </li>
                <li class="unread">
                    <i class="icon-message"></i>
                    <i class="readed">已读</i>
                    <div class="msg-info">
                        <h4>
                            <a class="msg-title" href="javascript:;">系统消息</a>
                            <em>2015-07-01  12:34</em>
                        </h4>
                        <div class="msg-content">
                            2015年7月，贵公司“航天信息股份有限公司”的信用报告共被查看25次。其中普通用户查看8次，企业用户查看10次
                            第三方机构查看7次...
                        </div>
                    </div>
                </li>
                <li class="unread">
                    <i class="icon-message"></i>
                    <i class="readed">已读</i>
                    <div class="msg-info">
                        <h4>
                            <a class="msg-title" href="javascript:;">系统消息</a>
                            <em>2015-07-01  12:34</em>
                        </h4>
                        <div class="msg-content">
                            2015年7月，贵公司“航天信息股份有限公司”的信用报告共被查看25次。其中普通用户查看8次，企业用户查看10次
                            第三方机构查看7次...
                        </div>
                    </div>
                </li>
                <li class="pager-row">
                    <p class="pager">
                        <a href="#" class="pre">上一页</a>
                        <a href="#">1</a>
                        <a href="#" class="on">2</a>
                        <a href="#">3</a>
                        <a href="#" class="next">下一页</a>
                    </p>
                </li>
            </ul>
            <!--/message-list--> </div>
    </div>
    <!--/member-center-->

    <!--footer-->
    <%@include file="/WEB-INF/jsp/public/publicFooter.jsp"%>
    <!--/footer-->

    <script data-main="<%=path%>js/main.js" src="<%=path%>js/require.js"></script>
</body>
</html>
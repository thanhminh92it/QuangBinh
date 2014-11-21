<@markup id="css" >
   <#-- CSS Dependencies -->
   <#include "../form/form.css.ftl"/>
   <@link href="${url.context}/res/components/searchminhpt/css/bootstrap.min.css" group="search"/>
   <@link href="${url.context}/res/components/searchminhpt/css/font-awesome.css" group="search"/>
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <#include "../form/form.js.ftl"/>
   <@script src="${url.context}/res/components/searchreport/js/jquery-1.11.0.min.js" group="search"/>
   <@script src="${url.context}/res/components/searchreport/js/FileSaver.js" group="search"/>
   
</@>

<@markup id="widgets">
   <@createWidgets group="search"/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign el=args.htmlid?html>
      <div id="${el}-body" class="search">
		<div class="container">
            <div class="page-header">
                <h2>Báo cáo chi tiết theo người dùng</h2>
            </div>
            <div class="row">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th rowspan="2">STT</th>
                        <th rowspan="2">Họ Và Tên</th>
                        <th rowspan="2">Tổng số trang</th>
                        <th rowspan="2">Tổng số file</th>
						<th colspan="2">Tình trạng xử lý</th>
                    </tr>
					<tr>
                        <td>Đã cập nhật đầy đủ thông tin</td>
						<td>Chưa cập nhật đầy đủ thông tin</td>
                    </tr>
                    </thead>
                    <#assign stt = 0>
                    <tbody>
					<#if (count > 0)>
					<#assign allpage = 0>
					<#assign allfile = 0>
					<#assign allfilenull = 0>
					<#assign allfilenotnull = 0>
                    <#list data.rcu2s as item>
	                    <#assign stt=stt +1 >
						<#assign allpage = allpage + item.numberpage>
						<#assign allfile = allfile + item.totalfile>
						<#assign allfilenull =allfilenull + item.totalfile - item.filenull>
						<#assign allfilenotnull = allfilenotnull  + item.filenull>
			                <tr>
			                    <td>${stt}</td>
								<td>${item.rcu2p0}</td>
								<td>${item.numberpage}</td>
								<td>${item.totalfile}</td>
								<td>${item.totalfile - item.filenull}</td>
								<td>${item.filenull}</td>
			                </tr>
                    </#list>
                    	<tr>
							<td colspan="2" style="text-align: center">Tổng cộng</td>
							<td>${allpage}</td>
							<td>${allfile}</td>
							<td>${allfilenull}</td>
							<td>${allfilenotnull}</td>
						</tr>
					</#if>
                    </tbody>
                </table>
        </div>
            <div class="form-group">
                <a title="Quay về kho" href="../page/repository" class="btn btn-default">Quay về kho</a>
            </div>
        </div>
      </div>
   </@>
</@>
<script type="text/javascript" src="${url.context}/res/components/searchminhpt/js/javascripts.js"></script>
<script type="text/javascript" src="${url.context}/res/components/searchminhpt/js/bootstrap.min.js"></script>
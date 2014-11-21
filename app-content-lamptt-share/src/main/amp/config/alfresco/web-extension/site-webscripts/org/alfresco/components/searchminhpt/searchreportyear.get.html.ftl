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
                <h2>Báo cáo chi tiết theo năm</h2>
            </div>
            <div class="row">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th rowspan="2">STT</th>
                        <th rowspan="2">Năm</th>
                        <th rowspan="2">Tổng số trang</th>
                        <th rowspan="2">Tổng số file</th>
						<th colspan="2">Số file các loại</th>
                    </tr>
					<tr>
                        <td>Loại công văn</td>
						<td>Loại hồ sơ</td>
                    </tr>
                    </thead>
                    <#assign stt = 0>
                    <#assign totalTrang = 0>
                    <#assign totalDayDu = 0>
                    <#assign totalFile = 0>
                    <#assign totalChuaNhap = 0>
                    <tbody>
					<#if (count > 0)>
                    <#list data.rcu2s as item>
	                    <#assign totalTrang = totalTrang + item.f2>
	                    <#assign totalDayDu = totalDayDu + item.f4>
	                    <#assign totalFile = totalFile +  item.f4 + item.f5>
	                    <#assign totalChuaNhap = totalChuaNhap + item.f5>
	                    <#assign stt=stt +1 >
			                <tr>
			                    <td>${stt}</td>
								<td>${item.year?replace(",","")}</td>
								<td>${item.f2}</td>
								<td>${item.f4 + item.f5}</td>
								<td>${item.f4}</td>
								<td>${item.f5}</td>
			                </tr>
                    </#list>
                    	<tr>
							<td colspan="2" style="text-align: center">Tổng cộng</td>
							<td>${totalTrang}</td>
							<td>${totalFile}</td>
							<td>${totalDayDu}</td>
							<td>${totalChuaNhap}</td>
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
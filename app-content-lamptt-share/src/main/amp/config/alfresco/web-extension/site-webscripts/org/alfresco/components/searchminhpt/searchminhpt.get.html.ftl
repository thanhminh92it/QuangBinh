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
            <div class="row">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">Cấu hình chung</h3>
                    </div>
                    <div class="panel-body">
						<div class="col-md-6">
							<div class="radio-inline">
								<label>
									<input class="radiobttALL" type="radio" checked="true" name="Type"> ${msg("label.radioAll")}
								</label>
							</div>
							<div class="radio-inline">
								<label>
									<input class="radiobtt1" type="radio" name="Type"> Công văn
								</label>
							</div>
							<div class="radio-inline">
								<label>
									<input class="radiobtt2" type="radio" name="Type"> Hồ sơ
								</label>
							</div>
							<div class="checkbox">
								<label>
									<input class="checkboxbttNULL" type="checkbox"> Chưa nhập thông tin
								</label>
							</div>
							<div class="checkbox">
								<label>
									<input class="checkboxbttHTML" type="checkbox"> Xuất ra html
								</label>
							</div>
						</div>
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-5"><label>Tổng số file công văn</label></div>
								<div class="col-md-7"><label>${data.f4}</label></div>

								<div class="col-md-5"><label>Tổng số file hồ sơ</label></div>
								<div class="col-md-7"><label>${data.f5}</label></div>

								<div class="col-md-5"><label>Tổng số trang</label></div>
								<div class="col-md-7"><label>${data.f2}</label></div>
							</div>
						</div>
                    </div>
                </div>
            </div>
			<div class="row">
				<a href="/share/page/add-year" title="Thêm năm" class="btn btn-default btn-sm">Thêm năm</a>
				<a title="Báo cáo chi tiết các năm" class="btn btn-default btn-sm clickreportyear">Báo cáo tổng hợp các năm</a>
			</div>
            <div class="row">
			<#if (count > 0)>
			<#list data.rcu1s as child>
				<div class="page-header">
					<h3>Quản lý phân công theo năm: ${child.rcu1p0}</h3>		
				</div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        ${child.rcu1p0} | ${child.folderruc1}
						<div class="btn-group pull-right">
							<button type="button" class="btn btn-danger btn-xs dell" id="${child.rcu1p0}">
								<span class="glyphicon glyphicon-trash"></span>
							</button>
						</div>
                    </div>
                    <div class="panel-body">
					<#if child.rcu2s??>
					<#assign stt = 0>
						<table class="table table-bordered">
							<thead>
							<tr>
								<th class="col-md-1">STT</th>
								<th class="col-md-5">Tài khoản</th>
								<th class="col-md-5">Số thư mục</th>
								<th class="col-md-1">Thao tác</th>
							</tr>
							</thead>
							<tbody>
							<#list child.rcu2s as childrcu2s>
							<#assign stt = stt + 1>
							<tr>
								<td class="col-md-1">${stt}</td>
								<td class="col-md-5">${childrcu2s.rcu2p0}</td>
								<td class="col-md-5">${childrcu2s.countfolder}</td>
								<td class="text-right col-md-1">
									<a href="#" title="Chi tiết" class="btn btn-default btn-sm detaill" id="${childrcu2s.rcu2p0} ${childrcu2s.rcu2p2} ${child.rcu1p0}"><span class='glyphicon glyphicon-list-alt'></span></a>&nbsp;
									<a href="#" id="${childrcu2s.rcu2p0} ${child.rcu1p0}" title="Xóa" class="btn btn-danger btn-sm dell"><span class='glyphicon glyphicon-trash'></span></a>&nbsp;
								</td>
							</tr>
							</#list>
							</tbody>
						</table>
						<div class="form-group">
							<a title="Thêm người dùng" href="/share/page/add-username?t=${child.rcu1p0}" class="btn btn-default btn-sm">Thêm</a>
							<a title="Báo cáo chi tiết theo người dùng" class="btn btn-default btn-sm clickreportusername" id="${child.rcu1p0}">Báo cáo</a>
						</div>
					<#else>
					 <h3> Không có tài khoản nào </h3>
					 <a title="Thêm người dùng" href="/share/page/add-username?t=${child.rcu1p0}" class="btn btn-default btn-sm">Thêm</a>
					</#if>
                    </div>
                </div>
			</#list>
			<#else>
				<h3 class="pannel-title">Chưa có năm nào để báo cáo hãy thêm năm</h3>
			</#if>
            </div>
        </div>
      </div>
   </@>
</@>
<script type="text/javascript" src="${url.context}/res/components/searchminhpt/js/javascripts.js"></script>
<script type="text/javascript" src="${url.context}/res/components/searchminhpt/js/bootstrap.min.js"></script>
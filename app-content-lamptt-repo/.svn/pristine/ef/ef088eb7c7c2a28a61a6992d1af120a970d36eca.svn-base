<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{	
	"rcu2s":
	[
		<#list rcu2s as childrcu2>
		{	
			"rcu2p0":"${childrcu2.rcu2.properties["sla:rcu2p0"]}",
			"rcu2p2":"${childrcu2.rcu2.properties["sla:rcu2p2"]}",
			"numberpage":${childrcu2.numberpage},
			"totalfile":${childrcu2.totalfile},
			"filenull":${childrcu2.filenull}
		}
		<#if !(childrcu2.rcu2 == rcu2s?last.rcu2)>,</#if>
		</#list>
	]
}
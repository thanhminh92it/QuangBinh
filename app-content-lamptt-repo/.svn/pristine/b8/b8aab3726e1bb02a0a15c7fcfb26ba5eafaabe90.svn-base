<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{	
	"f2": "<#if f.properties["sla:f2"]?exists>${f.properties["sla:f2"]}<#else>0</#if>",
	"f4": "<#if f.properties["sla:f4"]?exists>${f.properties["sla:f4"]}<#else>0</#if>",
	"f5": "<#if f.properties["sla:f5"]?exists>${f.properties["sla:f5"]}<#else>0</#if>"<#if (countrcu1s > 0)>,
	"rcu1s":
	[
		<#list rcu1s as childrcu1>
		{	
			"folderruc1":"${childrcu1.folderrcu1}",
			"rcu1p0":"${childrcu1.rcu1.properties["sla:rcu1p0"]}",
			"rcu1p2":"${childrcu1.rcu1.properties["sla:rcu1p2"]}"<#if childrcu1.lengthrcu2s != 0>,
			"rcu2s":
			[	
				<#list 0..childrcu1.lengthrcu2s-1 as i>
				{	
					"rcu2p0":"${childrcu1.rcu2s[i].properties["sla:rcu2p0"]}",
					"rcu2p2":"${childrcu1.rcu2s[i].properties["sla:rcu2p2"]}",
					<#assign countfolder = 0>
					<#list childrcu1.rcu2s[i].properties["sla:rcu2p2"]?split(",") as x>
						<#assign countfolder = countfolder + 1>
					</#list>
					"countfolder": ${countfolder}
				}
				<#if i != childrcu1.lengthrcu2s-1>,</#if>
				</#list>
			]
			</#if>
		}
		<#if !(childrcu1.rcu1 == rcu1s?last.rcu1)>,</#if>
		</#list>
	]
	</#if>
}
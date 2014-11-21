<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{	
	"rcu2s":
	[	
		<#list rcu1s as childrcu1>
		{	
			"year": "${childrcu1.year}",
			"f1": "<#if childrcu1.rcu1.properties["sla:f1"]?exists>${childrcu1.rcu1.properties["sla:f1"]}<#else>0</#if>",
			"f2": <#if childrcu1.rcu1.properties["sla:f2"]?exists>${childrcu1.rcu1.properties["sla:f2"]}<#else>0</#if>,
			"f3": "<#if childrcu1.rcu1.properties["sla:f3"]?exists>${childrcu1.rcu1.properties["sla:f3"]}<#else>0</#if>",
			"f4": <#if childrcu1.rcu1.properties["sla:f4"]?exists>${childrcu1.rcu1.properties["sla:f4"]}<#else>0</#if>,
			"f5": <#if childrcu1.rcu1.properties["sla:f5"]?exists>${childrcu1.rcu1.properties["sla:f5"]}<#else>0</#if>,
			"f6": "<#if childrcu1.rcu1.properties["sla:f6"]?exists>${childrcu1.rcu1.properties["sla:f6"]}<#else>0</#if>",
			"f7": "<#if childrcu1.rcu1.properties["sla:f7"]?exists>${childrcu1.rcu1.properties["sla:f7"]}<#else>0</#if>"
		}
		<#if !(childrcu1.rcu1 == rcu1s?last.rcu1)>,</#if>
		</#list>
	]
}
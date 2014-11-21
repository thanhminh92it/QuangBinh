<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{	
	"f1": "<#if f.properties["sla:f1"]?exists>${f.properties["sla:f1"]}<#else>0</#if>",
	"f2": "<#if f.properties["sla:f2"]?exists>${f.properties["sla:f2"]}<#else>0</#if>",
	"f3": "<#if f.properties["sla:f3"]?exists>${f.properties["sla:f3"]}<#else>0</#if>",
	"f4": "<#if f.properties["sla:f4"]?exists>${f.properties["sla:f4"]}<#else>0</#if>",
	"f5": "<#if f.properties["sla:f5"]?exists>${f.properties["sla:f5"]}<#else>0</#if>",
	"f6": "<#if f.properties["sla:f6"]?exists>${f.properties["sla:f6"]}<#else>0</#if>",
	"f7": "<#if f.properties["sla:f7"]?exists>${f.properties["sla:f7"]}<#else>0</#if>",
	"f name": "${f.properties.name}",
	"length1": ${n1},
	 <#list whitepapers1 as child1>
		"c11_0": "<#if child1.whitepaper1.properties["sla:c11"]?exists>${child1.whitepaper1.properties["sla:c11"]}<#else>0</#if>"
		"c12_0": "<#if child1.whitepaper1.properties["sla:c12"]?exists>${child1.whitepaper1.properties["sla:c12"]}<#else>0</#if>"
		"c13_0": "<#if child1.whitepaper1.properties["sla:c13"]?exists>${child1.whitepaper1.properties["sla:c13"]}<#else>0</#if>"
		"c14_0": "<#if child1.whitepaper1.properties["sla:c14"]?exists>${child1.whitepaper1.properties["sla:c14"]}<#else>0</#if>"
		"c15_0": "<#if child1.whitepaper1.properties["sla:c15"]?exists>${child1.whitepaper1.properties["sla:c15"]}<#else>0</#if>"
		"c16_0": "<#if child1.whitepaper1.properties["sla:c16"]?exists>${child1.whitepaper1.properties["sla:c16"]}<#else>0</#if>"
		"c17_0": "<#if child1.whitepaper1.properties["sla:c17"]?exists>${child1.whitepaper1.properties["sla:c17"]}<#else>0</#if>"
		<#list whitepapers as child>
			{
				"c21_0": "<#if child.whitepaper.properties["sla:c21"]?exists>${child.whitepaper.properties["sla:c21"]}<#else>0</#if>"
				"c22_0": "<#if child.whitepaper.properties["sla:c22"]?exists>${child.whitepaper.properties["sla:c22"]}<#else>0</#if>"
				"c23_0": "<#if child.whitepaper.properties["sla:c23"]?exists>${child.whitepaper.properties["sla:c23"]}<#else>0</#if>"
				"c24_0": "<#if child.whitepaper.properties["sla:c24"]?exists>${child.whitepaper.properties["sla:c24"]}<#else>0</#if>"
				"c25_0": "<#if child.whitepaper.properties["sla:c25"]?exists>${child.whitepaper.properties["sla:c25"]}<#else>0</#if>"
				"c26_0": "<#if child.whitepaper.properties["sla:c26"]?exists>${child.whitepaper.properties["sla:c26"]}<#else>0</#if>"
				"c27_0": "<#if child.whitepaper.properties["sla:c27"]?exists>${child.whitepaper.properties["sla:c27"]}<#else>0</#if>"
			}
			<#if !(child.whitepaper == whitepapers?last.whitepaper)>,</#if>
		</#list>
	</#list>
    
}
{if $data|@count}
	{counter direction=up assign="lvl"}
	{assign var="ident" value="submenu"}
	
	{if ($lvl == 1)} {$ident = "main-menu"} {/if}
	<ul class="{$ident}">
	{foreach from=$data item=item name=menu}

		{assign var="class" value=""}

		{if $smarty.foreach.menu.first}
			{assign var="class" value="`$class` first"}
		{/if}

		{if $smarty.foreach.menu.last}
			{assign var="class" value="`$class` last"}
		{/if}

		{if $item.subMenu}
			{assign var="class" value="`$class` expanded"}
		{/if}
		{if !$item.href}
			{assign var="class" value="`$class` denied"}
		{else}
            {if $selected}
                {if $item.href == $selected.url}
                    {assign var="class" value="`$class` selected"}
                {else}
                    {if in_array($item.href, $selected.path)}
                        {assign var="class" value="`$class` onpath"}
                    {/if}
                {/if}
			{/if}
		{/if}

		<li {if $class}class="{$class} "{/if}>
			
			<a title="{$item.title}" {if $ident == 'main-menu'}href="#"{else}href="{$item.href|default:'#'}{/if}">{$item.text}<b class="fa fa-caret-right"></b></a>
			
			{if $item.subMenu}
				{include file='inc/menu_ul_responsive.tpl' data=$item.subMenu selected=$selected}
			{/if}
		</li>
	{/foreach}
	{counter direction=down}
	</ul>
{/if}

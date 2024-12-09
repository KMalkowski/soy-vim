<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from './context.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick?: (e: MouseEvent) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<div class="flex items-center gap-2">
	<Button
		type="button"
		onclick={(e) => {
			onclick?.(e);
			sidebar.toggle();
		}}
		data-sidebar="trigger"
		variant="ghost"
		size="icon"
		class={cn('h-9 w-auto items-center justify-center p-2', className)}
		{...restProps}
	>
		<PanelLeft />
		Open sidebar
		<span class="sr-only">Toggle Sidebar</span>
	</Button>
</div>

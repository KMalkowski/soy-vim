<script lang="ts">
	import { initVimMode } from 'monaco-vim';
	import type { Action } from 'svelte/action';
	import { editor } from 'monaco-editor';
	import { dracula } from '$lib/themes/dracula';
	import '$lib/monaco-config';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	const { data } = $props();

	editor.defineTheme('dracula', dracula);
	const dialogOpen = $state(true);

	const mountEditor: Action = (node) => {
		$effect(() => {
			const editorInstance = editor.create(node, {
				language: 'javascript',
				automaticLayout: true,
				lineNumbers: 'relative',
				value: data.exercise.code || '',
				theme: 'dracula',
				fontSize: 20,
				foldingStrategy: 'indentation',
				minimap: { enabled: false },
				folding: true
			});

			editorInstance.trigger('editor', 'editor.action.formatDocument', null);

			const vimMode = initVimMode(
				editorInstance,
				document.getElementsByClassName('vim-status-bar')[0] as HTMLElement
			);

			return () => {
				editorInstance.dispose();
				vimMode.dispose();
			};
		});
	};
</script>

<div use:mountEditor class="editor"></div>
<div class="vim-status-bar"></div>
<Dialog.Root open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Instructions</Dialog.Title>
			<Dialog.Description>{data.exercise.instructions}</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<style>
	.editor {
		width: 100%;
		height: calc(100vh - 4.5em);
	}

	.vim-status-bar {
		height: 1.5em;
	}
</style>

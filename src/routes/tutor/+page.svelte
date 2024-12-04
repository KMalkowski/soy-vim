<script lang="ts">
	import { initVimMode } from 'monaco-vim';
	import type { Action } from 'svelte/action';
	import { editor } from 'monaco-editor';
	import { dracula } from '../../themes/dracula';

	editor.defineTheme('dracula', dracula);

	editor.setTheme('dracula');

	const mountEditor: Action = (node) => {
		$effect(() => {
			const editorInstance = editor.create(node, {
				language: 'typescript',
				automaticLayout: true,
				lineNumbers: 'relative'
			});

			const vimMode = initVimMode(
				editorInstance,
				document.getElementsByClassName('vim-status-bar')[0]
			);
		});
	};
</script>

<div use:mountEditor class="editor"></div>
<div class="vim-status-bar"></div>

<style>
	.editor {
		width: 100%;
		height: calc(100vh - 4.5em);
	}

	.vim-status-bar {
		height: 1.5em;
	}
</style>

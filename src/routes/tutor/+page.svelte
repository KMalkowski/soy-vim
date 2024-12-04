<script lang="ts">
	import { initVimMode } from 'monaco-vim';
	import type { Action } from 'svelte/action';
	import { editor } from 'monaco-editor';

	const mountEditor: Action = (node) => {
		$effect(() => {
			const editorInstance = editor.create(node, {
				language: 'typescript',
				automaticLayout: true
			});

			const vimMode = initVimMode(
				editorInstance,
				document.getElementsByClassName('vim-status-bar')[0]
			);
		});
	};
</script>

<h1>Learn VIM motions today.</h1>
<div use:mountEditor class="editor"></div>
<div class="vim-status-bar"></div>

<style>
	.editor {
		width: 100%;
		height: 100%;
		min-height: 90vh;
	}
</style>

<script lang="ts">
	import { initVimMode } from 'monaco-vim';
	import type { Action } from 'svelte/action';
	import { editor, Position } from 'monaco-editor';
	import { dracula } from '$lib/themes/dracula';
	import '$lib/monaco-config';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { isInstructionsOpen } from './tutor-store';

	const { data } = $props();
	let currentChar = $state('');

	editor.defineTheme('dracula', dracula);

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
			const position = new Position(2, 8);
			editorInstance.setPosition(position);
			editorInstance.focus();

			const vimMode = initVimMode(
				editorInstance,
				document.getElementsByClassName('vim-status-bar')[0] as HTMLElement
			);

			editorInstance.onDidChangeCursorPosition((e) => {
				const model = editorInstance.getModel();
				if (model) {
					const position = editorInstance.getPosition();
					if (position) {
						const lineContent = model.getLineContent(position.lineNumber);
						currentChar = lineContent[position.column - 1] || '';
					}
				}
			});

			return () => {
				editorInstance.dispose();
				vimMode.dispose();
			};
		});
	};

	$effect(() => {
		if (currentChar === '#') {
			alert('o majn god, jestes glupi');
		}
	});
</script>

<div use:mountEditor class="editor"></div>
<div class="vim-status-bar"></div>

<Dialog.Root
	open={$isInstructionsOpen}
	onOpenChange={(open) => {
		$isInstructionsOpen = open;
	}}
>
	<Dialog.Content class="min-w-96">
		<Dialog.Header>
			<Dialog.Title>Instructions</Dialog.Title>
			<Dialog.Description>{@html data.exercise.instructions}</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer
			onclick={() => {
				$isInstructionsOpen = false;
			}}><Button>Let's go!</Button></Dialog.Footer
		>
	</Dialog.Content>
</Dialog.Root>

<style>
	.editor {
		height: calc(100vh - 3.5em);
		width: 100%;
	}

	.vim-status-bar {
		width: 100%;
		height: 1.5em;
		background: var(--background);
	}
</style>

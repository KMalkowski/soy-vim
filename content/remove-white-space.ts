import fs from 'fs';
import path from 'path';

const filePath = process.argv[2];

if (!filePath) {
	console.error('Please provide a file path as an argument');
	process.exit(1);
}

const fullPath = path.join('content/initial-roadmap', filePath);

try {
	const content = fs.readFileSync(fullPath, 'utf-8');

	// Replace multiple whitespaces with a single space
	const cleanedContent = content.replace(/\s+/g, ' ');

	fs.writeFileSync(fullPath, cleanedContent);
	console.log('Successfully removed extra whitespace from file');
} catch (error) {
	console.error('Error processing file:', error);
	process.exit(1);
}

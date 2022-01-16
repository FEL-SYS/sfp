import {
	formatFiles,
	generateFiles,
	joinPathFragments,
	names,
	Tree,
} from '@nrwl/devkit';
import { tsquery } from '@phenomnomnominal/tsquery';
import { TypeReferenceNode } from 'typescript';

interface CrudSchema {
	project: string;
	module: string;
	className: string;
	entity: string;
	field: string;
}

export default async function (host: Tree, schema: CrudSchema) {
	const { className, module } = schema;
	const interfaceNames = names(schema.className);
	const templatePath = joinPathFragments(__dirname, './templates');
	const targetPath = `./apps/${schema.project}/src/app/modules/${module}`;
	const substitutions = {
		hbs: 'ts',
		...schema,
	};

	generateFiles(host, templatePath, targetPath, substitutions);

	addImportToRouter(host, schema);
	modifyRouter(host, schema);

	await formatFiles(host);
}

function addImportToRouter(host: Tree, schema: CrudSchema) {
	const { className, module } = schema;
	visitAllFiles(
		host,
		`./apps/${schema.project}/src/app/config`,
		(filePath) => {
			const sourceText = `import Router = require('@koa/router');`;
			const fileEntry = host.read(filePath);
			const contents = fileEntry!.toString();

			const newContents = tsquery.replace(
				contents,
				'ImportEqualsDeclaration',
				(node) => {
					const trNode = node as TypeReferenceNode;
					if (trNode.getText() === sourceText) {
						return `${sourceText}
				import { ${className}RestHandler } from '../modules/${module}/handler/${className}RestHandler';`;
					}
					return undefined;
				}
			);
			if (newContents !== contents) {
				host.write(filePath, newContents);
			}
		}
	);
}

function modifyRouter(host: Tree, schema: CrudSchema) {
	const { className, module } = schema;
	visitAllFiles(
		host,
		`./apps/${schema.project}/src/app/config`,
		(filePath) => {
			const sourceText = 'const router = new Router();';
			const fileEntry = host.read(filePath);
			const contents = fileEntry!.toString();

			const newContents = tsquery.replace(
				contents,
				'VariableStatement',
				(node) => {
					const trNode = node as TypeReferenceNode;
					if (trNode.getText() === sourceText) {
						return `${sourceText}\n
// ${className.toUpperCase()}
router.get('/${module}/:perPage/:lastId/:sort', ${className}RestHandler.list);
router.get('/${module}/:id', ${className}RestHandler.view);
router.post('/${module}', ${className}RestHandler.create);
router.put('/${module}', ${className}RestHandler.update);
router.delete('/${module}/:id', ${className}RestHandler.delete);
				`;
					}
					return undefined;
				}
			);
			if (newContents !== contents) {
				host.write(filePath, newContents);
			}
		}
	);
}

function visitAllFiles(
	tree: Tree,
	path: string,
	callback: (filePath: string) => void
) {
	tree.children(path).forEach((fileName) => {
		const filePath = `${path}/${fileName}`;
		if (!tree.isFile(filePath)) {
			visitAllFiles(tree, filePath, callback);
		} else {
			callback(filePath);
		}
	});
}

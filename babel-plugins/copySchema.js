const fs = require("fs");
const pathUtil = require("path");
const fsExtra = require("fs-extra");
const globby = require("globby");
const rimRaf = require("rimraf");
const {loadConfig, createMatchPath} = require("tsconfig-paths");
const {resolve} = require("path");

const DIVIDER = '\n\n\n************************************************\n\n\n';
module.exports = function (options) {
	// places to look for schema
	const rootTarget = pathUtil.join(
		options.cwd,
		"node_modules",
		"@sprucelabs",
		"schema"
	);

	for (const pkg of ["spruce-cli", "spruce-templates"]) {
		const cwd = pathUtil.join(options.cwd, "packages", pkg);

		const destination = pathUtil.join(
			cwd,
			"node_modules",
			"@sprucelabs",
			"schema"
		);
	
		const schemaNodeModules = pathUtil.join(destination, "node_modules");

		// clear out destination if it exists
		if (fs.existsSync(destination)) {
			rimRaf.sync(schemaNodeModules);
		}

		// copy schema over
		fsExtra.copySync(rootTarget, destination);

		// clear out schemas' node_modules
		if (fs.existsSync(schemaNodeModules)) {
			rimRaf.sync(schemaNodeModules);
		}

		// now map paths to the new schema
		const config = loadConfig(cwd);
		const {absoluteBaseUrl, paths} = config;
		const resolver = createMatchPath(absoluteBaseUrl, paths);
		const files = globby.sync(pathUtil.join(destination, "**/*.js"));
		
		files.forEach((file) => {
			let contents = fs.readFileSync(file);
			let found = false;

			contents = `${contents}`.replace(/"#spruce\/(.*?)"/gi, (match) => {
				found = true;
				const search = match.replace(/"/g, "");
				const resolved = resolver(search);
				if (!resolved) {
					throw new Error(`Could not map ${search}.`);
				}
				return `"${resolved}"`;
			});

			if (found) {
				fs.writeFileSync(file, contents);
			}

		});

	}
};

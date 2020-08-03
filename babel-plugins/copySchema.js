const fs = require("fs");
const pathUtil = require("path");
const fsExtra = require("fs-extra");
const globby = require("globby");
const rimRaf = require("rimraf");
const { loadConfig, createMatchPath } = require("tsconfig-paths");

function assert(truthy, message) {
	if (!truthy) {
		throw new Error(message);
	}
}

const DIVIDER = "\n\n\n************************************************\n\n\n";
module.exports = function (options) {
	assert(
		options.cwd,
		"You must pass options.cwd. This is where I'll look for the schema module (root of workspace if in monorepo)"
	);
	assert(
		options.destination,
		"You need to pass a options.destination (sub project if mono repo)"
	);

	// places to look for schema
	const target = pathUtil.join(
		options.cwd,
		"node_modules",
		"@sprucelabs",
		"schema"
	);

	const destination = pathUtil.join(
		options.destination,
		"node_modules",
		"@sprucelabs",
		"schema"
	);

	const schemaNodeModules = pathUtil.join(destination, "node_modules");

	// clear out destination if it exists (and does not match the target)
	if (target !== destination) {
		if (fs.existsSync(destination)) {
			rimRaf.sync(schemaNodeModules);
		}

		// copy schema over
		fsExtra.copySync(target, destination);
	}

	// clear out schemas' node_modules
	if (fs.existsSync(schemaNodeModules)) {
		rimRaf.sync(schemaNodeModules);
	}

	// now map paths to the new schema
	const config = loadConfig(destination);
	const { absoluteBaseUrl, paths } = config;
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
};

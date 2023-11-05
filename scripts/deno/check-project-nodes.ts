const { warn, log } = console;

const nvmrc = (
	await Deno.readTextFile(new URL(import.meta.resolve('../../.nvmrc')))
)
	// We don’t care about leading or trailing whitespace
	.trim();

/** Matches `x.y.z` pattern */
const nodeVersionPattern = /^\d+\.\d+\.\d+$/;
const nodeVersion = nvmrc.match(nodeVersionPattern)?.[0] ?? undefined;

if (!nodeVersion) {
	warn(
		'Node version in .nvmrc has incorrect pattern:',
		`\`${nvmrc}\` does not match \`x.y.z\``,
	);
	Deno.exit(1);
} else {
	log(`Found node version ${nodeVersion} in \`.nvmrc\``);
}

const requiredNodeVersionMatches =
	/** @type {const} @satisfies {ReadonlyArray<{filepath: string, pattern: RegExp}>}*/ [
		{
			filepath: 'dotcom-rendering/Containerfile',
			pattern: /^FROM node:(.+)-alpine$/m,
		},
		{
			filepath: 'dotcom-rendering/scripts/deploy/riff-raff.yaml',
			pattern: /^ +Recipe: dotcom-rendering.*-node-(\d+\.\d+\.\d+)$/m,
		},
		{
			filepath: 'apps-rendering/riff-raff.yaml',
			pattern: /^ +Recipe: .+-mobile-node(\d+\.\d+\.\d+).*$/m,
		},
	];

const problems = (
	await Promise.all(
		requiredNodeVersionMatches.map(async ({ filepath, pattern }) => {
			const fileContents = await Deno.readTextFile(
				new URL(import.meta.resolve('../../' + filepath)),
			);
			const foundNodeVersion =
				fileContents.match(pattern)?.[1] ?? undefined;

			return foundNodeVersion === nodeVersion
				? undefined
				: `Node version in ${filepath} (${foundNodeVersion}) does not match \`.nvmrc\` (${nodeVersion})`;
		}),
	)
).filter(
	/** @type {(problem?: string) => problem is string} */
	(problem) => !!problem,
);

if (problems.length === 0) {
	log(
		`All ${requiredNodeVersionMatches.length} checked files use the correct Node version`,
	);
	Deno.exit(0);
} else {
	for (const problem of problems) {
		warn(problem);
	}
	Deno.exit(1);
}

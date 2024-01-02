import * as dotenv from 'dotenv';
import * as util from 'util';
import * as childProcess from 'child_process';

const exec: (command: string) => Promise<void> = async (command: string) => {
	const { stdout, stderr } = await util.promisify(childProcess.exec)(command);
	console.log(stdout);
	console.error(stderr);
};

dotenv.config();

const main = async () => {
	try {
		await exec(
			`supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > src/libs/supabase.types.ts`
		);
	} catch (e) {
		console.error(e);
	}
};

main();

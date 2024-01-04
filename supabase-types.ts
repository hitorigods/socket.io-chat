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
			`supabase gen types typescript --db-url ${process.env.DATABASE_URL} > ${process.env.SUPABASE_TYPES_PATH}`
			/** ローカル版ではDB URLの指定で取得できたので、以前のクラウド版前提だったプロジェクトID指定はやめた */
			// `supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > src/libs/supabase.types.ts`
		);
	} catch (e) {
		console.error(e);
	}
};

main();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * chatテーブルの初期データを作成する
 */
async function chatCreate() {
	const chats = [
		{
			title: 'Test Chat 01',
			published: true,
		},
		{
			title: 'Test Chat 02',
			published: false,
		},
		{
			title: 'Test Chat 03',
			published: false,
		},
	] as any[];

	for (const chat of chats) {
		await prisma.chat.create({
			data: chat,
		});
	}
}

/**
 * メイン処理
 */
async function main() {
	await prisma.chat.deleteMany();
	await chatCreate();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

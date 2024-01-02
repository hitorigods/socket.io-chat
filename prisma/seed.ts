import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * userテーブルの初期データを作成する
 */
async function usersCreate() {
	const users: Prisma.userCreateInput[] = [
		{
			email: 'test01@test.com',
			password: bcrypt.hashSync('test01', 8),
		},
		{
			email: 'test02@test.com',
			password: bcrypt.hashSync('test02', 8),
		},
		{
			email: 'test03@test.com',
			password: bcrypt.hashSync('test03', 8),
		},
	];

	const createdUsers = [];
	for (const user of users) {
		createdUsers.push(await prisma.user.create({ data: user }));
	}
	return createdUsers;
}

/**
 * chatテーブルの初期データを作成する
 */
async function chatCreate(user_ids: string[]) {
	const chats: Prisma.chatCreateInput[] = [
		{
			title: 'Test Chat 01',
			published: true,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 02',
			published: false,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 03',
			published: false,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 04',
			published: false,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 05',
			published: false,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 06',
			published: true,
			// user_id: user_ids[1],
		},
		{
			title: 'Test Chat 07',
			published: true,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 08',
			published: true,
			// user_id: user_ids[1],
		},
		{
			title: 'Test Chat 09',
			published: true,
			// user_id: user_ids[0],
		},
		{
			title: 'Test Chat 10 Test Chat 10 Test Chat 10',
			published: true,
			// user_id: user_ids[1],
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
	await prisma.user.deleteMany();

	const users = await usersCreate();
	const user_ids = users.map((user) => user.id);
	await chatCreate(user_ids);
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

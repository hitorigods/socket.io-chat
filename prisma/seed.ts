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
 * messageテーブルの初期データを作成する
 */
async function messageCreate(userIds: string[]) {
	const messages: Prisma.messageCreateInput[] = [
		{
			title: 'Test Message 01',
			published: true,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 02',
			published: false,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 03',
			published: false,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 04',
			published: false,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 05',
			published: false,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 06',
			published: true,
			user_id: userIds[1],
		},
		{
			title: 'Test Message 07',
			published: true,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 08',
			published: true,
			user_id: userIds[1],
		},
		{
			title: 'Test Message 09',
			published: true,
			user_id: userIds[0],
		},
		{
			title: 'Test Message 10 Test Message 10 Test Message 10',
			published: true,
			user_id: userIds[1],
		},
	];

	for (const message of messages) {
		await prisma.message.create({
			data: message,
		});
	}
}

/**
 * メイン処理
 */
async function main() {
	await prisma.message.deleteMany();
	await prisma.user.deleteMany();

	const users = await usersCreate();
	const user_ids = users.map((user) => user.id);
	await messageCreate(user_ids);
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

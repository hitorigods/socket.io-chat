import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Userテーブルの初期データを作成する
 */
async function usersCreate() {
	const users: Prisma.UserCreateInput[] = [
		{
			email: 'test01@test.com',
			name: 'testuser01',
			password: bcrypt.hashSync('test01', 8),
		},
		{
			email: 'test02@test.com',
			name: 'testuser02',
			password: bcrypt.hashSync('test02', 8),
		},
		{
			email: 'test03@test.com',
			name: 'testuser03',
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
 * Profileテーブルの初期データを作成する
 */
async function profileCreate() {
	const profiles: Prisma.ProfileCreateInput[] = [
		{
			avaterUrl: 'http://localhost:3000/avater/avater01.png',
			displayName: 'Test User 01',
			user: {
				connect: { email: 'test01@test.com' },
			},
		},
		{
			avaterUrl: 'http://localhost:3000/avater/avater02.png',
			displayName: 'Test User 02',
			user: {
				connect: { email: 'test02@test.com' },
			},
		},
		{
			avaterUrl: 'http://localhost:3000/avater/avater03.png',
			displayName: 'Test User 03',
			user: {
				connect: { email: 'test03@test.com' },
			},
		},
	];

	for (const profile of profiles) {
		await prisma.profile.create({
			data: profile,
		});
	}
}

/**
 * Roomテーブルの初期データを作成する
 */
async function roomCreate() {
	const rooms: Prisma.RoomCreateInput[] = [
		{
			title: 'Test Room 01',
			published: true,
		},
		{
			title: 'Test Room 02',
			published: false,
		},
		{
			title: 'Test Room 03',
			published: true,
		},
	];

	const createdRooms = [];
	for (const room of rooms) {
		createdRooms.push(await prisma.room.create({ data: room }));
	}
	return createdRooms;
}

/**
 * Messageテーブルの初期データを作成する
 */
async function messageCreate(userIds: string[], roomIds: string[]) {
	const messages: Prisma.MessageCreateInput[] = [
		{
			title: 'Test Message 01',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 02',
			published: true,
			user: {
				connect: { id: userIds[1] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 03',
			published: true,
			user: {
				connect: { id: userIds[2] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 04',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[1] },
			},
		},
		{
			title: 'Test Message 05',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[1] },
			},
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
	await prisma.room.deleteMany();
	await prisma.profile.deleteMany();
	await prisma.user.deleteMany();

	const users = await usersCreate();
	await profileCreate();
	const rooms = await roomCreate();
	if (rooms) {
		const user_ids = users.map((user) => user.id);
		const room_ids = rooms.map((room) => room.id);
		await messageCreate(user_ids, room_ids);
	} else {
		console.error('Room creation failed');
	}
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

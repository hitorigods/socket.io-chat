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
async function profileCreate(userIds: string[]) {
	const profiles: Prisma.ProfileCreateInput[] = [
		{
			avaterUrl: 'http://localhost:3000/avater/avater01.png',
			displayName: 'Test User 01',
			user: {
				connect: { id: userIds[0] },
			},
		},
		{
			avaterUrl: 'http://localhost:3000/avater/avater02.png',
			displayName: 'Test User 02',
			user: {
				connect: { id: userIds[1] },
			},
		},
		{
			avaterUrl: 'http://localhost:3000/avater/avater03.png',
			displayName: 'Test User 03',
			user: {
				connect: { id: userIds[2] },
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
			published: false,
			user: {
				connect: { id: userIds[1] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 03',
			published: false,
			user: {
				connect: { id: userIds[2] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 04',
			published: false,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[1] },
			},
		},
		{
			title: 'Test Message 05',
			published: false,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[1] },
			},
		},
		{
			title: 'Test Message 06',
			published: true,
			user: {
				connect: { id: userIds[1] },
			},
			room: {
				connect: { id: roomIds[1] },
			},
		},
		{
			title: 'Test Message 07',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 08',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 09',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[0] },
			},
		},
		{
			title: 'Test Message 10 Test Message 10 Test Message 10',
			published: true,
			user: {
				connect: { id: userIds[0] },
			},
			room: {
				connect: { id: roomIds[0] },
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
	const user_ids = users.map((user) => user.id);
	await profileCreate(user_ids);
	const rooms = await roomCreate();
	if (rooms) {
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

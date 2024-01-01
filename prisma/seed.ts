import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();

	const users: Prisma.UserCreateInput[] = [
		{
			email: 'test01@test.com',
			name: 'testuser01',
			// password: hashSync('test01', 8),
		},
		{
			email: 'test02@test.com',
			name: 'testuser02',
			// password: hashSync('test02', 8),
		},
		{
			email: 'test03@test.com',
			name: 'testuser03',
			// password: hashSync('test03', 8),
		},
	];

	for (const user of users) {
		await prisma.user.create({
			data: user,
		});
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

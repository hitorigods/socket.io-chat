import { z } from 'zod';
import { SetStateAction } from 'jotai';

const userSchema = z
	.object({
		id: z.string().uuid(),
		nickname: z.string().max(20),
		avatarUrl: z.string().url().nullable(),
		Profile_id: z.string().uuid(),
	})
	.nullable();

export type UserSchema = z.infer<typeof userSchema>;

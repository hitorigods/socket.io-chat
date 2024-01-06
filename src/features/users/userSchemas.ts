import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { SetAtom } from '@/stores/atomTypes';

const userSchema = z.object({
	id: z.string().uuid(),
	nickname: z.string().max(20),
	avatarUrl: z.string().url().nullable(),
	Profile_id: z.string().uuid(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type SetUserSchema = SetAtom<[SetStateAction<UserSchema[]>], void>;

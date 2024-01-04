import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { SetAtom } from '@/types/atom';

const userSchema = z.object({
	id: z.string(),
	nickname: z.string(),
	avatarUrl: z.string(),
	profile_id: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type SetUserSchema = SetAtom<[SetStateAction<UserSchema[]>], void>;

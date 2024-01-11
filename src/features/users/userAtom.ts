import { atom } from 'jotai';

import { UserSchema } from '@/features/users/userSchemas';

// サインインユーザー情報
export const userAtom = atom(null as UserSchema);
userAtom.debugLabel = 'userAtom';

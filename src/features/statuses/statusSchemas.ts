import { z } from 'zod';
import { SetStateAction } from 'jotai';

const statusSchema = z.array(
	z.object({
		type: z.enum(['update', 'error']),
		message: z.string(),
	})
);

export type StatusSchema = z.infer<typeof statusSchema>;

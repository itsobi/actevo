'use server';

import { signIn, signOut } from '@/auth';

export const signInAction = async (provider: string) => {
  await signIn(provider);
};

export const signOutAction = async () => {
  await signOut();
};

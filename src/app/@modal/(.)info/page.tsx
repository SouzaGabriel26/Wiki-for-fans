import { getServerSession } from 'next-auth';

import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import Modal from '@/components/Modal';
import { NavigateBack } from '@/components/NavigateBack';

export default async function Page() {
  const session = await getServerSession();

  return (
    <Modal>
      <h2 className="text-2xl font-bold">Informations</h2>
      <p>
        This is a wiki for fans. You can create, edit, delete{' '}
        <strong>series</strong> and their <strong>characters</strong>.
      </p>

      {!session && <p>To get started, sign in with your Google account.</p>}

      <p>You can also sign out if you want to.</p>

      <div className="flex h-9 items-center justify-center gap-2">
        <NavigateBack className="strong border-slate h-full w-fit rounded-lg border px-4 transition-colors hover:bg-slate-300">
          Ok
        </NavigateBack>

        {!session && (
          <GoogleSignInButton className="h-full py-2">
            Sign in
          </GoogleSignInButton>
        )}
      </div>
    </Modal>
  );
}

import { GoogleButton } from './GoogleSignInButton';

export function Login() {
  return (
    <section className="flex h-full flex-col bg-slate-200">
      <header className="bg-slate-800 p-4 text-center font-bold text-white">
        Wiki for fans
      </header>
      <div className="grid flex-1 place-content-center">
        <GoogleButton type="signin" />
      </div>
    </section>
  );
}

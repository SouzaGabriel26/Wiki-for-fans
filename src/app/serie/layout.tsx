import { Wrapper } from '@/components/Wrapper';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-200">
      <Wrapper className="relative">{children}</Wrapper>
    </div>
  );
}

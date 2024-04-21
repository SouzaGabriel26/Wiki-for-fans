import { Header } from '@/components/Header';
import { Wrapper } from '@/components/Wrapper';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full flex-col bg-slate-200">
      <Header title="Serie form" />
      <Wrapper className="relative">{children}</Wrapper>
    </div>
  );
}

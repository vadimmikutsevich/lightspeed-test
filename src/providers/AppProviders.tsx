import LazyMotionProvider from "./LazyMotionProvider";
import QueryProvider from "./QueryClientProvider";

interface Props {
  children: React.ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <QueryProvider>
      <LazyMotionProvider>{children}</LazyMotionProvider>
    </QueryProvider>
  );
}

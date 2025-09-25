import { LazyMotion, domAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function LazyMotionProvider({ children }: Props) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

import clsx from "clsx";

interface Props {
  className?: string;
}

export function Loader({ className }: Props) {
  return (
    <div
      className={clsx("flex items-center justify-center h-full p-2", className)}
    >
      <div className="loader" />
    </div>
  );
}

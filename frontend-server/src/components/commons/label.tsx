interface IProps {
  children: React.ReactNode;
  className?: string;
}
export default function Label({ children, className }: IProps) {
  return <label className={`text-gray-700 ${className}`}>{children}</label>;
}

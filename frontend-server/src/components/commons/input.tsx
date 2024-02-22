interface IProps {
  className?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  className,
  type,
  placeholder,
  name,
  value,
  onChange,
}: IProps) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

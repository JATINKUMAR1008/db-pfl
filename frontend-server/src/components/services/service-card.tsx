import Image from "next/image";
import Link from "next/link";
interface IProps {
  props: {
    image_url: string;
    name: string;
    description: string;
    type: string;
  };
}
export default function ServiceCard({ props }: IProps) {
  return (
    <Link
      href={`new-service?serviceType=${props.type}`}
      className="max-w-[350px]  cursor-pointer hover:border-blue-700 min-h-[100px] flex gap-2 flex-row items-start w-full h-full px-3 py-4 border border-gray-200"
    >
      <Image width={40} height={40} src={props.image_url} alt="service icon" />
      <div className="w-full h-full flex flex-col items-start gap-1">
        <h3 className="text-md font-semibold text-black">{props.name}</h3>
        <p className="text-gray-800 text-xs">{props.description}</p>
      </div>
    </Link>
  );
}

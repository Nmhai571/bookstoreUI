import { IconType } from "react-icons";

interface Props {
	Icon: IconType;
	title: string;
	description: string;
}

export default function ServiceItem({ Icon, title, description }: Props) {
	return (
		<div className="flex gap-5">
			<div className="bg-purple-100 w-16 h-16 flex-center rounded-md shrink-0">
				<Icon size={24} className="text-purple-600" />
			</div>
			<div className="flex flex-col gap-2">
				<h5>{title}</h5>
				<p className="text-gray-500 text-sm">{description}</p>
			</div>
		</div>
	);
}

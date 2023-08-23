import { BsFillStarFill } from "react-icons/bs";

interface Props {
	type: string;
	value: number;
}

export default function RatingProgress({ type, value }: Props) {
	return (
		<div className="gap-2 flex-center-y">
			<div className="gap-2 font-bold flex-center-y">
				<BsFillStarFill className="fill-secondary" /> {type}
			</div>
			<progress className="progress progress-primary" value={value} max={100} />
			<p className="font-bold">{Math.round(value)}%</p>
		</div>
	);
}

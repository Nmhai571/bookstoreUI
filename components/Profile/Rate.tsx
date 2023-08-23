import { Dispatch, SetStateAction } from "react";

interface Props {
	value: number;
	onChange: Dispatch<SetStateAction<number>>;
}

export default function Rate({ value, onChange }: Props) {
	return (
		<div className="rating">
			<input
				type="radio"
				name="rating-2"
				className="bg-orange-400 mask mask-star-2"
				value={1}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
			<input
				type="radio"
				name="rating-2"
				className="bg-orange-400 mask mask-star-2"
				value={2}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
			<input
				type="radio"
				name="rating-2"
				className="bg-orange-400 mask mask-star-2"
				value={3}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
			<input
				type="radio"
				name="rating-2"
				className="bg-orange-400 mask mask-star-2"
				value={4}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
			<input
				type="radio"
				name="rating-2"
				className="bg-orange-400 mask mask-star-2"
				value={5}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
		</div>
	);
}

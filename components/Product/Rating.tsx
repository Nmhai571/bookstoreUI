interface Props {
	className?: string;
	disabled?: boolean;
}

export default function Rating({ className, disabled }: Props) {
	return (
		<div className={`${className ? className + " " : ""}rating rating-half`}>
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-1" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-2" disabled={disabled} />
			<input
				type="radio"
				className="bg-secondary mask mask-star-2 mask-half-1"
				defaultChecked
				disabled={disabled}
			/>
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-2" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-1" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-2" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-1" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-2" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-1" disabled={disabled} />
			<input type="radio" className="bg-secondary mask mask-star-2 mask-half-2" disabled={disabled} />
		</div>
	);
}

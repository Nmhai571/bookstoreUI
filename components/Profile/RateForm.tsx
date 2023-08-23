import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { iUserAddress } from "../../models/user.model";
import Rating from "../Product/Rating";
import Rate from "./Rate";
import { useAppDispatch } from "../../app/store";
import { userRate } from "../../reducers/userActions";

interface Props {
	isOpen: boolean;
	orderId: string;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RateForm({ orderId, isOpen, setIsOpen }: Props) {
	const dispatch = useAppDispatch();
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");
	const handleSubmit = async () => {
		const data = {
			orderId,
			comment,
		};
		await dispatch(
			userRate({
				comment,
				orderId,
			})
		);
		// setIsOpen(false);
	};
	return (
		<>
			<Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center">
					<Dialog.Panel className="w-full max-w-md p-4 space-y-4 bg-white rounded">
						<Dialog.Title>Rate for order</Dialog.Title>
						<textarea
							className="w-full textarea textarea-bordered"
							placeholder="Write your review"
							maxLength={200}
							onChange={(e) => setComment(e.target.value)}
						/>
						<div className="space-y-2">
							<button className="text-white btn btn-primary btn-block" onClick={handleSubmit}>
								Submit
							</button>
							<button
								className="text-white btn btn-error btn-block"
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	);
}

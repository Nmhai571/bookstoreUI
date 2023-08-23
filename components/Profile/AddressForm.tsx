import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { iUserAddress } from "../../models/user.model";

interface Props {
	address: any;
	setAddress: Dispatch<SetStateAction<any>>;
	provinces: any[];
	districts: any[];
	wards: any[];
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onSubmit: any;
	addressUpdate: iUserAddress;
}

export default function AddressForm({
	address,
	setAddress,
	provinces,
	districts,
	wards,
	isOpen,
	setIsOpen,
	onSubmit,
	addressUpdate,
}: Props) {
	const handleChange = (type: string) => (event: any) => {
		setAddress({ ...address, [type]: +event.target.value });
	};
	const handleSubmit = () => {
		onSubmit(address);
		setIsOpen(false);
	};

	return (
		<>
			<Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center">
					<Dialog.Panel className="w-full max-w-md p-4 space-y-4 bg-white rounded">
						<Dialog.Title>Add new address</Dialog.Title>
						<div className="space-y-2">
							<select
								className="w-full select select-bordered"
								defaultValue={-1}
								onChange={handleChange("province")}
							>
								<option disabled value={-1}>
									Province
								</option>
								{provinces.map((province) => (
									<option key={province.code} value={province.code}>
										{province.name}
									</option>
								))}
							</select>
							<select
								className="w-full select select-bordered"
								disabled={!address.province}
								defaultValue={-1}
								onChange={handleChange("district")}
							>
								<option disabled value={-1}>
									District
								</option>
								{districts.map((district) => (
									<option key={district.code} value={district.code}>
										{district.name}
									</option>
								))}
							</select>
							<select
								className="w-full select select-bordered"
								defaultValue={-1}
								disabled={!address.district}
								onChange={handleChange("ward")}
							>
								<option disabled value={-1}>
									Ward
								</option>
								{wards.map((ward) => (
									<option key={ward.code} value={ward.code}>
										{ward.name}
									</option>
								))}
							</select>
							<textarea
								className="w-full textarea textarea-bordered"
								placeholder="More Info"
								defaultValue={addressUpdate ? addressUpdate.other : ""}
								onChange={(event) => setAddress({ ...address, other: event.target.value })}
							/>
						</div>
						<div className="space-y-2">
							<button
								className="text-white btn btn-primary btn-block"
								disabled={!address.district || !address.province || !address.ward}
								onClick={handleSubmit}
							>
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

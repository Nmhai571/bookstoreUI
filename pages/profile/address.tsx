import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { addressApi } from "../../apis/addressApi";
import { userApi } from "../../apis/userApi";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Profile from "../../components/Profile";
import AddressForm from "../../components/Profile/AddressForm";
import AddressItem from "../../components/Profile/AddressItem";
import { iUserAddress } from "../../models/user.model";
import { userCreateAddress, userUpdateAddress } from "../../reducers/userActions";
import { selectUser } from "../../reducers/userSlice";
import { NextPageWithLayout } from "../_app";
const Address: NextPageWithLayout = () => {
	const dispatch = useAppDispatch();
	const sUser = useAppSelector(selectUser);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [addressInput, setAddressInput] = useState({
		province: null,
		district: null,
		ward: null,
		other: "",
	});
	const [addressUpdate, setAddressUpdate] = useState<any | iUserAddress>(null);
	const [isOpen, setIsOpen] = useState(false);
	const handleSubmit = async (address: iUserAddress) => {
		if (addressUpdate) {
			await dispatch(
				userUpdateAddress({
					_id: addressUpdate._id,
					...address,
				})
			);
			setAddressUpdate(null);
		} else {
			await dispatch(userCreateAddress(address));
			setAddressInput({
				province: null,
				district: null,
				ward: null,
				other: "",
			});
		}
		setIsOpen(false);
	};
	useEffect(() => {
		async function fetchProvince() {
			const response = await addressApi.getAllProvinces();
			setProvinces(response.data);
		}
		if (provinces.length === 0) fetchProvince();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addressInput.province]);
	useEffect(() => {
		async function fetchDistrict() {
			if (typeof addressInput.province === "number") {
				const response = await addressApi.getDistrictsByProvince(addressInput.province);
				setDistricts(response.data);
			}
		}
		fetchDistrict();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addressInput.province]);
	useEffect(() => {
		async function fetchWard() {
			if (typeof addressInput.district === "number") {
				const response = await addressApi.getWardsByDistrict(addressInput.district);
				setWards(response.data);
			}
		}
		fetchWard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addressInput.district]);
	const handleOpenCreateAddress = () => {
		setAddressUpdate(null);
		setIsOpen(true);
	};
	const handleEdit = (address: iUserAddress) => {
		setAddressUpdate(address);
		setIsOpen(true);
	};
	return (
		<div className="space-y-8">
			<button className="gap-2 btn btn-primary btn-block" onClick={handleOpenCreateAddress}>
				<BsPlus size={20} /> Add new address
			</button>
			<AddressForm
				address={addressInput}
				setAddress={setAddressInput}
				provinces={provinces}
				districts={districts}
				wards={wards}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				onSubmit={handleSubmit}
				addressUpdate={addressUpdate}
			/>
			<div className="space-y-4">
				{sUser.address.map((address) => (
					<AddressItem key={address._id} address={address} onEdit={handleEdit} />
				))}
			</div>
		</div>
	);
};
Address.getLayout = function getLayout(page) {
	return <Profile>{page}</Profile>;
};

Address.requireAuth = true;
export default Address;

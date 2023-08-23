import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BsWallet, BsPaypal } from "react-icons/bs";
import Image from "next/image";
import { iUserAddress } from "../../models/user.model";
import { addressApi } from "../../apis/addressApi";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectUser } from "../../reducers/userSlice";
import PaypalButton from "./PaypalButton";
import axios from "axios";
import { selectCart } from "../../reducers/cartSlice";
import { orderApi } from "../../apis/orderApi";
import { userCreateOrder } from "../../reducers/cartActions";
import { useRouter } from "next/router";
import APP_PATH from "../../PATH";

function Step2() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const sUser = useAppSelector(selectUser);
	const sCart = useAppSelector(selectCart);
	const [paymentMethod, setPaymentMethod] = useState("cash");
	const handleCheckOut = async () => {
		const order = {
			info: {
				address: orderInfo.address,
				phone: orderInfo.phone,
				note: orderInfo.note,
			},
			products: sCart.cart.map((item) => ({
				product: item._id,
				quantity: item.quantity,
				price: item.price.priceFinal,
			})),
			price: {
				voucher: {
					discount: sCart.price.voucher
						? Math.abs(sCart.price.total - (sCart.price.subtotal + sCart.price.fee))
						: 0,
					code: sCart?.price?.voucher?.code || "",
				},
				subtotal: sCart.price.subtotal,
				total: sCart.price.total,
				shipping: sCart.price.fee,
			},
			payment: paymentMethod,
		};
		try {
			await dispatch(userCreateOrder(order));
			router.push(APP_PATH.PROFILE_ORDER);
		} catch (error) {
			return;
		}
	};
	const [orderInfo, setOrderInfo] = useState({
		phone: "01234",
		address: "-1",
		note: "",
	});
	const handleChange = (e: any) => {
		setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
	};
	return (
		<div
			className={`grid w-full ${
				!orderInfo.address || !orderInfo.phone ? "grid-col-1" : "grid-cols-2"
			} gap-10 xl:grid-cols-1`}
		>
			<div className="">
				<h2>Info</h2>
				<form className="mt-4 space-y-4">
					<div className="w-full form-control">
						<label className="label">
							<span className="label-text">Address</span>
						</label>
						<select
							className="w-full select select-bordered"
							name="address"
							defaultValue={-1}
							onChange={handleChange}
						>
							<option value={-1} disabled>
								Select address
							</option>
							{sUser.address.map((address: iUserAddress) => (
								<AddressOption key={address._id} address={address} />
							))}
						</select>
					</div>
					<div className="flex gap-4">
						<div className="w-full form-control">
							<label className="label">
								<span className="label-text">Phone</span>
							</label>
							<input
								type="text"
								placeholder="info@site.com"
								className="input input-bordered"
								name="phone"
								value={orderInfo.phone}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="w-full form-control">
						<label className="label">
							<span className="label-text">Note</span>
						</label>
						<textarea
							className="textarea textarea-bordered"
							placeholder="Note"
							name="note"
							value={orderInfo.note}
							onChange={handleChange}
						></textarea>
					</div>
				</form>
			</div>
			{orderInfo.address && orderInfo.phone && (
				<div className="">
					<h2>Payment</h2>
					<div className="mt-4">
						<RadioGroup
							className="grid grid-cols-3 gap-4"
							value={paymentMethod}
							onChange={setPaymentMethod}
						>
							<RadioGroup.Option value="cash">
								{({ checked }) => (
									<div
										className={`cursor-pointer p-4 flex-col-center gap-4 rounded-box border border-slate-200${
											checked ? " text-primary bg-gray-50" : ""
										}`}
									>
										<BsWallet size={40} />
										<p className="font-bold text-center">Cash on Delivery</p>
									</div>
								)}
							</RadioGroup.Option>
							<RadioGroup.Option value="paypal">
								{({ checked }) => (
									<div
										className={`cursor-pointer p-4 flex-col-center gap-4 rounded-box border border-slate-200${
											checked ? " text-primary bg-gray-50" : ""
										}`}
									>
										<BsPaypal size={40} />
										<p className="font-bold text-center">Paypal</p>
									</div>
								)}
							</RadioGroup.Option>
							<RadioGroup.Option value="momo">
								{({ checked }) => (
									<div
										className={`cursor-pointer p-4 flex-col-center gap-4 rounded-box border border-slate-200${
											checked ? " text-primary bg-gray-50" : ""
										}`}
									>
										<Image
											className={`rounded-md ${
												!checked ? "grayscale" : "hue-rotate-[325deg]"
											}`}
											src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bHjHnPSDXgBS2WSVOAm57BdPvoAmwBMcqXwjTGUiiJGYrkvUZuVgZHXeZJWWX7kLlCg&usqp=CAU"
											alt="momo"
											width={40}
											height={40}
										/>
										<p className="font-bold text-center">Momo</p>
									</div>
								)}
							</RadioGroup.Option>
						</RadioGroup>
					</div>
					{paymentMethod === "cash" && (
						<button className="mt-4 btn-block btn btn-primary" onClick={handleCheckOut}>
							Checkout
						</button>
					)}
					{paymentMethod === "paypal" && (
						<>
							<PaypalButton
								onSuccess={handleCheckOut}
								address={{
									address: orderInfo.address,
									phone: orderInfo.phone,
									note: orderInfo.note,
								}}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Step2;

interface iAddressOption {
	address: iUserAddress;
}

const AddressOption = ({ address }: iAddressOption) => {
	const [data, setData] = useState<any>({
		province: null,
		district: null,
		ward: null,
		other: "",
	});
	useEffect(() => {
		const getData = async () =>
			Promise.all([
				addressApi.getProvinceByCode(address.province),
				addressApi.getDistrictByCode(address.district),
				addressApi.getWardByCode(address.ward),
			]).then(([provinces, districts, wards]) => {
				setData({
					province: provinces.data,
					district: districts.data,
					ward: wards.data,
					other: address.other,
				});
			});
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		data.province &&
		data.district &&
		data.ward && (
			<option value={data._id}>
				{data.province.name} - {data.district.name} - {data.ward.name} - {data.other}
			</option>
		)
	);
};

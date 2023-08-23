import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { removeVoucher, selectCart, updateAddress } from "../../reducers/cartSlice";
import calculateVoucher from "../../utils/cartUtils";
import { voucherApi } from "../../apis/voucherApi";
import { cartAddCoupon } from "../../reducers/cartActions";
import { useAppDispatch } from "../../app/store";

interface Props {
	setStep: Dispatch<SetStateAction<number>>;
}

function Step1({ setStep }: Props) {
	const dispatch = useAppDispatch();
	const sCart = useSelector(selectCart);
	const [voucher, setVoucher] = useState<string>(sCart.price?.voucher?.code || "");
	const handleRemove = () => {
		dispatch(removeVoucher());

		setVoucher("");
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(cartAddCoupon(voucher));
	};
	const handleNext = async () => {
		setStep((pre) => pre + 1);
	};
	return (
		<>
			<div className="w-full overflow-x-auto">
				<table className="table w-full table-normal">
					<thead>
						<tr>
							<th className="relative text-base font-bold text-center">Sản phẩm</th>
							<th className="text-base font-bold text-center">Giá</th>
							<th className="text-base font-bold text-center">Số lượng</th>
							<th className="text-base font-bold text-center">Đơn giá</th>
							<th className="text-base font-bold text-center">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{sCart.cart?.map((item, index) => (
							<CartItem data={item} key={index} />
						))}
					</tbody>
				</table>
			</div>
			<div className="flex flex-wrap justify-between w-full gap-8">
				<div className="flex-1 max-w-md">
					<div className="form-control">
						<form className="input-group" onSubmit={handleSubmit}>
							<input
								value={voucher}
								type="text"
								placeholder="Coupon"
								className="flex-1 font-semibold input input-bordered"
								onChange={(e) => setVoucher(e.target.value.toUpperCase())}
								maxLength={6}
								disabled={sCart.price.voucher}
							/>
							{sCart.price.voucher ? (
								<button
									className="text-white btn btn-error"
									type="button"
									onClick={handleRemove}
								>
									Xoá
								</button>
							) : (
								<button className="btn btn-primary" type="submit">
									Áp dụng
								</button>
							)}
						</form>
					</div>
				</div>
				<div className="flex-1 max-w-md">
					<div>
						<div className="flex justify-between py-2">
							<p className="font-semibold">Tổng phụ</p>
							<p>${sCart.price.subtotal}</p>
						</div>
						<div className="flex justify-between py-2">
							<p className="font-semibold">Phụ phí</p>
							<p>${sCart.price.fee}</p>
						</div>
						{sCart.price.voucher && (
							<div className="flex justify-between py-2">
								<p className="font-semibold">Voucher</p>
								<p>${calculateVoucher(sCart.price.subtotal, sCart.price.voucher)}</p>
							</div>
						)}
						<div className="m-1 divider"></div>
						<div className="flex justify-between py-2">
							<p className="font-semibold">Tổng</p>
							<p>${sCart.price.total}</p>
						</div>
					</div>
					<button className="btn-block btn btn-primary" onClick={handleNext}>
						Xác nhận
					</button>
				</div>
			</div>
		</>
	);
}

export default Step1;

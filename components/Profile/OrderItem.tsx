import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RateForm from "./RateForm";

interface Props {
	data: any;
}

export default function OrderItem({ data }: Props) {
	const [isShowMore, setIsShowMore] = useState(false);
	const [isOpenRate, setIsOpenRate] = useState(false);
	return (
		<div className="p-4 space-y-2 border rounded-md shadow-lg border-slate-200">
			<RateForm isOpen={isOpenRate} setIsOpen={setIsOpenRate} orderId={data._id} />
			<h4>{data._id}</h4>
			<p>
				<>Order at {new Date(data.createdAt).toLocaleString()}</>
			</p>
			<div className="justify-between flex-center-y">
				<p className="font-medium">Status</p>
				<p>{data.status}</p>
			</div>
			<div className="justify-between flex-center-y">
				<p className="font-medium">Payment</p>
				<p>{data.payment}</p>
			</div>
			<hr />
			<div className="justify-between flex-center-y">
				<p className="font-medium">Sub total</p>
				<p>{data.price.subtotal}$</p>
			</div>
			<div className="justify-between flex-center-y">
				<p className="font-medium">Shipping</p>
				<p>{data.price.shipping}$</p>
			</div>
			{data.price.voucher !== 0 && (
				<div className="justify-between flex-center-y">
					<p className="font-medium">Voucher</p>
					<p>- {data.price.shipping}$</p>
				</div>
			)}
			<div className="justify-between flex-center-y">
				<p className="font-medium">Total</p>
				<p>{data.price.total}$</p>
			</div>
			{data.status === "delivered" && !data.isRated && (
				<div className="flex">
					<button
						className="ml-auto text-white btn btn-secondary"
						onClick={() => {
							setIsOpenRate(!isOpenRate);
						}}
					>
						Rate
					</button>
				</div>
			)}

			{!isShowMore ? (
				<div className="flex">
					<button
						className="ml-auto btn btn-primary"
						onClick={() => {
							setIsShowMore(!isShowMore);
						}}
					>
						More info
					</button>
				</div>
			) : (
				<>
					<hr />
					<div className="justify-between flex-center-y">
						<p className="font-medium">Address</p>
						<p>{data.info.address}</p>
					</div>
					<div className="justify-between flex-center-y">
						<p className="font-medium">Phone</p>
						<p>{data.info.phone}</p>
					</div>
					{data.info.note && (
						<div className="justify-between flex-center-y">
							<p className="font-medium">Note</p>
							<p>{data.info.note}</p>
						</div>
					)}
					<hr />
					{data.products.map((item: any) => (
						<Link href={`/product/${item.product.slug}`} key={item._id}>
							<a
								key={item._id}
								className="grid grid-cols-2 gap-4 p-2 border rounded-md border-slate-200"
							>
								<div className="flex gap-4">
									<div className="object-cover h-20 overflow-hidden rounded-md image-container image aspect-square">
										<Image
											src={item.product.image}
											alt=""
											className="image"
											layout="fill"
										/>
									</div>
									<div className="flex flex-col justify-between">
										<p className="text-xl font-semibold">{item.product.title}</p>
										<p className="font-medium text-purple-600">
											{item.price}$ x {item.quantity}
										</p>
									</div>
								</div>
							</a>
						</Link>
					))}
				</>
			)}
		</div>
	);
}

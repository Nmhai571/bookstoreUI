import Image from "next/image";
import Link from "next/link";
import { BsSuitHeart, BsSuitHeartFill, BsCartPlus } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import APP_PATH from "../../PATH";
import Rating from "./Rating";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { userAddToWhiteList, userRemoveFromWhiteList } from "../../reducers/userActions";
import { selectUser } from "../../reducers/userSlice";

interface Props {
	data: any;
}

export default function ProductItem({ data }: Props) {
	const dispatch = useAppDispatch();
	const bookRef = useRef<HTMLDivElement>(null);
	const sUser = useAppSelector(selectUser);
	const isLiked = sUser.white_list.includes(data._id);
	const handleLike = async () => {
		!isLiked ? dispatch(userAddToWhiteList(data._id)) : dispatch(userRemoveFromWhiteList(data._id));
	};
	return (
		<div
			className="relative p-4 space-y-4 transition-all border rounded-box border-slate-200 hover:shadow-md group"
			ref={bookRef}
		>
			<div className="image-container aspect-3/4">
				<Image
					src={data.image}
					className="rounded-box image"
					alt="book"
					layout="fill"
					priority={true}
				/>
				{sUser._id && (
					<button
						className={`absolute top-2 right-2${
							!isLiked ? " bg-white btn-outline " : " "
						}btn btn-primary btn-square`}
						onClick={handleLike}
					>
						{isLiked ? <BsSuitHeartFill size={20} /> : <BsSuitHeart size={20} />}
					</button>
				)}
			</div>
			<div className="relative gap-2 text-center flex-col-center">
				<h5 className="line-clamp-1">
					<Link href={`${APP_PATH.PRODUCT}/${data.slug}`}>
						<a>{data.title}</a>
					</Link>
				</h5>
				<div>
					<span className="font-bold text-primary">${data.price.priceFinal}</span>{" "}
					{data.price.priceInitial !== data.price.priceFinal && (
						<span className="line-through opacity-50">${data.price.priceInitial}</span>
					)}
				</div>
				<Rating disabled />
			</div>
		</div>
	);
}

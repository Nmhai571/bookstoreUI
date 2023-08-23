import Link from "next/link";
import Image from "next/image";
import APP_PATH from "../../PATH";
import {
	BsFillChatSquareTextFill,
	BsCartPlus,
	BsShieldFillCheck,
	BsSuitHeart,
	BsFacebook,
	BsLightningFill,
	BsShieldFillX,
	BsHeart,
	BsHeartFill,
} from "react-icons/bs";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import RatingProgress from "../../components/Product/RatingProgress";
// import { bookApi } from "apis/bookApi";
// import { addToCart } from "store/cartSlice";
import toast from "react-hot-toast";
import { NextPageWithLayout } from "../_app";
import PublicLayout from "../../layouts/PublicLayout";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Rating from "../../components/Product/Rating";
import { iBook } from "../../models/book.model";
import { GetServerSideProps, GetStaticProps } from "next";
import { bookApi } from "../../apis/bookApi";
import { userAddToWhiteList, userRemoveFromWhiteList } from "../../reducers/userActions";
import { selectUser } from "../../reducers/userSlice";
import { addToCart, selectCart } from "../../reducers/cartSlice";
import { useRouter } from "next/router";
import Head from "next/head";

interface iProps {
	data: iBook;
}

const ProductDetail: NextPageWithLayout = (props) => {
	const router = useRouter();
	const { data } = props as iProps;
	const dispatch = useAppDispatch();
	const sCart = useAppSelector(selectCart);
	const sUser = useAppSelector(selectUser);
	const isLiked = sUser.white_list.includes(data._id);
	const [quantity, setQuantity] = useState(1);
	const handleLike = async () => {
		if (!sUser._id) return toast.error("Please login to add to whitelist");
		!isLiked ? dispatch(userAddToWhiteList(data._id)) : dispatch(userRemoveFromWhiteList(data._id));
	};
	const handlePlus = () => {
		if (data.quantity > quantity) {
			setQuantity(quantity + 1);
		} else {
			toast.error("Book is out of stock");
		}
	};
	const handleMinus = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		} else {
			toast.error("You can't buy less than 1 book");
		}
	};
	const handleAddToCart = () => {
		if (!sUser._id) return toast.error("Please login to add to cart");
		let itemFind = sCart.cart.find((item) => item.slug === data.slug);
		if (itemFind)
			if (itemFind.quantity + quantity <= data.quantity) {
				dispatch(
					addToCart({
						_id: data._id,
						slug: data.slug,
						quantity,
						price: data.price,
					})
				);
				toast.success("Add to cart success");
			} else toast.error("Quantity is over");
		else {
			if (quantity <= data.quantity) {
				dispatch(
					addToCart({
						_id: data._id,
						slug: data.slug,
						quantity,
						price: data.price,
					})
				);
				toast.success("Add to cart success");
			} else toast.error("Quantity is over");
		}
	};
	// const handleShare = () => {
	// 	window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank");
	// };
	const handleShare = () => {
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank");
	};
	return (
		<>
			<Head>
				<title>{data.title}</title>
				<meta name="description" content={data.description} />
				<meta property="og:title" content={data.title} />
				<meta property="og:description" content={data.description} />
				<meta property="og:image" content={data.image} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Bookove" />
				<meta property="og:locale" content="vi_VN" />
				{/* meta tag for google */}
				<meta itemProp="name" content={data.title} />
				<meta itemProp="description" content={data.description} />
				<meta itemProp="image" content={data.image} />
				<meta itemProp="type" content="website" />
				<meta itemProp="siteName" content="Bookove" />
				<meta itemProp="locale" content="vi_VN" />
				{/* meta tag for twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@bookove" />
				<meta name="twitter:creator" content="@bookove" />
				<meta name="twitter:title" content={data.title} />
				<meta name="twitter:description" content={data.description} />
				<meta name="twitter:image" content={data.image} />
			</Head>
			<section className="container">
				<div className="text-sm breadcrumbs">
					<ul>
						<li>
							<Link href={APP_PATH.HOME}>
								<a className="font-bold text-primary">Home</a>
							</Link>
						</li>
						<li>
							<Link href={APP_PATH.PRODUCT}>
								<a className="font-bold text-primary">Books</a>
							</Link>
						</li>
						<li>
							<Link href={`${APP_PATH.PRODUCT}/${data.slug}`}>
								<a>{data.title}</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex-wrap gap-8 mt-8 flex-center-x">
					<div className="flex-shrink-0 w-80 image-container">
						<Image
							src={data.image}
							className="rounded-lg shadow-2xl image"
							alt="book"
							layout="fill"
							priority={true}
						/>
					</div>
					<div className="flex flex-col flex-1 gap-4">
						<h2>{data.title}</h2>
						<div className="flex-wrap justify-between gap-8 flex-center-y">
							<div className="flex-center-y gap-x-8">
								<div className="flex-center-y gap-x-2">
									<Rating disabled />
									<span className="text-lg font-bold">{data.rating.average}</span>
								</div>
								<div className="flex-center-y gap-x-2">
									<BsFillChatSquareTextFill className="text-primary" />
									{/* <span className="font-bold">{data.comment | 0} Reviews</span> */}
								</div>
							</div>
							<button
								className="bg-[#0573e6] hover:bg-[#0573e6] text-white hover btn gap-2"
								onClick={handleShare}
							>
								<BsFacebook />
								Facebook
							</button>
						</div>
						<p className="line-clamp-6">{data.description}</p>
						<div className="flex-wrap justify-between gap-4 flex-center-y">
							<div className="flex-shrink-0 gap-8 flex-center-y">
								{/* <div className="w-12 h-12 image-container">
									<Image
										className="flex-shrink-0 rounded-md"
										src="/logo.png"
										alt="logo"
										layout="fill"
									/>
								</div> */}
								<div className="flex flex-col gap-2">
									<p className="text-sm font-medium text-gray-500">Author</p>
									<p className="font-bold">
										{data.author.map((author) => author.name + " ")}
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<p className="text-sm font-medium text-gray-500">Publisher</p>
									<p className="font-bold">{data.publisher.name}</p>
								</div>
								<div className="flex flex-col gap-2">
									<p className="text-sm font-medium text-gray-500">Year</p>
									<p className="font-bold">{data.year}</p>
								</div>
							</div>
							<div className="gap-4 flex-center-y">
								{/* <div className="gap-2 px-5 py-4 font-bold uppercase flex-center-y text-primary bg-primary/10 rounded-box">
									<BsLightningFill size={24} />
									Free Shipping
								</div> */}
								{data.quantity > 0 ? (
									<div className="gap-2 px-5 py-4 font-bold text-green-600 uppercase bg-green-200 flex-center-y rounded-box">
										<BsShieldFillCheck size={24} />
										In stock
									</div>
								) : (
									<div className="gap-2 px-5 py-4 font-bold text-red-600 uppercase bg-red-200 flex-center-y rounded-box">
										<BsShieldFillX size={24} />
										Out of stock
									</div>
								)}
							</div>
						</div>
						<div className="divider"></div>
						<div className="flex-wrap justify-between gap-4 flex-center-y">
							<div className="gap-4 flex-center-y">
								<span className="text-2xl font-bold">${data.price.priceFinal}</span>
								{data.price.priceFinal > data.price.priceInitial && (
									<span className="text-gray-500 line-through">
										${data.price.priceInitial}
									</span>
								)}
							</div>
							<div className="gap-4 flex-center-y">
								<div className="border flex-center-y rounded-box border-slate-200">
									<button
										className="w-12 h-12 text-xl font-bold text-primary"
										onClick={handleMinus}
									>
										-
									</button>
									<input
										className="w-12 h-12 overflow-auto text-center outline-none"
										value={quantity}
										onChange={(e) => setQuantity(+e.target.value)}
										type="number"
										min={1}
										max={data.quantity}
									/>
									<button
										className="w-12 h-12 text-xl font-bold text-primary"
										onClick={handlePlus}
									>
										+
									</button>
								</div>
								<button className="gap-2 btn btn-primary" onClick={handleAddToCart}>
									<BsCartPlus size={24} />
									Add to cart
								</button>
								<button
									className="btn btn-primary btn-outline btn-square"
									onClick={handleLike}
								>
									{isLiked ? <BsHeartFill size={24} /> : <BsHeart size={24} />}
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<Tab.Group>
						<Tab.List className="tabs">
							<Tab
								className={({ selected }) =>
									`outline-none tab tab-lg tab-bordered font-bold ${
										selected ? "tab-active" : ""
									}`
								}
							>
								Book detail
							</Tab>
							<Tab
								className={({ selected }) =>
									`outline-none tab tab-lg tab-bordered font-bold ${
										selected ? "tab-active" : ""
									}`
								}
							>
								Rate
							</Tab>
						</Tab.List>
						<Tab.Panels>
							<Tab.Panel>
								<div className="mt-4 overflow-x-auto">
									<table className="table w-full">
										<tbody>
											<tr>
												<th>Name</th>
												<td>{data.title}</td>
											</tr>
											<tr>
												<th>Author</th>
												<td>{data.author.map((author) => author.name + ", ")}</td>
											</tr>
											<tr>
												<th>Date</th>
												<td>{data.year}</td>
											</tr>
											<tr>
												<th>Publisher</th>
												<td>{data.publisher.name}</td>
											</tr>
											<tr>
												<th>Thể loại</th>
												<td className="flex flex-wrap gap-2">
													{data.categories.map((category) => (
														<span
															key={category._id}
															className="px-2 py-1 font-semibold rounded-md text-primary bg-primary/10"
														>
															{category.name}
														</span>
													))}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Tab.Panel>
							<Tab.Panel>
								{/* <div className="flex gap-4 mt-4">
									<div className="flex flex-col flex-grow gap-4">
										<RatingProgress type="1" value={86} />
										<RatingProgress type="2" value={86} />
										<RatingProgress type="3" value={86} />
										<RatingProgress type="4" value={86} />
										<RatingProgress type="5" value={86} />
									</div>
									<div className="p-4 flex-col-center aspect-square">
										<p>
											<span className="text-2xl font-bold">4.7</span> out of 5 stars
										</p>
										<Rating />
									</div>
								</div>
								<div className="space-y-4">
									<div className="justify-between gap-4 mt-4 flex-center-y">
										<p className="font-bold">Hiển thị 4 từ 20 bình luận</p>
										<select className="select select-bordered">
											<option>Mới nhất</option>
											<option>Cũ nhất</option>
										</select>
									</div>
									<div className="flex flex-col gap-6">
										<div className="flex gap-4 p-4 border shadow-md border-slate-200 rounded-box">
											<div className="space-y-4">
												<div className="gap-4 flex-center-y">
													<Image
														className="rounded-md"
														src="/logo.png"
														alt="logo"
														width={52}
														height={52}
													/>
													<div className="space-y-2">
														<p className="text-lg font-bold">Võ Hoài Nam</p>
														<p className="text-sm text-gray-500">Jan 4th, 2022</p>
													</div>
												</div>
												<p className="font-medium">
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
													Quaerat officiis velit, aliquam ipsum amet voluptas
													nostrum atque neque consequuntur, illo dolores! Maxime
													consequatur numquam blanditiis placeat, ipsam est sint!
													Fugiat!
												</p>
											</div>
											<div className="gap-4 p-4 flex-col-center">
												<p className="text-2xl font-bold text-secondary">4</p>
												<Rating />
											</div>
										</div>
										<div className="flex gap-4 p-4 border shadow-md border-slate-200 rounded-box">
											<div className="space-y-4">
												<div className="gap-4 flex-center-y">
													<Image
														className="rounded-md"
														src="/logo.png"
														alt="logo"
														width={52}
														height={52}
													/>
													<div className="space-y-2">
														<p className="text-lg font-bold">Võ Hoài Nam</p>
														<p className="text-sm text-gray-500">Jan 4th, 2022</p>
													</div>
												</div>
												<p className="font-medium">
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
													Quaerat officiis velit, aliquam ipsum amet voluptas
													nostrum atque neque consequuntur, illo dolores! Maxime
													consequatur numquam blanditiis placeat, ipsam est sint!
													Fugiat!
												</p>
											</div>
											<div className="gap-4 p-4 flex-col-center">
												<p className="text-2xl font-bold text-secondary">4</p>
												<Rating />
											</div>
										</div>
										<div className="flex gap-4 p-4 border shadow-md border-slate-200 rounded-box">
											<div className="space-y-4">
												<div className="gap-4 flex-center-y">
													<Image
														className="rounded-md"
														src="/logo.png"
														alt="logo"
														width={52}
														height={52}
													/>
													<div className="space-y-2">
														<p className="text-lg font-bold">Võ Hoài Nam</p>
														<p className="text-sm text-gray-500">Jan 4th, 2022</p>
													</div>
												</div>
												<p className="font-medium">
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
													Quaerat officiis velit, aliquam ipsum amet voluptas
													nostrum atque neque consequuntur, illo dolores! Maxime
													consequatur numquam blanditiis placeat, ipsam est sint!
													Fugiat!
												</p>
											</div>
											<div className="gap-4 p-4 flex-col-center">
												<p className="text-2xl font-bold text-secondary">4</p>
												<Rating />
											</div>
										</div>
										<div className="flex gap-4 p-4 border shadow-md border-slate-200 rounded-box">
											<div className="space-y-4">
												<div className="gap-4 flex-center-y">
													<Image
														className="rounded-md"
														src="/logo.png"
														alt="logo"
														width={52}
														height={52}
													/>
													<div className="space-y-2">
														<p className="text-lg font-bold">Võ Hoài Nam</p>
														<p className="text-sm text-gray-500">Jan 4th, 2022</p>
													</div>
												</div>
												<p className="font-medium">
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
													Quaerat officiis velit, aliquam ipsum amet voluptas
													nostrum atque neque consequuntur, illo dolores! Maxime
													consequatur numquam blanditiis placeat, ipsam est sint!
													Fugiat!
												</p>
											</div>
											<div className="gap-4 p-4 flex-col-center">
												<p className="text-2xl font-bold text-secondary">4</p>
												<Rating />
											</div>
										</div>
										<div className="flex gap-4 p-4 border shadow-md border-slate-200 rounded-box">
											<div className="space-y-4">
												<div className="gap-4 flex-center-y">
													<Image
														className="rounded-md"
														src="/logo.png"
														alt="logo"
														width={52}
														height={52}
													/>
													<div className="space-y-2">
														<p className="text-lg font-bold">Võ Hoài Nam</p>
														<p className="text-sm text-gray-500">Jan 4th, 2022</p>
													</div>
												</div>
												<p className="font-medium">
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
													Quaerat officiis velit, aliquam ipsum amet voluptas
													nostrum atque neque consequuntur, illo dolores! Maxime
													consequatur numquam blanditiis placeat, ipsam est sint!
													Fugiat!
												</p>
											</div>
											<div className="gap-4 p-4 flex-col-center">
												<p className="text-2xl font-bold text-secondary">4</p>
												<Rating />
											</div>
										</div>
										<button className="block btn btn-primary">Xem thêm</button>
									</div>
								</div> */}
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</section>
		</>
	);
};
ProductDetail.getLayout = function getLayout(page: any) {
	return <PublicLayout>{page}</PublicLayout>;
};
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	const { slug } = ctx.params as {
// 		slug: string;
// 	};
// 	const { data } = await bookApi.getOne(slug);
// 	if (!data) {
// 		ctx.res.statusCode = 404;
// 		ctx.res.end("Not found");
// 	}
// 	return {
// 		props: {
// 			data,
// 		},
// 	};
// };
export default ProductDetail;
export const getStaticProps: GetStaticProps = async (ctx) => {
	const { slug } = ctx.params as {
		slug: string;
	};
	const { data } = await bookApi.getOne(slug);
	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			data,
		},
		revalidate: 60,
	};
};
export async function getStaticPaths() {
	const { data } = await bookApi.getAll();
	const paths = (data.books as iBook[]).map((book) => `/product/${book.slug}`);
	return { paths, fallback: "blocking" };
}

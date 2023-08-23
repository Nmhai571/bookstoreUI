/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "..";
import { adminApi } from "../../../apis/adminApi";
import { bookApi } from "../../../apis/bookApi";
import { useAppDispatch } from "../../../app/store";
import { adminUpdateOneProduct } from "../../../reducers/adminActions";

interface Props {}

function ProductEdit(props: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = router.query;
	const [product, setProduct] = useState<any>();
	const [publishers, setPublishers] = useState<any[]>([]);
	const [authors, setAuthors] = useState<any[]>([]);
	const [authorText, setAuthorText] = useState("");
	const [categoryText, setCategoryText] = useState("");
	console.log(product);
	useEffect(() => {
		if (id)
			adminApi.getOneProduct(id as string).then((res: any) => {
				setProduct(res.data);
				setPublishers(res.publishers);
				setAuthors(res.authors);
				setAuthorText(
					res.data.author.reduce((acc: any, cur: any, index: number) => {
						let result = acc + cur.name;
						if (index < res.data.author.length - 1) {
							result += "|";
						}
						return result;
					}, "")
				);
				setCategoryText(
					res.data.categories.reduce((acc: any, cur: any, index: number) => {
						let result = acc + cur.name;
						if (index < res.data.categories.length - 1) {
							result += "|";
						}
						return result;
					}, "")
				);
			});
	}, [id]);
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(
			adminUpdateOneProduct({
				...product,
				author: authorText.trim().split("|"),
				categories: categoryText.trim().split("|"),
			})
		);
	};
	return (
		<form onSubmit={handleSubmit}>
			<h4>Product Edit</h4>
			<div className="mt-4 space-y-2">
				<div className=" flex-center">
					<div className="relative">
						<input
							className="absolute inset-0 opacity-0 cursor-pointer"
							type="file"
							name="image-upload"
							id="image-upload"
							onChange={async (e) => {
								if (e.target.files) {
									const file = e.target.files[0];
									try {
										const response = await axios.post(
											`https://southcloud.herokuapp.com/upload?fileName=${encodeURIComponent(
												file.name
											)}`,
											file
										);
										setProduct({ ...product, image: response.data.url });
									} catch (error) {
										toast.error("Error");
									}
								}
							}}
							accept="image/*"
						/>
						<img src={product?.image} alt="" className="object-cover w-40 h-40 rounded-md" />
					</div>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Title</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						defaultValue={product?.title}
						name="title"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Description</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						defaultValue={product?.description}
						name="description"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Author</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="author"
						defaultValue={authorText}
						onChange={(e) => {
							setAuthorText(e.target.value);
						}}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Category</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="year"
						defaultValue={categoryText}
						onChange={(e) => {
							setCategoryText(e.target.value);
						}}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Quantity</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="quantity"
						defaultValue={product?.quantity}
						onChange={handleChange}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Year</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="year"
						defaultValue={product?.year}
						onChange={handleChange}
					/>
				</div>
				<hr />
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Price</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						defaultValue={product?.price.priceInitial}
						onChange={(e) => {
							setProduct({
								...product,
								price: { ...product.price, priceInitial: e.target.value },
							});
						}}
						max={product?.price.priceFinal}
					/>
					<input
						type="text"
						className="w-full input input-bordered"
						defaultValue={product?.price.priceFinal}
						onChange={(e) => {
							setProduct({
								...product,
								price: { ...product.price, priceFinal: e.target.value },
							});
						}}
					/>
				</div>
				<hr />
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Slug</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="slug"
						defaultValue={product?.slug}
						onChange={handleChange}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Publisher</span>
					</label>
					<select
						className="select select-bordered"
						name="publisher"
						id="publisher"
						value={product?.publisher}
						onChange={(e) => {
							setProduct({
								...product,
								publisher: e.target.value,
							});
						}}
					>
						{publishers.map((publisher: any) => {
							return (
								<option key={publisher._id} value={publisher._id}>
									{publisher.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<button type="submit" className="w-full mt-4 btn btn-primary">
				Submit
			</button>
		</form>
	);
}
ProductEdit.requireAuth = true;
ProductEdit.getLayout = function getLayout(page: any) {
	return <AdminLayout>{page}</AdminLayout>;
};
export default ProductEdit;

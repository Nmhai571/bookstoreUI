/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "..";
import { adminApi } from "../../../apis/adminApi";
import { useAppDispatch } from "../../../app/store";
import { adminCreateOneProduct, adminUpdateOneProduct } from "../../../reducers/adminActions";

interface Props {}

function ProductEdit(props: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [product, setProduct] = useState<any>({
		description: "",
		title: "",
		image: "",
		author: "",
		price: {
			priceInitial: 0,
			priceFinal: 0,
		},
		quantity: 20,
		publisher: "",
		categories: "",
		year: "",
	});
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(!product.title);
		if (
			product.title ||
			product.description ||
			product.image ||
			product.author ||
			product.quantity ||
			product.publisher ||
			product.categories ||
			product.year
		) {
			dispatch(
				adminCreateOneProduct({
					...product,
					author: product.author.trim().split("|"),
					categories: product.categories.trim().split("|"),
				})
			);
		} else {
			toast.error("Please fill all fields");
		}
	};

	const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const files = e.target.files;
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append("file", files[i]);
		}
		formData.append("upload_preset", "BookStore");
		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
			formData
		);
		setProduct({ ...product, image: res.data.url });
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<h4>Create Product</h4>
			<div className="mt-4 space-y-2">
				<div className=" flex-center">
					<div className="relative">
						<input
							className="absolute inset-0 opacity-0 cursor-pointer"
							type="file"
							name="image-upload"
							id="image-upload"
							onChange={uploadHandler}
							multiple
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
						onChange={handleChange}
					/>
				</div>
				<div className="w-full form-control">
					<label className="label">
						<span className="label-text">Category</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="categories"
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
						<span className="label-text">Publisher</span>
					</label>
					<input
						type="text"
						className="w-full input input-bordered"
						name="publisher"
						onChange={handleChange}
					/>
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

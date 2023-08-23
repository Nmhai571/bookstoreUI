import { NextPageWithLayout } from "../_app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { bookApi } from "../../apis/bookApi";
import PublicLayout from "../../layouts/PublicLayout";
import { GetServerSideProps } from "next";
import APP_PATH from "../../PATH";
import ProductItem from "../../components/Product/ProductItem";
import { iBook } from "../../models/book.model";

interface Props {
	data: any;
}
const Product: NextPageWithLayout = (props) => {
	const { data } = props as Props;
	console.log(data);
	const router = useRouter();
	const page = router.query.page ? parseInt(router.query.page as string) : 1;
	const limit = router.query.limit ? parseInt(router.query.limit as string) : 10;
	const [books, setBooks] = useState<iBook[]>(data.books as iBook[]);
	const [sort, setSort] = useState({
		sortBy: "date",
		sortValue: "1",
	});
	const [publisher, setPublisher] = useState<string>("0");
	const [category, setCategory] = useState<string[]>([]);
	const handleChangePage = (page: number) => () => {
		// router.push(`/product?page=${page}&limit=${limit}`);
		router.push(APP_PATH.PRODUCT, {
			query: {
				page: page,
				limit: limit,
			},
		});
	};
	useEffect(() => {
		let result = [];
		result = (data.books as iBook[]).sort((a, b) => {
			if (sort.sortBy === "date") {
				return sort.sortValue === "1"
					? +new Date(b.createdAt) - +new Date(a.createdAt)
					: +new Date(a.createdAt) - +new Date(b.createdAt);
			}
			if (sort.sortBy === "price") {
				return sort.sortValue === "3"
					? a.price.priceFinal - b.price.priceFinal
					: b.price.priceFinal - a.price.priceFinal;
			}
			return 1;
		});
		if (publisher !== "0") {
			result = result.filter((item) => item.publisher.name === publisher);
		}

		if (category.length > 0) {
			result = result.filter((item: any) => {
				return item.categories.some((categoryItem: any) => {
					return category.includes(categoryItem._id);
				});
			});
		}
		setBooks(result);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort, publisher, category]);

	return (
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
							<a>Books</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex flex-wrap gap-10 mt-8">
				<div className="max-w-[400px] flex-1 space-y-4">
					<h4>Filter Options</h4>
					<div
						tabIndex={0}
						className="border collapse collapse-arrow border-base-300 bg-base-100 rounded-box"
					>
						<input type="checkbox" />
						<p className="text-xl font-bold collapse-title">Sort</p>
						<div className="collapse-content">
							<select
								className="w-full mt-1 select select-bordered"
								defaultValue={1}
								onChange={(e) => {
									setSort({
										sortBy:
											+e.target.value === 1 || +e.target.value === 2 ? "date" : "price",
										sortValue: e.target.value,
									});
								}}
							>
								<option value="1">Cũ nhất</option>
								<option value="2">Mới nhất</option>
								<option value="3">Giá: Cao đến thấp</option>
								<option value="4">Giá: Thấp đến cao</option>
							</select>
						</div>
					</div>
					<div
						tabIndex={0}
						className="border collapse collapse-arrow border-base-300 bg-base-100 rounded-box"
					>
						<input type="checkbox" />
						<p className="text-xl font-bold collapse-title">Publisher</p>
						<div className="collapse-content">
							<select
								className="w-full mt-1 select select-bordered"
								defaultValue="-1"
								onChange={(e) => {
									setPublisher(e.target.value);
								}}
							>
								<option value="-1" disabled>
									Choose Publisher
								</option>
								<option value="0">All Publisher</option>
								{data.publisher.map((item: any) => (
									<option key={item._id} value={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div
						tabIndex={0}
						className="border collapse collapse-arrow border-base-300 bg-base-100 rounded-box"
					>
						<input type="checkbox" />
						<p className="text-xl font-bold collapse-title">Category</p>
						<div className="grid grid-cols-2 gap-5 collapse-content">
							{data.category.map((item: any) => (
								<label key={item._id} className="gap-4 flex-center-y" htmlFor="action">
									<input
										type="checkbox"
										className="checkbox checkbox-primary"
										id="action"
										name="category"
										onChange={(e) => {
											if (e.target.checked) {
												setCategory([...category, item._id]);
											} else {
												console.log(item._id);
												setCategory(
													category.filter((item1: any) => item1 !== item._id)
												);
											}
										}}
									/>
									<p className="font-medium">{item.name}</p>
								</label>
							))}
						</div>
					</div>
				</div>
				<div className="flex-1">
					<h4>Books</h4>
					<div className="grid grid-cols-4 gap-6 mt-4">
						{books?.map((book) => (
							<ProductItem key={book._id} data={book} />
						))}
					</div>
					<div className="justify-between gap-4 mt-8 flex-center-y">
						<p className="font-medium">
							Show {books.length} from {data.length} books
						</p>
						<div className="gap-2 flex-center-y">
							{page > 1 && (
								<button
									className="btn btn-primary btn-outline"
									onClick={handleChangePage(data.page - 1)}
								>
									Previous
								</button>
							)}
							<div className="btn-group">
								{Array.from(Array(data.pages).keys())
									.map((item) => item + 1)
									.map((item, index) => (
										<button
											key={index}
											className={`btn${item === data.page ? " btn-active" : ""}`}
											onClick={handleChangePage(item)}
										>
											{item}
										</button>
									))}
							</div>
							{page < data.pages && (
								<button
									className="btn btn-primary btn-outline"
									onClick={handleChangePage(data.page + 1)}
								>
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const page = ctx.query.page ? +ctx.query.page : 1;
	const limit = ctx.query.limit ? +ctx.query.limit : 10;
	const { data } = await bookApi.getAll(page, limit);
	return {
		props: {
			data,
		},
	};
};

Product.getLayout = function getLayout(page) {
	return <PublicLayout>{page}</PublicLayout>;
};

export default Product;

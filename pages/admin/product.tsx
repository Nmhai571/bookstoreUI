import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from ".";
import { adminApi } from "../../apis/adminApi";
import { useAppDispatch } from "../../app/store";
import { adminDeleteOneProduct } from "../../reducers/adminActions";

interface Props {}

function Product(props: Props) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [products, setProducts] = useState([]);

	const handleEdit = (productId: any) => {
		router.push(`/admin/product/${productId}`);
	};

	const handleDelete = async (productId: any) => {
		const value = confirm("Are you sure you want to delete this product?");
		if (value) {
			dispatch(adminDeleteOneProduct(productId));
		}
	};

	useEffect(() => {
		adminApi.getAllProducts().then((res) => {
			setProducts(res.data);
		});
	}, []);

	return (
		<div>
			<div className="flex">
				<button
					className="mb-4 ml-auto btn btn-primary"
					onClick={() => router.push("/admin/product/create")}
				>
					Add New Product
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="table w-full table-compact">
					<thead>
						<tr>
							<th>Image</th>
							<th>Title</th>
							<th>Author</th>
							<th>Date Publisher</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product: any) => {
							return (
								<tr key={product._id}>
									<td className="h-40 image-container aspect-square">
										<Image
											className="object-cover"
											src={product.image}
											alt={product.slug}
											layout="fill"
										/>
									</td>
									<td>{product.title}</td>
									<td>
										{product.author
											.reduce((acc: any, curr: any) => {
												return acc + curr.name + " ";
											}, "")
											.trim()}
									</td>

									<td>{product.year}</td>
									<td className="space-x-2">
										<button
											className="btn btn-primary"
											onClick={() => handleEdit(product.slug)}
										>
											Edit
										</button>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete(product._id)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
Product.requireAuth = true;
Product.getLayout = function getLayout(page: any) {
	return <AdminLayout>{page}</AdminLayout>;
};
export default Product;

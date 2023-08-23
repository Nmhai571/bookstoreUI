import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { iBook } from "../../models/book.model";
import { changeQuantity, iCartItem, removeFromCart, updatePrice } from "../../reducers/cartSlice";
import { bookApi } from "../../apis/bookApi";
import APP_PATH from "../../PATH";
import toast from "react-hot-toast";
// data : slug
function CartItem({ data }: { data: iCartItem }) {
	const dispatch = useDispatch();
	const [book, setBook] = useState<iBook | null>(null);
	const [quantity, setQuantity] = useState(data.quantity | 0);
	const handlePlus = () => {
		if (book) {
			if (book.quantity > quantity) setQuantity(quantity + 1);
			else toast.error("Book is out of stock");
		}
	};
	const handleMinus = () => {
		if (book) {
			if (quantity - 1 === 0) {
				dispatch(removeFromCart(data.slug));
				toast.success("Book removed from cart");
			} else setQuantity(quantity - 1);
		}
	};
	const handleRemove = () => dispatch(removeFromCart(data.slug));
	useEffect(() => {
		dispatch(changeQuantity({ slug: data.slug, quantity }));
	}, [data.slug, dispatch, quantity]);
	useEffect(() => {
		async function getData() {
			const response = await bookApi.getOne(data.slug);
			setBook(response.data);
			dispatch(updatePrice({ slug: data.slug, price: response.data.price }));
		}
		getData();
	}, [data.slug, dispatch]);
	if (!book) return null;
	return (
		<tr>
			<td className="gap-4 flex-center-y">
				<div className="flex-shrink-0 w-44 image-container">
					<Image
						src={book.image}
						className="rounded-lg shadow-2xl image"
						alt="book"
						layout="fill"
						priority={true}
					/>
				</div>
				<Link
					href={{
						pathname: APP_PATH.PRODUCT,
						query: { slug: data.slug },
					}}
				>
					<a className="text-xl font-bold">{book.title}</a>
				</Link>
			</td>
			<td className="font-medium text-center">{book.price.priceFinal}</td>
			<td>
				<div className="mx-auto border flex-center-y rounded-box border-slate-200 max-w-max">
					<button className="w-12 h-12 text-xl font-bold text-primary" onClick={handleMinus}>
						-
					</button>
					<input
						className="w-12 h-12 overflow-auto text-center outline-none"
						value={quantity}
						type="number"
						min={1}
						max={book.quantity}
						disabled
					/>
					<button className="w-12 h-12 text-xl font-bold text-primary" onClick={handlePlus}>
						+
					</button>
				</div>
			</td>
			<td className="font-medium text-center">{quantity * book.price.priceFinal}</td>
			<th>
				<div className="flex-center">
					<button className="btn btn-error btn-circle" onClick={handleRemove}>
						<AiOutlineClose className="text-white" size={20} />
					</button>
				</div>
			</th>
		</tr>
	);
}

export default CartItem;

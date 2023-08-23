import React, { useEffect } from "react";
import { orderApi } from "../../apis/orderApi";
import Profile from "../../components/Profile";
import OrderItem from "../../components/Profile/OrderItem";
import { NextPageWithLayout } from "../_app";

const Order: NextPageWithLayout = () => {
	const [orders, setOrders] = React.useState<any[]>([]);
	useEffect(() => {
		async function getAll() {
			const response = await orderApi.getAllOrderByUser();
			console.log(response.data);
			setOrders(response.data);
		}
		getAll();
	}, []);
	return (
		<div className="space-y-4">
			{orders.map((item) => (
				<OrderItem key={item._id} data={item} />
			))}
		</div>
	);
};
export default Order;
Order.requireAuth = true;
Order.getLayout = function getLayout(page) {
	return <Profile>{page}</Profile>;
};

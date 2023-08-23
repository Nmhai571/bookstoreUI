import AdminLayout from ".";
import { orderApi } from "../../apis/orderApi";
import { useEffect, useState } from "react";
import OrderItem from "../../components/Admin/Orderitem";
import { adminApi } from "../../apis/adminApi";

interface Props {}

function Order(props: Props) {
	const [orders, setOrders] = useState<any[]>([]);
	useEffect(() => {
		async function getAll() {
			const response = await adminApi.getAllOrders();
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
}
Order.requireAuth = true;
Order.getLayout = function getLayout(page: any) {
	return <AdminLayout>{page}</AdminLayout>;
};
export default Order;

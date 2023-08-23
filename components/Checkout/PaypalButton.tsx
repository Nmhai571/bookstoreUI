import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAppSelector } from "../../app/store";
import { selectCart } from "../../reducers/cartSlice";
import { selectUser } from "../../reducers/userSlice";

interface Props {
	address: {
		address: string;
		phone: string;
		note: string;
	};
	onSuccess: Function;
}

const initialOptions = {
	"client-id": process.env.PAYPAL_CLIENT_ID as string,
};

export default function PaypalButton(props: Props) {
	const sUser = useAppSelector(selectUser);
	const sCart = useAppSelector(selectCart);
	return (
		<>
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					createOrder={(data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										currency_code: "USD",
										value: sCart.price.subtotal.toString(),
										breakdown: {
											item_total: {
												currency_code: "USD",
												value: sCart.price.subtotal.toString(),
											},
											discount: {
												currency_code: "USD",
												value: sCart.price.voucher
													? Math.abs(
															sCart.price.total -
																(sCart.price.subtotal + sCart.price.fee)
													  ).toString()
													: "0",
											},
										},
									},
									custom_id: sUser._id,
									shipping: {
										address: {
											country_code: "VN",
											address_line_1: props.address.address,
											admin_area_1: "VN",
											admin_area_2: "VN",
											postal_code: "123456",
										},
										email_address: sUser.email,
										name: {
											full_name: sUser.name,
										},
										options: [
											{
												id: "SHIP",
												label: "Fee Shipping",
												selected: true,
												type: "SHIPPING",
												amount: {
													value: "2",
													currency_code: "USD",
												},
											},
										],
									},
									items: sCart.cart.map((item) => ({
										name: item.slug,
										quantity: item.quantity.toString(),
										description: item.slug,
										unit_amount: {
											currency_code: "USD",
											value: item.price.priceFinal.toString(),
										},
									})),
								},
							],
						});
					}}
					onApprove={async (_data, actions: any) => {
						props.onSuccess();
						return actions.order.capture().then((details: any) => {
							console.log(details);
						});
					}}
				/>
			</PayPalScriptProvider>
		</>
	);
}

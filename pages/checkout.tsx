import Link from "next/link";
import APP_PATH from "../PATH";
import Step1 from "../components/Checkout/Step1";
import { useState } from "react";
import Step2 from "../components/Checkout/Step2";
import PublicLayout from "../layouts/PublicLayout";
import { NextPageWithLayout } from "./_app";
import { useSelector } from "react-redux";
import { selectCart } from "../reducers/cartSlice";
const STEPS = ["Shopping Summary", "Checkout"];
const CheckOut: NextPageWithLayout = () => {
	const sCart = useSelector(selectCart);
	const [step, setStep] = useState(1);
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
						<Link href={APP_PATH.CHECKOUT}>
							<a>Checkout</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className="mt-8 space-y-8 flex-col-center">
				{sCart.cart.length === 0 ? (
					<div className="text-center">
						<h1 className="text-3xl font-bold">Your cart is empty</h1>
						<Link href={APP_PATH.PRODUCT}>
							<a className="mt-4 btn btn-primary">Continue Shopping</a>
						</Link>
					</div>
				) : (
					<>
						<ul className="steps">
							{STEPS.map((item, index) => (
								<li key={index} className={`step${index + 1 <= step ? " step-primary" : ""}`}>
									{item}
								</li>
							))}
						</ul>
						{step === 1 && <Step1 setStep={setStep} />}
						{step === 2 && <Step2 />}
					</>
				)}
			</div>
		</section>
	);
};
CheckOut.getLayout = function getLayout(page) {
	return <PublicLayout>{page}</PublicLayout>;
};
export default CheckOut;

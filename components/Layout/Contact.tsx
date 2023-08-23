import { useState } from "react";
import toast from "react-hot-toast";
import { userApi } from "../../apis/userApi";
import { useAppDispatch } from "../../app/store";
import { userSubscribe } from "../../reducers/userActions";

export default function Contact() {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(userSubscribe(email));
	};
	return (
		<section className="relative mb-8 bg-contact">
			<div className="container gap-8 p-8 rounded-md flex-col-center">
				<h2 className="text-center text-white shadow-md">
					Subcribe our newsletter for newest
					<br /> books updates
				</h2>
				<form name="mail" className="flex w-full max-w-xl mt-4 form-control" onSubmit={handleSubmit}>
					<div className="input-group">
						<input
							className="w-full input input-bordered input-primary"
							type="email"
							placeholder="Type your email here"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button className="uppercase btn btn-primary">Subscribe</button>
					</div>
				</form>
			</div>
		</section>
	);
}

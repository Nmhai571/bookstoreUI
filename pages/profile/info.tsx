import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userApi } from "../../apis/userApi";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Profile from "../../components/Profile";
import { iUser } from "../../models/user.model";
import { userUpdate } from "../../reducers/userActions";
import { selectUser } from "../../reducers/userSlice";
import { NextPageWithLayout } from "../_app";

const Info: NextPageWithLayout = () => {
	const dispatch = useAppDispatch();
	const sUser = useAppSelector(selectUser);
	const [isLoading, setIsLoading] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "",
		phone: "",
		subscribe: false,
	});
	useEffect(() => {
		if (!userInfo.name && sUser._id) {
			setUserInfo({
				name: sUser.name,
				phone: sUser.phone || "",
				subscribe: sUser.status.isSubscribed || false,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sUser]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userInfo.name && userInfo.phone) {
			setIsLoading(true);
			await dispatch(userUpdate(userInfo));
			setIsLoading(false);
		}
	};
	return (
		<div className="p-4 shadow-md rounded-box">
			<h5 className="mb-8">Info</h5>
			<div className="space-y-8">
				<div className="w-24 mx-auto overflow-hidden rounded-full image-container">
					{sUser.image && (
						<Image className="image" alt="avatar" src={sUser.image} layout="fill" priority />
					)}
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="w-full form-control">
						<label className="label" htmlFor="name">
							<span className="font-semibold label-text">Name</span>
						</label>
						<input
							defaultValue={sUser.name}
							type="text"
							id="name"
							placeholder="Type here"
							className="w-full input input-bordered"
							maxLength={30}
							required
							onChange={handleChange}
						/>
					</div>
					<div className="w-full form-control">
						<label className="label" htmlFor="phone">
							<span className="font-semibold label-text">Phone</span>
						</label>
						<input
							id="phone"
							value={userInfo.phone}
							name="phone"
							type="text"
							placeholder="Type here"
							className="w-full input input-bordered"
							maxLength={30}
							required
							onChange={handleChange}
						/>
					</div>
					<div className="w-full form-control">
						<div className="form-control">
							<label className="cursor-pointer label">
								<span className="font-semibold label-text">Subscribe to newsletter</span>
								<input
									type="checkbox"
									className="checkbox checkbox-primary"
									checked={userInfo.subscribe}
									onChange={(e) => {
										setUserInfo({ ...userInfo, subscribe: e.target.checked });
									}}
								/>
							</label>
						</div>
					</div>
					<button
						className={`btn ${isLoading ? "loading" : ""} btn-primary btn-block`}
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
Info.getLayout = function getLayout(page) {
	return <Profile>{page}</Profile>;
};
Info.requireAuth = true;
export default Info;

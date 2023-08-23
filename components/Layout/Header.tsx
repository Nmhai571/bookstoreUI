import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { BsCart3, BsFilterSquare, BsGoogle, BsSuitHeart } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/store";
import PATH from "../../PATH";
import { userLoginGoogle } from "../../reducers/userActions";
import { resetUser, selectUser } from "../../reducers/userSlice";

export default function Header() {
	const dispatch = useAppDispatch();
	const sUser = useAppSelector(selectUser);
	const sCartCount = useAppSelector((state) => state.cart.cart).reduce(
		(acc, item) => acc + item.quantity,
		0
	);
	// const cartCount = useSelector((state) => state.cart.cart).reduce((acc, item) => acc + item.quantity, 0);

	const handleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				dispatch(userLoginGoogle(tokenResponse.access_token));
			} catch (error) {
				console.log(error);
			}
		},
	});
	const handleLogout = () => {
		dispatch(resetUser());
	};
	return (
		<header className="border-b border-slate-200">
			<div className="container justify-between py-4 flex-center-y md:py-4">
				<Link href="/">
					<a className="gap-5 flex-center-y">
						<Image className="rounded-md" src="/logo.png" alt="logo" width={64} height={64} />
						<div className="flex flex-col">
							<h1 className="text-3xl font-extrabold">Bookove</h1>
							<p className="text-sm text-gray-500">Book Store Website</p>
						</div>
					</a>
				</Link>
				<div className="gap-6 flex-center-y">
					<Link href={PATH.CHECKOUT}>
						<a className="indicator">
							<span className="font-bold text-white indicator-item badge badge-secondary">
								{sCartCount}
							</span>
							<button className="btn btn-primary btn-outline btn-square">
								<BsCart3 size={20} />
							</button>
						</a>
					</Link>
					{sUser._id ? (
						<>
							{/* <Link href="/">
								<a className="indicator">
									<span className="font-bold text-white indicator-item badge badge-secondary">
										4
									</span>
									<button className="btn btn-primary btn-outline btn-square">
										<BsSuitHeart size={20} />
									</button>
								</a>
							</Link> */}

							<div className="dropdown dropdown-end">
								<label tabIndex={0} className="mt-1 cursor-pointer avatar">
									<div className="w-10 h-10 rounded ring ring-primary ring-offset-base-100 ring-offset-2 image-container">
										<Image className="image" layout="fill" src={sUser.image} alt="" />
									</div>
								</label>
								<ul
									tabIndex={0}
									className="p-2 mt-4 shadow menu dropdown-content bg-base-100 rounded-box w-52"
								>
									{sUser.role === "admin" && (
										<>
											<li className="flex justify-between">
												<Link href={PATH.ADMIN}>
													<a className="flex items-center">
														<BsFilterSquare size={20} />
														<span className="ml-2">Admin</span>
													</a>
												</Link>
											</li>
										</>
									)}
									<li>
										<Link href={PATH.PROFILE_INFO}>
											<a>Profile</a>
										</Link>
									</li>
									<li>
										<button onClick={handleLogout}>Logout</button>
									</li>
								</ul>
							</div>
						</>
					) : (
						<button className="gap-2 btn btn-primary btn-outline" onClick={() => handleLogin()}>
							<BsGoogle size={24} />
							Login
						</button>
					)}
				</div>
			</div>
		</header>
	);
}

import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsBasket, BsHouseDoor } from "react-icons/bs";
import APP_PATH from "../../PATH";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

function Profile({ children }: { children: ReactNode }) {
	const router = useRouter();
	return (
		<>
			<Header />
			<section className="container">
				<div className="text-sm breadcrumbs">
					<ul>
						<li>
							<Link href="/">
								<a className="font-bold text-primary">Home</a>
							</Link>
						</li>
						<li>
							<Link href={APP_PATH.PROFILE}>
								<a>Profile</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-wrap gap-8 my-8">
					<ul className="flex-1 max-w-xs p-2 menu bg-base-100 rounded-box">
						<li>
							<Link href={`${APP_PATH.PROFILE_INFO}`}>
								<a className={`${router.pathname === APP_PATH.PROFILE_INFO ? "active" : ""}`}>
									<BsHouseDoor />
									Info
								</a>
							</Link>
						</li>
						<li>
							<Link href={`${APP_PATH.PROFILE_ADDRESS}`}>
								<a
									className={`${
										router.pathname === APP_PATH.PROFILE_ADDRESS ? "active" : ""
									}`}
								>
									<BsHouseDoor />
									Address
								</a>
							</Link>
						</li>
						<li>
							<Link href={`${APP_PATH.PROFILE_ORDER}`}>
								<a
									className={`${
										APP_PATH.PROFILE_ORDER === router.pathname ? "active" : ""
									}`}
								>
									<BsBasket />
									Order
								</a>
							</Link>
						</li>
					</ul>
					<div className="flex-1">{children}</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
Profile.requireAuth = true;
export default Profile;

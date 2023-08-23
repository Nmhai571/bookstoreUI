import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsBasket, BsBook, BsHouseDoor } from "react-icons/bs";
import APP_PATH from "../../PATH";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";

function AdminLayout({ children }: { children: ReactNode }) {
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
							<Link href={APP_PATH.ADMIN}>
								<a>Admin</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-wrap gap-8 my-8">
					<ul className="flex-1 max-w-xs p-2 menu bg-base-100 rounded-box">
						<li>
							<Link href={`${APP_PATH.ADMIN_PRODUCT}`}>
								<a
									className={`${
										router.pathname === APP_PATH.ADMIN_PRODUCT ? "active" : ""
									}`}
								>
									<BsBook />
									Product
								</a>
							</Link>
						</li>
						<li>
							<Link href={`${APP_PATH.ADMIN_ORDER}`}>
								<a className={`${router.pathname === APP_PATH.ADMIN_ORDER ? "active" : ""}`}>
									<BsBook />
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
AdminLayout.requireAuth = true;
export default AdminLayout;

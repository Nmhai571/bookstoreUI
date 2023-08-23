import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
export default function Footer() {
	return (
		<footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
			<div className="grid grid-flow-col gap-4">
				<a className="link link-hover">About us</a>
				<a className="link link-hover">Contact</a>
				<a className="link link-hover">Jobs</a>
			</div>
			<div>
				<div className="grid grid-flow-col gap-4">
					<Link href="https://fb.com" target="_blank">
						<a className="">
							<BsFacebook size={30} className="text-purple-600 hover:text-purple-500" />
						</a>
					</Link>
				</div>
			</div>
			<div>
				<p>
					Copyright © 2022 - All right reserved by <span className="font-bold">Võ Hoài Nam</span>
				</p>
			</div>
		</footer>
	);
}

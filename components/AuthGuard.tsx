import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../app/store";
import { selectUser } from "../reducers/userSlice";

interface Props {
	children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
	const router = useRouter();
	const sUser = useAppSelector(selectUser);
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			router.push("/");
		}
	}, [router, sUser]);

	return <>{children}</>;
}

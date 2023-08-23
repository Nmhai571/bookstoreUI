import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { getCart } from "../reducers/cartSlice";
import { getUser } from "../reducers/userActions";
import { selectUser } from "../reducers/userSlice";

interface Props {}

function FakePage(props: Props) {
	const isSendRequest = useRef<boolean>(false);
	const sUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	useEffect(() => {
		function getCurrentUser() {
			if (localStorage.getItem("token")) {
				dispatch(getUser());
				isSendRequest.current = true;
			}
		}
		!isSendRequest.current && getCurrentUser();
		dispatch(getCart());
	}, [dispatch, sUser._id]);
	return <>{/* <TawkMessengerReact propertyId="62f100f537898912e961da4f" widgetId="default" /> */}</>;
}
export default React.memo(FakePage);

import { useEffect, useState } from "react";
import { addressApi } from "../../apis/addressApi";
import { iUserAddress } from "../../models/user.model";

interface Props {
	address: iUserAddress;
	onEdit: (address: iUserAddress) => void;
}

export default function AddressItem({ address, onEdit }: Props) {
	const [data, setData] = useState<any>({
		province: null,
		district: null,
		ward: null,
		other: "",
	});
	useEffect(() => {
		const getData = async () => {
			addressApi.getAllByCode(address.province, address.district, address.ward).then((res) => {
				const { data } = res.data;
				console.log({
					province: data.province,
					district: data.district,
					ward: data.ward,
					...data,
				});
				setData({
					province: data.province,
					district: data.district,
					ward: data.ward,
					...data,
				});
			});
		};
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			key={address._id}
			className="flex-wrap justify-between gap-4 p-4 rounded-md shadow-md flex-center-y"
		>
			<p>
				{address.other && address.other + ", "}
				{data.province && data.province.name + ", "}
				{data.district && data.district.name + ", "} {data.ward && data.ward.name}
			</p>
			<div className="justify-end flex-center-y">
				<button className="text-white btn btn-secondary" onClick={() => onEdit(address)}>
					Chỉnh sửa
				</button>
			</div>
		</div>
	);
}

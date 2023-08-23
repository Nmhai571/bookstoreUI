export default function calculateVoucher(
	subtotal: number,
	voucher: {
		type: string;
		value: number;
	}
) {
	let result = 0;
	if (voucher) {
		if (voucher.type === "percent") {
			console.log("percent");
			result = (subtotal * voucher.value) / 100;
		} else if (voucher.type === "fixed") {
			result = voucher.value;
			if (subtotal < result) result = subtotal;
		}
	}
	return result;
}

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}
export interface iUser {
	_id: string;
	email: string;
	image: string;
	name: string;
	phone?: string;
	role: UserRole;
	address: iUserAddress[];
	status: { isActive: boolean; isSubscribed: boolean };
	updatedAt: string;
	createdAt: string;
	white_list: any[];
}
export interface iUserAddress {
	_id?: string;
	phone: string;
	province: number;
	ward: number;
	district: number;
	other: string;
}

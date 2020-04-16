export class User {
	user_id: string;
	email:string;
	name: string;
	password: string;
	gender: string;
	department: string;

	constructor(
		user_id: string, 
		email: string, 
		name: string, 
		password: string, 
		gender: string, 
		department: string
		) {
		this.user_id = user_id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.gender = gender;
		this.department = department;
	}
}
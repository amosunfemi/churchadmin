const validator = require("email-validator");

export class User {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	
	isValidEmail() {
		return validator.validate(this.email);
	}
}
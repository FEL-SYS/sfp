import { Contains, IsEmail, IsNotEmpty } from 'class-validator';

export default class UserRegisterDto {
	/**
	 * @example "username"
	 */
	@IsNotEmpty()
	username: string;

	/**
	 * @example "email@gmail.cm"
	 */
	@IsEmail()
	email: string;

	/**
	 * @example "administrator"
	 */
	@IsNotEmpty()
	type: string;

	/**
	 * @example "password"
	 */
	@IsNotEmpty()
	password: string;
}

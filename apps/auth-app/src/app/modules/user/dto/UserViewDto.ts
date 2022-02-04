import { Exclude } from 'class-transformer';

export default class UserViewDto {
	/**
	 * @example "username"
	 */
	username: string;

	/**
	 * @example "email@gmail.cm"
	 */
	email: string;

	/**
	 * @example "administrator"
	 */
	type: string;

	/**
	 * @example "password"
	 */
	@Exclude()
	password: string;

	/**
	 * @example "access_token"
	 */
	@Exclude()
	accessToken: string;
}

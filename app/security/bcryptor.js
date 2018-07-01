import bcrypt from 'bcryptjs'

/* 
Securely hash an input content with 12 bits salt.
*/
export function hash(content) {
	let salt = bcrypt.genSaltSync(12)
	return bcrypt.hashSync(content, salt)
}

/* 
Compare an input plain content with a previously hashed record.
*/
export function compare(content, record) {
	return bcrypt.compareSync(content, record)
}
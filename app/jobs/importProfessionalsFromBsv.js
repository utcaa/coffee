import entities from '../entities'
import userService from '../services/userServices'
const csvParser = require("csvtojson")

async function run() {
	const errorData = []
	let count = 0
	csvParser({delimiter: "|"}).fromFile('./app/files/professionals.bsv')
	.then(async professionals => {

		for (let count = 0; count < professionals.length; count++) {
			const professional = professionals[count]
			let user
			let role
			let industry
			let result
			try {
				user = await entities.Users.signup(professional['Email'], '111111', professional['First Name'], professional['Last Name'], true, '0000000000', 1, professional['Preferred Name'])
				console.log(user)
				role = await entities.Roles.getByName(professional['current function'])
				console.log(role)
				industry = await entities.Industries.getByName(professional['current industry'])
				console.log(industry)
				result = userService.addWorkExperience(industry.id, user.uuid, role.id, professional['Employers'], 4089, 2010, 1)
				console.log(result)
			} catch(err) {
				errorData.push({email: professional['Email']})
			}
		}
		console.log("........................")
		console.log(errorData)
		console.log("........................")
	})
}

module.exports = run
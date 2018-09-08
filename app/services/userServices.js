import entities from '../entities'
const csvParser = require("csvtojson")

function addWorkExperiences(experiences) {
	const allPromises = []
	experiences.map(exp => {
		allPromises.push(addWorkExperience(exp.industry_id, exp.user_id, exp.role_id, exp.location_id, 
									exp.start_year, exp.start_month, exp.end_year, exp.end_month))})
	return Promise.all(allPromises)
}

async function addWorkExperience(industryId, userUUId, roleId, company, locationId, startYear, startMonth, endYear = "0", endMonth = "0") {
	return new Promise((resolve, reject) => {
		entities.Industries.getById(industryId)
			.then(industry => {
				if (!industry) {
					reject(Error('Input industry does not exist.'))
				} else {
					entities.Users.getByCriteria({uuid: userUUId, user_type_id: 1})
					.then(user => {
						if (!user) {
							reject(Error('Input user does not exist.'))
						} else {
							entities.Roles.getById(roleId)
							.then(role => {
								if (!role) {
									reject(Error('Input role does not exist.'))
								} else {
									entities.Cities.getById(locationId)
									.then(location => {
										if (!location) {
											reject(Error('Input location does not exist.'))
										} else {
											if (startMonth > 12 || startMonth < 1) {
												reject(Error('Invalid start month.'))
											}
											if (endYear != 0 && (endYear < startYear || (endYear === startYear && endMonth < startMonth))) {
												reject(Error('Invalid start and end time. End time must not be earlier than start time.'))
											}
											return entities.WorkExperience.create({
												industryId,
												userId: user.id,
												roleId,
												company,
												locationId,
												startYear,
												startMonth,
												endYear,
												endMonth
											})
											.then(() => {
												resolve(true)
											}).catch((err) => {
												reject(err)
											})
										}
									}).catch((err) => {
										reject(err)
									})
								}
							}).catch((err) => {
								reject(err)
							})
						}
					}).catch((err) => {
						reject(err)
					})
				}
			}).catch((err) => {
				reject(err)
			})
	})
}

async function importFrom(file) {
	return new Promise((resolve, reject) => {
		csvParser({delimiter: "|"}).fromFile(file)
		.then(async professionals => {
			const errorData = []
			for (let count = 0; count < professionals.length; count++) {
				const professional = professionals[count]
				let user
				let role
				let industry
				try {
					user = await entities.Users.signup(professional['Email'], '111111', professional['First Name'], professional['Last Name'], true, '0000000000', 1, professional['Preferred Name'], {uuid: 'uuid'})
					role = await entities.Roles.getByName(professional['current function'])
					industry = await entities.Industries.getByName(professional['current industry'])
					await addWorkExperience(industry.id, user.uuid, role.id, professional['Employers'], 4089, 2010, 1)
				} catch(err) {
					errorData.push({email: professional['Email'], err})
				}
			}
			console.log("........................")
			console.log(errorData)
			console.log("........................")
			if (!errorData.length) {
				resolve(professionals.length)
			} else {
				reject(errorData)
			}
		})
	})
}

module.exports = {
	addWorkExperiences,
	addWorkExperience,
	importFrom
}
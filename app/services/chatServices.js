import entities from '../entities'
const csvParser = require("csvtojson")

async function buldRequest(requests) {
	return new Promise((resolve, reject) => {
		csvParser({delimiter: "|"}).fromFile('./app/files/request2.bsv')
		.then(async data => {
			const errorData = []
			const successData = []
			for (let count = 0; count < data.length; count++) {
				const req = data[count]
				try {
					let industry = await entities.Industries.getByName(req['Recent/Interested Industry'])
					if (!industry) {
						industry = await entities.Industries.create({name: req['Recent/Interested Industry']})
					}
					const industryId = industry.id

					let role = await entities.Roles.getByName(req['Recent/Interested Role'])
					if (!role) {
						role = await entities.Roles.create({name: req['Recent/Interested Role']})
					}
					const roleId = role.id
					const student = await entities.Users.signup(req['UTmail'], '111111', req['First Name'], req['Last Name'], true, '0000000000', 2, req['Preferred Name'], {uuid: 'uuid', id: 'id'})
					console.log(student)
					successData.push(await request(student.uuid, industryId, roleId, 4089,
							{ goal: req['Coffe chat goals'], comments: req['additional comments'], 
								challenge: req['Challenges'] }))
				} catch(err) {
					errorData.push({email: req['UTmail'], err})
				}
			}
			console.log("........................")
			console.log(successData)
			console.log("........................")
			console.log(errorData)
			console.log("........................")
		})
	})
}

function request(studentId, industryId, roleId, locationId, { secondaryIndustryId, goal, challenge, comments }) {
	return new Promise((resolve, reject) => {
		entities.Users.find({where:{uuid: studentId}})
		.then(student => {
			if (!student) {
				reject(new Error('request student not found.'))
			} else {
				entities.WorkExperience.findAll({where: {
					industryId,
					roleId,
					locationId
				}}).then(async experience => {
					if ((!experience || !experience.length) && secondaryIndustryId) {
						entities.WorkExperience.findAll({
							industryId,
							roleId,
							locationId
						}).then(async experience2 => {
							if (!experience2) {
								entities.CoffeeRequests.create({
									studentId: student.id,
									professionalId: null,
									statusId: 2, //pending
									interestedIndustryId: industryId,
									secondaryInterestedIndustryId: secondaryIndustryId,
									interestedRoleId: roleId,
									locationId,
									goal,
									challenge,
									comments,
								}).then(function(result) {
									resolve(result)
								}).catch(err => {
									reject(err)
								})
							} else {
								const professionals = await entities.RequestCounts.listRequestCoundsByUserIds(experience2.map(exp => {return exp.userId}))
								const professionalId = (!professionals || !professionals.length) ? experience2[0].userId : professionals[0].userId
								entities.CoffeeRequests.create({
									studentId: student.id,
									professionalId,
									statusId: 3, //completed
									interestedIndustryId: industryId,
									secondaryInterestedIndustryId: secondaryIndustryId,
									interestedRoleId: roleId,
									locationId,
									goal,
									challenge,
									comments,
								}).then(function(result) {
									entities.RequestCounts.newRequest(professionalId, 1)
									resolve(result)
								}).catch(err => {
									reject(err)
								})
							}
						}).catch(err => {
							reject(err)
						})
					} else if (experience && experience.length) {
						const professionals = await entities.RequestCounts.listRequestCountsByUserIds(experience.map(exp => { return exp.userId }))
						const professionalId = (!professionals || !professionals.length) ? experience[0].userId : professionals[0].userId
						entities.CoffeeRequests.create({
							studentId: student.id,
							professionalId,
							statusId: 3, //completed
							interestedIndustryId: industryId,
							secondaryInterestedIndustryId: secondaryIndustryId,
							interestedRoleId: roleId,
							locationId,
							goal,
							challenge,
							comments,
						}).then(function(result) {
							entities.RequestCounts.newRequest(professionalId, 1)
							resolve(result.id)
						}).catch(err => {
							reject(err)
						})
					} else {
						entities.CoffeeRequests.create({
							studentId: student.id,
							professionalId: null,
							statusId: 2, //pending
							interestedIndustryId: industryId,
							secondaryInterestedIndustryId: secondaryIndustryId,
							interestedRoleId: roleId,
							locationId,
							goal,
							challenge,
							comments,
						}).then(function(result) {
							resolve(result)
						}).catch(err => {
							reject(err)
						})
					}
				}).catch(err => {
					reject(err)
				})
			}
		}).catch(err => {
			reject(err)
		})
	})
}

module.exports = {
	buldRequest,
	request
}
import entities from '../entities'

function request(studentId, industryId, roleId, locationId, { secondaryIndustryId, goal, challenge, comments }) {
	return new Promise((resolve, reject) => {
		entities.Users.getByCriteria({uuid: studentId, userTypeId: 1})
		.then(student => {
			entities.WorkExperience.findAll({
				industryId,
				roleId,
				locationId
			}).then(experience => {
				if (!experience && secondaryIndustryId) {
					entities.WorkExperience.findAll({
						industryId,
						roleId,
						locationId
					}).then(experience2 => {
						if (!experience2) {
							entities.CoffeeRequests.create({
								studentId: student.id,
								professionalId: 0,
								statusId: 2, //pending
								goal,
								challenge,
								comments,
							})
						} else {
							entities.CoffeeRequests.create({
								studentId: student.id,
								professionalId: experience2[0].userId,
								statusId: 3, //completed
								goal,
								challenge,
								comments,
							}).then(function(result) {
								resolve(result.id)
							}).catch(err => {
								reject(err)
							})
						}
					}).catch(err => {
						reject(err)
					})
				} else {
					entities.CoffeeRequests.create({
						studentId: student.id,
						professionalId: experience[0].userId,
						statusId: 3, //completed
						goal,
						challenge,
						comments,
					}).then(function(result) {
						resolve(result.id)
					}).catch(err => {
						reject(err)
					})
				}
			}).catch(err => {
				reject(err)
			})
		}).catch(err => {
			reject(err)
		})
	})
}

module.exports = {
	request
}
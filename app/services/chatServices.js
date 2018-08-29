import entities from '../entities'

function request(studentId, industryId, roleId, locationId, secondaryIndustryId) {
	return new Promise((resolve, reject) => {
		entities.Users.getByUUId(studentId)
		.then(student => {
			entities.WorkExperience.find({
				industryId,
				roleId,
				locationId
			}).then(experience => {
				if (!experience && secondaryIndustryId) {
					entities.WorkExperience.find({
						industryId,
						roleId,
						locationId
					}).then(experience2 => {
						if (!experience2) {
							entities.CoffeeRequestStatus.create({
								studentId: student.id,
								professionalId: 0,
								status_id: 2, //pending
							})
						} else {
							entities.CoffeeRequestStatus.create({
								studentId: student.id,
								professionalId: experience2.userId,
								status_id: 3, //completed
							}).then(function() {
								resolve(experience2[0].userId)
							}).catch(err => {
								reject(err)
							})
						}
					}).catch(err => {
						reject(err)
					})
				} else {
					entities.CoffeeRequestStatus.create({
						studentId: student.id,
						professionalId: experience.userId,
						status_id: 3, //completed
					}).then(function() {
						resolve(experience[0].userId)
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
	}
}
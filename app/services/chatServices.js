import entities from '../entities'

function buldRequest(requests) {
	const allPromises = []
	requests.map(req => {
		allPromises.push(request(req.student_id, req.interest_industry_id, 
							req.interest_role_id, req.location_id,
							{ secondaryIndustryId: req.second_interest_industry_id, 
									goal: req.goal, comments: req.comments, 
									challenge: req.challenge }))
	})
	return Promise.all(allPromises)
}

function request(studentId, industryId, roleId, locationId, { secondaryIndustryId, goal, challenge, comments }) {
	return new Promise((resolve, reject) => {
		entities.Users.getByCriteria({uuid: studentId, userTypeId: 3})
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
									goal,
									challenge,
									comments,
								})
							} else {
								const professionals = await entities.RequestCounts.listRequestCoundsByUserIds(experience2.map(exp => {return exp.userId}))
								const professionalId = (!professionals || !professionals.length) ? experience2[0].userId : professionals[0].userId
								entities.CoffeeRequests.create({
									studentId: student.id,
									professionalId,
									statusId: 3, //completed
									goal,
									challenge,
									comments,
								}).then(function(result) {
									entities.RequestCounts.newRequest(professionalId, 1)
									resolve(result.id)
								}).catch(err => {
									reject(err)
								})
							}
						}).catch(err => {
							reject(err)
						})
					} else if (experience && experience.length) {
						console.log(experience[0])
						const professionals = await entities.RequestCounts.listRequestCountsByUserIds(experience.map(exp => {

						console.log("!!!!!")
						console.log(exp.userId)
							return exp.userId}))
						const professionalId = (!professionals || !professionals.length) ? experience[0].userId : professionals[0].userId
						entities.CoffeeRequests.create({
							studentId: student.id,
							professionalId,
							statusId: 3, //completed
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
							goal,
							challenge,
							comments,
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
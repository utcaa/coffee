import entities from '../entities'

function addWorkExperience(industryId, userUUId, roleId, locationId, startYear, startMonth, endYear = "0", endMonth = "0") {
	return new Promise((resolve, reject) => {
		entities.Industries.getById(industryId)
			.then(industry => {
				if (!industry) {
					reject(Error('Input industry does not exist.'))
				} else {
					entities.Users.getByUUId(userUUId)
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
											console.log(arguments)
											return entities.WorkExperience.create({
												industryId,
												userId: user.id,
												roleId,
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

module.exports = {
	addWorkExperience
}
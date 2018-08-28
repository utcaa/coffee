'use strict'

module.exports = {

up: function (queryInterface, Sequelize) {
	return queryInterface.createTable(
		'continents', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			isUnique: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(45),
			allowNull: false
		}
	}).then(function() {
		return queryInterface.createTable (
		'countries', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		name: {
			type: Sequelize.STRING(60),
			allowNull: false
		},
		country_iso3166_a2: {
			type: Sequelize.STRING(4),
			allowNull: false
		},
		country_iso3166_a3: {
			type: Sequelize.STRING(4),
			allowNull: false
		},
		country_iso3166_numeric: {
			type: Sequelize.STRING(4),
			allowNull: false
		},
		continent_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'continents',
				key: 'id'
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE"
		}
	}).then(function() {
			return queryInterface.createTable (
			'provinces', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			name: {
				type: Sequelize.STRING(60),
				allowNull: false
			},
			short_name: {
				type: Sequelize.STRING(4),
				allowNull: false
			},
			country_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: 'countries',
					key: 'id'
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			}
		}).then(function() {
			return queryInterface.createTable (
			'cities', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			name: {
				type: Sequelize.STRING(60),
				allowNull: false
			},
			province_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: 'provinces',
					key: 'id'
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			}
		}).then(function() {
			return queryInterface.createTable (
			'addresses', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			address_line1: {
				type: Sequelize.STRING(90),
				allowNull: false
			},
			address_line2: {
				type: Sequelize.STRING(45),
				allowNull: false
			},
			postal_code: {
				type: Sequelize.STRING(10),
				allowNull: false
			},
			city_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: 'cities',
					key: 'id'
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			}
		}).then(function() {
			return queryInterface.createTable (
			'users', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			password: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			uuid: {
				type: Sequelize.STRING(45),
				allowNull: false,
				isUnique: true
			},
			first_name: {
				type: Sequelize.STRING(45),
				allowNull: false
			},
			middle_name: {
				type: Sequelize.STRING(45),
				allowNull: false,
				defaultValue: ''
			},
			last_name: {
				type: Sequelize.STRING(45),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(45),
				allowNull: false
			},
			consented: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
			}
		}).then(function() {
			return queryInterface.createTable (
			'user_sessions', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			userId: {
				type: Sequelize.INTEGER(11),
				isUnique: false,
				allowNull: false,
				field: "user_id",
				references: { model: 'users', key: 'id' }
			},
			email: {
				type: Sequelize.STRING(45),
				isUnique: true,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			sessionId: {
				type: Sequelize.STRING(120),
				allowNull: false,
				defaultValue: false,
				field: "session_id"
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				field: "created_at",
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			expireAt: {
				type: Sequelize.DATE,
				allowNull: false,
				field: "expire_at"
			}
		}).then(function() {
			return queryInterface.createTable (
			'account_action_types', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
				field: "name"
			}
		}).then(function() {
			return queryInterface.createTable (
			'user_history', {
			id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				isUnique: true
			},
			userId : {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "user_id",
				references: { model: 'users', key: 'id' }
			},
			actionTypeId : {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "action_type_id",
				references: { model: 'account_action_types', key: 'id' }
			},
			latestActionAt: {
				type: Sequelize.DATE,
				allowNull: false,
				field: "latest_action_at",
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		})
		})
		})
		})
		})
		})
		})
		})
		})
},

down: function (queryInterface, Sequelize) {}

};
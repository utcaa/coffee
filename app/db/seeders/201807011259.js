'use strict';

var citiesData = "INSERT INTO `cities` VALUES (2001,'Aklavik',11172),(2621,'New York City',234),\
					(3121,'Seattle',249),(3858,'Lac Brochet',11148),(3867,'Pukatawagan',11148),\
					(3870,'Ross River',11216),(3873,'South Indian Lake',11148),(3875,'Tadoule Lake',11148),\
					(3879,'Arctic Bay',6025605),(3898,'Baker Lake',6025605),(3902,'Brandon',11148),\
					(3903,'Brochet',11148),(3907,'Cambridge Bay',6025605),(3911,'Colville Lake',11172),\
					(3914,'Coppermine',6025605),(3915,'Cross Lake',11148),(3916,'Chesterfield Inlet',6025605),\
					(3917,'Clyde River',6025605),(3918,'Dawson City',11216),(3923,'Dauphin',11148),\
					(3929,'Arviat',6025605),(3932,'Inuvik',11172),(3934,'Iqaluit',6025605),\
					(3935,'Fredericton (and vicinity)',11161),(3937,'Flin Flon',11148),\
					(3938,'Fort Resolution',11172),(3939,'Ft. Simpson',11172),(3943,'Fort Good Hope',11172),\
					(3948,'Gods Lake Narrows',11148),(3951,'Iles de la Madeleine',11183),\
					(3952,'Igloolik',6025605),(3955,'Gillam',11148),(3956,'Grise Fiord',6025605),\
					(3961,'Holman',11172),(3962,'Gjoa Haven',6025605),(3969,'Hay River',11172),\
					(3975,'Pond Inlet',6025605),(3976,'Island Lake',11148),(3990,'Lake Harbor',6025605),\
					(3992,'Lac la Martre',11172),(3996,'Leaf Rapids',11148),(4012,'Norway House',11148),\
					(4020,'Old Crow',11216),(4021,'Oxford House',11148),(4028,'Paulatuk',11172),\
					(4045,'The Pas',11148),(4047,'Watson Lake',11216),(4051,'Moncton (and vicinity)',11161),\
					(4059,'Gameti',11172),(4060,'Resolute',6025605),(4068,'Red Sucker Lake',11148),\
					(4069,'Rankin Inlet',6025605),(4072,'Snowdrift',11172),(4074,'Sanikiluaq',6025605),\
					(4076,'Fort Smith',11172),(4080,'Nanisivik',6025605),(4081,'Saint Theresa Point',11148),\
					(4084,'Cape Dorset',6025605),(4087,'Thompson',11148),(4089,'Toronto',11178),\
					(4092,'Tuktoyaktuk',11172),(4094,'Kugaaruk',6025605),(4096,'Repulse Bay',6025605),\
					(4097,'Hall Beach',6025605),(4102,'Broughton Island',6025605),(4105,'Norman Wells',11172),\
					(4110,'Deline',11172),(4122,'Whale Cove',6025605),(4123,'Pangnirtung',6025605),\
					(4129,'Whitehorse',11216),(4137,'Taloyoak',6025605),(4139,'Lynn Lake',11148),\
					(4140,'Churchill',11148),(4146,'Yellowknife',11172),(4150,'Coral Harbour',6025605),\
					(4153,'York Landing',11148),(4168,'Faro',11216),(4170,'Fort Norman',11172),\
					(4171,'Gods River',11148),(4177,'Jenpeg',11148),(4178,'Swan River',11148),\
					(4200,'Shamattawa',11148),(5680,'Scarborough',11178),(6364,'Amherst (and vicinity)',11173),\
					(7000,'Sussex',11161),(7392,'Waterloo',11178),(7954,'Mississauga',11178),\
					(9355,'Palo Alto',206),(10584,'Mayo',11216),(10597,'Pine Point',11172),\
					(10622,'Wrigley',11172),(10674,'Ft. McPherson',11172),(10676,'Little Grand Rapids',11148),\
					(57411,'Pointe du Bois',11148),(57453,'St. Vital',11148),(57525,'Neepawa',11148),\
					(57627,'Gonor',11148),(57663,'Portage La Prairie',11148),(57670,'Cape Tormentine',11161),\
					(57732,'North Head',11161),(57759,'St. Martins',11161),(58243,'Nahanni Butte',11172),\
					(58330,'Westport',11173),(58374,'Liscomb',11173),(60705,'Carmacks',11216),\
					(60716,'Teslin',11216),(177423,'Jakes Corner',11216),(177461,'Whati',11172),\
					(177479,'Paradise',11173),(177759,'Smiths Cove',11173),(177773,'Beaver Creek',11216),\
					(180017,'Quebec (and vicinity)',11183),(180432,'Nelson Miramichi',11161),\
					(181796,'Carman',11148),(181797,'Clear Lake',11148),(181798,'Falcon Beach',11148),\
					(181799,'Killarney',11148),(181801,'Lac du Bonnet',11148),(181802,'Minnedosa',11148),\
					(181805,'Roblin',11148),(181806,'Russell',11148),(181808,'Virden',11148),\
					(181809,'Wasagaming',11148),(181810,'West Hawk Lake',11148),(181812,'Wrong Lake',11148),\
					(181813,'Alma',11161),(181815,'Campobello Island',11161),(181816,'Cocagne',11161),\
					(181817,'Grand Manan Island',11161),(181833,'Bathurst Inlet',11172),\
					(181834,'Fort Providence',11172),(181837,'Lutselke Snowdrift',11172),\
					(181838,'Victoria Island',11172),(181839,'Auld Cove',11173),(181841,'Bridgetown',11173),\
					(602873,'Halifax (and vicinity)',11173),(602956,'Saint John (and vicinity)',11161),\
					(6023515,'Niagara Falls (and vicinity)',11178),(6034101,'Caraquet',11161),\
					(6049058,'Bayside',11173),(6052310,'Carcross',11216),(6057673,'Labrador',11167),\
					(6057674,'Newfoundland',11167),(6057816,'Northern Ontario',11178),\
					(6057819,'Ottawa - Southeastern Ontario',11178),(6057834,'Canadian Rockies',11111),\
					(6057835,'Central Alberta',11111),(6057836,'Northern Alberta',11111),\
					(6057837,'Southern Alberta',11111),(6057899,'Bathurst (and vicinity)',11161),\
					(6057904,'Campbellton (and vicinity)',11161),\
					(6057910,'Edmundston - Grand Falls (and vicinity)',11161),\
					(6057985,'Abitibi-Temiscamingue',11183),(6057992,'Bas-Saint-Laurent',11183),\
					(6058003,'Charlevoix (and vicinity)',11183),(6058033,'Chaudiere-Appalaches',11183),\
					(6058088,'Eastern Townships',11183),(6058122,'Prince Edward Island',11181),\
					(6058128,'Gaspe Peninsula',11183),(6058134,'Lac Saint-Jean - Saguenay',11183),\
					(6058141,'Lanaudiere - Laurentides',11183),(6058171,'Manicouagan',11183),\
					(6058173,'Mauricie',11183),(6058181,'Montreal - Monteregie',11183),\
					(6058222,'Outaouais',11183),(6058228,'Duplessis',11183),\
					(6058229,'Baie-James - Northern Quebec',11183),(6058253,'Cape Breton Island',11173),\
					(6058263,'Lunenburg (and vicinity)',11173),(6058267,'New Glasgow (and vicinity)',11173),\
					(6058270,'Wolfville (and vicinity)',11173),(6058277,'Northern British Columbia',11117),\
					(6058289,'Cariboo - Chilcotin',11117),(6058311,'Kootenay Rockies',11117),\
					(6058321,'Thompson Okanagan',11117),(6058387,'Vancouver Island',11117),\
					(6058407,'Vancouver Coast',11117),(6085048,'Onanole',11148),\
					(6089478,'Aulavik National Park',11172),(6089482,'Thaydene Nene National Park',11172),\
					(6089502,'Quttinirpaaq National Park',6025605),(6089506,'Ukkusiksalik National Park',6025605),\
					(6089638,'Ivvavik National Park',11216),(6124862,'Cape Dyer',6025605),\
					(6126770,'Perth-Andover',11161),(6126833,'Tracadie',11161),\
					(6128900,'Yarmouth (and vicinity)',11173),(6139777,'Annapolis Royal (and vicinity)',11173),\
					(6140295,'Liverpool (and vicinity)',11173),(6141041,'Winnipeg (and vicinity)',11148),\
					(6141047,'Pembina Valley (and vicinity)',11148),(6141051,'Lake Winnipeg (and vicinity)',11148),\
					(6141055,'Woodstock (and vicinity)',11161),(6141059,'St. Andrews (and vicinity)',11161),\
					(6141062,'Miramichi (and vicinity)',11161),(6149658,'Fairhaven',11161),\
					(6193885,'Kouchibouguac',11161),(6194100,'Sachs Harbour',11172),\
					(6195345,'Haines Junction',11216),(6198750,'Penobsquis',11161),\
					(6210011,'Southern Ontario',11178),(6233322,'Gaspesie National Park',11183),\
					(6234024,'Northern Saskatchewan',11191),(6234030,'West Central Saskatchewan',11191),\
					(6234041,'Southwestern Saskatchewan',11191),(6234053,'Southeastern Saskatchewan',11191),\
					(6234057,'East Central Saskatchewan',11191),(6294307,'Algonquin Provincial Park',11178),\
					(6294386,'Prospect',11173),(6294391,'Hacketts Cove',11173),(6294398,'Great Village',11173),\
					(6294402,'Mont Tremblant National Park',11183),(6294404,'Economy',11173),\
					(6294689,'Notre Dame',11161),(6294703,'Port Elgin',11161),(6294709,'Hopewell Cape',11161),\
					(6294710,'Murray Corner',11161),(6294711,'Plaster Rock',11161),(6294713,'Saint Quentin',11161),\
					(6294775,'Kawartha Highlands Signature Site',11178),(6295178,'Queen Elizabeth II Wildlands',11178),\
					(6297493,'Burntcoat',11173),(6298667,'La Verendrye Wildlife Reserve',11183),\
					(6298815,'Parc National de la Jacques-Cartier',11183),(6298857,'Laurentides Wildlife Reserve',11183),\
					(6299500,'Port Dufferin',11173),(6299683,'Guysborough',11173),(6299685,'Tracadie',11173),\
					(6300569,'Mount Uniacke',11173),(6303207,'New Germany',11173),(6303211,'Roseway',11173),\
					(6303219,'Cape Sable Island',11173),(6303224,'Centreville',11173),(6305651,'Livingstone Cove',11173),\
					(6309819,'Liscomb Island',11173),(6310270,'Marie Joseph',11173),(6310426,'Plympton',11173),\
					(6311712,'Boylston',11173),(6336050,'Larder River Provincial Park',11178),\
					(6336051,'Nagagamisis Provincial Park',11178),(6336052,'Esker Lakes Provincial Park',11178),\
					(6336053,'Kettle Lakes Provincial Park',11178),(6336054,'Dana-Jowsey Lakes Provincial Park',11178),\
					(6336055,'Mississagi Provincial Park',11178),(6336056,'La Cloche Provincial Park',11178),\
					(6336057,'Blue Lake Provincial Park',11178),(6336309,'Rondeau Provincial Park',11178),\
					(6336310,'Hibou Conservation Area',11178),(6336311,'Woodland Caribou Provincial Park',11178),\
					(6336383,'Beechey Island',6025605),(6336458,'Bylot Island',6025605),(6336485,'Coburg Island',6025605),\
					(6336657,'Ellesmere Island',6025605),(6338923,'Centre Rawdon',11173),(6340447,'Brackley Beach',11181),\
					(6340480,'Basswood',11148),(6340774,'Gilbert Plains',11148),(6340848,'Mount Lorne',11216),\
					(6341635,'Bertrand',11161),(6342707,'Larry\\'s River',11173),(6343175,'Harvey',11161),\
					(6343176,'New Horton',11161),(6343227,'Apohaqui',11161),(6344063,'Hatfield Point',11161),\
					(6344073,'Doaktown',11161),(6344287,'Lords Cove',11161),(6344738,'Blacks Harbour',11161),\
					(6344780,'Jemseg',11161),(6345300,'Little Shemogue',11161),(6345541,'Richibucto',11161),\
					(6345652,'Saint Louis de Kent',11161),(6345860,'Marsh Lake',11216),(6345934,'Boissevain',11148),\
					(6345936,'Deloraine',11148),(6346246,'McEvoy Lake',11216),(6346486,'Ludlow',11161),\
					(6346500,'Tatamagouche',11173),(6346783,'Caledonia',11173),(6347021,'Lake Blatchford',11172),\
					(6348035,'Kempt',11173),(6348036,'Cambridge',223);";

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
				"INSERT INTO `continents` VALUES \
				(11700,'Antarctica'),(500001,'North America'),(6022967,'Europe'),\
				(6022969,'Caribbean'),(6023099,'Asia'),(6023117,'South America'),\
				(6023180,'Australia - New Zealand and the South Pacific'),\
				(6023181,'Mexico and Central America'),(6023182,'Middle East'),\
				(6023185,'Africa and Indian Ocean');"
			).then(function() {
				return queryInterface.sequelize.query(
					"INSERT INTO `countries` VALUES (31,'Canada','CA','CAN','124',500001),\
					(201,'United States of America','US','USA','840',500001);"
			).then(function() {
				return queryInterface.sequelize.query(
					"INSERT INTO `provinces` VALUES (202,'Alabama','AL',201),\
					(203,'Alaska','AK',201),(204,'Arizona','AZ',201),\
					(205,'Arkansas','AR',201),(206,'California','CA',201),\
					(207,'Colorado','CO',201),(208,'Connecticut','CT',201),\
					(209,'Delaware','DE',201),(210,'District of Columbia','DC',201),\
					(211,'Florida','FL',201),(212,'Georgia','GA',201),\
					(213,'Hawaii','HI',201),(214,'Idaho','ID',201),(215,'Illinois','IL',201),\
					(216,'Indiana','IN',201),(217,'Iowa','IA',201),(218,'Kansas','KS',201),\
					(219,'Kentucky','KY',201),(220,'Louisiana','LA',201),(221,'Maine','ME',201),\
					(222,'Maryland','MD',201),(223,'Massachusetts','MA',201),\
					(224,'Michigan','MI',201),(225,'Minnesota','MN',201),\
					(226,'Mississippi','MS',201),(227,'Missouri','MO',201),(228,'Montana','MT',201),\
					(229,'Nebraska','NE',201),(230,'Nevada','NV',201),(231,'New Hampshire','NH',201),\
					(232,'New Jersey','NJ',201),(233,'New Mexico','NM',201),(234,'New York','NY',201),\
					(235,'North Carolina','NC',201),(236,'North Dakota','ND',201),(237,'Ohio','OH',201),\
					(238,'Oklahoma','OK',201),(239,'Oregon','OR',201),(240,'Pennsylvania','PA',201),\
					(241,'Rhode Island','RI',201),(242,'South Carolina','SC',201),\
					(243,'South Dakota','SD',201),(244,'Tennessee','TN',201),(245,'Texas','TX',201),\
					(246,'Utah','UT',201),(247,'Vermont','VT',201),(248,'Virginia','VA',201),\
					(249,'Washington','WA',201),(250,'West Virginia','WV',201),\
					(251,'Wisconsin','WI',201),(252,'Wyoming','WY',201),(11111,'Alberta','AB',31),\
					(11117,'British Columbia','BC',31),(11148,'Manitoba','MB',31),\
					(11161,'New Brunswick','NB',31),(11167,'Newfoundland and Labrador','NL',31),\
					(11172,'Northwest Territories','NT',31),(11173,'Nova Scotia','NS',31),\
					(11178,'Ontario','ON',31),(11181,'Prince Edward Island','PE',31),\
					(11183,'Quebec','QC',31),(11191,'Saskatchewan','SK',31),(11216,'Yukon','YT',31),\
					(6025605,'Nunavut','NU',31);"
			).then(function() {
				return queryInterface.sequelize.query(
					citiesData
			).then(function() {
				return queryInterface.sequelize.query(
					"INSERT INTO `addresses` VALUES (1,'27 King\\'s College Circle','','M5S 1A1',4089),\
					(2,'200 University Ave W','','N2L 3G1',7392),(3,'3359 Mississauga Rd','','L5L 1C6',7954),\
					(4,'1265 Military Trail','','M1C 1A4',5680),(5,'Massachusetts Hall','','02138',6348036);"
			).then(function() {
				return queryInterface.sequelize.query(
					"INSERT INTO `account_action_types` VALUES (1,'signin'),\
					(2,'signout'),(3,'signup'),(4,'subscribe'),(5,'unsubscribe'),(6,'deactivate'),\
					(7,'validate'),(8,'reset'),(9,'forgot'),(10,'forgotvalidate');"
			)
		})			
		})
		})
		})
		})
	},

	down: function (queryInterface, Sequelize) {
		return [
			queryInterface.sequelize.query(
				'DELETE FROM user_sessions where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM user_history where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM account_action_types where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM users where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM addresses where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM cities where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM provinces where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM countries where id > 0;'
			),
			queryInterface.sequelize.query(
				'DELETE FROM continents where id > 0;'
			)
		];
	}
};
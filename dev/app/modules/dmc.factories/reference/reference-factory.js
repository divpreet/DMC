(function () {
	'use strict';

	angular.module('dmc.factories.reference', []).factory('referenceDataFactory', ReferenceData);
	ReferenceData.$inject = [];

	function ReferenceData() {

		ReferenceData.global = {
					"defaultBrand": "STG",
					"currentDate": new Date(),
					brands: {
							"wbc": [
									{
											"label": "WBC",
											"value": "WBC"
							},
									{
											"label": "STG",
											"value": "STG"
							},
									{
											"label": "BOM",
											"value": "BOM"
							},
									{
											"label": "BSA",
											"value": "BSA"
							}
							],
							"stg": [{
											"label": "STG",
											"value": "STG"
							},
									{
											"label": "BOM",
											"value": "BOM"
							},
									{
											"label": "BSA",
											"value": "BSA"
							}]
					},
					listKeyValue: {
							"labelName": "label",
							"valueName": "value"
					},
					validation: {
							"empty": "^\s*$",
							"date": "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$"
					}
			};

			ReferenceData.preferences = {
				"errorCodes": {
						"invalidBsb": "E01"
				},
				"validation": {
						"contactNumber": {
								"validateRegex": "^[0-9]*$",
								"validateMaxlength": "10",
								"validateRegexOnBlur": "^0[0-9]{0,9}$",
								"requiredLength": "10",
								"required": true
						},
						"bsbNumber": {
								"wbc": {
										"prefix": "03",
										"validateRegex": "^[0-9]*$",
										"validateMaxlength": "4",
										"requiredLength": "4",
										"required": true
								},
								"nonWbc": {
										"prefix": null,
										"validateRegex": "^[0-9]*$",
										"validateMaxlength": "3",
										"requiredLength": "3",
										"required": true
								}
						}
				}
		};

		ReferenceData.userFactory = {
					"accessBasedOnPermissions": {
							'initiateQuote': 'InitiateQuote',
							'editQuote': 'EditQuote',
							'readOnlyQuote': 'ReadOnlyQuote',
							'brandSwap': 'BrandSwap',
							'subBrandSwap': 'SubBrandSwap',
							'maintainRole': 'MaintainRole',
							'maintainPreference': 'MaintainPreference',
							'defaultPreference': 'DefaultPreference'
					},
					"roles": {
							"wbc": [{
											"label": "Customer Contact Centre",
											"value": "ccc"
							}, {
											"label": "Home Finance Manager",
											"value": "hfm"
							},
									{
											"label": "Pricing Hotline",
											"value": "hotline"
							},
									{
											"label": "Premium Banker",
											"value": "premrm"
							},
									{
											"label": "SME Banker",
											"value": "smerm"
							},
									{
											"label": "WBC Operations team",
											"value": "lmi"
							}],
							"nonWbc": [{
											"label": "Customer Contact Centre",
											"value": "ccc"
							},
									{
											"label": "Pricing Hotline",
											"value": "hotline"
							},
									{
											"label": "Lending Manager",
											"value": "lendmgr"
							},
									{
											"label": "Premium Banker",
											"value": "premrm"
							},
									{
											"label": "SME Banker",
											"value": "smerm"
							},
									{
											"label": "STG Operations team",
											"value": "rlhd"
							}]
					}
			};

			ReferenceData.IDV = {
				"states": [{
                "id": 'ACT',
                "name": 'Australian Capital Territory (ACT)'
            }, {
                "id": 'NSW',
                "name": 'New South Wales (NSW)'
            }, {
                "id": 'NT',
                "name": 'Northern Territory (NT)'
            }, {
                "id": 'QLD',
                "name": 'Queensland (QLD)'
            }, {
                "id": 'SA',
                "name": 'South Australia (SA)'
            }, {
                "id": 'TAS',
                "name": 'Tasmania (TAS)'
            }, {
                "id": 'VIC',
                "name": 'Victoria (VIC)'
            }, {
                "id": 'WA',
                "name": 'Western Australia (WA)'
            }],

						"countries": [{
                code: "AFG",
                name: "AFGHANISTAN"
            }, {
                code: "ALA",
                name: "ALAND ISLANDS"
            }, {
                code: "ALB",
                name: "ALBANIA"
            }, {
                code: "DZA",
                name: "ALGERIA"
            }, {
                code: "ASM",
                name: "AMERICAN SAMOA"
            }, {
                code: "AND",
                name: "ANDORRA"
            }, {
                code: "AGO",
                name: "ANGOLA"
            }, {
                code: "AIA",
                name: "ANGUILLA"
            }, {
                code: "ATA",
                name: "ANTARCTICA"
            }, {
                code: "ATG",
                name: "ANTIGUA AND BARBUDA"
            }, {
                code: "ARG",
                name: "ARGENTINA"
            }, {
                code: "ARM",
                name: "ARMENIA"
            }, {
                code: "ABW",
                name: "ARUBA"
            }, {
                code: "AUS",
                name: "AUSTRALIA"
            }, {
                code: "AUT",
                name: "AUSTRIA"
            }, {
                code: "AZE",
                name: "AZERBAIJAN"
            }, {
                code: "BHS",
                name: "BAHAMAS"
            }, {
                code: "BHR",
                name: "BAHRAIN"
            }, {
                code: "BGD",
                name: "BANGLADESH"
            }, {
                code: "BRB",
                name: "BARBADOS"
            }, {
                code: "BLR",
                name: "BELARUS"
            }, {
                code: "BEL",
                name: "BELGIUM"
            }, {
                code: "BLZ",
                name: "BELIZE"
            }, {
                code: "BEN",
                name: "BENIN"
            }, {
                code: "BMU",
                name: "BERMUDA"
            }, {
                code: "BTN",
                name: "BHUTAN"
            }, {
                code: "BOL",
                name: "BOLIVIA,PLURINATIONAL STATE OF"
            }, {
                code: "BES",
                name: "BONAIRE, SINT EUSTATIUS & SABA"
            }, {
                code: "BIH",
                name: "BOSNIA AND HERZEGOVINA"
            }, {
                code: "BWA",
                name: "BOTSWANA"
            }, {
                code: "BVT",
                name: "BOUVET ISLAND"
            }, {
                code: "BRA",
                name: "BRAZIL"
            }, {
                code: "IOT",
                name: "BRITISH INDIAN OCEAN TERRITORY"
            }, {
                code: "BRN",
                name: "BRUNEI DARUSSALAM"
            }, {
                code: "BGR",
                name: "BULGARIA"
            }, {
                code: "BFA",
                name: "BURKINA FASO"
            }, {
                code: "BDI",
                name: "BURUNDI"
            }, {
                code: "KHM",
                name: "CAMBODIA"
            }, {
                code: "CMR",
                name: "CAMEROON"
            }, {
                code: "CAN",
                name: "CANADA"
            }, {
                code: "CPV",
                name: "CAPE VERDE"
            }, {
                code: "CYM",
                name: "CAYMAN ISLANDS"
            }, {
                code: "CAF",
                name: "CENTRAL AFRICAN REPUBLIC"
            }, {
                code: "TCD",
                name: "CHAD"
            }, {
                code: "CHL",
                name: "CHILE"
            }, {
                code: "CHN",
                name: "CHINA"
            }, {
                code: "CXR",
                name: "CHRISTMAS ISLAND"
            }, {
                code: "CCK",
                name: "COCOS (KEELING) ISLANDS"
            }, {
                code: "COL",
                name: "COLOMBIA"
            }, {
                code: "COM",
                name: "COMOROS"
            }, {
                code: "COG",
                name: "CONGO"
            }, {
                code: "COD",
                name: "CONGO, THE DEMOCRATIC REP OF"
            }, {
                code: "COK",
                name: "COOK ISLANDS"
            }, {
                code: "CRI",
                name: "COSTA RICA"
            }, {
                code: "CIV",
                name: "COTE D'IVOIRE"
            }, {
                code: "HRV",
                name: "CROATIA"
            }, {
                code: "CUB",
                name: "CUBA"
            }, {
                code: "CUW",
                name: "CURACAO"
            }, {
                code: "CYP",
                name: "CYPRUS"
            }, {
                code: "CZE",
                name: "CZECH REPUBLIC"
            }, {
                code: "DNK",
                name: "DENMARK"
            }, {
                code: "DJI",
                name: "DJIBOUTI"
            }, {
                code: "DMA",
                name: "DOMINICA"
            }, {
                code: "DOM",
                name: "DOMINICAN REPUBLIC"
            }, {
                code: "ECU",
                name: "ECUADOR"
            }, {
                code: "EGY",
                name: "EGYPT"
            }, {
                code: "SLV",
                name: "EL SALVADOR"
            }, {
                code: "GNQ",
                name: "EQUATORIAL GUINEA"
            }, {
                code: "ERI",
                name: "ERITREA"
            }, {
                code: "EST",
                name: "ESTONIA"
            }, {
                code: "ETH",
                name: "ETHIOPIA"
            }, {
                code: "FLK",
                name: "FALKLAND ISLANDS (MALVINAS)"
            }, {
                code: "FRO",
                name: "FAROE ISLANDS"
            }, {
                code: "FJI",
                name: "FIJI"
            }, {
                code: "FIN",
                name: "FINLAND"
            }, {
                code: "FRA",
                name: "FRANCE"
            }, {
                code: "GUF",
                name: "FRENCH GUIANA"
            }, {
                code: "PYF",
                name: "FRENCH POLYNESIA"
            }, {
                code: "ATF",
                name: "FRENCH SOUTHERN TERRITORIES"
            }, {
                code: "GAB",
                name: "GABON"
            }, {
                code: "GMB",
                name: "GAMBIA"
            }, {
                code: "GEO",
                name: "GEORGIA"
            }, {
                code: "DEU",
                name: "GERMANY"
            }, {
                code: "GHA",
                name: "GHANA"
            }, {
                code: "GIB",
                name: "GIBRALTAR"
            }, {
                code: "GRC",
                name: "GREECE"
            }, {
                code: "GRL",
                name: "GREENLAND"
            }, {
                code: "GRD",
                name: "GRENADA"
            }, {
                code: "GLP",
                name: "GUADELOUPE"
            }, {
                code: "GUM",
                name: "GUAM"
            }, {
                code: "GTM",
                name: "GUATEMALA"
            }, {
                code: "GGY",
                name: "GUERNSEY"
            }, {
                code: "GIN",
                name: "GUINEA"
            }, {
                code: "GNB",
                name: "GUINEA-BISSAU"
            }, {
                code: "GUY",
                name: "GUYANA"
            }, {
                code: "HTI",
                name: "HAITI"
            }, {
                code: "HMD",
                name: "HEARD ISLAND & MCDONALD ISLAND"
            }, {
                code: "VAT",
                name: "HOLY SEE (VATICAN CITY STATE)"
            }, {
                code: "HND",
                name: "HONDURAS"
            }, {
                code: "HKG",
                name: "HONG KONG"
            }, {
                code: "HUN",
                name: "HUNGARY"
            }, {
                code: "ISL",
                name: "ICELAND"
            }, {
                code: "IND",
                name: "INDIA"
            }, {
                code: "IDN",
                name: "INDONESIA"
            }, {
                code: "IRN",
                name: "IRAN, ISLAMIC REPUBLIC OF"
            }, {
                code: "IRQ",
                name: "IRAQ"
            }, {
                code: "IRL",
                name: "IRELAND"
            }, {
                code: "IMN",
                name: "ISLE OF MAN"
            }, {
                code: "ISR",
                name: "ISRAEL"
            }, {
                code: "ITA",
                name: "ITALY"
            }, {
                code: "JAM",
                name: "JAMAICA"
            }, {
                code: "JPN",
                name: "JAPAN"
            }, {
                code: "JEY",
                name: "JERSEY"
            }, {
                code: "JOR",
                name: "JORDAN"
            }, {
                code: "KAZ",
                name: "KAZAKHSTAN"
            }, {
                code: "KEN",
                name: "KENYA"
            }, {
                code: "KIR",
                name: "KIRIBATI"
            }, {
                code: "PRK",
                name: "KOREA, DEMOCRATIC PEOPLE'S REP"
            }, {
                code: "KOR",
                name: "KOREA, REPUBLIC OF"
            }, {
                code: "KWT",
                name: "KUWAIT"
            }, {
                code: "KGZ",
                name: "KYRGYZSTAN"
            }, {
                code: "LAO",
                name: "LAO PEOPLE'S DEMOCRATIC REP"
            }, {
                code: "LVA",
                name: "LATVIA"
            }, {
                code: "LBN",
                name: "LEBANON"
            }, {
                code: "LSO",
                name: "LESOTHO"
            }, {
                code: "LBR",
                name: "LIBERIA"
            }, {
                code: "LBY",
                name: "LIBYA"
            }, {
                code: "LIE",
                name: "LIECHTENSTEIN"
            }, {
                code: "LTU",
                name: "LITHUANIA"
            }, {
                code: "LUX",
                name: "LUXEMBOURG"
            }, {
                code: "MAC",
                name: "MACAO"
            }, {
                code: "MKD",
                name: "MACEDONIA, FORMER YUGOSLAV REP"
            }, {
                code: "MDG",
                name: "MADAGASCAR"
            }, {
                code: "MWI",
                name: "MALAWI"
            }, {
                code: "MYS",
                name: "MALAYSIA"
            }, {
                code: "MDV",
                name: "MALDIVES"
            }, {
                code: "MLI",
                name: "MALI"
            }, {
                code: "MLT",
                name: "MALTA"
            }, {
                code: "MHL",
                name: "MARSHALL ISLANDS"
            }, {
                code: "MTQ",
                name: "MARTINIQUE"
            }, {
                code: "MRT",
                name: "MAURITANIA"
            }, {
                code: "MUS",
                name: "MAURITIUS"
            }, {
                code: "MYT",
                name: "MAYOTTE"
            }, {
                code: "MEX",
                name: "MEXICO"
            }, {
                code: "FSM",
                name: "MICRONESIA,FEDERATED STATES OF"
            }, {
                code: "MDA",
                name: "MOLDOVA, REPUBLIC OF"
            }, {
                code: "MCO",
                name: "MONACO"
            }, {
                code: "MNG",
                name: "MONGOLIA"
            }, {
                code: "MNE",
                name: "MONTENEGRO"
            }, {
                code: "MSR",
                name: "MONTSERRAT"
            }, {
                code: "MAR",
                name: "MOROCCO"
            }, {
                code: "MOZ",
                name: "MOZAMBIQUE"
            }, {
                code: "MMR",
                name: "MYANMAR"
            }, {
                code: "NAM",
                name: "NAMIBIA"
            }, {
                code: "NRU",
                name: "NAURU"
            }, {
                code: "NPL",
                name: "NEPAL"
            }, {
                code: "NLD",
                name: "NETHERLANDS"
            }, {
                code: "NCL",
                name: "NEW CALEDONIA"
            }, {
                code: "NZL",
                name: "NEW ZEALAND"
            }, {
                code: "NIC",
                name: "NICARAGUA"
            }, {
                code: "NER",
                name: "NIGER"
            }, {
                code: "NGA",
                name: "NIGERIA"
            }, {
                code: "NIU",
                name: "NIUE"
            }, {
                code: "MNP",
                name: "NORTHERN MARIANA ISLANDS"
            }, {
                code: "NOR",
                name: "NORWAY"
            }, {
                code: "OMN",
                name: "OMAN"
            }, {
                code: "PAK",
                name: "PAKISTAN"
            }, {
                code: "PLW",
                name: "PALAU"
            }, {
                code: "PSE",
                name: "PALESTINIAN TERRITORY OCCUPIED"
            }, {
                code: "PAN",
                name: "PANAMA"
            }, {
                code: "PNG",
                name: "PAPUA NEW GUINEA"
            }, {
                code: "PRY",
                name: "PARAGUAY"
            }, {
                code: "PER",
                name: "PERU"
            }, {
                code: "PHL",
                name: "PHILIPPINES"
            }, {
                code: "PCN",
                name: "PITCAIRN"
            }, {
                code: "POL",
                name: "POLAND"
            }, {
                code: "PRT",
                name: "PORTUGAL"
            }, {
                code: "PRI",
                name: "PUERTO RICO"
            }, {
                code: "QAT",
                name: "QATAR"
            }, {
                code: "REU",
                name: "REUNION"
            }, {
                code: "ROU",
                name: "ROMANIA"
            }, {
                code: "RUS",
                name: "RUSSIAN FEDERATION"
            }, {
                code: "RWA",
                name: "RWANDA"
            }, {
                code: "BLM",
                name: "SAINT BARTHELEMY"
            }, {
                code: "SHN",
                name: "SAINT HELENA"
            }, {
                code: "KNA",
                name: "SAINT KITTS AND NEVIS"
            }, {
                code: "LCA",
                name: "SAINT LUCIA"
            }, {
                code: "MAF",
                name: "SAINT MARTIN (FRENCH PART)"
            }, {
                code: "SPM",
                name: "SAINT PIERRE AND MIQUELON"
            }, {
                code: "VCT",
                name: "SAINT VINCENT & THE GRENADINES"
            }, {
                code: "WSM",
                name: "SAMOA"
            }, {
                code: "SMR",
                name: "SAN MARINO"
            }, {
                code: "STP",
                name: "SAO TOME AND PRINCIPE"
            }, {
                code: "SAU",
                name: "SAUDI ARABIA"
            }, {
                code: "SEN",
                name: "SENEGAL"
            }, {
                code: "SRB",
                name: "SERBIA"
            }, {
                code: "SYC",
                name: "SEYCHELLES"
            }, {
                code: "SLE",
                name: "SIERRA LEONE"
            }, {
                code: "SGP",
                name: "SINGAPORE"
            }, {
                code: "SXM",
                name: "SINT MAARTEN (DUTCH PART)"
            }, {
                code: "SVK",
                name: "SLOVAKIA"
            }, {
                code: "SVN",
                name: "SLOVENIA"
            }, {
                code: "SLB",
                name: "SOLOMON ISLANDS"
            }, {
                code: "SOM",
                name: "SOMALIA"
            }, {
                code: "ZAF",
                name: "SOUTH AFRICA"
            }, {
                code: "SSD",
                name: "SOUTH SUDAN"
            }, {
                code: "ESP",
                name: "SPAIN"
            }, {
                code: "LKA",
                name: "SRI LANKA"
            }, {
                code: "SGS",
                name: "STH GEORGIA - STH SANDWICH IS"
            }, {
                code: "SDN",
                name: "SUDAN"
            }, {
                code: "SUR",
                name: "SURINAME"
            }, {
                code: "SJM",
                name: "SVALBARD & JAN MAYEN"
            }, {
                code: "SWZ",
                name: "SWAZILAND"
            }, {
                code: "SWE",
                name: "SWEDEN"
            }, {
                code: "CHE",
                name: "SWITZERLAND"
            }, {
                code: "SYR",
                name: "SYRIAN ARAB REPUBLIC"
            }, {
                code: "TWN",
                name: "TAIWAN"
            }, {
                code: "TJK",
                name: "TAJIKISTAN"
            }, {
                code: "TZA",
                name: "TANZANIA, UNITED REPUBLIC OF"
            }, {
                code: "THA",
                name: "THAILAND"
            }, {
                code: "TLS",
                name: "TIMOR-LESTE"
            }, {
                code: "TGO",
                name: "TOGO"
            }, {
                code: "TKL",
                name: "TOKELAU"
            }, {
                code: "TON",
                name: "TONGA"
            }, {
                code: "TTO",
                name: "TRINIDAD AND TOBAGO"
            }, {
                code: "TUN",
                name: "TUNISIA"
            }, {
                code: "TUR",
                name: "TURKEY"
            }, {
                code: "TKM",
                name: "TURKMENISTAN"
            }, {
                code: "TCA",
                name: "TURKS AND CAICOS ISLANDS"
            }, {
                code: "TUV",
                name: "TUVALU"
            }, {
                code: "UMI",
                name: "U S MINOR OUTLYING IS"
            }, {
                code: "UGA",
                name: "UGANDA"
            }, {
                code: "UKR",
                name: "UKRAINE"
            }, {
                code: "ARE",
                name: "UNITED ARAB EMIRATES"
            }, {
                code: "GBR",
                name: "UNITED KINGDOM"
            }, {
                code: "USA",
                name: "UNITED STATES"
            }, {
                code: "999",
                name: "UNKNOWN COUNTRY"
            }, {
                code: "URY",
                name: "URUGUAY"
            }, {
                code: "UZB",
                name: "UZBEKISTAN"
            }, {
                code: "VUT",
                name: "VANUATU"
            }, {
                code: "VEN",
                name: "VENEZUELA, BOLIVARIAN REP OF"
            }, {
                code: "VNM",
                name: "VIET NAM"
            }, {
                code: "VGB",
                name: "VIRGIN ISLANDS, BRITISH"
            }, {
                code: "VIR",
                name: "VIRGIN ISLANDS, US"
            }, {
                code: "WLF",
                name: "WALLIS AND FUTUNA"
            }, {
                code: "ESH",
                name: "WESTERN SAHARA"
            }, {
                code: "YEM",
                name: "YEMEN"
            }, {
                code: "ZMB",
                name: "ZAMBIA"
            }, {
                code: "ZWE",
                name: "ZIMBABWE"
            }]
			};

			ReferenceData.DateInput = {
				"day": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
            ],
            "months": [{
                "id": '01',
                "value": 'Jan'
            }, {
                "id": '02',
                "value": 'Feb'
            }, {
                "id": '03',
                "value": 'Mar'
            }, {
                "id": '04',
                "value": 'Apr'
            }, {
                "id": '05',
                "value": 'May'
            }, {
                "id": '06',
                "value": 'Jun'
            }, {
                "id": '07',
                "value": 'Jul'
            }, {
                "id": '08',
                "value": 'Aug'
            }, {
                "id": '09',
                "value": 'Sept'
            }, {
                "id": '10',
                "value": 'Oct'
            }, {
                "id": '11',
                "value": 'Nov'
            }, {
                "id": '12',
                "value": 'Dec'
            }],

				"getYears": function() {
							var currentDate = new Date().getFullYear();
							var yearList = [];
							for (var i = currentDate - 12; i > currentDate - 120; i--) {
									yearList.push({
											id: i,
											value: i
									});
							}
							return yearList;
					}

			};


		return ReferenceData;
	}

})();

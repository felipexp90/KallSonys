'use strict';

angular.module('CheckOut', ["LocalStorageModule"])
.controller("ControllerCheckOut", 
	['$scope', '$location', '$http', 'localStorageService',
    function ($scope, $location, $http, localStorageService) {
try{
		var urlcart = "http://laptop-diego:9091/api/shoppingCart/CC80000644/subtotal";
		var urlcheckout = "http://laptop-diego:9091/api/shoppingCart/CC80000644/checkout";
		var urlpayment = "http://laptop-diego:9091/api/shoppingCart/CC80000644/procesarpago";
		$scope.ciudades=["MEDELLIN",	"ABEJORRAL",	"ABRIAQUI",	"ALEJANDRIA",	"AMAGA",	"AMALFI",	"ANDES",	"ANGELOPOLIS",	"ANGOSTURA",	"ANORI",	"SANTAFE DE ANTIOQUIA",	"ANZA",	"APARTADO",	"ARBOLETES",	"ARGELIA",	"ARMENIA",	"BARBOSA",	"BELMIRA",	"BELLO",	"BETANIA",	"BETULIA",	"CIUDAD BOLIVAR",	"BRICEÑO",	"BURITICA",	"CACERES",	"CAICEDO",	"CALDAS",	"CAMPAMENTO",	"CAÑASGORDAS",	"CARACOLI",	"CARAMANTA",	"CAREPA",	"EL CARMEN DE VIBORAL",	"CAROLINA",	"CAUCASIA",	"CHIGORODO",	"CISNEROS",	"COCORNA",	"CONCEPCION",	"CONCORDIA",	"COPACABANA",	"DABEIBA",	"DON MATIAS",	"EBEJICO",	"EL BAGRE",	"ENTRERRIOS",	"ENVIGADO",	"FREDONIA",	"FRONTINO",	"GIRALDO",	"GIRARDOTA",	"GOMEZ PLATA",	"GRANADA",	"GUADALUPE",	"GUARNE",	"GUATAPE",	"HELICONIA",	"HISPANIA",	"ITAGUI",	"ITUANGO",	"JARDIN",	"JERICO",	"LA CEJA",	"LA ESTRELLA",	"LA PINTADA",	"LA UNION",	"LIBORINA",	"MACEO",	"MARINILLA",	"MONTEBELLO",	"MURINDO",	"MUTATA",	"NARIÑO",	"NECOCLI",	"NECHI",	"OLAYA",	"PEÐOL",	"PEQUE",	"PUEBLORRICO",	"PUERTO BERRIO",	"PUERTO NARE",	"PUERTO TRIUNFO",	"REMEDIOS",	"RETIRO",	"RIONEGRO",	"SABANALARGA",	"SABANETA",	"SALGAR",	"SAN ANDRES DE CUERQUIA",	"SAN CARLOS",	"SAN FRANCISCO",	"SAN JERONIMO",	"SAN JOSE DE LA MONTAÑA",	"SAN JUAN DE URABA",	"SAN LUIS",	"SAN PEDRO",	"SAN PEDRO DE URABA",	"SAN RAFAEL",	"SAN ROQUE",	"SAN VICENTE",	"SANTA BARBARA",	"SANTA ROSA DE OSOS",	"SANTO DOMINGO",	"EL SANTUARIO",	"SEGOVIA",	"SONSON",	"SOPETRAN",	"TAMESIS",	"TARAZA",	"TARSO",	"TITIRIBI",	"TOLEDO",	"TURBO",	"URAMITA",	"URRAO",	"VALDIVIA",	"VALPARAISO",	"VEGACHI",	"VENECIA",	"VIGIA DEL FUERTE",	"YALI",	"YARUMAL",	"YOLOMBO",	"YONDO",	"ZARAGOZA",	"BARRANQUILLA",	"BARANOA",	"CAMPO DE LA CRUZ",	"CANDELARIA",	"GALAPA",	"JUAN DE ACOSTA",	"LURUACO",	"MALAMBO",	"MANATI",	"PALMAR DE VARELA",	"PIOJO",	"POLONUEVO",	"PONEDERA",	"PUERTO COLOMBIA",	"REPELON",	"SABANAGRANDE",	"SANTA LUCIA",	"SANTO TOMAS",	"SOLEDAD",	"SUAN",	"TUBARA",	"USIACURI",	"BOGOTA, D.C.",	"CARTAGENA",	"ACHI",	"ALTOS DEL ROSARIO",	"ARENAL",	"ARJONA",	"ARROYOHONDO",	"BARRANCO DE LOBA",	"CALAMAR",	"CANTAGALLO",	"CICUCO",	"CORDOBA",	"CLEMENCIA",	"EL CARMEN DE BOLIVAR",	"EL GUAMO",	"EL PEÑON",	"HATILLO DE LOBA",	"MAGANGUE",	"MAHATES",	"MARGARITA",	"MARIA LA BAJA",	"MONTECRISTO",	"MOMPOS",	"NOROSI",	"MORALES",	"PINILLOS",	"REGIDOR",	"RIO VIEJO",	"SAN CRISTOBAL",	"SAN ESTANISLAO",	"SAN FERNANDO",	"SAN JACINTO",	"SAN JACINTO DEL CAUCA",	"SAN JUAN NEPOMUCENO",	"SAN MARTIN DE LOBA",	"SAN PABLO",	"SANTA CATALINA",	"SANTA ROSA",	"SANTA ROSA DEL SUR",	"SIMITI",	"SOPLAVIENTO",	"TALAIGUA NUEVO",	"TIQUISIO",	"TURBACO",	"TURBANA",	"VILLANUEVA",	"ZAMBRANO",	"TUNJA",	"ALMEIDA",	"AQUITANIA",	"ARCABUCO",	"BELEN",	"BERBEO",																																	
						"BETEITIVA",	"BOAVITA",	"BOYACA",	"BUENAVISTA",	"BUSBANZA",	"CAMPOHERMOSO",	"CERINZA",	"CHINAVITA",	"CHIQUINQUIRA",	"CHISCAS",	"CHITA",	"CHITARAQUE",	"CHIVATA",	"CIENEGA",	"COMBITA",	"COPER",	"CORRALES",	"COVARACHIA",	"CUBARA",	"CUCAITA",	"CUITIVA",	"CHIQUIZA",	"CHIVOR",	"DUITAMA",	"EL COCUY",	"EL ESPINO",	"FIRAVITOBA",	"FLORESTA",	"GACHANTIVA",	"GAMEZA",	"GARAGOA",	"GUACAMAYAS",	"GUATEQUE",	"GUAYATA",	"GsICAN",	"IZA",	"JENESANO",	"LABRANZAGRANDE",	"LA CAPILLA",	"LA VICTORIA",	"LA UVITA",	"VILLA DE LEYVA",	"MACANAL",	"MARIPI",	"MIRAFLORES",	"MONGUA",	"MONGUI",	"MONIQUIRA",	"MOTAVITA",	"MUZO",	"NOBSA",	"NUEVO COLON",	"OICATA",	"OTANCHE",	"PACHAVITA",	"PAEZ",	"PAIPA",	"PAJARITO",	"PANQUEBA",	"PAUNA",	"PAYA",	"PAZ DE RIO",	"PESCA",	"PISBA",	"PUERTO BOYACA",	"QUIPAMA",	"RAMIRIQUI",	"RAQUIRA",	"RONDON",	"SABOYA",	"SACHICA",	"SAMACA",	"SAN EDUARDO",	"SAN JOSE DE PARE",	"SAN LUIS DE GACENO",	"SAN MATEO",	"SAN MIGUEL DE SEMA",	"SAN PABLO DE BORBUR",	"SANTANA",	"SANTA MARIA",	"SANTA ROSA DE VITERBO",	"SANTA SOFIA",	"SATIVANORTE",	"SATIVASUR",	"SIACHOQUE",	"SOATA",	"SOCOTA",	"SOCHA",	"SOGAMOSO",	"SOMONDOCO",	"SORA",	"SOTAQUIRA",	"SORACA",	"SUSACON",	"SUTAMARCHAN",	"SUTATENZA",	"TASCO",	"TENZA",	"TIBANA",	"TIBASOSA",	"TINJACA",	"TIPACOQUE",	"TOCA",	"TOGsI",	"TOPAGA",	"TOTA",	"TUNUNGUA",	"TURMEQUE",	"TUTA",	"TUTAZA",	"UMBITA",	"VENTAQUEMADA",	"VIRACACHA",	"ZETAQUIRA",	"MANIZALES",	"AGUADAS",	"ANSERMA",	"ARANZAZU",	"BELALCAZAR",	"CHINCHINA",	"FILADELFIA",	"LA DORADA",	"LA MERCED",	"MANZANARES",	"MARMATO",	"MARQUETALIA",	"MARULANDA",	"NEIRA",	"NORCASIA",	"PACORA",	"PALESTINA",	"PENSILVANIA",	"RIOSUCIO",	"RISARALDA",	"SALAMINA",	"SAMANA",	"SAN JOSE",	"SUPIA",	"VICTORIA",	"VILLAMARIA",	"VITERBO",	"FLORENCIA",	"ALBANIA",	"BELEN DE LOS ANDAQUIES",	"CARTAGENA DEL CHAIRA",	"CURILLO",	"EL DONCELLO",	"EL PAUJIL",	"LA MONTAÑITA",	"MILAN",	"MORELIA",	"PUERTO RICO",	"SAN JOSE DEL FRAGUA",	"SAN VICENTE DEL CAGUAN",	"SOLANO",	"SOLITA",	"POPAYAN",	"ALMAGUER",	"BALBOA",	"BOLIVAR",	"BUENOS AIRES",	"CAJIBIO",	"CALDONO",	"CALOTO",	"CORINTO",	"EL TAMBO",	"GUACHENE",	"GUAPI",	"INZA",	"JAMBALO",	"LA SIERRA",	"LA VEGA",	"LOPEZ",	"MERCADERES",	"MIRANDA",	"PADILLA",	"PATIA",	"PIAMONTE",	"PIENDAMO",	"PUERTO TEJADA",	"PURACE",	"ROSAS",	"SAN SEBASTIAN",	"SANTANDER DE QUILICHAO",	"SILVIA",	"SOTARA",	"SUAREZ",	"SUCRE",	"TIMBIO",	"TIMBIQUI",	"TORIBIO",	"TOTORO",	"VILLA RICA",	"VALLEDUPAR",	"AGUACHICA",	"AGUSTIN CODAZZI",	"ASTREA",	"BECERRIL",	"BOSCONIA",	"CHIMICHAGUA","CHIRIGUANA",	"CURUMANI",	"EL COPEY",	"EL PASO",	"GAMARRA",	"GONZALEZ",	"LA GLORIA",	"LA JAGUA DE IBIRICO",	"MANAURE",	"PAILITAS",	
						"PELAYA",	"PUEBLO BELLO",	"RIO DE ORO",	"LA PAZ",	"SAN ALBERTO",	"SAN DIEGO",	"SAN MARTIN",	"TAMALAMEQUE",	"MONTERIA",	"AYAPEL",	"CANALETE",	"CERETE",	"CHIMA",	"CHINU",	"CIENAGA DE ORO",	"COTORRA",	"LA APARTADA",	"LORICA",	"LOS CORDOBAS",	"MOMIL",	"MONTELIBANO",	"MOÑITOS",	"PLANETA RICA",	"PUEBLO NUEVO",	"PUERTO ESCONDIDO",	"PUERTO LIBERTADOR",	"PURISIMA",	"SAHAGUN",	"SAN ANDRES SOTAVENTO",	"SAN ANTERO",	"SAN BERNARDO DEL VIENTO",	"SAN PELAYO",	"TIERRALTA",	"VALENCIA",	"AGUA DE DIOS",	"ALBAN",	"ANAPOIMA",	"ANOLAIMA",	"ARBELAEZ",	"BELTRAN",	"BITUIMA",	"BOJACA",	"CABRERA",	"CACHIPAY",	"CAJICA",	"CAPARRAPI",	"CAQUEZA",	"CARMEN DE CARUPA",	"CHAGUANI",	"CHIA",	"CHIPAQUE",	"CHOACHI",	"CHOCONTA",	"COGUA",	"COTA",	"CUCUNUBA",	"EL COLEGIO",	"EL ROSAL",	"FACATATIVA",	"FOMEQUE",	"FOSCA",	"FUNZA",	"FUQUENE",	"FUSAGASUGA",	"GACHALA",	"GACHANCIPA",	"GACHETA",	"GAMA",	"GIRARDOT",	"GUACHETA",	"GUADUAS",	"GUASCA",	"GUATAQUI",	"GUATAVITA",	"GUAYABAL DE SIQUIMA",	"GUAYABETAL",	"GUTIERREZ",	"JERUSALEN",	"JUNIN",	"LA CALERA",	"LA MESA",	"LA PALMA",	"LA PEÑA",	"LENGUAZAQUE",	"MACHETA",	"MADRID",	"MANTA",	"MEDINA",	"MOSQUERA",	"NEMOCON",	"NILO",	"NIMAIMA",	"NOCAIMA",	"PACHO",	"PAIME",	"PANDI",	"PARATEBUENO",	"PASCA",	"PUERTO SALGAR",	"PULI",	"QUEBRADANEGRA",	"QUETAME",	"QUIPILE",	"APULO",	"RICAURTE",	"SAN ANTONIO DEL TEQUENDAMA",	"SAN BERNARDO",	"SAN CAYETANO",	"SAN JUAN DE RIO SECO",	"SASAIMA",	"SESQUILE",	"SIBATE",	"SILVANIA",	"SIMIJACA",	"SOACHA",	"SOPO",	"SUBACHOQUE",	"SUESCA",	"SUPATA",	"SUSA",	"SUTATAUSA",	"TABIO",	"TAUSA",	"TENA",	"TENJO",	"TIBACUY",	"TIBIRITA",	"TOCAIMA",	"TOCANCIPA",	"TOPAIPI",	"UBALA",	"UBAQUE",	"VILLA DE SAN DIEGO DE UBATE",	"UNE",	"UTICA",	"VERGARA",	"VIANI",	"VILLAGOMEZ",	"VILLAPINZON",	"VILLETA",	"VIOTA",	"YACOPI",	"ZIPACON",	"ZIPAQUIRA",	"QUIBDO",	"ACANDI",	"ALTO BAUDO",	"ATRATO",	"BAGADO",	"BAHIA SOLANO",	"BAJO BAUDO",	"BOJAYA",	"EL CANTON DEL SAN PABLO",	"CARMEN DEL DARIEN",	"CERTEGUI",	"CONDOTO",	"EL CARMEN DE ATRATO",	"EL LITORAL DEL SAN JUAN",	"ISTMINA",	"JURADO",	"LLORO",	"MEDIO ATRATO",	"MEDIO BAUDO",	"MEDIO SAN JUAN",	"NOVITA",	"NUQUI",	"RIO IRO",	"RIO QUITO",	"SAN JOSE DEL PALMAR",	"SIPI",	"TADO",	"UNGUIA",	"UNION PANAMERICANA",	"NEIVA",	"ACEVEDO",	"AGRADO",	"AIPE",	"ALGECIRAS",	"ALTAMIRA",	"BARAYA",	"CAMPOALEGRE",	"COLOMBIA",	"ELIAS",	"GARZON",	"GIGANTE",	"HOBO",	"IQUIRA",	"ISNOS",	"LA ARGENTINA",	"LA PLATA",	"NATAGA",	"OPORAPA",	"PAICOL",	"PALERMO",	"PITAL",	"PITALITO",	"RIVERA",	"SALADOBLANCO",	"SAN AGUSTIN",	"SUAZA",	"TARQUI",	"TESALIA",	"TELLO",	"TERUEL",	"TIMANA",	"VILLAVIEJA",	"YAGUARA",	"RIOHACHA",	"BARRANCAS",	"DIBULLA",	"DISTRACCION",	"EL MOLINO",	
"FONSECA",	"HATONUEVO",	"LA JAGUA DEL PILAR",	"MAICAO",	"SAN JUAN DEL CESAR",	"URIBIA",	"URUMITA",	"SANTA MARTA",	"ALGARROBO",	"ARACATACA",	"ARIGUANI",	"CERRO SAN ANTONIO",	"CHIBOLO",	"CIENAGA",	"EL BANCO",	"EL PIÑON",	"EL RETEN",	"FUNDACION",	"GUAMAL",	"NUEVA GRANADA",	"PEDRAZA",	"PIJIÑO DEL CARMEN",	"PIVIJAY",	"PLATO",	"PUEBLOVIEJO",	"REMOLINO",	"SABANAS DE SAN ANGEL",	"SAN SEBASTIAN DE BUENAVISTA",	"SAN ZENON",	"SANTA ANA",	"SANTA BARBARA DE PINTO",	"SITIONUEVO",	"TENERIFE",	"ZAPAYAN",	"ZONA BANANERA",	"VILLAVICENCIO",	"ACACIAS",	"BARRANCA DE UPIA",	"CABUYARO",	"CASTILLA LA NUEVA",	"CUBARRAL",	"CUMARAL",	"EL CALVARIO",	"EL CASTILLO",	"EL DORADO",	"FUENTE DE ORO",	"MAPIRIPAN",	"MESETAS",	"LA MACARENA",	"URIBE",	"LEJANIAS",	"PUERTO CONCORDIA",	"PUERTO GAITAN",	"PUERTO LOPEZ",	"PUERTO LLERAS",	"RESTREPO",	"SAN CARLOS DE GUAROA",	"SAN JUAN DE ARAMA",	"SAN JUANITO",	"VISTAHERMOSA",	"PASTO",	"ALDANA",	"ANCUYA",	"ARBOLEDA",	"BARBACOAS",	"BUESACO",	"COLON",	"CONSACA",	"CONTADERO",	"CUASPUD",	"CUMBAL",	"CUMBITARA",	"CHACHAGsI",	"EL CHARCO",	"EL PEÑOL",	"EL ROSARIO",	"EL TABLON DE GOMEZ",	"FUNES",	"GUACHUCAL",	"GUAITARILLA",	"GUALMATAN",	"ILES",	"IMUES",	"IPIALES",	"LA CRUZ",	"LA FLORIDA",	"LA LLANADA",	"LA TOLA",	"LEIVA",	"LINARES",	"LOS ANDES",	"MAGsI",	"MALLAMA",	"OLAYA HERRERA",	"OSPINA",	"FRANCISCO PIZARRO",	"POLICARPA",	"POTOSI",	"PROVIDENCIA",	"PUERRES",	"PUPIALES",	"ROBERTO PAYAN",	"SAMANIEGO",	"SANDONA",	"SAN LORENZO",	"SAN PEDRO DE CARTAGO",	"SANTACRUZ",	"SAPUYES",	"TAMINANGO",	"TANGUA",	"SAN ANDRES DE TUMACO",	"TUQUERRES",	"YACUANQUER",	"CUCUTA",	"ABREGO",	"ARBOLEDAS",	"BOCHALEMA",	"BUCARASICA",	"CACOTA",	"CACHIRA",	"CHINACOTA",	"CHITAGA",	"CONVENCION",	"CUCUTILLA",	"DURANIA",	"EL CARMEN",	"EL TARRA",	"EL ZULIA",	"GRAMALOTE",	"HACARI",	"HERRAN",	"LABATECA",	"LA ESPERANZA",	"LA PLAYA",	"LOS PATIOS",	"LOURDES",	"MUTISCUA",	"OCAÑA",	"PAMPLONA",	"PAMPLONITA",	"PUERTO SANTANDER",	"RAGONVALIA",	"SALAZAR",	"SAN CALIXTO",	"SANTIAGO",	"SARDINATA",	"SILOS",	"TEORAMA",	"TIBU",	"VILLA CARO",	"VILLA DEL ROSARIO",	"CALARCA",	"CIRCASIA",	"FILANDIA",	"GENOVA",	"LA TEBAIDA",	"MONTENEGRO",	"PIJAO",	"QUIMBAYA",	"SALENTO",	"PEREIRA",	"APIA",	"BELEN DE UMBRIA",	"DOSQUEBRADAS",	"GUATICA",	"LA CELIA",	"LA VIRGINIA",	"MARSELLA",	"MISTRATO",	"PUEBLO RICO",	"QUINCHIA",	"SANTA ROSA DE CABAL",	"SANTUARIO",	"BUCARAMANGA",	"AGUADA",	"ARATOCA",	"BARICHARA",	"BARRANCABERMEJA",	"CALIFORNIA",	"CAPITANEJO",	"CARCASI",	"CEPITA",	"CERRITO",	"CHARALA",	"CHARTA",	"CHIPATA",	
						"CIMITARRA",	"CONFINES",	"CONTRATACION",	"COROMORO",	"CURITI",	"EL CARMEN DE CHUCURI",	"EL GUACAMAYO",	"EL PLAYON",	"ENCINO",	"ENCISO",	"FLORIAN",	"FLORIDABLANCA",	"GALAN",	"GAMBITA",	"GIRON",	"GUACA",	"GUAPOTA",	"GUAVATA",	"GsEPSA",	"HATO",	"JESUS MARIA",	"JORDAN",	"LA BELLEZA",	"LANDAZURI",	"LEBRIJA",	"LOS SANTOS",	"MACARAVITA",	"MALAGA",	"MATANZA",	"MOGOTES",	"MOLAGAVITA",	"OCAMONTE",	"OIBA",	"ONZAGA",	"PALMAR",	"PALMAS DEL SOCORRO",	"PARAMO",	"PIEDECUESTA",	"PINCHOTE",	"PUENTE NACIONAL",	"PUERTO PARRA",	"PUERTO WILCHES",	"SABANA DE TORRES",	"SAN ANDRES",	"SAN BENITO",	"SAN GIL",	"SAN JOAQUIN",	"SAN JOSE DE MIRANDA",	"SAN MIGUEL",	"SAN VICENTE DE CHUCURI",	"SANTA HELENA DEL OPON",	"SIMACOTA",	"SOCORRO",	"SUAITA",	"SURATA",	"TONA",	"VALLE DE SAN JOSE",	"VELEZ",	"VETAS",	"ZAPATOCA",	"SINCELEJO",	"CAIMITO",	"COLOSO",	"COROZAL",	"COVEÑAS",	"CHALAN",	"EL ROBLE",	"GALERAS",	"GUARANDA",	"LOS PALMITOS",	"MAJAGUAL",	"MORROA",	"OVEJAS",	"PALMITO",	"SAMPUES",	"SAN BENITO ABAD",	"SAN JUAN DE BETULIA",	"SAN MARCOS",	"SAN ONOFRE",	"SAN LUIS DE SINCE",	"SANTIAGO DE TOLU",	"TOLU VIEJO",	"IBAGUE",	"ALPUJARRA",	"ALVARADO",	"AMBALEMA",	"ANZOATEGUI",	"ARMERO",	"ATACO",	"CAJAMARCA",	"CARMEN DE APICALA",	"CASABIANCA",	"CHAPARRAL",	"COELLO",	"COYAIMA",	"CUNDAY",	"DOLORES",	"ESPINAL",	"FALAN",	"FLANDES",	"FRESNO",	"GUAMO",	"HERVEO",	"HONDA",	"ICONONZO",	"LERIDA",	"LIBANO",	"MARIQUITA",	"MELGAR",	"MURILLO",	"NATAGAIMA",	"ORTEGA",	"PALOCABILDO",	"PIEDRAS",	"PLANADAS",	"PRADO",	"PURIFICACION",	"RIOBLANCO",	"RONCESVALLES",	"ROVIRA",	"SALDAÑA",	"SAN ANTONIO",	"SANTA ISABEL",	"VALLE DE SAN JUAN",	"VENADILLO",	"VILLAHERMOSA",	"VILLARRICA",	"CALI",	"ALCALA",	"ANDALUCIA",	"ANSERMANUEVO",	"BUENAVENTURA",	"GUADALAJARA DE BUGA",	"BUGALAGRANDE",	"CAICEDONIA",	"CALIMA",	"CARTAGO",	"DAGUA",	"EL AGUILA",	"EL CAIRO",	"EL CERRITO",	"EL DOVIO",	"FLORIDA",	"GINEBRA",	"GUACARI",	"JAMUNDI",	"LA CUMBRE",	"OBANDO",	"PALMIRA",	"PRADERA",	"RIOFRIO",	"ROLDANILLO",	"SEVILLA",	"TORO",	"TRUJILLO",	"TULUA",	"ULLOA",	"VERSALLES",	"VIJES",	"YOTOCO",	"YUMBO",	"ZARZAL",	"ARAUCA",	"ARAUQUITA",	"CRAVO NORTE",	"FORTUL",	"PUERTO RONDON",	"SARAVENA",	"TAME",	"YOPAL",	"AGUAZUL",	"CHAMEZA",	"HATO COROZAL",	"LA SALINA",	"MANI",	"MONTERREY",	"NUNCHIA",	"OROCUE",	"PAZ DE ARIPORO",	"PORE",	"RECETOR",	"SACAMA",	"SAN LUIS DE PALENQUE",	"TAMARA",	"TAURAMENA",	"TRINIDAD",	"MOCOA",	"ORITO",	"PUERTO ASIS",	"PUERTO CAICEDO",	"PUERTO GUZMAN",	"LEGUIZAMO",	"SIBUNDOY",	"VALLE DEL GUAMUEZ",	"VILLAGARZON",	"LETICIA",	"EL ENCANTO",	"LA CHORRERA",	"LA PEDRERA",	"MIRITI - PARANA",	"PUERTO ALEGRIA",	"PUERTO ARICA",	"PUERTO NARIÑO",	
						"TARAPACA",	"INIRIDA",	"BARRANCO MINAS",	"MAPIRIPANA",	"SAN FELIPE",	"LA GUADALUPE",	"CACAHUAL",	"PANA PANA",	"MORICHAL",	"SAN JOSE DEL GUAVIARE",	"EL RETORNO",	"MITU",	"CARURU",	"PACOA",	"TARAIRA",	"PAPUNAUA",	"YAVARATE",	"PUERTO CARREÑO",	"LA PRIMAVERA",	"SANTA ROSALIA",	"CUMARIBO"]

		
		/*<< LocalStorage*/
		if(localStorageService.get("Storage-Local-Kallsonys")){
             $scope.todo=localStorageService.get("Storage-Local-Kallsonys");
         }else{
             $scope.todo=[];
         }
		
         $scope.$watchCollection('todo',function(newValue, oldValue){
             localStorageService.set("Storage-Local-Kallsonys",$scope.todo);
         });
		 
		if($scope.todo.length > 0){
				$scope.udpShopContent =[];
				$scope.udpShopTotalPrice=0;
				$scope.dataLoading  = true;
				var product = {};
				var dataObj = {};
				var dataObjArray=[];
				var productsView = [];
				var products = [];
				var productsTodo =[];
				var productValue =0;
				var cantidadValue =0;
				var confirmupdate=false;
				var result = {};
				var personalresult = [];			
				var resultsProd = [];
				var nombre=null;
				var precio=null;
				var disponibilidad=null;
				var urlImage=null;
				var id=null;
				
				//$scope.todo Local storage
				//console.log("$scope.todo-inicial: ",$scope.todo);
								
				angular.forEach($scope.todo, function (value, key)
				{
					//inicia Proceso para validar localstorage, integrar valores duplicados.
					productValue = value[0].productId;
					cantidadValue = value[0].Cantidad;
					//console.log("productValue:",productValue," cantidadValue:",cantidadValue);
					
					//si el objeto esta vacio, crea el objeto con funcion de que no permita duplicados.
					if(productsTodo.length === 0){
						products.push({
								"productId": productValue,
								"Cantidad": cantidadValue
							});
						//Arma objeto aparte para asignar a local storage. 
						dataObj = {
									"idProducto" : productValue,
									"cantidad" : cantidadValue
							};
						productsTodo.push(products);
						dataObjArray.push(dataObj);
						dataObj ={};
						products = [];
						//console.log("--Inicial--productsTodo: ",productsTodo);
					}
					else{
						//inicia proceso cuando en el objeto ya exista información.
						//console.log("-----------------------");
						//console.log("productValue=",productValue," cantidadValue=",cantidadValue);
						confirmupdate = false;
							angular.forEach(productsTodo, function (value, key)
							{
								//console.log("productsTodo: ",productsTodo);
								//console.log("productId:", value[0].productId, " Cantidad: ",value[0].Cantidad);
								if(productValue===value[0].productId){
									value[0].Cantidad =  value[0].Cantidad + cantidadValue;
									confirmupdate = true;
								}
							});	
							
						if(confirmupdate === false){
							products.push({
								"productId": productValue,
								"Cantidad": cantidadValue
							});
							dataObj = {
									"idProducto" : productValue,
									"cantidad" : cantidadValue
							};
						productsTodo.push(products);
						dataObjArray.push(dataObj);
						dataObj ={};
						products = [];
						}
					}
					
				});
				
				$scope.todo = productsTodo;//productsTodo objeto sin duplicados, se concatena información y se suman cantidades.
				//console.log("dataObjArray:", dataObjArray);
				//console.log("$scope.todo:", $scope.todo);
				
				/*Trae Información de todos los articulos del carro de compras*/
				$http.post(urlcart, dataObjArray)
				.then(function successCallBack(data, status, headers, config) {
						//console.log("data.data.items",data.data.items);
						if(data.statusText==="OK"){
							//saca información del servicio en el objeto resultsProd.
							$scope.nombres = data.data.orden.cliente.nombres;
							$scope.apellidos= data.data.orden.cliente.apellidos;
							$scope.telefono = data.data.orden.cliente.telefono;
							$scope.correo_e = data.data.orden.cliente.correo_e;
							$scope.calle = data.data.orden.cliente.direcciones[0].calle;
							//$scope.ciudad= data.data.orden.cliente.direcciones[0].ciudad;
							//$scope.pais= data.data.orden.cliente.direcciones[0].pais;
							if(data.data.orden.cliente.numero != null ){
								$scope.creditCard=data.data.orden.cliente.numero;
							}
							$scope.direccion= data.data.orden.cliente.direcciones[0].direccion;
										
							
							angular.forEach(data.data.items, function (value, key)//Datos Producto
							{
								angular.forEach(value, function (value, key)
								{
									if(value.id != undefined){
										result ={
										 "id":value.id,
										 "nombre" :value.nombre,
										 "precio" :value.precio,
										 "disponibilidad" :value.disponibilidad,
										 "urlImage" :value.urlImage
										}
										resultsProd.push(result);
										result ={};
									}	
								});
							});
							//console.log("$scope.todo:",$scope.todo);
							
							angular.forEach($scope.todo, function (value, key)
							{
									var producto = value[0].productId;
									if(value[0].productId === undefined){
											value[0].productId =1;
									}
									if(value[0].Cantidad === undefined){
											value[0].Cantidad =1;
									}
									
									//console.log("A validar resultsProd:",resultsProd);
									for (var i = 0, len = resultsProd.length; i < len; i++) {
											//console.log("producto",producto);
											//console.log("id",resultsProd[i].id);
											if(parseInt(resultsProd[i].id) === parseInt(producto)){
												//console.log("Iguales");
												id = resultsProd[i].id;
												nombre= resultsProd[i].nombre;
												precio= resultsProd[i].precio;
												disponibilidad= resultsProd[i].disponibilidad;
												urlImage= resultsProd[i].urlImage;
												//console.log("id:",id,"nombre:",nombre,"precio:",precio,"disponibilidad:",disponibilidad,"urlImage:",urlImage);
												break;
											}
											
									}
									
									$scope.udpShopContent.push({
											"id" : value[0].productId,
											"cantidad" :  parseInt(value[0].Cantidad),
											"nombre" : nombre,
											"precio" : precio,
											"disponibilidad" : disponibilidad,
											"urlImage" : urlImage
									});	
									//console.log(precio," - ",parseInt(value[0].Cantidad));
									$scope.udpShopTotalPrice=$scope.udpShopTotalPrice+(parseInt(value[0].Cantidad) * precio);
							});
							
							//console.log($scope.udpShopContent);
							
						}
					$scope.dataLoading  = false;
					}, function errorCallback(data){
					 $scope.dataLoading  = false;
                     $scope.error = data.data.message;
					 console.log(data);
				 });
				/*-------------------------*/
				
				
				// console.log($scope.udpShopContent);
		}
		 /* LocalStorage>>*/
		 
		 /**
		* @desc - redondea el precio que le pasemos con dos decimales
		*/
		$scope.roundCurrency = function(total)
		{
			return total.toFixed(2);
		}
		
		
		
		$scope.payment=function(){
			
			var productValue =0;
			var cantidadValue =0;
			var dataObj = {};
			var dataObjArray=[];
			
			$scope.dataLoading  = true;
			$scope.error=false;
			$scope.errorMsj="Error: Por favor verifique los medios de pago.";
			//console.log("calle:",$scope.calle," pais:",$scope.pais," ciudad:",$scope.ciudad);
			
			if(($scope.calle!="" || $scope.calle!=undefined) &&
				$scope.pais!=undefined &&
				$scope.ciudad!=undefined
			){
				
			
			
			if($scope.creditCard!=undefined && $scope.typeCreditCard!=undefined){
				
				angular.forEach($scope.todo, function (value, key)
				{
					productValue = value[0].productId;
					cantidadValue = value[0].Cantidad;
					
					dataObj = {
									"idProducto" : productValue,
									"cantidad" : cantidadValue
							};
					dataObjArray.push(dataObj);
					dataObj ={};
					
				});
				
				//console.log("dataObjArray:",dataObjArray);
				
				//
				$http.post(urlcheckout, dataObjArray)
				.then(function successCallBack(data, status, headers, config) {
						  if(data.statusText==="OK"){
							  console.log("data:",data);
							  
							  
							  $http.post(urlpayment, {
								numeroTarjeta: $scope.creditCard,
								tipoTarjeta: $scope.typeCreditCard,
								direccionEntrega:$scope.calle,
								paisEntrega:$scope.pais,
								ciudadEntrega:$scope.ciudad
								})
								.then(function successCallBack(data, status, headers, config) {
										  if(data.exitoso===true){
											  
											  console.log("data:",data);
											  $location.path('/ContentOrders'); //destino Ordenes.
											  $scope.todo=[];//se reestablece LocalStorage.
											} 
										   $scope.loading = false;
								 }, function errorCallback(data){
									 $scope.error=true;
									 $scope.errorMsj=data.data.mensaje;
									 $scope.loading = false;
								});
							  
							  
						  } 
						  $scope.loading = false;
				 }, function errorCallback(data){
					 $scope.error=true;
                     $scope.errorMsj=data.data.message;
					 $scope.loading = false;
				});
				
				
			}else{
				$scope.dataLoading  = false;
				$scope.error=true;
				$scope.errorMsj="Error: Por favor verifique los medios de pago.";
			}
	}else{
				$scope.dataLoading  = false;
				$scope.error=true;
				$scope.errorMsj="Algo Salio Mal: Verifique los datos de destino.";
			}
		};
}
catch(error)
	{
		$scope.error=true;
		$scope.errorMsj=error.message;
}		 
}]);
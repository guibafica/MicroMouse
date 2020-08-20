const IA = require('./API');

function log(text) {
	console.error(text);
}

function main() {
	let steps = 0;
	let x = 0;
	let y = 0;

	// Seleção de método:
	let method = 1;
	// Method ( 1 ) => Método da mão DIREITA ('')
	// Method ( 2 ) => Método da mão ESQUERDA ('')
	// Method ( 3 ) => Método de Tremaux

	let direction = 1;
	// Direction ( 1 ) => SUBINDO
	// Direction ( 2 ) => DIREITA
	// Direction ( 3 ) => DESCENDO
	// Direction ( 4 ) => ESQUERDA

	function Direction() {
		if (direction > 4) {
			direction = 1;
			// y--;
		}
		if (direction < 1) {
			direction = 4;
		}

		if (direction === 1) {
			log("SUBINDO");
			y++;
			log("Posição: (" + x + "," + y + ")");
			log("");
			IA.setColor(x, y, 'G');
			direction = 1;
		}
		if (direction === 2) {
			log("DIREITA");
			x++;
			log("Posição: (" + x + "," + y + ")");
			log("");
			IA.setColor(x, y, 'G');
		}
		if (direction === 3) {
			log("DESCENDO");
			y--;
			log("Posição: (" + x + "," + y + ")");
			log("");
			IA.setColor(x, y, 'G');
		}
		if (direction === 4) {
			log("ESQUERDA");
			x--;
			log("Posição: (" + x + "," + y + ")");
			log("");
			IA.setColor(x, y, 'G');
		}
	}

	if (method === 1) {
		log("Iniciando método da mão DIREITA...");
		log("");
		log("");
		IA.setColor(0, 0, 'g');
		IA.setText(0, 0, "Start");

		while (true) {
			while (!IA.wallRight()) {
				log("");
				log("Buscando parede na direita.");

				IA.turnRight();
				IA.moveForward();

				direction++;
				Direction(direction);

				if (!IA.wallFront() && IA.wallRight()) {
					log("");
					log("Frente limpa, seguindo.");

					IA.moveForward();
					Direction(direction);
				}
			}

			while (IA.wallRight() && IA.wallFront() && IA.wallLeft()) {
				log("");
				log("Beco sem saida, voltando.");

				IA.turnLeft();
				IA.turnLeft();
				IA.moveForward();

				direction = direction - 2;
				Direction(direction);
			}

			while (IA.wallRight() && IA.wallFront() && !IA.wallLeft()) {
				log("");
				log("Esquerda livre, girando e seguindo.");

				IA.turnLeft();
				IA.moveForward();

				direction--;
				Direction(direction);
			}

			if (IA.wallRight() && !IA.wallFront()) {
				log("");
				log("Mão na parede,");

				IA.moveForward();
				Direction(direction);
			}

			steps++;
		}
	}

	if (method === 2) {
		log("");
		log("Iniciando método da mão ESQUERDA...");
		IA.setColor(0, 0, 'g');
		IA.setText(0, 0, "Start");

		while (true) {
			while (!IA.wallLeft()) {
				log("");
				log("Buscando parede na esquerda");
				IA.turnLeft();
				IA.moveForward();

				direction--;
				Direction(direction);

				if (!IA.wallFront() && IA.wallLeft()) {
					log("");
					log("Frente limpa, seguindo");

					IA.moveForward();
					Direction(direction);
				}
			}

			while (IA.wallLeft() && IA.wallFront() && IA.wallRight()) {
				log("");
				log("Beco sem saida, Voltando");

				IA.turnRight();
				IA.turnRight();
				IA.moveForward();

				direction = direction + 2;
				Direction(direction);
			}

			while (IA.wallLeft() && IA.wallFront() && !IA.wallRight()) {
				log("");
				log("Direita livre, girando e seguindo");

				IA.turnRight();
				IA.moveForward();

				direction++;
				Direction(direction);
			}

			if (IA.wallLeft() && !IA.wallFront()) {
				log("");
				log("Mão na parede, Seguindo");

				IA.moveForward();

				Direction(direction);
			}

			steps++;
		}
	}

	if (method === 3) {
		log("Iniciando Método de Tremaux...");
		log("");
		API.setColor(0, 0, 'g');
		API.setText(0, 0, "Start");
	}

	else {
		log("Por favor, insira um método disponível (1 ou 2)");
	}
}

main();

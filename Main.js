const IA = require('./API');

function log(text) {
	console.error(text);
}

function main() {
	let steps = 0;
	let x = 0;
	let y = 0;
	let sentidoX = 2;
	let sentidoY = 2;
	// Sentidos (%2) => AVANÇANDO E CIMA
	// Sentidos (!%2) => RECUANDO E BAIXO

  // Seleção de método:
	let method = 1;
	// Method ( 1 ) => Método da mão DIREITA ('')
	// Method ( 2 ) => Método da mão ESQUERDA ('')
	// Method ( 3 ) => Método de Tremaux

	if (method === 1) {
		log("Iniciando método da mão DIREITA...");
		log("");
		log("");
		IA.setColor(x, y, 'g');
		IA.setText(x, y, "Start");

		while (true) {
			while (!IA.wallRight()) {
				log("Buscando parede na direita.");	

				if (sentidoX%2 == 0 && sentidoY%2 == 0) {
					x++;
					log("AVANÇANDO");
					log("Posição: (" + x + "," + y + ")");
					log("");
				}

				IA.turnRight();
				IA.moveForward();

				if (!IA.wallFront() && IA.wallRight()) {
					log("Frente limpa, seguindo.");
					IA.moveForward();
				}
			}

			while (IA.wallRight() && IA.wallFront() && IA.wallLeft()) {
				log("Beco sem saida, voltando.");
				IA.turnLeft();
				IA.turnLeft();
				IA.moveForward();
			}

			while (IA.wallRight() && IA.wallFront() && !IA.wallLeft()) {
				log("Esquerda livre, girando e seguindo.");
				log("");
				IA.turnLeft();
				IA.moveForward();
			}

			if (IA.wallRight() && !IA.wallFront()) {
				log("Mão na parede,");

				if (sentidoY%2 == 0) {
					y++;
					log("SUBINDO");
					log("Posição: (" + x + "," + y + ")");
					log("");
				}

				IA.moveForward();
			}

			steps++;
		}
	}

	if (method === 2) {
		log("Iniciando método da mão ESQUERDA...");
		log("");
		IA.setColor(0, 0, 'g');
		IA.setText(0, 0, "Start");

		while (true) {
			while (!IA.wallLeft()) {
				log("Buscando parede na esquerda");
				log("");
				IA.turnLeft();
				IA.moveForward();

				if (!IA.wallFront() && IA.wallLeft()) {
					log("Frente limpa, seguindo");
					log("");
					IA.moveForward();
				}
			}

			while (IA.wallLeft() && IA.wallFront() && IA.wallRight()) {
				log("Beco sem saida, Voltando");
				log("");
				IA.turnRight();
				IA.turnRight();
				IA.moveForward();
			}

			while (IA.wallLeft() && IA.wallFront() && !IA.wallRight()) {
				log("Direita livre, girando e seguindo");
				log("");
				IA.turnRight();
				IA.moveForward();
			}

			if (IA.wallLeft() && !IA.wallFront()) {
				log("Mão na parede, Seguindo");
				log("");
				IA.moveForward();
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

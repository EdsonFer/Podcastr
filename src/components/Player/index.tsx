import styles from './styles.module.scss';
import Image from 'next/image';

export function Player() {
	return (
		<div className={styles.playerContainer}>
			<header>
				<Image src="/playing.svg" alt="Tocando Agora" width={40} height={40} />
				<strong>Tocando agora</strong>
			</header>

			<div className={styles.emptyPlayer}>
				<strong>Selecione um podcast para ouvir</strong>
			</div>

			<footer className={styles.empty}>
				<div className={styles.progress}>
					<span>00:00</span>

					<div className={styles.slider}>
						<div className={styles.emptySlider} />
					</div>

					<span>00:00</span>
				</div>

				<div className={styles.buttons}>
					<button type="button">
						<Image src="/shuffle.svg" alt="Embaralhar" width={25} height={25} />
					</button>

					<button type="button">
						<Image
							src="/play-previous.svg"
							alt="Tocar anterior"
							width={25}
							height={25}
						/>
					</button>

					<button type="button" className={styles.playButton}>
						<Image src="/play.svg" alt="Tocar" width={50} height={50} />
					</button>

					<button type="button">
						<Image
							src="/play-next.svg"
							alt="Tocar próxima"
							width={25}
							height={25}
						/>
					</button>

					<button type="button">
						<Image src="/repeat.svg" alt="Repetir" width={25} height={25} />
					</button>
				</div>
			</footer>
		</div>
	);
}

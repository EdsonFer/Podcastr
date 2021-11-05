import styles from './styles.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [progress, setProgress] = useState(0);

	const {
		episodeList,
		currentEpisodeIndex,
		isPlaying,
		isLooping,
		isShuffling,
		togglePlay,
		toggleLoop,
		toggleShuffle,
		playNext,
		playPrevious,
		setPlayingState,
		hasPrevious,
		hasNext,
		clearPlayerState,
	} = usePlayer();

	useEffect(() => {
		if (!audioRef.current) {
			return;
		}
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	function setupProgressListener() {
		audioRef.current.currentTime = 0;

		audioRef.current.addEventListener('timeupdate', () => {
			setProgress(Math.floor(audioRef.current.currentTime));
		});
	}

	function handleSeek(amount: number) {
		audioRef.current.currentTime = amount;
		setProgress(amount);
	}

	function handleEpisodeEnded() {
		if (hasNext) {
			playNext();
		} else {
			clearPlayerState();
		}
	}

	const episode = episodeList[currentEpisodeIndex];

	return (
		<div className={styles.playerContainer}>
			<header>
				<Image src="/playing.svg" alt="Tocando Agora" width={40} height={40} />
				<strong>Tocando agora {episode?.title}</strong>
			</header>

			{episode ? (
				<div className={styles.currentEpisode}>
					<Image
						src={episode.thumbnail}
						objectFit="cover"
						width={592}
						height={592}
						alt="thumbnail"
					/>
					<strong>{episode.title}</strong>
					<span>{episode.members}</span>
				</div>
			) : (
				<div className={styles.emptyPlayer}>
					<strong>Selecione um podcast para ouvir</strong>
				</div>
			)}

			<footer className={!episode ? styles.empty : ''}>
				<div className={styles.progress}>
					<span>{convertDurationToTimeString(progress)}</span>

					<div className={styles.slider}>
						{episode ? (
							<Slider
								max={episode.duration}
								value={progress}
								onChange={handleSeek}
								trackStyle={{ backgroundColor: '#84d361' }}
								railStyle={{ backgroundColor: '#9f75ff' }}
								handleStyle={{ borderColor: '#84d362', borderWidth: 4 }}
							/>
						) : (
							<div className={styles.emptySlider} />
						)}
					</div>

					<span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
				</div>

				{episode && (
					<audio
						src={episode.url}
						ref={audioRef}
						autoPlay
						onEnded={handleEpisodeEnded}
						loop={isLooping}
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
						onLoadedMetadata={setupProgressListener}
					/>
				)}

				<div className={styles.buttons}>
					<button
						type="button"
						disabled={!episode || episodeList.length === 1}
						onClick={toggleShuffle}
						className={isShuffling ? styles.isActive : ''}
					>
						<Image src="/shuffle.svg" alt="Embaralhar" width={25} height={25} />
					</button>

					<button
						type="button"
						disabled={!episode || !hasPrevious}
						onClick={playPrevious}
					>
						<Image
							src="/play-previous.svg"
							alt="Tocar anterior"
							width={25}
							height={25}
						/>
					</button>

					<button
						type="button"
						className={styles.playButton}
						disabled={!episode}
						onClick={togglePlay}
					>
						{isPlaying ? (
							<Image src="/pause.svg" alt="Tocar" width={20} height={20} />
						) : (
							<Image src="/play.svg" alt="Tocar" width={50} height={50} />
						)}
					</button>

					<button
						type="button"
						disabled={!episode || !hasNext}
						onClick={playNext}
					>
						<Image
							src="/play-next.svg"
							alt="Tocar próxima"
							width={25}
							height={25}
						/>
					</button>

					<button
						type="button"
						disabled={!episode}
						onClick={toggleLoop}
						className={isLooping ? styles.isActive : ''}
					>
						<Image src="/repeat.svg" alt="Repetir" width={25} height={25} />
					</button>
				</div>
			</footer>
		</div>
	);
}

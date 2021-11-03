import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import Image from 'next/image';

import styles from './styles.module.scss';

export function Header() {
	// yarn add date-fns para pegar a data
	const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
		locale: ptBR,
	});

	return (
		<header className={styles.headerContainer}>
			<Image src="/logo.svg" alt="Podcastr" width={200} height={200} />
			<p>O Melhor para você sempre</p>
			<span>{currentDate}</span>
		</header>
	);
}

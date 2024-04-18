import React, { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import { ReturnButton } from '../return-button';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface SolutionLayoutProps extends PropsWithChildren {
	title: string;
	extClassName?: string;
}

export const SolutionLayout: React.FC<SolutionLayoutProps> = ({
	extClassName = '',
	title,
	children
}) => {
	return (
		<main className={clsx(styles.content, extClassName)}>
			<div className={styles.titleBox}>
				<h1 className={`text text_type_h2 text_color_h1 ${styles.title}`}>
					МБОУ АЛГОСОШ
				</h1>
				<span
					className={`text text_type_fibonacci text_color_secondary ${styles.subtitle}`}
				>
					им. Фибоначчи
				</span>
			</div>
			<div className={styles.contentCard}>
				<Link className={styles.link} to="/">
					<ReturnButton extClassName={styles.returnButton} data-testid="returnBtn" />
				</Link>
				<h3 className={`text text_type_h3 text_color_h3 ${styles.cardTitle}`}>
					{title}
				</h3>
				{children}
			</div>
		</main>
	);
};

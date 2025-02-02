import { ReactNode } from 'react';
import styles from './Services.module.css';

interface ServiceItem {
title: string;
description: string;
icon?: ReactNode;
}

interface ServicesProps {
items?: ServiceItem[];
className?: string;
}

const Services = ({ items = [], className = '' }: ServicesProps) => {
return (
    <section className={`${styles.servicesContainer} ${className}`}>
    <div className={styles.servicesGrid}>
        {items.map((service, index) => (
        <div key={index} className={styles.serviceCard}>
            {service.icon && (
            <div className={styles.iconWrapper}>
                {service.icon}
            </div>
            )}
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
        </div>
        ))}
    </div>
    </section>
);
};

export default Services;

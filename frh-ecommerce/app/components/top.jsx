
import React from 'react'
import styles from '@/app/page.module.css';

export default function top() {
  return (
    <header>
    <h1 className={styles.title}>FRH</h1>
    <ul className={styles.contactLogin}>
      <li>
        <a href="#contact" className={`${styles.contactLogina} ${styles.contactLoginfirstchild}`}>Contact Us</a>
      </li>
      <a href="" className={styles.contactLogina}>Login</a>
      <li id="login" />
    </ul>
  </header>
  )
}

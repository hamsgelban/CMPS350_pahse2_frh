
import React from 'react'
import styles from '@/app/page.module.css';
import Link from 'next/link'

export default function top() {
  return (
    <div className={styles.topHeader}>
    <h1 className={styles.topTitle}>FRH</h1>
    <Link href="" className={styles.topLogout}>Logout</Link>  
  </div>
  )
}

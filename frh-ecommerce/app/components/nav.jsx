
import React from 'react'
import styles from '@/app/page.module.css';
import Link from 'next/link'

export default function nav() {
  return (
    <div className={styles.topNav}>
    <Link href="" className={styles.topNavLink}>Home</Link> 
    <Link href="" className={styles.topNavLink}>All Items</Link>  
  </div>
  )
}

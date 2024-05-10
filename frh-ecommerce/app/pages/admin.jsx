'use client'
import React from 'react';
import styles from "@/app/page.module.css";
import Top from '@/app/components/top'
import Card from '@/app/components/card'
import Table from '@/app/components/table'
import ecommerceRepo from '@/app/repo/frh-ecommerce-repo'
import ArtistTable from '../components/artistTable';
import CustomerTable from '../components/customerTable'
import TotalPurcahse from '../components/totalpurchase'
import TotalCity from '../components/totalCity'



export default async function Admin() {
const artists = await ecommerceRepo.getArtists()
const customers = await ecommerceRepo.getCustomers()
const cdata = await ecommerceRepo.totalPurchasesPerCity();


    return (
        // <div className={styles.all}>
        //     <head>
        //         <meta charset="UTF-8" />
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //         <title>Profile</title>
        //     </head>
        //     <body>
        //         {/* Header */}
        //         <div id="header"></div>

        //         {/* Navigation */}
        //         <div id="nav"></div>

        //         <div className={styles.pageName}>
        //             <p>Dashboard</p>
        //         </div>

        //         <div className={styles.mainAdmin}>

        //             <section className={styles.userInfo}>
        //                 <img src="../images/Design/Untitled.png" alt="User Profile" />
        //                 {/* Here add customer username */}
        //                 <h2 id="user_username"></h2>
        //                 <form action="" className={styles.customerInfo} id="customer_info">
        //                     <label htmlFor="name">Name: </label>
        //                     <input type="text" id="name" name="name" className={styles.centeredInput} readOnly />

        //                     <label htmlFor="totalPur">Total Number of Purchases: </label>
        //                     <input type="text" id="totalPur" name="totalPur" className={styles.centeredInput} readOnly />

        //                     <label htmlFor="totalAmount">Total Amount Spent: </label>
        //                     <input type="text" id="totalAmount" name="totalAmount" className={styles.centeredInput} readOnly />
        //                 </form>
        //             </section>

        //             <section className={styles.history}>
        //                 <h2 className={styles.historyHeader}>View History</h2>
        //                 <section className={styles.itemCards} id="history_container">
        //                     {/* Here load History Items */}
        //                 </section>
        //             </section>
        //         </div>

        //         <footer>
        //             <p>Made by FRH</p>
        //             <p>Hams Gelban | FatemaElzahraa Elrotel | Rouaa Naim</p>
        //         </footer>
        //     </body>
        // </div>
        <div className={styles.container}>
            {/* <div className={styles.top}>
          <header className={styles.headerTop}>
              <h1 className={styles.headerH1}>FRH</h1>
              <ul className={styles.headerUl}>
                  <li><a href="#contact">Contact Us</a></li>
                  <li id="login"></li>
              </ul>
          </header>
        </div> */}



            <div className={styles.top}>
                <Top></Top>
            </div>

            <div className={styles.side}>
                <div className={styles.links}>
                    <a href="" className={styles.a}> View Statistics</a>
                    <a href="" className={styles.a}> View Artists</a>
                    <a href="" className={styles.a}> View Customers</a>
                </div>
            </div>

            <div className={`${styles.statistics}`}>
                <h1 className={styles.header}>View statistics</h1>
                <div className={styles.cards}>
                    <div className={styles.tableCard}>
                        <TotalPurcahse></TotalPurcahse>
                    </div>
                    <div className={styles.tableCard}><TotalCity data={cdata}></TotalCity></div>
                    <div className={styles.tableCard}><Table></Table></div>
                    <div className={styles.tableCard}><Card></Card></div>
                    <div className={styles.tableCard}><Card></Card></div>
                    <div className={styles.tableCard}><Card></Card></div>
                </div>
            </div>

            <div className={styles.artists}>
                <h1 className={styles.header}>View artists</h1>
                <div className={styles.tableCard}><ArtistTable artists={artists}/></div>
            </div>

            <div className={styles.customers}>
                <h1 className={styles.header}>View customers</h1>
                <div className={styles.tableCard}><CustomerTable customers={customers}/></div>
            </div>

            <div className={styles.footer}>
                <p>Made by FRH</p>
                <p>Hams Gelban | FatemaElzahraa Elrotel | Rouaa Naim | © 2024 FRH, Inc. </p>
            </div>


        </div>
    );
}

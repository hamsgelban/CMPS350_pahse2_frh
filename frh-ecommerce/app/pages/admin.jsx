import React from 'react';
import styles from "@/app/page.module.css";

export default function Admin() {
    return (
        <div className={styles.all}>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
            </head>
            <body>
                {/* Header */}
                <div id="header"></div>

                {/* Navigation */}
                <div id="nav"></div>

                <div className={styles.pageName}>
                    <p>Dashboard</p>
                </div>

                <div className={styles.mainAdmin}>

                    <section className={styles.userInfo}>
                        <img src="../images/Design/Untitled.png" alt="User Profile" />
                        {/* Here add customer username */}
                        <h2 id="user_username"></h2>
                        <form action="" className={styles.customerInfo} id="customer_info">
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" className={styles.centeredInput} readOnly />

                            <label htmlFor="totalPur">Total Number of Purchases: </label>
                            <input type="text" id="totalPur" name="totalPur" className={styles.centeredInput} readOnly />

                            <label htmlFor="totalAmount">Total Amount Spent: </label>
                            <input type="text" id="totalAmount" name="totalAmount" className={styles.centeredInput} readOnly />
                        </form>
                    </section>

                    <section className={styles.history}>
                        <h2 className={styles.historyHeader}>View History</h2>
                        <section className={styles.itemCards} id="history_container">
                            {/* Here load History Items */}
                        </section>
                    </section>
                </div>

                <footer>
                    <p>Made by FRH</p>
                    <p>Hams Gelban | FatemaElzahraa Elrotel | Rouaa Naim</p>
                </footer>
            </body>
        </div>
    );
}

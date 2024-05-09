import React from 'react';
import styles from "@/app/page.module.css";

export default function Admin() {
    return (
        <>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
                <link rel="stylesheet" href="/public/styles/history_updated.css" />
                <link href="https://fonts.cdnfonts.com/css/jonathan" rel="stylesheet" />
            </head>
            <body>
                {/* Header */}
                <div id="header"></div>

                {/* Navigation */}
                <div id="nav"></div>

                <div className={styles.page-name}>
                    <p>Dashboard</p>
                </div>

                <div className="main">

                    <section className="user-info">
                        <img src="../images/Design/Untitled.png" alt="User Profile" />
                        {/* Here add customer username */}
                        <h2 id="user_username"></h2>
                        <form action="" className="customer_info" id="customer_info">
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" className="centered-input" readOnly />

                            <label htmlFor="totalPur">Total Number of Purchases: </label>
                            <input type="text" id="totalPur" name="totalPur" className="centered-input" readOnly />

                            <label htmlFor="totalAmount">Total Amount Spent: </label>
                            <input type="text" id="totalAmount" name="totalAmount" className="centered-input" readOnly />
                        </form>
                    </section>

                    <section className="history">
                        <h2 className="history-header">View History</h2>
                        <section className="item-cards" id="history_container">
                            {/* Here load History Items */}
                        </section>
                    </section>
                </div>

                <footer>
                    <p>Made by FRH</p>
                    <p>Hams Gelban | FatemaElzahraa Elrotel | Rouaa Naim</p>
                </footer>
            </body>
        </>
    );
}

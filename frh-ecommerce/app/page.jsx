import Image from "next/image";
import styles from "./page.module.css";
import Admin from '@/app/pages/admin'
import Top from '@/app/components/top'

export default function Home() {
  return (
    // <main className={styles.main}>
    //   <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>app/page.js</code>
    //     </p>
    //     <div>
    //       <a
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className={styles.vercelLogo}
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className={styles.center}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className={styles.grid}>
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Docs <span>-&gt;</span>
    //       </h2>
    //       <p>Find in-depth information about Next.js features and API.</p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Learn <span>-&gt;</span>
    //       </h2>
    //       <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Templates <span>-&gt;</span>
    //       </h2>
    //       <p>Explore starter templates for Next.js.</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2>
    //         Deploy <span>-&gt;</span>
    //       </h2>
    //       <p>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>

    <>

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
                    <div className={styles.tableCard}>table1</div>
                    <div className={styles.tableCard}>table2</div>
                    <div className={styles.tableCard}>table3</div>
                    <div className={styles.tableCard}>table4</div>
                    <div className={styles.tableCard}>table5</div>
                    <div className={styles.tableCard}>table6</div>
                </div>
              </div>

              <div className={styles.artists}>
                <h1 className={styles.header}>View artists</h1>
                <div className={styles.cards}>
                    <div className={styles.tableCard}>artist1</div>
                    <div className={styles.tableCard}>artist2</div>
                    <div className={styles.tableCard}>artist3</div>
                    <div className={styles.tableCard}>artist4</div>
                    <div className={styles.tableCard}>artist5</div>
                    <div className={styles.tableCard}>artist6</div>
                </div>
              </div>

              <div className={styles.customers}>
                <h1 className={styles.header}>View customers</h1>
                <div className={styles.cards}>
                    <div className={styles.tableCard}>customer1</div>
                    <div className={styles.tableCard}>customer2</div>
                    <div className={styles.tableCard}>customer3</div>
                    <div className={styles.tableCard}>customer4</div>
                    <div className={styles.tableCard}>customer5</div>
                    <div className={styles.tableCard}>customer6</div>
                </div>
              </div>

              <div className={styles.footer}>
                  <p>Made by FRH</p>
                  <p>Hams Gelban | FatemaElzahraa Elrotel | Rouaa Naim | © 2024 FRH, Inc. </p>
              </div>


        </div>
    
    </>
  );
}

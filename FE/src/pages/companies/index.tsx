import React from "react"
import styles from './companies.module.css'
const Companies = () => {

    return (<>
        <div>
            <h2>Companies</h2>
            <p style={{ fontSize: '12px' }}>Learn about what it's like to work at companies</p>
        </div>
        <div className="d-flex">
            <div className="w-25 position-relative flex-fill d-flex align-items-center me-1">
                <i className={`${styles.searchIcon} bi bi-search`}></i>
                <input className={`${styles.searchInput} form-control form-control-sm`} type="text" placeholder="Filter by tag name..." />
            </div>
            <div className="w-25 position-relative flex-fill d-flex align-items-center">
                <input className={`${styles.searchInput} form-control form-control-sm`} type="text" placeholder="Filter by tag name..." />
            </div>
            <button className="btn btn-primary ms-1">Search</button>
            <button className="btn border ms-3">
                Filter by tag
                <i className="bi bi-caret-down-fill ms-2" style={{ fontSize: '10px' }}></i>
            </button>
        </div>
        <p className="mt-3">131 companies</p>

        <div className={styles.companieItems}>
            <div className="row">
                <div className="col-2">
                    <img className={`${styles.imgAvt}`} src="https://s3.cloud.cmctelecom.vn/tinhte2/2020/03/4937242_311.jpg" alt="err" />
                </div>
                <div className="col-10 ps-2">
                    <h2>OcKam</h2>
                    <div className="d-flex mb-1">
                        <div className="me-3">
                            <i className="bi bi-geo-alt-fill me-1"></i>
                            <span>Bengaluru; Dublin; Draper</span>
                        </div>
                        <div>
                            <i className="bi bi-building-fill me-1"></i>
                            <span>Cloud Services, Security, Software Development</span>
                        </div>
                    </div>
                    <div className={styles.textContent}>
                        Ockam is a fully-distributed high performance team. We are Open Source and build in Rust and Elixir.Join the Ockam Team!
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-light me-1">.net</button>
                        <button className="btn btn-light me-1">c#</button>
                        <button className="btn btn-light me-1">javascript</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.companieItems}>
            <div className="row">
                <div className="col-2">
                    <img className={`${styles.imgAvt}`} src="https://s3.cloud.cmctelecom.vn/tinhte2/2020/03/4937242_311.jpg" alt="err" />
                </div>
                <div className="col-10 ps-2">
                    <h2>OcKam</h2>
                    <div className="d-flex mb-1">
                        <div className="me-3">
                            <i className="bi bi-geo-alt-fill me-1"></i>
                            <span>Bengaluru; Dublin; Draper</span>
                        </div>
                        <div>
                            <i className="bi bi-building-fill me-1"></i>
                            <span>Cloud Services, Security, Software Development</span>
                        </div>
                    </div>
                    <div className={styles.textContent}>
                        Ockam is a fully-distributed high performance team. We are Open Source and build in Rust and Elixir.Join the Ockam Team!
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-light me-1">.net</button>
                        <button className="btn btn-light me-1">c#</button>
                        <button className="btn btn-light me-1">javascript</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.companieItems}>
            <div className="row">
                <div className="col-2">
                    <img className={`${styles.imgAvt}`} src="https://s3.cloud.cmctelecom.vn/tinhte2/2020/03/4937242_311.jpg" alt="err" />
                </div>
                <div className="col-10 ps-2">
                    <h2>OcKam</h2>
                    <div className="d-flex mb-1">
                        <div className="me-3">
                            <i className="bi bi-geo-alt-fill me-1"></i>
                            <span>Bengaluru; Dublin; Draper</span>
                        </div>
                        <div>
                            <i className="bi bi-building-fill me-1"></i>
                            <span>Cloud Services, Security, Software Development</span>
                        </div>
                    </div>
                    <div className={styles.textContent}>
                        Ockam is a fully-distributed high performance team. We are Open Source and build in Rust and Elixir.Join the Ockam Team!
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-light me-1">.net</button>
                        <button className="btn btn-light me-1">c#</button>
                        <button className="btn btn-light me-1">javascript</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Companies
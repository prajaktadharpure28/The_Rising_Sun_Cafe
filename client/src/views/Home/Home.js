import React, {useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import About from './../../assets/about.jpg'
import './Home.css'

import { loginRequired } from './../../util/loginRequired'

function Home() {
    useEffect(() => {
        loginRequired()
      }, [])
    return (
        <div>
            <Navbar />
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">Enjoy Your Healthy Delicious Food</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                <a href="/tables" className="btn-book-a-table">Book a Table</a>
                                <a href="/dashboard" className="btn-menu">Our Menu</a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                            <img src={About} className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
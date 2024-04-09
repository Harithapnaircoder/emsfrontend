import React, { useState } from 'react';
import Navbar from './Navbar';
import image1 from '../images/imag4.jpg';
import './Home.css';
import Services from './Services';
import Footer from './Footer';
import pic1 from '../images/pic1.jpg';
import  pic2 from'../images/pic2.jpg';
import pic3 from  '../images/pic3.jpg';
import pic4 from  '../images/pic6.jpg';


const Home = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        contactNumber: '',
        userQuestion: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setFormData({
            userName: '',
            userEmail: '',
            contactNumber: '',
            userQuestion: ''
        });

        // Reset the button message to "Submit" after a short delay
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000); // Change 3000 to the desired delay time in milliseconds
    };

    return (
        <div>
            <Navbar />
            <div id="about" className="image1-container">           
                <img src={image1} alt="Description of the image" />
                <div className="text-container">
                <h2 className="welcome-text" >Empowering Lives with Innovative Electronics Solutions</h2>
<p className="text" >
  Welcome to IEC Your trusted partner in cutting-edge electronics solutions. From consumer electronics to industrial automation, we deliver excellence in innovation and technology.
</p>

                    <button className="service-button">
                        <a href="#services" style={{ textDecoration: 'none', color: 'inherit' }}>OUR SERVICES</a>
                    </button>
                    <button className="contact-button">
                        <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>CONTACT US</a>
                    </button>
                </div>
            </div>

            
    <h1 id="name" className='name'>Innovation Driven team</h1>
    <h4 className='name1'> Renowned for Technical Excellence</h4>
    <br />
        <p className='txt'>
            IEC Established in 2002, IEC is a leading electronics company headquartered in the vibrant city of New York, NY 10012, US. With nearly two decades of industry expertise, IEC has garnered a reputation for excellence in delivering cutting-edge electronic solutions across diverse sectors. Our commitment to innovation, quality, and customer satisfaction has propelled us to the forefront of the electronics industry. At IEC, we specialize in designing, developing, and manufacturing innovative electronic products and solutions that meet the evolving needs of our clients. From consumer electronics to industrial automation, our comprehensive range of services encompasses product design, prototyping, manufacturing, and beyond. Our dedicated team of engineers, technicians, and professionals are driven by a passion for technology and a relentless pursuit of excellence.
            As a trusted partner to businesses and organizations worldwide, IEC is committed to delivering unparalleled value through our technical expertise, reliability, and unwavering commitment to customer success. With a global presence and a focus on innovation, IEC continues to lead the way in shaping the future of electronics and technology.
        </p>
        <p className='txt'>
        Our journey began with a simple yet ambitious goal: to redefine the way electronic products are designed, developed, and delivered. Today, we stand proud of our accomplishments, having built a reputation for excellence, innovation, and unwavering dedication to customer satisfaction.
    
        At IEC, we believe in the power of technology to transform lives and industries. That's why we invest heavily in research, development, and talent to stay ahead of the curve. Our team comprises some of the brightest minds in the field, driven by a shared passion for pushing the boundaries of what's possible.
    </p>
    <p className='txt'>
        From consumer electronics to industrial automation, our diverse portfolio of services covers the entire spectrum of electronic product development. Whether it's designing intricate circuitry, developing intuitive software interfaces, or ensuring rigorous quality control, we leave no stone unturned to deliver solutions that exceed expectations.
        As we look to the future, our commitment remains unchanged: to lead the way in innovation, to set new standards of excellence, and to empower our clients with the tools they need to succeed in an ever-evolving digital landscape.
    </p>
        <div className="image-container">
    <img src={pic1} alt="Description of the image" className="img-fluid" />
    <img src={pic4} alt="Description of the image" className="img-fluid" />
    <img src={pic2} alt="Description of the image" className="img-fluid" />
    <img src={pic3} alt="Description of the image" className="img-fluid" />
</div>



<div id="services" className="py-5">
    <Services />
</div>


{/* contct section */}
<h1 id="contact" className='head'>CONTACT US
</h1>
            <div  className="row align-items-stretch">
                <div className="col-md-6 mb-3 mt-5 order-2 order-md-1">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.022229442874!2d-74.00298478578916!3d40.72506316680967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25988bfcb9b75%3A0xf538fb7e8a20827c!2sNew%20York%2C%20NY%2010012%2C%20USA!5e0!3m2!1sen!2sin!4v1648021120890!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-5"></iframe>
                </div>
                <div className="col-md-6 mb-3 order-1 order-md-2 d-flex align-items-center justify-content-center">
                    <form className="mx-auto home-form" id="contactForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htm lFor="userName" className="form-label">Your Name</label>
                            <input type="text" className="form-control" id="userName" value={formData.userName} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="userEmail" value={formData.userEmail} onChange={handleChange} aria-describedby="emailHelp" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                            <input type="tel" className="form-control" id="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userQuestion" className="form-label">Your Question/Inquiry</label>
                            <textarea className="form-control" id="userQuestion" value={formData.userQuestion} onChange={handleChange} rows="4" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark">
                            {isSubmitted ? 'Form submitted successfully to the organization.' : 'Submit'}
                        </button>
                    </form>
                </div>
                
            </div>
         
            <Footer />
            
        </div>
    );
};

export default Home;

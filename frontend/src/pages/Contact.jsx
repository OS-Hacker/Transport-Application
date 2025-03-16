import React, { useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });


  const userName = formData?.name.split(" ")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Thank U ${userName} We Will Contact Soon`, {
      position: "top-center",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Wrapper>
      <Navbar />
      <section className="contact_section layout_padding mt-4">
        <div className="d-flex justify-content-center">
          <h2 className="heading_style">Contact us</h2>
        </div>
        <div className="container layout_padding2-top">
          <div className="row">
            <div className="col-md-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.928932641807!2d75.23073787468388!3d19.842959727448967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9b0006a48799%3A0x77c0a7f79351b032!2sShambhaji%20nagar!5e0!3m2!1sen!2sin!4v1741813520064!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                aria-label="Location Map"
              ></iframe>
            </div>

            <div className="col-md-6">
              <div className="contact_form-container">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      className="message_input"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Contact;

const Wrapper = styled.section`
  .contact_section .col-md-6 {
    padding: 0;
    margin: 30px 0;
  }

  .contact_form-container {
    padding: 40px;
    background-color: #78cffd;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .contact_form-container form {
    width: 100%;
  }

  .contact_form-container form input,
  .contact_form-container form textarea {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    background-color: #fcfcfc;
    margin: 10px 0;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }

  .message_input {
    height: 150px;
    resize: vertical;
  }

  .contact_form-container button {
    border: none;
    display: inline-block;
    padding: 10px 40px;
    background-color: #0a0057;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1a1a8d;
    }
  }

  .contact_form-container::before {
    content: "";
    width: 50px;
    height: 50px;
    background-color: #78cffd;
    position: absolute;
    left: -50px;
    top: 15%;
    transform: rotate(45deg);
  }

  .success_message {
    text-align: center;
    color: #0a0057;

    h3 {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 768px) {
    .contact_section .col-md-6 {
      margin: 15px 0;
    }

    .contact_form-container {
      padding: 20px;
    }

    .contact_form-container::before {
      display: none;
    }
  }
`;

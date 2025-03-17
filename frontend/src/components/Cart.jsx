import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useFilters } from "../context/FilterProvoder";
import axios from "axios";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { gsap } from "gsap";

const Cart = ({ showModal }) => {
  const { authUser } = useAuth();
  const { selectedFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const [transports, setTransports] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const cardRefs = useRef([]);

  const { vehicleType, load, popular, ratings, location, quickResponse } =
    selectedFilters;

  const fetchTransportData = useCallback(async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      vehicleType: vehicleType || "",
      load: load || "",
      popular: popular || "",
      ratings: ratings || "",
      location: location || "",
      quickResponse: quickResponse || "",
      page: 1,
    });
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/get-transport?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `${authUser?.token}`,
          },
        }
      );

      setTransports(data?.transports || []);
      setTotalPages(data?.totalPages || 0);
    } catch (err) {
      console.error("Error fetching transports:", err);
    } finally {
      setLoading(false);
    }
  }, [
    vehicleType,
    load,
    popular,
    ratings,
    location,
    quickResponse,
    authUser?.token,
  ]);

  useEffect(() => {
    fetchTransportData();
  }, [fetchTransportData]);

  // GSAP Animation for Initial Card Render
  useEffect(() => {
    if (transports.length > 0) {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [transports]);

  // GSAP Animation for Filtered Cards
  useEffect(() => {
    if (transports.length > 0) {
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [transports]);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : transports.length > 0 ? (
        transports.map((transport, index) => (
          <div
            className="card shadow-sm"
            key={transport?._id}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="image">
              <img
                src={transport?.transportImage}
                alt={transport?.transportName}
                className="card-img-top"
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">{transport?.transportName}</h3>
              <div className="card-text">
                <div className="rating mb-2">
                  <span
                    className="badge bg-success me-2 p-2"
                    style={{ fontSize: "13px" }}
                  >
                    {transport?.ratings} ★
                  </span>
                  <span className="text-muted">240 Ratings</span>
                </div>
                <div className="address mb-2" style={{ fontSize: "15px" }}>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  {transport?.location}
                </div>
                <div className="popular-tags mb-3">
                  {transport?.vehicleType?.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-2">
                      {tag}
                    </span>
                  ))}
                  <span className="badge bg-info me-2">
                    {transport?.load || "N/A"}
                  </span>
                </div>
                <div className="actions">
                  <a
                    href={`tel:+91${transport?.contactNumber || "8805745188"}`}
                    className="btn btn-outline-primary"
                  >
                    📞 Call
                  </a>
                  <a
                    href={`https://wa.me/${8237963724}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success"
                  >
                    💬 WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      if (authUser?.user) {
                        showModal(transport?._id);
                      } else {
                        toast("Please Login", { position: "top-center" });
                      }
                    }}
                    className="btn btn-primary open-button"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          className="no-results"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          No transports found.
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.section`
  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 15px 0;
    overflow: hidden;
    width: 100%;
    max-width: 1100px;
    opacity: 0; /* Initial opacity for GSAP animation */
  }

  img {
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.03);
    }
  }

  .image {
    flex: 1;
    max-width: 30%;
  }

  .card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-body {
    flex: 2;
    padding: 15px;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .rating {
    font-size: 0.9rem;
  }

  .address {
    font-size: 0.9rem;
    color: #555;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .btn {
    flex: 1;
    min-width: 120px;
  }

  @media (max-width: 768px) {
    .card {
      flex-direction: column;
    }

    .image {
      max-width: 100%;
    }

    .card-img-top {
      height: 200px;
    }

    .actions {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .card-title {
      font-size: 1.1rem;
    }

    .rating,
    .address {
      font-size: 0.8rem;
    }
  }
`;

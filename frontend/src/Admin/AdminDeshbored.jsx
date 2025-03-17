import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import AdminSideBar from "./AdminSideBar";
import { useAuth } from "../context/AuthContext";
import Navbar from "../pages/Navbar";
import Loading from "../components/Loading";

const AdminDeshbored = () => {
  const [users, setUsers] = useState([]);
  const { authUser, setAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // Get All Users
  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get-users`,
        {
          headers: {
            Authorization: authUser?.token,
          },
        }
      );
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [authUser?.token]);

  // Delete User
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete-user/${id}`,
        {
          headers: {
            Authorization: authUser?.token,
          },
        }
      );

      if (data?.success) {
        toast.success(data?.msg, {
          position: "top-center",
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Wrapper>
      <Navbar />
      <div className="main_container">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <AdminSideBar />
            </div>
            <div className="col-sm-8 text-center text-dark mt-5 mb-5">
              {!loading ? (
                <>
                  <TableContainer>
                    <h2 className="table_title">User Management</h2>
                    <table className="user_table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>User Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((ele, i) => {
                          const { name, email, number, _id } = ele;
                          return (
                            <tr key={_id}>
                              <td>{i + 1}</td>
                              <td>{name}</td>
                              <td>{email}</td>
                              <td>{number}</td>
                              <td>
                                <button
                                  className="delete_btn"
                                  onClick={() => deleteHandler(_id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </TableContainer>
                </>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDeshbored;

// Styled Components
const Wrapper = styled.section`
  .main_container {
    height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
  }
`;

const TableContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  .table_title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .user_table {
    width: 100%;
    border-collapse: collapse;
    font-family: sans-serif;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #007bff;
      color: white;
      font-size: 1.2rem;
    }

    td {
      font-size: 1rem;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    .delete_btn {
      padding: 8px 12px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #c82333;
      }
    }
  }

  @media (max-width: 768px) {
    .user_table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;

      th,
      td {
        padding: 8px 10px;
      }

      th {
        font-size: 1rem;
      }

      td {
        font-size: 0.9rem;
      }

      .delete_btn {
        padding: 6px 10px;
        font-size: 0.9rem;
      }
    }
  }
`;

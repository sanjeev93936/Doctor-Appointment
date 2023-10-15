import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "./../styles/register.css";
import axios from "axios";
const Register = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Apple Hospital - Register";
  }, []);
  const navigate = useNavigate();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong!");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form card p-4"
        >
          <h1 className="text-center">Sign Up</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already registered? Login Here{" "}
          </Link>
          <button className="btn btn-primary" type="submit">
            Register{" "}
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;

import { useState, useEffect } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  // 🔄 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🚀 Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Registration successful 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center mb-4">Create Account</h1>

      <Form onSubmit={submitHandler} noValidate>
        {/* Name */}
        <Form.Group className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="my-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <InputGroup.Text
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <InputGroup.Text
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Button */}
        <Button
          type="submit"
          variant="primary"
          className="mt-3 w-100"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Register"}
        </Button>

        {isLoading && <Loader />}
      </Form>

      {/* Footer */}
      <Row className="py-3">
        <Col className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

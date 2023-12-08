import { useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import {resetPasswordOtp} from "../../redux/apiThunk/Password.js/PasswordThunk"
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    otp: Yup.string()
    .matches(/^\d{6}$/, "Mã OTP phải có 6 chữ số")
    .required("Vui lòng nhập mã OTP"),
    password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
const ResetOTP = ({open, onClose}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = {
        otp : values.otp,
        password: values.password,
      }
      await dispatch(resetPasswordOtp(data));
      resetForm();
      navigate(`/login`);
      onClose();
    } catch (error) {
      console.error("Error fetching otp data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle sx={{ fontSize: "18px", fontWeight: "bold", color: "red"}}>Xác nhận tài khoản</DialogTitle>
    <DialogContent style={{ width: "450px" }}>
    <Formik
          initialValues={{ otp: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                name="otp"
                as={TextField}
                label="Mã OTP"
                type="text" 
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!(touched.otp && errors.otp)}
                helperText={touched.otp && errors.otp}
              />
              <Field
                name="password"
                as={TextField}
                label="Mật khẩu mới"
                type="password" 
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <DialogActions>
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  disabled={isSubmitting}
                >
                  Xác nhận
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
    </DialogContent>
  </Dialog>
  );
};

export default ResetOTP;

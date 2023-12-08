import { useState } from "react";
import { Grid, Typography, Box, Paper, TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ResetOTP from "./ResetPasswordPopup";
import background from "../../assets/images/background.jpg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPasswordOtp } from "../../redux/apiThunk/Password.js/PasswordThunk";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Địa chỉ email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
});
const ForgotPassword = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(forgotPasswordOtp(values.email));
      resetForm();
      setShowOtpForm(true);
    } catch (error) {
      console.error("Error fetching email data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            my: 30,
            mx: 10,
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{ mb: 4, ml: 16, color: "red", fontWeight: "bold" }}
          >
            Quên mật khẩu
          </Typography>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="text" // Dùng type="text" để gửi dữ liệu dưới dạng chuỗi
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 1 }}
                  disabled={isSubmitting}
                >
                  Xác thực tài khoản
                </Button>
              </Form>
            )}
          </Formik>
          {showOtpForm && (
            <ResetOTP
              open={showOtpForm}
              onClose={() => setShowOtpForm(false)}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { createTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormik } from "formik"
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import background from "../../assets/images/background.jpg"
import Logo from '../../assets/images/logo.png'
import PopupOTP from "../Login/OTPPage"
const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    phone: Yup.string()
      .matches(/^0/, "Số điện thoại phải bắt đầu bằng '0'")
      .min(10, "Số điện thoại ít nhất là 10 số")
      .max(11, "Số điện thoại nhiều nhất là 11 số")
      .required("Bắt buộc nhập số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });
export default function Register() {
    const [open, setOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [profile, setProfile] = React.useState(null);
    const baseUrl = 'https://fruitseasonapims-001-site1.btempurl.com/api/auths/register';

    const handleFileUpload = (event, fileNumber) => {
        const files = event.target.files;
        if (files.length > 0) {
          if (fileNumber === 2) {
            setProfile(files[0]);
          }
        }
      };

      const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
          fullName: "",
          phone: "",
          address: "",
          roleId: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm}) => {
          try {
            const formData = new FormData();
            formData.append("Email", values.email);
            formData.append("Password", values.password);
            formData.append("FullName", values.fullName);
            formData.append("Address", values.address);
            formData.append("PhoneNumber", values.phone);
            formData.append("RoleId", 3);
            formData.append("ProfileImageUrl", values.profile);
            console.log("data: ", values);
            const response = await fetch(baseUrl, {
              method: "POST",
              body: formData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
              setFormSubmitted(true);
              resetForm();
              setOpen(true);
            } else {
              console.log("Registration failed");
            }
          } catch (error) {
            console.error("Error calling API:", error);
          }
        },
      });
    

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
                my: 8,
                mx: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                color={"goldenrod"}
                variant="h6"
                component="div"
                sx={{ mb: 2 }}
              >
                <img src={Logo} alt="logo" height={"40"} width="170" />
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  label="Địa chỉ email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
    
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
    
                <TextField
                  margin="normal"
                  fullWidth
                  name="fullName"
                  label="Họ và Tên"
                  type="text"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
    
                <TextField
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Số điện thoại"
                  type="tel"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
    
                <TextField
                  margin="normal"
                  fullWidth
                  name="address"
                  label="Địa chỉ"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
                <span>Ảnh cá nhân </span>
    
                <input
                  className="form-control form-control-sm"
                  id="ProfileImageUrl"
                  name="ProfileImageUrl"
                  type="file"
                  onChange={(e) => {
                    formik.setFieldValue("profile", e.currentTarget.files[0]);
                    handleFileUpload(e, 2);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.profile && Boolean(formik.errors.profile)}
                />
                {formik.touched.profile && formik.errors.profile && (
                  <div>{formik.errors.profile}</div>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Đăng ký tài khoản
                </Button>
              </form>
              {formSubmitted && (
                <PopupOTP open={open} onClose={() => setOpen(false)} />
              )}
            </Box>
          </Grid>
        </Grid>
      );
}

import React from "react";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const Login = ({ setHassAcc }) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email")
      .required("email is required"),
    password: Yup.string()
      .min(8, "password at least 8 characters")
      .required("password is required"),
  });

  return (
    <div>
      <div className="bg-white w-11/12 m-auto md:w-1/2">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-1 p-1">
              <label className="font-bold text-lg flex justify-start mt-8 ms-8">
                Sign in to your account
              </label>
              <Field
                type="email"
                name="email"
                id=""
                className="w-11/12 rounded-0 border-0 py-4 px-3 mt-5 my-3 bg-gray-100"
                placeholder="Email"
              />   <ErrorMessage name="email" component="div" className="text-red-600" />
              <Field
                type="password"
                name="password"
                id=""
                className="w-11/12 rounded-0 border-0 py-4 px-3 my-3 bg-gray-100"
                placeholder="Password"
              />   <ErrorMessage name="password" component="div" className="text-red-600"/>

              <div className="flex justify-between flex-row-reverse m-7 ">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  style={{
                    boxShadow: "none",
                    borderRadius: "0px",
                    backgroundColor: "#2A2",
                  }}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <p
        onClick={() => setHassAcc(false)}
        className="underline text-sky-700 cursor-pointer mt-1"
      >
        sign up
      </p>
    </div>
  );
};

export default Login;

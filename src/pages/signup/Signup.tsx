import { Button, Input, Loader, PasswordInput, TextInput } from "@mantine/core";
import video from "../../media/videos/sample.mp4";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import useStore from "../../store/authStore";
const apiUrl = import.meta.env.VITE_API_URL;
import bg from "../../media/images/bg.png";

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const form = useForm({
    // mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (data: object) => {
    setLoader(true);

    axios
      .post(`${apiUrl}/api/signup/`, {
        username: data.username,
        password: data.password,
      })
      .then((signupResult) => {
        // console.log(signupResult);
        toast.success("User created successfully");

        // After signup, attempt to log in
        return axios.post(`${apiUrl}/api/token/`, {
          username: data.username,
          password: data.password,
        });
      })
      .then((loginResult) => {
        setUser(loginResult.data);
        navigate("/banks");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 400) {
          // Specific error message based on which request failed
          if (err.config.url.includes("/api/signup/")) {
            toast.error("Username already exists.");
          } else if (err.config.url.includes("/api/token/")) {
            toast.error("Login failed. Please check your credentials.");
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src={bg}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="relative flex justify-center items-center mt-52 z-10 text-white  p-8">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="bg-black gap-4 max-w-lg  p-10 rounded-xl flex  flex-col  backdrop-blur-sm bg-opacity-15"
        >
          <h1 className="text-2xl text-center font-bold text-white">Signup</h1>

          <TextInput
            label="Username"
            required
            className=""
            key={form.key("username")}
            {...form.getInputProps("username")}
            maxLength={15}
            size="md"
            labelProps={{ style: { fontWeight: "bold" } }} // Make the label bold
            placeholder="Your username:"
            leftSection={<FaUser color="white" size={16} />}
          />
          <PasswordInput
            label="Password:"
            maxLength={15}
            required
            key={form.key("password")}
            {...form.getInputProps("password")}
            labelProps={{ style: { fontWeight: "bold" } }} // Make the label bold
            size="md"
            className="w-full"
            placeholder="Your password"
            minLength={4}
            leftSection={<MdPassword color="white" size={16} />}
          />
          <Button type="submit" disabled={loader} size="sm" className="">
            {loader ? <Loader size="sm" color="red" /> : "Signup"}
          </Button>
          <small>
            already have an account?{" "}
            <Link className="underline" to={"/login"}>
              login here
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Signup;

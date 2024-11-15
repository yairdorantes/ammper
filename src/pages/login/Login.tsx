import { Button, Input, Loader, PasswordInput, TextInput } from "@mantine/core";
import video from "../../media/videos/sample.mp4";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import useStore from "../../store/authStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const { user, setUser } = useStore();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const handleSubmit = (data: object) => {
    setLoader(true);
    axios
      .post(`${apiUrl}/api/token/`, {
        username: data.username,
        password: data.password,
      })
      .then((result) => {
        setUser(result.data);
        navigate("/banks");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Username or password incorrect");
      })
      .finally(() => setLoader(false));
  };
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative flex justify-center items-center mt-52 z-10 text-white  p-8">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="bg-black gap-4 max-w-lg  p-10 rounded-xl flex  flex-col  backdrop-blur-sm bg-opacity-15"
        >
          <h1 className="text-2xl text-center font-bold text-white">Login</h1>
          <TextInput
            label="Username"
            key={form.key("username")}
            {...form.getInputProps("username")}
            maxLength={15}
            className=""
            max={20}
            size="md"
            required
            labelProps={{ style: { fontWeight: "bold" } }} // Make the label bold
            placeholder="Your username:"
            leftSection={<FaUser color="white" size={16} />}
          />
          <PasswordInput
            required
            label="Password:"
            key={form.key("password")}
            maxLength={15}
            {...form.getInputProps("password")}
            labelProps={{ style: { fontWeight: "bold" } }} // Make the label bold
            max={20}
            size="md"
            className="w-full"
            placeholder="Your password"
            minLength={1}
            leftSection={<MdPassword color="white" size={16} />}
          />
          <Button type="submit" size="sm" disabled={loader} className="">
            {loader ? <Loader size="sm" color="red" /> : "Login"}
          </Button>
          <small>
            Dont have an account?{" "}
            <Link className="underline" to={"/signup"}>
              create one here
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;

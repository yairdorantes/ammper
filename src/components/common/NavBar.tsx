import { Avatar, Menu } from "@mantine/core";
import useStore from "../../store/authStore";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const exit = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="fixed flex z-20 items-center justify-between bg-purple-900 w-full p-4 top-0">
      <div className="text-white">
        Welcome, <span className="font-bold truncate">{user.username}</span>{" "}
      </div>
      <Menu>
        <Menu.Target>
          <Avatar className="cursor-pointer" variant="filled">
            <FaUser />
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{user.username}</Menu.Label>
          <Menu.Item
            onClick={exit}
            color="red"
            leftSection={<HiOutlineLogout />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default NavBar;

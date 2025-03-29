import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
	authUser: null,
	checkingAuth: true,
	loading: false,

	signup: async (signupData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/signup", signupData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);

			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	signin: async (signinData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/signin", signinData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);
			toast.success("Signed in successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	signout: async () => {
		try {
			const res = await axiosInstance.post("/auth/signout");
			disconnectSocket();
			if (res.status === 200) set({ authUser: null });
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		}
	},
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/me");
			initializeSocket(res.data.user._id);
			set({ authUser: res.data.user });
		} catch (error) {
			set({ authUser: null });
			console.log(error);
		} finally {
			set({ checkingAuth: false });
		}
	},

	setAuthUser: (user) => set({ authUser: user }),
}));
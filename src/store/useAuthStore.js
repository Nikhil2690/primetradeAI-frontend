
import { create } from 'zustand';
import { getUserDetails, loginUser, registerUser } from '../api/user';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    
    // Actions
    login: async (credentials) => {
        set({loading:true})
        try {
            const response = await loginUser(credentials)
            console.log("Full Login Response:", response.data);
            const token = response.data.accessToken
            const userData = response.data.user
    
            localStorage.setItem("accessToken", token)
            set({user: userData, isAuthenticated: true, loading:false})
            return response.data
        } catch (error) {
            set({loading: false})
            throw error
        }
    },

    logout: () => {
        localStorage.removeItem("accessToken")
        set(
            { user: null, 
            isAuthenticated: false ,
            loading:false
            }
        )
    },

    register: async (data) => {
    set({ loading: true });
    try {
        const res = await registerUser(data);
        return { success: true, message: res.data.message };
    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data?.message || "Registration failed" 
        };
    } finally {
        set({ loading: false });
    }
},

    checkAuth: async () => {
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
            set({ user: null, isAuthenticated: false, loading: false });
            return;
        }
        set({ loading: true });

        try {
            const response = await getUserDetails()
            console.log("CheckAuth Response Object:", response.data);
            set({ 
                user: response.data.data || response.data, 
                isAuthenticated: true, 
                loading: false 
            });
        } catch (error) {
            set({user: null, isAuthenticated: false, loading:false})
            localStorage.removeItem("accessToken")
            console.log("Auth check failed", error)
        } finally {
        set({ loading: false }); // This tells the app it's safe to route
    }
    },
}));
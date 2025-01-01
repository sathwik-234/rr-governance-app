'use client';
import { useEffect, useState } from "react";
import { login, signup } from "./action";

export default function Login() {
    const [signInData, setSignInData] = useState({
        cms_id: "",
        email: "",
        password: "",
    });

    const [user, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserData = async (cms_id) => {
        if (!cms_id) return; 
        try {
            const res = await fetch(`/api/users/${cms_id}`);
            if (!res.ok) throw new Error("Error fetching user data");
            const data = await res.json();
            setUserData(data);
            setError(null); // Clear error if successful
            return true; // Indicate success
        } catch (err) {
            console.error("Fetch error:", err);
            setUserData(null); 
            setError("User not found or fetch error occurred.");
            return false;
        }
    };

    const checkUserAndSubmit = async (e) => {
        e.preventDefault();
    
        const isFetched = await fetchUserData(signInData.cms_id);
        if (!isFetched) {
            console.log("Data is not available");
            return;
        }
    
        try {
            signup(signInData);
        }catch{
            console.error(error)
        }

    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignInData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log("User Data:", user);
    }, [user]);

    return (
        <>
            <form onSubmit={checkUserAndSubmit}>
                <p>CMS ID:</p>
                <input
                    type="text"
                    name="cms_id"
                    value={signInData.cms_id}
                    onChange={handleChange}
                />
                <p>Email:</p>
                <input
                    type="email"
                    name="email"
                    value={signInData.email}
                    onChange={handleChange}
                />
                <p>Password:</p>
                <input
                    type="password"
                    name="password"
                    value={signInData.password}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && (
                <div>
                    <h3>User Details:</h3>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

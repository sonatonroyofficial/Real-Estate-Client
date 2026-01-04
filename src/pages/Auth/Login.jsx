import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';

const Login = () => {
    const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const validateForm = () => {
        let newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
        setLoginError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setLoginError("");

        try {
            await signIn(formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            setLoginError("Invalid email or password. Please try again.");
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            if (provider === 'google') await signInWithGoogle();
            else if (provider === 'github') await signInWithGithub();
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            setLoginError(`Failed to login with ${provider}.`);
        }
    };

    const handleDemoLogin = (role) => {
        if (role === 'admin') {
            setFormData({ email: 'admin@brandbay.com', password: 'password123' });
        } else {
            setFormData({ email: 'user@brandbay.com', password: 'password123' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-base-content/70">
                        Sign in to access your account
                    </p>
                </div>

                {/* Demo Buttons Hint: These won't work perfectly until actual users exist in Firebase, but we keep the UI */}
                <div className="alert alert-info text-xs py-2">
                    <span>Note: Demo accounts must be registered first in Firebase to work.</span>
                </div>
                <div className="flex gap-4 justify-center">
                    <button
                        type="button"
                        onClick={() => handleDemoLogin('admin')}
                        className="btn btn-sm btn-outline btn-secondary"
                    >
                        Demo Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDemoLogin('user')}
                        className="btn btn-sm btn-outline btn-accent"
                    >
                        Demo User
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {loginError && <div className="alert alert-error text-sm py-2">{loginError}</div>}

                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <FaEnvelope className="text-base-content/50" />
                                <input
                                    type="email"
                                    name="email"
                                    className="grow"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                            {errors.email && <span className="text-error text-xs mt-1 ml-1">{errors.email}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <FaLock className="text-base-content/50" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="grow"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-ghost btn-xs btn-circle"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </label>
                            {errors.password && <span className="text-error text-xs mt-1 ml-1">{errors.password}</span>}
                            <div className="text-right">
                                <a href="#" className="link link-hover text-xs text-primary">Forgot password?</a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full shadow-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="loading loading-spinner"></span> : "Sign In"}
                        </button>
                    </div>
                </form>

                <div className="divider">OR</div>

                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleSocialLogin('google')} className="btn btn-outline w-full gap-2">
                        <FaGoogle className="text-red-500" /> Google
                    </button>
                    <button onClick={() => handleSocialLogin('github')} className="btn btn-outline w-full gap-2">
                        <FaGithub /> GitHub
                    </button>
                </div>

                <div className="text-center text-sm">
                    <span className="text-base-content/70">Don't have an account? </span>
                    <Link to="/register" className="link link-primary font-bold">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

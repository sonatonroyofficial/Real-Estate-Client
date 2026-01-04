import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle, signInWithGithub } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
        setRegisterError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setRegisterError("");

        try {
            // 1. Create User
            await createUser(formData.email, formData.password);

            // 2. Update Profile (Name) - Photo URL is simplified here
            await updateUserProfile(formData.name, `https://ui-avatars.com/api/?name=${formData.name}&background=random`);

            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                setRegisterError("Email is already registered.");
            } else {
                setRegisterError("Failed to register. Please try again.");
            }
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            if (provider === 'google') await signInWithGoogle();
            else if (provider === 'github') await signInWithGithub();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setRegisterError(`Failed to sign up with ${provider}.`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-base-content/70">
                        Join our community of home seekers
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {registerError && <div className="alert alert-error text-sm py-2">{registerError}</div>}

                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <FaUser className="text-base-content/50" />
                                <input
                                    type="text"
                                    name="name"
                                    className="grow"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </label>
                            {errors.name && <span className="text-error text-xs mt-1 ml-1">{errors.name}</span>}
                        </div>

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
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Confirm Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <FaLock className="text-base-content/50" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="grow"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </label>
                            {errors.confirmPassword && <span className="text-error text-xs mt-1 ml-1">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full shadow-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="loading loading-spinner"></span> : "Sign Up"}
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
                    <span className="text-base-content/70">Already have an account? </span>
                    <Link to="/login" className="link link-primary font-bold">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

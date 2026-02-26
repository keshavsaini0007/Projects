
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "", id: "" });
    const [passwordArray, setPasswordArray] = useState([])

    const getPassword = async () => {
        let res = await fetch("http://localhost:3000/")
        let passwords = await res.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPassword()
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("src/icons/view.png")) {
            passref.current.type = "password"
            ref.current.src = "src/icons/hide.png";
        }
        else {
            passref.current.type = "text"
            ref.current.src = "src/icons/view.png";
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/", { method: "DELETE", 
            headers: { "content-type": "application/json" }, 
            body: JSON.stringify({ id: form.id }) })
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            
            let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })


            setForm({ site: "", username: "", password: "", id: "" })




            toast('Password saved', {
                position: "top-right", autoClose: 5000, hideProgressBar: false,
                closeOnClick: false, pauseOnHover: true, draggable: true, theme: "dark",
            });
        } else {
            toast('An Error Occured', { theme: "dark" })
        }
    }

    const deletePassword = async (id) => {
        let conf = confirm("Do you want to delete password")
        if (conf) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) })
            toast('Your password deleted', {
                position: "top-right", autoClose: 5000, hideProgressBar: false,
                closeOnClick: false, pauseOnHover: true, draggable: true, theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied To Clipboard', {
            position: "top-right", autoClose: 2000, hideProgressBar: false,
            closeOnClick: false, pauseOnHover: true, draggable: true, theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/* Full page dark background */}
            <div className="min-h-screen text-gray-100">
                {/* ── ANIMATED DARK BACKGROUND ── */}
                <div className="fixed inset-0 -z-10 bg-gray-950 overflow-hidden">

                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

                    {/* Animated green blobs */}
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:1.5s]" />
                    <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-green-400/5 rounded-full blur-[100px] animate-pulse [animation-delay:3s]" />

                    {/* Moving grid overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(74,222,128,0.8) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(74,222,128,0.8) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Top shimmer line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

                </div>
                <div className="mycontainer max-w-4xl mx-auto p-4 md:px-6">

                    {/*  HEADER  */}
                    <div className="flex flex-col items-center py-10 gap-2">
                        <div className="relative group cursor-default select-none">
                            {/* Glow behind logo */}
                            <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative font-extrabold text-4xl tracking-tight text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.8)] group-hover:scale-105">
                                &lt; <span className="text-white">सूत्र</span>म् /&gt;
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm tracking-widest uppercase animate-pulse">
                            Your Own Password Manager
                        </div>
                        {/* Divider */}
                        <div className="mt-4 w-24 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                    </div>

                    {/*  INPUT SECTION  */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl shadow-black/60 flex flex-col items-center space-y-5 transition-all duration-300 hover:border-green-900/60">

                        {/* Site URL input */}
                        <div className="w-full group">
                            <input
                                value={form.site}
                                name="site"
                                onChange={handleChange}
                                type="text"
                                placeholder="🌐  Enter Website URL"
                                className="w-full px-5 h-11 rounded-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500
                                           focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:bg-gray-750
                                           transition-all duration-300 hover:border-gray-600 text-sm"
                            />
                        </div>

                        {/* Username + Password row */}
                        <div className="flex md:flex-row flex-col w-full gap-3">
                            <input
                                value={form.username}
                                name="username"
                                onChange={handleChange}
                                type="text"
                                placeholder="👤  Enter Username"
                                className="w-full px-5 h-11 rounded-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500
                                           focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30
                                           transition-all duration-300 hover:border-gray-600 text-sm"
                            />
                            <div className="relative w-full">
                                <input
                                    ref={passref}
                                    value={form.password}
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="🔑  Enter Password"
                                    className="w-full px-5 pr-12 h-11 rounded-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500
                                               focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30
                                               transition-all duration-300 hover:border-gray-600 text-sm"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200">
                                    <img
                                        src="src/icons/hide.png"
                                        ref={ref}
                                        onClick={showPassword}
                                        className="w-6 h-6 invert"
                                        alt="toggle password"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={savePassword}
                            className="relative overflow-hidden group
                                       bg-gradient-to-r from-green-600 via-emerald-500 to-green-500
                                       hover:from-green-500 hover:via-emerald-400 hover:to-green-400
                                       text-white font-semibold px-8 h-11 rounded-full
                                       shadow-lg shadow-green-900/50 hover:shadow-green-500/40 hover:shadow-xl
                                       ring-1 ring-green-500/40 hover:ring-green-400/60
                                       transition-all duration-300 ease-out
                                       hover:scale-105 active:scale-95"
                        >
                            {/* Shimmer */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            <span className="relative flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Save Password
                            </span>
                        </button>
                    </div>

                    {/* ── PASSWORDS TABLE ── */}
                    <div className="mt-10">
                        <div className="flex items-center gap-3 mb-5">
                            <h2 className="font-bold text-2xl text-gray-100">Your Passwords</h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-green-800/60 to-transparent" />
                            {passwordArray.length > 0 && (
                                <span className="text-xs bg-green-900/50 text-green-400 border border-green-800 px-3 py-1 rounded-full">
                                    {passwordArray.length} saved
                                </span>
                            )}
                        </div>

                        {passwordArray.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-600 gap-3">
                                <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <p className="text-sm">No passwords saved yet</p>
                            </div>
                        )}

                        {passwordArray.length !== 0 && (
                            <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 text-green-300 text-sm uppercase tracking-wider">
                                            <th className="py-3 px-4 text-left font-semibold">Username</th>
                                            <th className="py-3 px-4 text-left font-semibold">Site</th>
                                            <th className="py-3 px-4 text-left font-semibold">Password</th>
                                            <th className="py-3 px-4 text-center font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                                        {passwordArray.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="group/row hover:bg-gray-800/70 transition-colors duration-200"
                                            >
                                                {/* Username */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-300 text-sm truncate max-w-[140px]">{item.username}</span>
                                                        <button
                                                            onClick={() => copyText(item.username)}
                                                            className="opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110 active:scale-90 shrink-0"
                                                            title="Copy"
                                                        >
                                                            <img src="src\icons\copy.png" className="w-4 h-4 invert opacity-60 hover:opacity-100" alt="copy" />
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Site */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <a href={item.site} target="_blank"
                                                            className="text-green-400 hover:text-green-300 text-sm truncate max-w-[160px] transition-colors duration-200 hover:underline underline-offset-2">
                                                            {item.site}
                                                        </a>
                                                        <button
                                                            onClick={() => copyText(item.site)}
                                                            className="opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110 active:scale-90 shrink-0"
                                                            title="Copy"
                                                        >
                                                            <img src="src\icons\copy.png" className="w-4 h-4 invert opacity-60 hover:opacity-100" alt="copy" />
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Password */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-500 tracking-widest text-xs">{"⦾".repeat(Math.min(item.password.length, 12))}</span>
                                                        <button
                                                            onClick={() => copyText(item.password)}
                                                            className="opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110 active:scale-90 shrink-0"
                                                            title="Copy"
                                                        >
                                                            <img src="src\icons\copy.png" className="w-4 h-4 invert opacity-60 hover:opacity-100" alt="copy" />
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => editPassword(item.id)}
                                                            className="p-1.5 rounded-lg bg-gray-800 hover:bg-blue-900/50 border border-gray-700 hover:border-blue-700
                                                                       transition-all duration-200 hover:scale-110 active:scale-90 group/btn"
                                                            title="Edit"
                                                        >
                                                            <img src="src\icons\edit.svg" className="w-4 h-4 invert opacity-60 group-hover/btn:opacity-100 transition-opacity" alt="edit" />
                                                        </button>
                                                        <button
                                                            onClick={() => deletePassword(item.id)}
                                                            className="p-1.5 rounded-lg bg-gray-800 hover:bg-red-900/50 border border-gray-700 hover:border-red-700
                                                                       transition-all duration-200 hover:scale-110 active:scale-90 group/btn"
                                                            title="Delete"
                                                        >
                                                            <img src="src\icons\delete.svg" className="w-4 h-4 invert opacity-60 group-hover/btn:opacity-100 transition-opacity" alt="delete" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Manager


import { auth } from "@/services/firebase.init";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter()

  if (loading) return <Loading></Loading>;

  const makeSignOut = async () => {
    await signOut(auth)
    router.push("/")
  }

  return (
    <div className="navbar bg-[#000944] h-20 z-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn bg-white lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            <li className="h-12">
              <Link href="/#home">Home</Link>
            </li>
            <li className="h-12">
              <Link href="/#inventories">Inventories</Link>
            </li>
            {user?.uid && (
              <li className="h-12">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            )}
            <li className="h-12">
              <Link href="/#reviews">Reviews</Link>
            </li>
            <li className="h-12">
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="normal-case text-4xl text-white ml-3">
          Cure Tools
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="tooltip tooltip-bottom" data-tip="Home">
            <Link href="/#home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Inventories">
            <Link href="/#inventories">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </Link>
          </li>
          {user?.uid && (
            <li className="tooltip tooltip-bottom" data-tip="Dashboard">
              <Link href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </Link>
            </li>
          )}
          <li className="tooltip tooltip-bottom" data-tip="Reviews">
            <Link href="/#reviews">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Contact">
            <Link href="/#contact">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
          <button onClick={()=>makeSignOut()} className="btn">
            Log Out
          </button>
        ) : (
          <Link className="btn" href="/entry">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

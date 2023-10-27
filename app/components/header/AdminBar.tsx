"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { shortenHexString } from "../../../utils/helper";
import { useRouter } from "next/navigation";
import { TOKEN_SYMBOL } from "@/utils/constant";
import { isAdminLoggedIn } from "@/utils/jwtHelper";
import { useUser } from "@/context/UserContext";
import { magic } from "@/libs/magic";
import { useWeb3 } from "@/context/Web3Context";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";

const tab: string[] = ["All", "Unread"];

export default function AdminBar({ profile }: { profile: any }): JSX.Element {
  const [isAuthorActive, setAuthorActive] = useState<boolean>(false);
  const { initializeWeb3 } = useWeb3();
  const { address, user, balance, symbol } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const avatarHandler = () => {
    setAuthorActive(!isAuthorActive);
  };

  const logout = async () => {
    try {
      if (typeof window != "undefined") {
        if (!magic) return;

        dispatch(setLoading(true));
        // Try to disconnect the user's wallet using Magic's logout method
        await magic.user.logout();

        // After successful disconnection, re-initialize the Web3 instance
        initializeWeb3();
        localStorage.clear();
        dispatch(setLoading(false));
        router.push("/");
        location.reload();
      }
    } catch (error) {
      dispatch(setLoading(false));
      // Log any errors that occur during the disconnection process
      console.log("handleDisconnect:", error);
    }
  };
  useEffect(() => {
    console.log("user", user, balance);
  }, [user]);

  return (
    <div className="header_avatar">
      <div className="popup-user">
        <Image
          height={100}
          width={100}
          onClick={avatarHandler}
          className="avatar"
          src={
            "/assets/images/userDefault.png"
            // profile?.profileImage
            //   ? profile.profileImage
            //   : "/assets/images/userDefault.png"
          }
          alt="avatar"
        />
        <div
          className={`avatar_popup mt-20 ${isAuthorActive ? "visible" : ""}`}
        >
          {/* {!isAdminLoggedIn() && (
            <h4>{profile?.name ? profile.name : "no name"}</h4>
          )} */}
          {address && (
            <>
              <div className="d-flex align-items-center mt-20 mg-bt-12">
                <div className="info">
                  <p>Balance</p>
                  <p className="style">
                    {address
                      ? `${balance} ${TOKEN_SYMBOL}`
                      : `0 ${TOKEN_SYMBOL}`}
                  </p>
                </div>
              </div>
              <p>Wallet</p>
              <div className="d-flex align-items-center justify-content-between mg-t-5 mg-bt-17">
                <p>{shortenHexString(address, 8, 8)}</p>
                {/* <Link href="/" className="ml-2">
              <i className="fal fa-copy" />
            </Link> */}
              </div>
              <div className="divider" />
            </>
          )}
          <div className="hr" />
          <div className="links mt-20">
            <Link href={isAdminLoggedIn() ? "/admin/profile" : "/profile"}>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.774902 18.333C0.774902 18.7932 1.14762 19.1664 1.60824 19.1664C2.06885 19.1664 2.44157 18.7932 2.44157 18.333C2.44157 15.3923 4.13448 12.7889 6.77329 11.5578C7.68653 12.1513 8.77296 12.4997 9.94076 12.4997C11.113 12.4997 12.2036 12.1489 13.119 11.5513C13.9067 11.9232 14.6368 12.4235 15.2443 13.0307C16.6611 14.4479 17.4416 16.3311 17.4416 18.333C17.4416 18.7932 17.8143 19.1664 18.2749 19.1664C18.7355 19.1664 19.1083 18.7932 19.1083 18.333C19.1083 15.8859 18.1545 13.5845 16.4227 11.8523C15.8432 11.2725 15.1698 10.7754 14.4472 10.3655C15.2757 9.3581 15.7741 8.06944 15.7741 6.66635C15.7741 3.44979 13.1569 0.833008 9.94076 0.833008C6.72461 0.833008 4.10742 3.44979 4.10742 6.66635C4.10742 8.06604 4.60379 9.35154 5.42863 10.3579C2.56796 11.9685 0.774902 14.9779 0.774902 18.333V18.333ZM9.94076 2.49968C12.2381 2.49968 14.1074 4.36898 14.1074 6.66635C14.1074 8.96371 12.2381 10.833 9.94076 10.833C7.6434 10.833 5.77409 8.96371 5.77409 6.66635C5.77409 4.36898 7.6434 2.49968 9.94076 2.49968V2.49968Z"
                  fill="white"
                />
              </svg>
              <span>My Profile</span>
            </Link>
            {/* <Link className="mt-10" href="/profile">
              <svg
                width={20}
                height={18}
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1154 0.730469H2.88461C1.29402 0.730469 0 2.02449 0 3.61508V14.3843C0 15.9749 1.29402 17.2689 2.88461 17.2689H17.1154C18.706 17.2689 20 15.9749 20 14.3843V3.61508C20 2.02449 18.706 0.730469 17.1154 0.730469ZM18.7529 10.6035H14.6154C13.6611 10.6035 13 9.95407 13 8.99969C13 8.04532 13.661 7.34544 14.6154 7.34544H18.7529V10.6035ZM18.7529 6.11508H14.6154C13.0248 6.11508 11.7308 7.40911 11.7308 8.99969C11.7308 10.5903 13.0248 11.8843 14.6154 11.8843H18.7529V14.3843C18.7529 15.3386 18.0698 15.9996 17.1154 15.9996H2.88461C1.93027 15.9996 1.29231 15.3387 1.29231 14.3843V3.61508C1.29231 2.66074 1.93023 1.99963 2.88461 1.99963H17.1266C18.0809 1.99963 18.7529 2.6607 18.7529 3.61508V6.11508Z"
                  fill="white"
                />
              </svg>
              <span>Wallet</span>
            </Link> */}
            <Link className="mt-10" onClick={logout} href="#">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.9668 18.3057H2.49168C2.0332 18.3057 1.66113 17.9335 1.66113 17.4751V2.52492C1.66113 2.06644 2.03324 1.69437 2.49168 1.69437H9.9668C10.4261 1.69437 10.7973 1.32312 10.7973 0.863828C10.7973 0.404531 10.4261 0.0332031 9.9668 0.0332031H2.49168C1.11793 0.0332031 0 1.15117 0 2.52492V17.4751C0 18.8488 1.11793 19.9668 2.49168 19.9668H9.9668C10.4261 19.9668 10.7973 19.5955 10.7973 19.1362C10.7973 18.6769 10.4261 18.3057 9.9668 18.3057Z"
                  fill="white"
                />
                <path
                  d="M19.7525 9.40904L14.7027 4.42564C14.3771 4.10337 13.8505 4.10755 13.5282 4.43396C13.206 4.76036 13.2093 5.28611 13.5366 5.60837L17.1454 9.16982H7.47508C7.01578 9.16982 6.64453 9.54107 6.64453 10.0004C6.64453 10.4597 7.01578 10.8309 7.47508 10.8309H17.1454L13.5366 14.3924C13.2093 14.7147 13.2068 15.2404 13.5282 15.5668C13.691 15.7313 13.9053 15.8143 14.1196 15.8143C14.3306 15.8143 14.5415 15.7346 14.7027 15.5751L19.7525 10.5917C19.9103 10.4356 20 10.2229 20 10.0003C20 9.77783 19.9111 9.56603 19.7525 9.40904Z"
                  fill="white"
                />
              </svg>
              <span>Log out</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

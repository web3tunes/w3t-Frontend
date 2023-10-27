import { navigation } from "@/data/navigation";
import useMatchMedia from "@/hooks/useMatchMedia";
import isActiveMenu from "@/utils/isActiveMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation(): JSX.Element {
  const path = usePathname();

  // checking media query
  const isMatch = useMatchMedia("(max-width: 991px)");

  return (
    <>
      {isMatch !== null ? (
        <nav
          id={isMatch ? "main-nav-mobi" : "main-nav"}
          className="main-nav"
          style={isMatch ? { display: "none" } : { display: "block" }}
        >
          <ul id="menu-primary-menu" className="menu">
            {navigation?.map((item) => (
              <li key={item.id} className="menu-item current-menu-item">
                <Link
                  href={item.path}
                  className={isActiveMenu(item.dropdown, path) ? "active" : ""}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}

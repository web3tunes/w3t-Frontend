import Link from "next/link";

interface MenuItem {
  key: number;
  href: string;
  label: string;
}

interface Props {
  data: { id: number; avatar: string; name: string; eth: number };
}

const menuItems: MenuItem[][] = [
  [
    { key: 1, href: "/explore", label: "Market" },
    { key: 2, href: "/profile", label: "Author Profile" },
    { key: 3, href: "/create-item", label: "Upload Track" },
    { key: 4, href: "/profile", label: "My NFTs" },
  ],
  [
    { key: 5, href: "/contact", label: "Contact Us" },
    { key: 6, href: "/privacy-policy", label: "Privacy Policy" },
    { key: 7, href: "/terms-and-conditions", label: "Terms and Conditions" },
    { key: 8, href: "/faq", label: "FAQs" },
  ],
];

export default function FooterItems({ data }: Props) {
  return (
    <>
      {menuItems.map((menu, index) => (
        <div
          className={`col-lg-2 col-md-4 col-sm-${index === 1 ? 7 : 5} col-5`}
          key={index}
        >
          <div className={`widget widget-menu style-${index + 1}`}>
            <h5 className="title-widget">
              {index === 0 ? "My Account" : index === 1 ? "Company" : "Company"}
            </h5>
            <ul>
              {menu.map(({ key, href, label }) => (
                <li key={key}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

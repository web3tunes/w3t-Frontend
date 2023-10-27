import Image from "next/image";

export default function Loader() {
  return (
    <div className="loader">
      <Image
        className="loader-png"
        src="/assets/images/loader.png"
        alt=""
        width={"100"}
        height={"100"}
      />
    </div>
  );
}

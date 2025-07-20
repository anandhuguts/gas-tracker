import Image from "next/image";

function Imagecomp({ image }) {
  return (
    <div className="relative w-[35px] h-[35px]">
      <Image src={`/${image}`} alt="Logo" fill className="object-cover" />
    </div>
  );
}

export default Imagecomp;

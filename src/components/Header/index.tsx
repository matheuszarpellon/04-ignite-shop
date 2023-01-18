import { HeaderContainer } from "./styles";

import Image from "next/image";
import logoImg from "../../assets/logo.svg";
import { Cart } from "../Cart";
import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
  const { pathname } = useRouter()
  console.log(pathname)
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      {pathname !== '/success' && <Cart />}
    </HeaderContainer>
  );
}
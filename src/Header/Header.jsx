import Button from "./Button";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  return (
    <nav>
      <div className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto">
        <Logo/>
        <Nav/>
        <Button/>
      </div>
    </nav>
  );
}
